import type { Metadata } from "next";
import { Quicksand, Inter, Caveat, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
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
  preload: false,
});

const handFont = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const BASE_URL = "https://hangang204.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HANGANG 204 | Your Home in Seoul",
    template: "%s | HANGANG 204",
  },
  description:
    "A cozy 2-bedroom apartment near the Han River in Yongsan, Seoul. Self check-in, fully equipped kitchen, washer, Smart TV, and walking distance to Hangang Park. Book your stay today.",
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
  },
  openGraph: {
    title: "HANGANG 204 | Your Home in Seoul",
    description:
      "A cozy 2-bedroom apartment near the Han River in Yongsan, Seoul. Walking distance to Hangang Park. Book your stay today!",
    url: BASE_URL,
    siteName: "HANGANG 204",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HANGANG 204 | Your Home in Seoul",
    description:
      "Cozy 2-bedroom apartment near the Han River in Yongsan, Seoul. Self check-in, kitchen, and walking distance to Hangang Park.",
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

  if (!routing.locales.includes(locale as "en" | "kr" | "jp")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${koreanFont.variable} ${handFont.variable} antialiased font-[family-name:var(--font-body)]`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
