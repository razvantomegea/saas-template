import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { NextRequest, NextResponse } from "next/server";

import { clientIpFromRequest } from "@/lib/help/client-ip";
import { buildHelpBotSystemPrompt } from "@/lib/help/help-bot-prompt";
import { consumeRateLimit } from "@/lib/help/rate-limit";
import { resolveAppLocale } from "@/lib/i18n/locales";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal/constants";
import { LOCALE_REQUEST_HEADER } from "@/lib/i18n/locales";
import { requireTrustedOrigin } from "@/lib/security/require-trusted-origin";

const MAX_MESSAGES = 20;

function hasGeminiKey(): boolean {
  return Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim());
}

function isNonNullUiMessage(value: unknown): value is UIMessage {
  return value != null && typeof value === "object";
}

export async function POST(req: NextRequest) {
  const blocked = requireTrustedOrigin(req);
  if (blocked) return blocked;

  if (!hasGeminiKey()) {
    return NextResponse.json(
      {
        error: `Help bot is not configured. Use the private support form or email ${LEGAL_CONTACT_EMAIL}.`,
      },
      { status: 503 },
    );
  }

  const ip = clientIpFromRequest(req);
  const rate = consumeRateLimit({
    key: `help-chat:${ip}`,
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let modelMessages;
  try {
    const body: unknown = await req.json();
    const rawMessages =
      body && typeof body === "object" && "messages" in body
        ? (body as { messages: unknown }).messages
        : undefined;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json({ error: "Missing messages" }, { status: 400 });
    }
    if (!rawMessages.every(isNonNullUiMessage)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }
    modelMessages = await convertToModelMessages(
      rawMessages.slice(-MAX_MESSAGES),
    );
  } catch {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const locale = resolveAppLocale(
    req.headers.get(LOCALE_REQUEST_HEADER) ?? undefined,
  );

  const result = streamText({
    model: google("gemini-3.5-flash"),
    system: buildHelpBotSystemPrompt(locale),
    messages: modelMessages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
