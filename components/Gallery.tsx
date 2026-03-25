"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GALLERY_PHOTOS } from "@/lib/constants";

export function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const t = useTranslations("gallery");

  const visiblePhotos = showAll ? GALLERY_PHOTOS : GALLERY_PHOTOS.slice(0, 12);
  const allPhotos = GALLERY_PHOTOS;

  const goToPrev = useCallback(() => {
    setSlideDir("left");
    setLightboxIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : allPhotos.length - 1) : null
    );
  }, [allPhotos.length]);

  const goToNext = useCallback(() => {
    setSlideDir("right");
    setLightboxIndex((prev) =>
      prev !== null ? (prev < allPhotos.length - 1 ? prev + 1 : 0) : null
    );
  }, [allPhotos.length]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goToPrev, goToNext]);

  // When lightboxIndex changes (from grid click or desktop arrows), scroll mobile carousel
  useEffect(() => {
    if (lightboxIndex === null) return;
    setDisplayIndex(lightboxIndex);

    const el = scrollRef.current;
    if (!el) return;
    const target = el.children[lightboxIndex] as HTMLElement;
    if (target) {
      el.scrollTo({ left: lightboxIndex * el.clientWidth, behavior: "auto" });
    }
  }, [lightboxIndex]);

  // Mobile scroll: update counter only after scroll settles
  const handleScrollEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const newIndex = Math.round(el.scrollLeft / el.clientWidth);
    if (newIndex >= 0 && newIndex < allPhotos.length) {
      setLightboxIndex(newIndex);
      setDisplayIndex(newIndex);
    }
  }, [allPhotos.length]);

  const handleScroll = useCallback(() => {
    // Update display counter in real-time via DOM to avoid re-renders
    const el = scrollRef.current;
    if (!el) return;
    const newIndex = Math.round(el.scrollLeft / el.clientWidth);
    if (newIndex >= 0 && newIndex < allPhotos.length && newIndex !== displayIndex) {
      setDisplayIndex(newIndex);
    }

    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(handleScrollEnd, 100);
  }, [allPhotos.length, displayIndex, handleScrollEnd]);

  return (
    <section id="gallery" className="section-generous bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="reveal text-sm text-primary font-medium uppercase tracking-wider mb-3">{t("label")}</p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-display font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="reveal reveal-delay-2 text-lg text-muted-foreground">{t("subtitle", { count: GALLERY_PHOTOS.length })}</p>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[220px]">
          {visiblePhotos.map((photo, index) => {
            const posInGroup = index % 6;
            const isTall = posInGroup === 0 || posInGroup === 3;
            return (
              <button
                key={photo}
                onClick={() => setLightboxIndex(index)}
                className={`reveal relative rounded-xl overflow-hidden cursor-pointer ${isTall ? "row-span-2" : ""}`}
                style={{ transitionDelay: `${Math.min(index * 50, 400)}ms` }}
              >
                <Image
                  src={`/photos/${photo}`}
                  alt={`HANGANG 204 photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 23vw, 280px"
                  quality={60}
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </button>
            );
          })}
        </div>

        {GALLERY_PHOTOS.length > 12 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="reveal inline-flex items-center gap-2 text-foreground/70 hover:text-foreground border border-foreground/20 hover:border-foreground/40 px-6 py-3 rounded-full transition-all text-sm font-medium"
            >
              {showAll ? (
                <>
                  {t("showLess")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  {t("showAll", { count: GALLERY_PHOTOS.length })}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-20 shrink-0">
            <button onClick={closeLightbox} className="text-white/50 hover:text-white transition-colors p-1 cursor-pointer sm:hidden" aria-label="Back">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-white/50 text-sm font-medium tabular-nums">{displayIndex + 1} / {allPhotos.length}</span>
            <button onClick={closeLightbox} className="text-white/50 hover:text-white transition-colors p-1 cursor-pointer hidden sm:block" aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-8 sm:hidden" />
          </div>

          {/* Desktop: single image with arrows */}
          <div className="hidden sm:flex flex-1 items-center justify-center relative min-h-0" onClick={closeLightbox}>
            <button onClick={(e) => { e.stopPropagation(); goToPrev(); }} className="absolute left-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer" aria-label="Previous">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div key={lightboxIndex} className={`relative w-full h-full max-w-6xl max-h-[85vh] mx-16 lightbox-slide-${slideDir}`} onClick={(e) => e.stopPropagation()}>
              <Image src={`/photos/${allPhotos[lightboxIndex]}`} alt={`HANGANG 204 photo ${lightboxIndex + 1}`} fill className="object-contain" sizes="90vw" quality={85} />
            </div>
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer" aria-label="Next">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Mobile: scroll-snap carousel */}
          <div
            ref={scrollRef}
            className="sm:hidden flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-none overscroll-x-contain"
            onScroll={handleScroll}
          >
            {allPhotos.map((photo, i) => (
              <div key={photo} className="snap-start shrink-0 w-full h-full flex items-center">
                <div className="relative w-full h-full">
                  <Image
                    src={`/photos/${photo}`}
                    alt={`HANGANG 204 photo ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    quality={80}
                    loading={Math.abs(i - (lightboxIndex ?? 0)) < 3 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
