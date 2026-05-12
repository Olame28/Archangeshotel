"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_IMAGES } from "@/data/content";
import { site } from "@/lib/site";

export function ReservationPromo() {
  const { t } = useLanguage();
  const hero = HERO_IMAGES[0] ?? "/images/hotel/hotel-1.jpg";

  return (
    <section id="reservation" className="relative scroll-mt-24 overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image src={hero} alt="" fill className="object-cover opacity-35" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            {t("booking.promo_trust_line")}
          </div>
          <h2 className="mt-6 font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
            {t("booking.promo_title")}
          </h2>
          <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-cream/70 sm:text-lg">
            {t("booking.promo_subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/reservation"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-8 font-sans text-xs font-bold uppercase tracking-widest text-navy shadow-xl transition hover:bg-white"
            >
              {t("booking.promo_cta")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`tel:${site.phonesRaw[0]}`}
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-cream/90 transition hover:border-gold/50 hover:text-gold"
            >
              {site.phones[0]}
            </a>
          </div>
          <p className="mt-8 flex items-center gap-2 font-sans text-xs text-cream/45">
            <Shield className="h-4 w-4 text-gold/80" />
            {t("booking.promo_phone_label")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:block"
        >
          <Image src={hero} alt="Archanges Hôtel" fill className="object-cover" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/10 p-5 backdrop-blur-md">
            <p className="font-serif text-lg text-cream">{site.name}</p>
            <p className="mt-1 font-sans text-xs text-cream/70">{site.tagline}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
