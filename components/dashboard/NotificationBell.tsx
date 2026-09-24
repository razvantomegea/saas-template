"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  href: string | null;
  readAt: string | null;
  createdAt: string;
};

type NotificationsResponse = {
  notifications: NotificationItem[];
  unreadCount: number;
};

async function fetchNotifications(): Promise<NotificationsResponse> {
  const response = await fetch("/api/notifications");
  if (!response.ok) {
    throw new Error("Failed to load notifications");
  }
  return response.json();
}

export function NotificationBell({ layout }: { layout: "desktop" | "mobile" }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const unreadCount = data?.unreadCount ?? 0;

  async function markAllRead() {
    setOpen((current) => !current);
    if (unreadCount === 0) {
      return;
    }
    await fetch("/api/notifications", { method: "POST" });
    void queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }

  if (layout === "mobile") {
    return null;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => void markAllRead()}
        className="relative rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
        aria-label="Notifications"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
        {unreadCount > 0 ? (
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
        ) : null}
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-xl">
          {data?.notifications.length ? (
            <ul className="max-h-80 space-y-1 overflow-y-auto">
              {data.notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="rounded-md p-2 hover:bg-zinc-900"
                >
                  <p className="text-sm font-medium text-zinc-100">
                    {notification.title}
                  </p>
                  <p className="text-xs text-zinc-400">{notification.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2 text-sm text-zinc-500">No notifications yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
