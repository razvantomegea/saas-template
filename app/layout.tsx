import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import { InstallTutorial } from "@/components/pwa/install-tutorial";
import { InstallTutorialProvider } from "@/components/pwa/install-tutorial-context";
import { ServiceWorkerRegister } from "@/components/pwa/service-worker-register";
import { Toaster } from "@/components/ui/sonner";
import { BRAND_NAME } from "@/lib/constants/branding";
import { getRequestLocale } from "@/lib/i18n/request";
import { HREFLANG_BY_LOCALE } from "@/lib/i18n/locales";
import { appViewport } from "@/lib/pwa/config";
import { createSiteMetadata } from "@/lib/seo/site";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createSiteMetadata(),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: BRAND_NAME,
  },
};

export const viewport: Viewport = appViewport;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={HREFLANG_BY_LOCALE[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers locale={locale}>
          <InstallTutorialProvider>
            <ServiceWorkerRegister />
            <InstallTutorial />
            {children}
          </InstallTutorialProvider>
        </Providers>
        <Toaster closeButton position="bottom-right" />
      </body>
    </html>
  );
}
