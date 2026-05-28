"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
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
              className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-gold px-10 font-sans text-sm font-bold uppercase tracking-widest text-navy transition-all hover:bg-gold-muted active:scale-95 shadow-lg shadow-gold/20"
            >
              {t("hero.book")}
            </Link>
            <Link
              href="https://www.google.com/maps?q=Minova,Sud-Kivu,DRC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-10 font-sans text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
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
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-10 font-sans text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            >
              {t("hero.explore")} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index ? "w-8 bg-gold" : "w-3 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
