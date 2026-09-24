import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { getTrustedOrigins } from "@/lib/better-auth/trusted-origins";
import {
  buildDeleteAccountEmailContent,
  buildPasswordResetEmailContent,
  sendEmail,
} from "@/lib/email/send-email";
import { cancelSubscriptionsForUser } from "@/lib/stripe/cancel-user-subscriptions";
import { ensureProfile } from "@/lib/subscription/profiles";

const googleConfigured =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.authAccount,
      verification: schema.verification,
    },
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: getTrustedOrigins(),
  onAPIError: {
    errorURL: "/login",
  },
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      const content = buildPasswordResetEmailContent(url);
      // Do not await — avoids timing leaks that aid email enumeration.
      void sendEmail({
        to: user.email,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }).catch((error: unknown) => {
        console.error("[auth] Failed to send password reset email", error);
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      // No email-verification flow; Google proves ownership of the same address.
      requireLocalEmailVerified: false,
    },
  },
  ...(googleConfigured
    ? {
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            prompt: "select_account",
          },
        },
      }
    : {}),
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        const content = buildDeleteAccountEmailContent(url);
        void sendEmail({
          to: user.email,
          subject: content.subject,
          text: content.text,
          html: content.html,
        }).catch((error: unknown) => {
          console.error(
            "[auth] Failed to send delete-account verification email",
            error,
          );
        });
      },
      beforeDelete: async (user) => {
        await cancelSubscriptionsForUser(user.id);
      },
    },
  },
  advanced: {
    trustedProxyHeaders: true,
    database: {
      // "uuid" defers to Postgres defaults; our schema uses text PKs without defaults.
      generateId: () => crypto.randomUUID(),
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await ensureProfile(user.id);
        },
      },
    },
  },
});
