"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteContext";

export function ReservationPromo() {
  const { t } = useLanguage();
  const { heroImages, get } = useSiteData();
  const hero = heroImages[0] ?? "/images/hotel/hotel-1.jpg";

  return (
    <section id="reservation" className="relative scroll-mt-24 overflow-hidden bg-[var(--theme-secondary)]">
      <div className="absolute inset-0">
        <Image src={hero} alt="" fill className="object-cover opacity-35" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-secondary)] via-[var(--theme-secondary)]/92 to-[var(--theme-secondary)]/75" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--theme-primary)]">
            <Sparkles className="h-3.5 w-3.5" />
            {t("booking.promo_trust_line")}
          </div>
          <h2 className="mt-6 font-heading text-3xl leading-tight text-[var(--theme-bg)] sm:text-4xl md:text-5xl">
            {get("booking.promo_title", t("booking.promo_title"))}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--theme-bg)]/70 sm:text-lg">
            {get("booking.promo_desc", t("booking.promo_subtitle"))}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/reservation" className="inline-flex min-h-[54px] items-center gap-3 theme-card bg-[var(--theme-primary)] px-10 font-bold uppercase tracking-widest text-[var(--theme-secondary)] hover:scale-105 transition">
              {t("hero.book")} <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2 text-[var(--theme-bg)]/60 text-sm">
              <Shield className="h-4 w-4" />
              {t("booking.trust_secure")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
