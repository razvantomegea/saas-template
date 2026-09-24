import { Resend } from "resend";
import { BRAND_NAME } from "@/lib/constants/branding";

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function requireResendConfig(): { apiKey: string; from: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and EMAIL_FROM must be set to send email");
  }

  return { apiKey, from };
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const config = requireResendConfig();
  const resend = new Resend(config.apiKey);

  const { error } = await resend.emails.send({
    from: config.from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export function buildPasswordResetEmailContent(url: string): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Reset your ${BRAND_NAME} password`;
  const heading = "Reset your password";
  const body =
    "Use the link below to choose a new password. This link expires soon.";
  const cta = "Reset password";

  const text = [heading, "", body, "", url, ""].join("\n");

  const html = `
    <p><strong>${heading}</strong></p>
    <p>${body}</p>
    <p><a href="${url}">${cta}</a></p>
  `.trim();

  return { subject, text, html };
}

export function buildDeleteAccountEmailContent(url: string): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Confirm account deletion — ${BRAND_NAME}`;
  const textIntro = `You requested to delete your ${BRAND_NAME} account.`;
  const htmlIntro = textIntro;
  const warning = "This action is permanent and cannot be undone.";
  const ignoreNotice =
    "If you did not request this, you can safely ignore this email.";
  const cta = "Confirm deletion";

  const text = [textIntro, "", url, "", warning, ignoreNotice].join("\n");

  const html = `
    <p>${htmlIntro}</p>
    <p>${warning}</p>
    <p><a href="${url}">${cta}</a></p>
    <p>${ignoreNotice}</p>
  `.trim();

  return { subject, text, html };
}
