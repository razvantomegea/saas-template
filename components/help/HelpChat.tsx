"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";

import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import { HelpBotMarkdown } from "@/lib/help/help-bot-markdown";
import { LEGAL_CONTACT_EMAIL } from "@/lib/legal/constants";
import { LOCALE_REQUEST_HEADER } from "@/lib/i18n/locales";

export function HelpChat() {
  const t = useT();
  const locale = useLocale();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/help/chat",
        headers: { [LOCALE_REQUEST_HEADER]: locale },
      }),
    [locale],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
      {open ? (
        <div
          data-testid={DataTestId.HelpChatPanel}
          className="flex h-[min(28rem,70vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
            <div>
              <p className="text-sm font-medium text-zinc-100">
                {t("help.chatTitle")}
              </p>
              <p className="text-[11px] text-zinc-500">
                {t("help.chatSubtitle")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            >
              {t("common.close")}
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {messages.length === 0 ? (
              <p className="text-zinc-500">
                {t("help.chatEmptyPrompt", { email: LEGAL_CONTACT_EMAIL })}
              </p>
            ) : null}
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-6 rounded-lg bg-emerald-950/50 px-3 py-2 text-zinc-100"
                    : "mr-6 rounded-lg bg-zinc-900 px-3 py-2 text-zinc-300"
                }
              >
                {message.parts.map((part, i) => {
                  if (part.type !== "text") {
                    return null;
                  }
                  if (message.role === "assistant") {
                    return (
                      <HelpBotMarkdown
                        key={`${message.id}-${i}`}
                        text={part.text}
                      />
                    );
                  }
                  return (
                    <p
                      key={`${message.id}-${i}`}
                      className="whitespace-pre-wrap"
                    >
                      {part.text}
                    </p>
                  );
                })}
              </div>
            ))}
            {error ? (
              <p className="text-sm text-red-400">
                {error.message || t("help.chatUnavailable")}
              </p>
            ) : null}
          </div>

          <form
            className="border-t border-zinc-800 p-2"
            onSubmit={(e) => {
              e.preventDefault();
              const text = input.trim();
              if (!text || busy) {
                return;
              }
              void sendMessage({ text });
              setInput("");
            }}
          >
            <div className="flex gap-2">
              <input
                data-testid={DataTestId.HelpChatInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("help.chatPlaceholder")}
                disabled={busy}
                className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-base text-zinc-100 md:text-sm"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                data-testid={DataTestId.HelpChatSend}
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                {t("help.chatSend")}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        data-testid={DataTestId.HelpChatToggle}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-emerald-500"
      >
        {open ? t("help.chatHide") : t("help.chatToggle")}
      </button>
    </div>
  );
}
