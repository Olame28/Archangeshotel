"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Star, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function Hero() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { heroImages, theme, get } = useSiteData();
  const [index, setIndex] = useState(0);
  const images = heroImages.length > 0 ? heroImages : ["/images/hotel/hotel-1.jpg"];
  const heroStyle = theme.heroStyle;
  const title = get("hero.title", "Hôtel Archanges");
  const tagline = get("hero.tagline", t("hero.tagline"));
  const desc = get("hero.desc", t("hero.desc"));

  useEffect(() => {
    if (heroStyle === "minimal" || images.length <= 1) return;
    const timer = setInterval(() => setIndex((p) => (p + 1) % images.length), 6000);
    return () => clearInterval(timer);
  }, [images.length, heroStyle]);

  const ctaClass =
    heroStyle === "bold"
      ? "rounded-none bg-[var(--theme-primary)] px-10 py-4 font-bold uppercase tracking-widest text-[var(--theme-secondary)]"
      : heroStyle === "minimal"
        ? "rounded-lg border-2 border-[var(--theme-primary)] px-10 py-4 font-semibold text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white transition"
        : "rounded-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--gold-light)] px-12 py-4 font-bold uppercase tracking-widest text-[var(--theme-secondary)] shadow-lg hover:scale-105 transition";

  const renderBg = () => {
    if (heroStyle === "minimal") {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-secondary)] via-[var(--theme-secondary)] to-[var(--theme-primary)]/30" />
      );
    }
    if (heroStyle === "split") {
      return (
        <>
          <div className="absolute inset-0 lg:left-1/2">
            <Image src={images[index]} alt={title} fill priority className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-[var(--theme-secondary)] lg:w-1/2" />
        </>
      );
    }
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: heroStyle === "cinematic" ? 1.15 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: heroStyle === "bold" ? 0.8 : 1.2 }}
          className="absolute inset-0"
        >
          <Image src={images[index]} alt={title} fill priority className="object-cover object-center" sizes="100vw" />
          <div
            className={`absolute inset-0 ${
              heroStyle === "glass"
                ? "bg-[var(--theme-secondary)]/50 backdrop-blur-[2px]"
                : heroStyle === "african"
                  ? "bg-gradient-to-t from-[var(--theme-secondary)]/90 via-[var(--theme-primary)]/20 to-transparent"
                  : "bg-gradient-to-r from-[var(--theme-secondary)]/85 via-[var(--theme-secondary)]/40 to-transparent"
            }`}
          />
          {heroStyle === "cinematic" && (
            <div className="absolute inset-0 bg-[linear-gradient(transparent_40%,var(--theme-secondary)_100%)]" />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  const heightClass =
    heroStyle === "fullscreen" || heroStyle === "cinematic"
      ? "h-screen min-h-[700px]"
      : heroStyle === "minimal"
        ? "h-[70vh] min-h-[500px]"
        : heroStyle === "editorial"
          ? "h-[85vh] min-h-[600px]"
          : "h-[90vh] min-h-[650px]";

  const textAlign = heroStyle === "editorial" ? "lg:ml-auto lg:text-right lg:max-w-2xl" : "max-w-4xl";
  const titleSize =
    heroStyle === "bold"
      ? "text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter"
      : heroStyle === "minimal"
        ? "text-4xl sm:text-5xl md:text-6xl font-light"
        : "text-5xl sm:text-7xl md:text-8xl lg:text-9xl";

  return (
    <section
      id="accueil"
      className={`relative ${heightClass} overflow-hidden flex items-center bg-[var(--theme-secondary)] scroll-mt-24 section-pad`}
    >
      {renderBg()}

      <div className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${heroStyle === "split" ? "lg:pr-[55%]" : ""}`}>
        <div className={textAlign}>
          {heroStyle !== "minimal" && heroStyle !== "bold" && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[var(--theme-primary)] fill-current" />
              ))}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`font-heading ${titleSize} leading-[1.05] text-white`}
          >
            {title.split(" ").map((word, i) =>
              word.toLowerCase() === "archanges" ? (
                <span key={i} className="text-[var(--theme-primary)] italic font-bold">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl text-white/90 font-body leading-relaxed"
          >
            <span className="inline-block font-bold text-[var(--theme-primary)] uppercase tracking-[0.3em] text-xs mb-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--theme-primary)]/30">
              {tagline}
            </span>
            <br />
            {desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/reservation" className={`inline-flex items-center gap-3 ${ctaClass}`}>
              <Sparkles className="h-5 w-5" />
              {t("hero.book")}
            </Link>
            <Link
              href="https://www.google.com/maps?q=Minova,Sud-Kivu,DRC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-10 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/15 transition"
            >
              <MapPin className="h-4 w-4" />
              {t("hero.find")}
            </Link>
            <Link
              href="/#restaurant"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("restaurant")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10 transition"
            >
              {t("hero.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {images.length > 1 && heroStyle !== "minimal" && heroStyle !== "split" && (
        <>
          <button
            onClick={() => setIndex((p) => (p - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20"
            aria-label="Précédent"
          >
            <ArrowRight className="h-6 w-6 text-white rotate-180" />
          </button>
          <button
            onClick={() => setIndex((p) => (p + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20"
            aria-label="Suivant"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </button>
          <div className="absolute bottom-8 right-8 flex gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? "w-10 bg-[var(--theme-primary)]" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}

      {heroStyle === "cinematic" && (
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest">
          <Play className="h-4 w-4" /> Archanges Experience
        </div>
      )}
    </section>
  );
}
