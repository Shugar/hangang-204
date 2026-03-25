import type { Metadata } from "next";
import { Quicksand, Inter, Caveat, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const displayFont = Quicksand({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: true,
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const koreanFont = Noto_Sans_KR({
  variable: "--font-korean",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const handFont = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const BASE_URL = "https://hangang204.com";

const fontVars = [displayFont, bodyFont, koreanFont, handFont]
  .map((f) => f.variable)
  .join(" ");

const localeToOg: Record<Locale, string> = {
  en: "en_US",
  kr: "ko_KR",
  jp: "ja_JP",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: "%s | HANGANG 204",
    },
    description: t("description"),
    keywords: [
      "Seoul Airbnb",
      "Yongsan apartment",
      "Han River accommodation",
      "Seoul short-term rental",
      "Hangang Park stay",
      "Seoul vacation rental",
      "Korea apartment rental",
      "Seoul self check-in",
      "Yongsan Airbnb",
      "Seoul travel accommodation",
    ],
    authors: [{ name: "Theo", url: BASE_URL }],
    creator: "Theo",
    publisher: "HANGANG 204",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: BASE_URL,
      languages: {
        en: `${BASE_URL}/en`,
        ko: `${BASE_URL}/kr`,
        ja: `${BASE_URL}/jp`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: BASE_URL,
      siteName: "HANGANG 204",
      locale: localeToOg[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${fontVars} antialiased font-[family-name:var(--font-body)]`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
