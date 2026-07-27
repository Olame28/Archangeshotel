"use client";

import { Sailboat, Waves, Anchor, Compass, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";

const DEFAULT_FEATURES = [
  { icon: Waves, text: "Vitesse et confort" },
  { icon: Anchor, text: "Équipement de sécurité" },
  { icon: Compass, text: "Guides expérimentés" },
  { icon: Sailboat, text: "Vues panoramiques" },
];

export function Excursion() {
  const { images, get } = useSiteData();
  const excursionImg = images.find((i) => i.category === "excursion")?.url || "/images/canon-rapide.jpg";
  const featuresRaw = get("excursion.features", "");
  const featureTexts = featuresRaw ? featuresRaw.split(",").map((s) => s.trim()) : DEFAULT_FEATURES.map((f) => f.text);

  return (
    <section id="excursion" className="relative bg-gradient-to-b from-[var(--theme-secondary)] to-[var(--navy-light)] section-pad overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="font-body text-sm font-bold uppercase tracking-[0.4em] text-[var(--theme-primary)]">Excursions</span>
            <h2 className="font-heading text-4xl sm:text-5xl text-[var(--theme-bg)] mt-4 leading-tight">
              {get("excursion.title", "Excursion en Canon Rapide")}
            </h2>
            <p className="mt-8 text-lg text-[var(--theme-bg)]/80">{get("excursion.desc", "")}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featureTexts.map((text, idx) => {
                const Icon = DEFAULT_FEATURES[idx]?.icon || Sailboat;
                return (
                  <div key={text} className="flex items-center gap-4 theme-card bg-white/5 border border-white/10 p-4">
                    <Icon className="h-5 w-5 text-[var(--theme-primary)]" />
                    <span className="text-sm text-[var(--theme-bg)]">{text}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/reservation" className="mt-10 inline-flex items-center gap-3 theme-card bg-[var(--theme-primary)] px-10 py-4 font-bold text-[var(--theme-secondary)]">
              <Sailboat className="h-5 w-5" />
              Réserver <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-[4/5] theme-card overflow-hidden shadow-2xl">
            <Image src={excursionImg} alt="Canon rapide" fill className="object-cover" sizes="50vw" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
