"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { AIRBNB_URL } from "@/lib/constants";
import { Logo } from "./Logo";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  en: "English",
  kr: "한국어",
  jp: "日本語",
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["gallery", "about", "amenities", "rules"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px -60% 0px" }
    );

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#gallery", label: t("gallery") },
    { href: "#about", label: t("about") },
    { href: "#amenities", label: t("amenities") },
    { href: "#rules", label: t("houseRules") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`max-w-3xl mx-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl shadow-lg shadow-black/[0.03] border border-black/[0.04]"
            : "bg-white/40 backdrop-blur-md border border-transparent"
        } rounded-full px-2 py-1.5`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-2 hover:opacity-70 transition-opacity">
            <Logo size={22} />
            <span className="text-sm font-semibold text-foreground tracking-wide">HANGANG 204</span>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] px-3 py-1.5 rounded-full transition-all ${
                    activeSection === link.href
                      ? "text-foreground bg-black/[0.04]"
                      : "text-foreground/60 hover:text-foreground hover:bg-black/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Language switcher */}
            <div className="relative ml-1">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-[13px] text-foreground/60 hover:text-foreground hover:bg-black/[0.04] px-2.5 py-1.5 rounded-full transition-all flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {localeLabels[locale]}
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-xl rounded-xl border border-black/[0.06] shadow-lg shadow-black/[0.05] py-1 min-w-[100px] animate-fade-in">
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        loc === locale
                          ? "text-accent font-medium bg-accent/5"
                          : "text-foreground/70 hover:text-foreground hover:bg-black/[0.03]"
                      }`}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-4 bg-black/10 mx-2" />
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium bg-foreground text-white pl-3.5 pr-3 py-1.5 rounded-full hover:bg-foreground/85 transition-colors flex items-center gap-1.5"
            >
              {tc("bookOnAirbnb")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-3xl bg-white/80 backdrop-blur-xl rounded-2xl border border-black/[0.04] shadow-lg shadow-black/[0.03] p-2 animate-fade-in">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-sm rounded-xl transition-all ${
                  activeSection === link.href
                    ? "text-foreground bg-black/[0.04]"
                    : "text-foreground/70 hover:text-foreground hover:bg-black/[0.03]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language switcher */}
            <div className="mt-1 pt-1 border-t border-black/[0.04]">
              <div className="flex gap-1 px-2 mt-1">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`flex-1 py-2 text-sm rounded-lg transition-colors ${
                      loc === locale
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-foreground/60 hover:bg-black/[0.03]"
                    }`}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-1 pt-1 border-t border-black/[0.04]">
              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 mx-2 mt-1 text-sm font-medium bg-foreground text-white py-2.5 rounded-xl hover:bg-foreground/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {tc("bookOnAirbnb")}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
