import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { AIRBNB_URL } from "@/lib/constants";

export async function CTA() {
  const t = await getTranslations("cta");
  const tc = await getTranslations("common");

  return (
    <section id="book" className="section-generous bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 korean-pattern opacity-10" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/5" />
      <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] rounded-full bg-white/5" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <p className="reveal text-hand text-2xl sm:text-3xl text-white/90 mb-4">{t("ready")}</p>
        <h2 className="reveal reveal-delay-1 headline-hero text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
          {t("title")}<br /><span className="text-white/90">{t("titleSuffix")}</span>
        </h2>
        <p className="reveal reveal-delay-2 text-lg text-white/70 mb-10 max-w-3xl mx-auto">{t("description")}</p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-full px-10 py-7 text-lg font-semibold">
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
              {tc("bookOnAirbnb")}
              <svg className="w-6 h-6 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Button>
        </div>

        <div className="reveal reveal-delay-4 flex flex-wrap justify-center gap-8 sm:gap-12 text-white/80">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold text-white">2</div>
            <div className="text-sm mt-1">{t("bedrooms")}</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold text-white">4</div>
            <div className="text-sm mt-1">{t("guests")}</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center justify-center gap-1.5">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {t("yongsan")}
            </div>
            <div className="text-sm mt-1">{t("seoul")}</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center justify-center gap-1.5">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              {t("self")}
            </div>
            <div className="text-sm mt-1">{t("checkin")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
