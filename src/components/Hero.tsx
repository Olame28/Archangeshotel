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
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  return (
    <section id="accueil" className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center bg-navy scroll-mt-24">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[index]}
            alt="Archanges Hôtel Minova - Vue panoramique sur le lac Kivu, hôtel de luxe au Sud-Kivu RDC"
            fill
            priority
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-gold fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Hôtel <span className="text-gold italic font-bold">Archanges</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-white sm:text-xl md:text-2xl font-light"
          >
            <span className="font-black text-gold uppercase tracking-[0.4em] text-sm mb-4 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-navy/20 w-fit px-4 py-1 rounded-sm border-l-4 border-gold">
              {t("hero.tagline")}
            </span>
            {t("hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/reservation"
              className="group relative inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold px-10 font-sans text-sm font-bold uppercase tracking-widest text-navy transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 active:scale-95"
            >
              <Sparkles className="h-5 w-5 animate-pulse" />
              {t("hero.book")}
            </Link>
            <Link
              href="https://www.google.com/maps?q=Minova,Sud-Kivu,DRC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-10 font-sans text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/20 hover:border-white/60 active:scale-95"
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
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-10 font-sans text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/20 hover:border-white/60 active:scale-95"
            >
              {t("hero.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110"
        aria-label="Image précédente"
      >
        <ArrowRight className="h-6 w-6 text-white rotate-180" />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110"
        aria-label="Image suivante"
      >
        <ArrowRight className="h-6 w-6 text-white" />
      </motion.button>

      {/* Slide Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 right-10 flex gap-3"
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 transition-all duration-500 rounded-full ${
              i === index ? "w-10 bg-gold shadow-lg shadow-gold/50" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
}
