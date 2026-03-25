"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AIRBNB_URL, HERO_PHOTO } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden texture-paper">
      {/* Soft background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-celadon-light/5 to-transparent" />
      </div>

      <div className="relative flex-grow flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Text content */}
          <div className="text-center lg:text-left">
            <p className="text-hand text-2xl sm:text-3xl text-primary mb-6 animate-fade-in">
              {t("welcome")}
            </p>

            <h1 className="headline-hero text-5xl sm:text-6xl lg:text-7xl text-foreground mb-6 animate-fade-in-up">
              <span className="block text-foreground/60 font-medium text-2xl sm:text-3xl lg:text-4xl mb-2">
                {t("subtitle")}
              </span>
              <span className="block">
                HANGANG 204<span className="text-primary">.</span>
              </span>
            </h1>

            <div className="mb-10 animate-fade-in-up delay-100">
              <p className="text-lg sm:text-xl text-foreground/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {t("tagline")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-200">
              <Button asChild size="lg" className="rounded-full px-10 py-7 text-lg font-semibold">
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
                  {tc("bookOnAirbnb")}
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border border-foreground/20 text-foreground bg-white/50 hover:bg-foreground hover:text-white hover:border-foreground rounded-full px-8 py-7 text-lg font-medium transition-all duration-200"
              >
                <a href="#gallery">{t("explore")}</a>
              </Button>
            </div>
          </div>

          {/* Photo section */}
          <div className="relative animate-fade-in-up delay-200">
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-gradient-to-br from-celadon-light/40 via-celadon-light/20 to-hanji-light/30 rounded-[2rem] -rotate-2 -z-10" />

            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-foreground/10 bg-white aspect-[4/3]">
              <Image
                src={`/photos/${HERO_PHOTO}`}
                alt="HANGANG 204 apartment interior"
                fill
                className="object-cover"
                priority
                quality={80}
                sizes="(max-width: 1024px) 90vw, 540px"
              />
            </div>

            {/* Caption below photo */}
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>{t("nearPark")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                <span>{t("fastWifi")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
