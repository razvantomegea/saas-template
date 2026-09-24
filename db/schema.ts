import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import {
  auditTimestamps,
  createdAtNow,
  timestamptz,
  timestampNow,
} from "./columns";

// ---------------------------------------------------------------------------
// Better Auth core tables (schema shape required by better-auth/adapters/drizzle)
// ---------------------------------------------------------------------------

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  ...auditTimestamps(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamptz("expires_at").notNull(),
    token: text("token").notNull().unique(),
    ...auditTimestamps(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_user_id_idx").on(table.userId)],
);

export const authAccount = pgTable(
  "auth_account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamptz("access_token_expires_at"),
    refreshTokenExpiresAt: timestamptz("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    ...auditTimestamps(),
  },
  (table) => [index("auth_account_user_id_idx").on(table.userId)],
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamptz("expires_at").notNull(),
  createdAt: timestamptz("created_at"),
  updatedAt: timestamptz("updated_at"),
});

// ---------------------------------------------------------------------------
// Billing / subscription
// ---------------------------------------------------------------------------

export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  plan: text("plan").notNull().default("none"),
  subscriptionStatus: text("subscription_status").notNull().default("none"),
  stripeCustomerId: text("stripe_customer_id"),
  onboardingCompletedAt: timestamptz("onboarding_completed_at"),
  ...auditTimestamps(),
});

/** Additive entitlements layered on top of the base plan (add-ons, promos). */
export const profileEntitlements = pgTable(
  "profile_entitlements",
  {
    userId: text("user_id")
      .notNull()
      .references(() => profiles.userId, { onDelete: "cascade" }),
    entitlement: text("entitlement").notNull(),
    source: text("source").notNull(),
    ...auditTimestamps(),
  },
  (table) => [
    primaryKey({
      name: "profile_entitlements_user_entitlement_pk",
      columns: [table.userId, table.entitlement],
    }),
  ],
);

/** Stripe webhook event ids already processed — idempotency guard. */
export const processedWebhookEvents = pgTable("processed_webhook_events", {
  eventId: text("event_id").primaryKey(),
  processedAt: timestampNow("processed_at"),
});

// ---------------------------------------------------------------------------
// Notifications (generic — web push + in-app)
// ---------------------------------------------------------------------------

export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: text("id").primaryKey(),
    endpoint: text("endpoint").notNull().unique(),
    p256dh: text("p256dh").notNull(),
    auth: text("auth").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    ...auditTimestamps(),
  },
  (table) => [index("push_subscriptions_user_id_idx").on(table.userId)],
);

export const notificationPreferences = pgTable("notification_preferences", {
  id: text("id").primaryKey(),
  subscriptionId: text("subscription_id")
    .notNull()
    .unique()
    .references(() => pushSubscriptions.id, { onDelete: "cascade" }),
  productAlerts: boolean("product_alerts").notNull().default(true),
  ...auditTimestamps(),
});

/** Generic in-app notification feed (replaces product-specific "trade" events). */
export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    href: text("href"),
    readAt: timestamptz("read_at"),
    createdAt: createdAtNow(),
  },
  (table) => [
    index("notifications_user_created_idx").on(table.userId, table.createdAt),
    index("notifications_user_unread_idx").on(table.userId, table.readAt),
  ],
);

// ---------------------------------------------------------------------------
// Demo feature — Notes (proves auth + billing gating end to end)
// ---------------------------------------------------------------------------

export const notes = pgTable(
  "notes",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    ...auditTimestamps(),
  },
  (table) => [
    index("notes_user_created_idx").on(table.userId, table.createdAt),
    uniqueIndex("notes_user_title_uniq").on(table.userId, table.title),
  ],
);

// ---------------------------------------------------------------------------
// Support inbox (Help form → admin)
// ---------------------------------------------------------------------------

export const supportTickets = pgTable(
  "support_tickets",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    email: text("email").notNull(),
    category: text("category").notNull(),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    status: text("status").notNull().default("open"),
    ...auditTimestamps(),
  },
  (table) => [
    index("support_tickets_status_created_idx").on(
      table.status,
      table.createdAt,
    ),
    index("support_tickets_user_id_idx").on(table.userId),
  ],
);

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  oauthAccounts: many(authAccount),
  profile: one(profiles),
  notes: many(notes),
  supportTickets: many(supportTickets),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const authAccountRelations = relations(authAccount, ({ one }) => ({
  user: one(user, { fields: [authAccount.userId], references: [user.id] }),
}));

export const profileRelations = relations(profiles, ({ many, one }) => ({
  user: one(user, { fields: [profiles.userId], references: [user.id] }),
  entitlements: many(profileEntitlements),
}));

export const profileEntitlementRelations = relations(
  profileEntitlements,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profileEntitlements.userId],
      references: [profiles.userId],
    }),
  }),
);

export const pushSubscriptionRelations = relations(
  pushSubscriptions,
  ({ one }) => ({
    user: one(user, {
      fields: [pushSubscriptions.userId],
      references: [user.id],
    }),
    preference: one(notificationPreferences, {
      fields: [pushSubscriptions.id],
      references: [notificationPreferences.subscriptionId],
    }),
  }),
);

export const notificationPreferenceRelations = relations(
  notificationPreferences,
  ({ one }) => ({
    subscription: one(pushSubscriptions, {
      fields: [notificationPreferences.subscriptionId],
      references: [pushSubscriptions.id],
    }),
  }),
);

export const notificationRelations = relations(notifications, ({ one }) => ({
  user: one(user, { fields: [notifications.userId], references: [user.id] }),
}));

export const noteRelations = relations(notes, ({ one }) => ({
  user: one(user, { fields: [notes.userId], references: [user.id] }),
}));

export const supportTicketRelations = relations(supportTickets, ({ one }) => ({
  user: one(user, { fields: [supportTickets.userId], references: [user.id] }),
}));
