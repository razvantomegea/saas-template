import { headers } from "next/headers";

import {
  LOCALE_REQUEST_HEADER,
  resolveAppLocale,
  type AppLocale,
} from "@/lib/i18n/locales";

export async function getRequestLocale(): Promise<AppLocale> {
  const headerStore = await headers();
  return resolveAppLocale(headerStore.get(LOCALE_REQUEST_HEADER));
}
