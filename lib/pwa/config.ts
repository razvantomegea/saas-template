import type { MetadataRoute, Viewport } from "next";
import {
  BRAND_ICON,
  BRAND_NAME,
  BRAND_OG_IMAGE,
} from "@/lib/constants/branding";
import { SITE_DESCRIPTION } from "@/lib/seo/site";

export const APP_NAME = BRAND_NAME;
export const APP_SHORT_NAME = BRAND_NAME;
export const APP_THEME_COLOR = "#09090b";
export const APP_BACKGROUND_COLOR = "#09090b";
export const APP_DESCRIPTION = SITE_DESCRIPTION;

export const appViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: APP_THEME_COLOR,
};

export function webAppManifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: APP_NAME,
    short_name: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    lang: "en",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: APP_BACKGROUND_COLOR,
    theme_color: APP_THEME_COLOR,
    icons: [
      {
        src: BRAND_ICON,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: BRAND_OG_IMAGE,
        sizes: "1200x630",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      { name: "Dashboard", short_name: "Dashboard", url: "/dashboard" },
      { name: "Notes", short_name: "Notes", url: "/dashboard/notes" },
      { name: "Billing", short_name: "Billing", url: "/dashboard/billing" },
    ],
  };
}
