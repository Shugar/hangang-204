import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import { AIRBNB_URL } from "@/lib/constants";
import { Logo } from "./Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background section-normal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Logo size={22} />
              <span className="text-sm font-semibold text-background tracking-wide">HANGANG 204</span>
            </Link>
            <p className="text-background/60 mb-4 leading-relaxed">{t("tagline")}</p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-background">{t("explore")}</h4>
            <ul className="space-y-4">
              <li><Link href="#gallery" className="text-background/60 hover:text-primary transition-colors">{t("galleryLink")}</Link></li>
              <li><Link href="#about" className="text-background/60 hover:text-primary transition-colors">{t("aboutLink")}</Link></li>
              <li><Link href="#amenities" className="text-background/60 hover:text-primary transition-colors">{t("amenitiesLink")}</Link></li>
              <li><Link href="#rules" className="text-background/60 hover:text-primary transition-colors">{t("rulesLink")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-background">{t("information")}</h4>
            <ul className="space-y-4">
              <li className="text-background/60">
                <span className="text-background/40 text-sm block">{t("checkinLabel")}</span>{t("checkinValue")}
              </li>
              <li className="text-background/60">
                <span className="text-background/40 text-sm block">{t("checkoutLabel")}</span>{t("checkoutValue")}
              </li>
              <li className="text-background/60">
                <span className="text-background/40 text-sm block">{t("locationLabel")}</span>{t("locationValue")}
              </li>
              <li className="text-background/60">
                <span className="text-background/40 text-sm block">{t("selfCheckinLabel")}</span>{t("selfCheckinValue")}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-background">{t("bookTitle")}</h4>
            <p className="text-background/60 mb-5">{t("bookDesc")}</p>
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {tc("bookOnAirbnb")}
            </a>
          </div>
        </div>

        <Separator className="bg-background/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">&copy; {currentYear} {t("copyright")}</p>
          <div className="flex items-center gap-4">
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="text-background/40 hover:text-primary transition-colors" aria-label="Airbnb">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
