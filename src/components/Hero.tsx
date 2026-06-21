"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { HERO_IMAGES } from "@/data/content";

export function Hero() {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <section id="accueil" className="relative h-[90vh] min-h-[650px] overflow-hidden flex items-center bg-navy scroll-mt-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[index]}
            alt="Archanges Hôtel Minova - Vue panoramique sur le lac Kivu, hôtel de luxe au Sud-Kivu RDC"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-gold fill-current" />
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-5xl leading-[1.05] text-white sm:text-7xl md:text-8xl lg:text-9xl tracking-tight"
          >
            Hôtel <span className="text-gold italic font-bold">Archanges</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 max-w-2xl font-sans text-xl leading-relaxed text-white/90 sm:text-2xl md:text-3xl font-light"
          >
            <span className="inline-block font-black text-gold uppercase tracking-[0.3em] text-xs mb-6 bg-navy/50 backdrop-blur-sm px-5 py-2 rounded-full border border-gold/30">
              {t("hero.tagline")}
            </span>
            <br />
            {t("hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-12 flex flex-wrap gap-5"
          >
            <Link
              href="/reservation"
              className="group relative inline-flex min-h-[60px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-12 font-sans text-sm font-bold uppercase tracking-[0.2em] text-navy transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/40 active:scale-95 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Sparkles className="h-5 w-5 relative z-10" />
              <span className="relative z-10">{t("hero.book")}</span>
            </Link>
            <Link
              href="https://www.google.com/maps?q=Minova,Sud-Kivu,DRC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-12 font-sans text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white/15 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              <MapPin className="h-4 w-4" />
              {t("hero.find")}
            </Link>
            <Link
              href="/#restaurant"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("restaurant")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-12 font-sans text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white/15 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              {t("hero.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Image précédente"
      >
        <ArrowRight className="h-7 w-7 text-white rotate-180" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20"
        aria-label="Image suivante"
      >
        <ArrowRight className="h-7 w-7 text-white" />
      </motion.button>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute bottom-12 right-12 flex gap-3"
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 transition-all duration-500 rounded-full ${
              i === index ? "w-12 bg-gold shadow-lg shadow-gold/50" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
