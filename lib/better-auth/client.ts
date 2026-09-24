"use client";

import { createAuthClient } from "better-auth/react";

type AuthClient = ReturnType<typeof createAuthClient>;

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

function resolveAuthBaseUrl(): string {
  if (typeof window !== "undefined") {
    const { hostname, protocol, host, origin } = window.location;
    if (!isLocalHost(hostname)) {
      return origin;
    }

    const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();
    return envUrl || `${protocol}//${host}`;
  }

  const envUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim();
  if (envUrl) {
    try {
      const parsed = new URL(envUrl);
      if (!parsed.protocol.startsWith("http")) {
        throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL must be an http(s) URL");
      }
      return envUrl;
    } catch (error) {
      if (error instanceof Error && error.message.includes("http(s) URL")) {
        throw error;
      }
      throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL must be a valid URL");
    }
  }

  return "http://localhost:3000";
}

let authClientInstance: AuthClient | undefined;

function getAuthClient(): AuthClient {
  if (!authClientInstance) {
    authClientInstance = createAuthClient({
      baseURL: resolveAuthBaseUrl(),
    });
  }
  return authClientInstance;
}

// Do not .bind() methods — createAuthClient uses createDynamicPathProxy; binding
// breaks nested calls like signIn.email() and routes fetch options as URL paths.
export const authClient = new Proxy({} as AuthClient, {
  get(_target, prop) {
    const client = getAuthClient();
    return Reflect.get(client, prop, client);
  },
});
