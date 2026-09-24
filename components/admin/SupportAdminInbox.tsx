"use client";

import { useTransition } from "react";

import {
  SUPPORT_CATEGORY_LABELS,
  type SupportCategory,
} from "@/lib/help/constants";
import type { SupportTicketListItem } from "@/lib/help/support-tickets";
import { useT } from "@/components/i18n/LocaleProvider";
import { DataTestId } from "@/lib/constants/data-test-id";
import { notify } from "@/lib/notify";
import { closeSupportTicketAction } from "@/app/actions/support-admin";

function categoryLabel(category: string): string {
  if (category in SUPPORT_CATEGORY_LABELS) {
    return SUPPORT_CATEGORY_LABELS[category as SupportCategory];
  }
  return category;
}

type SupportAdminInboxProps = {
  tickets: SupportTicketListItem[];
};

export function SupportAdminInbox({ tickets }: SupportAdminInboxProps) {
  const t = useT();
  const [pending, startTransition] = useTransition();

  function onClose(id: string) {
    startTransition(async () => {
      try {
        await closeSupportTicketAction(id);
        notify.success(t("admin.ticketClosed"));
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : t("admin.closeTicketError"),
        );
      }
    });
  }

  return (
    <div
      data-testid={DataTestId.SupportAdminInbox}
      className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6"
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-100">
          {t("admin.supportTitle")}
        </h1>
        <p className="text-sm text-zinc-500">{t("admin.supportSubtitle")}</p>
      </header>

      {tickets.length === 0 ? (
        <p className="rounded-xl border border-zinc-800 px-4 py-8 text-center text-sm text-zinc-500">
          {t("admin.noOpenTickets")}
        </p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium text-zinc-100">{ticket.subject}</p>
                  <p className="text-xs text-zinc-500">
                    {categoryLabel(ticket.category)} · {ticket.email}
                    {ticket.userId
                      ? ` · ${t("admin.userPrefix")} ${ticket.userId}`
                      : ` · ${t("admin.guestLabel")}`}{" "}
                    · {ticket.createdAt.toISOString()}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => onClose(ticket.id)}
                  className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
                >
                  {t("admin.closeTicket")}
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm text-zinc-300">
                {ticket.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
