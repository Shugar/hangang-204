"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useMotionTemplate,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { AIRBNB_URL, HERO_PHOTO } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  // Cursor-following ambient light (desktop)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const glowXPct = useTransform(smoothX, (v) => v * 100);
  const glowYPct = useTransform(smoothY, (v) => v * 100);
  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${glowXPct}% ${glowYPct}%, rgba(196,133,106,0.1), transparent 60%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  // Staggered entrance
  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-dvh min-h-[600px] overflow-hidden bg-foreground"
    >
      {/* Background image with parallax + zoom */}
      <motion.div
        className="absolute inset-[-10%] will-change-transform"
        style={
          prefersReducedMotion ? {} : { y: imageY, scale: imageScale }
        }
      >
        <Image
          src={`/photos/${HERO_PHOTO}`}
          alt="HANGANG 204 apartment interior"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor ambient glow — desktop only */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ background: glowBg }}
        />
      )}

      {/* Main content — anchored to bottom-left */}
      <motion.div
        className="relative h-full flex flex-col justify-end"
        style={
          prefersReducedMotion ? {} : { opacity: contentOpacity, y: contentY }
        }
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-20 sm:pb-24 lg:pb-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome line */}
            <motion.p
              variants={fadeUp}
              className="text-hand text-xl sm:text-2xl text-white/70 mb-4"
            >
              {t("welcome")}
            </motion.p>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="headline-hero text-white text-[clamp(2.75rem,10vw,8rem)] leading-[0.95] mb-5">
              HANGANG 204<span className="text-hanji">.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg lg:text-xl font-light text-white/70 max-w-lg leading-relaxed mb-8 lg:mb-10"
            >
              {t("tagline")}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 mb-12 sm:mb-14"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold bg-primary text-white hover:bg-primary/85 transition-colors"
              >
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
                  {tc("bookOnAirbnb")}
                  <svg
                    className="w-4 h-4 ml-2 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border border-white/30 text-foreground bg-white hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium transition-all"
              >
                <a href="#gallery">{t("explore")}</a>
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] sm:text-xs tracking-wide text-white/50 uppercase"
            >
              <span>{t("bedrooms")}</span>
              <span className="w-px h-2.5 bg-white/20" aria-hidden />
              <span>{t("guests")}</span>
              <span className="w-px h-2.5 bg-white/20" aria-hidden />
              <span>{t("yongsanSeoul")}</span>
              <span className="hidden sm:block w-px h-2.5 bg-white/20" aria-hidden />
              <span className="hidden sm:block">{t("selfCheckin")}</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2.2, duration: 1.2 }}
      >
        <div className="w-[22px] h-[36px] rounded-full border border-white/25 flex justify-center pt-2">
          <motion.div
            className="w-[3px] h-[6px] rounded-full bg-white/50"
            animate={
              prefersReducedMotion ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
