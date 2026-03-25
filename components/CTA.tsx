import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin, KeyRound } from "lucide-react";
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
              <ArrowRight className="w-6 h-6 ml-2 inline" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="reveal reveal-delay-4 flex flex-wrap justify-center gap-4 sm:gap-12 text-white/80">
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-display font-bold text-white">2</div>
            <div className="text-[10px] sm:text-sm mt-1">{t("bedrooms")}</div>
          </div>
          <div className="w-px h-8 sm:h-12 bg-white/20 self-center" />
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-display font-bold text-white">4</div>
            <div className="text-[10px] sm:text-sm mt-1">{t("guests")}</div>
          </div>
          <div className="w-px h-8 sm:h-12 bg-white/20 self-center" />
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-display font-bold text-white flex items-center justify-center gap-1 sm:gap-1.5">
              <MapPin className="hidden sm:block w-6 h-6 text-white" aria-hidden="true" />
              {t("yongsan")}
            </div>
            <div className="text-[10px] sm:text-sm mt-1">{t("seoul")}</div>
          </div>
          <div className="w-px h-8 sm:h-12 bg-white/20 self-center" />
          <div className="text-center">
            <div className="text-xl sm:text-4xl font-display font-bold text-white flex items-center justify-center gap-1 sm:gap-1.5">
              <KeyRound className="hidden sm:block w-6 h-6 text-white" aria-hidden="true" />
              {t("self")}
            </div>
            <div className="text-[10px] sm:text-sm mt-1">{t("checkin")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
