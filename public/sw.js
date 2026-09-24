self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    fetch(event.request).catch(
      () =>
        new Response("You are offline. Connect to the internet to continue.", {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
          status: 503,
        }),
    ),
  );
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    const parsed = event.data ? event.data.json() : {};
    payload = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    payload = { body: event.data ? event.data.text() : "" };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title || "SaaS Template", {
      body: payload.body || "You have a new notification.",
      icon: "/icon.png",
      badge: "/icon.png",
      data: {
        url: payload.url || "/dashboard",
      },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(
    event.notification.data?.url || "/dashboard",
    self.location.origin,
  ).href;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        const existing = windows.find((windowClient) =>
          windowClient.url.startsWith(self.location.origin),
        );
        if (existing) {
          existing.navigate(targetUrl);
          return existing.focus();
        }
        return clients.openWindow(targetUrl);
      }),
  );
});
