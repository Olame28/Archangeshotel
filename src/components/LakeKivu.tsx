"use client";

import { Sailboat, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";

export function LakeKivu() {
  const { images, get, theme } = useSiteData();
  const lakeImg = images.find((i) => i.category === "lake")?.url || "/images/lake-kivu.jpg";
  const isSplit = theme.layoutVariant === "editorial" || theme.heroStyle === "split";

  return (
    <section id="lac-kivu" className="relative bg-[var(--theme-secondary)] section-pad overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-center gap-16 ${isSplit ? "lg:grid-cols-1 max-w-3xl mx-auto text-center" : "lg:grid-cols-2 lg:gap-24"}`}>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="font-body text-sm font-bold uppercase tracking-[0.4em] text-[var(--theme-primary)]">Évasion Naturelle</span>
            <h2 className="mt-6 font-heading text-4xl text-[var(--theme-bg)] sm:text-5xl leading-tight">
              {get("lake.title", "La Magie du Lac Kivu")}
            </h2>
            <div className="mt-8 h-1 w-20 bg-[var(--theme-primary)]/60" />
            <p className="mt-8 text-lg text-[var(--theme-bg)]/70 leading-relaxed">{get("lake.desc", "")}</p>
            <p className="mt-6 text-base italic text-[var(--theme-bg)]/60 border-l-2 border-[var(--theme-primary)]/30 pl-6">
              {get("lake.quote", "")}
            </p>
            <div className="mt-10">
              <Link href="/reservation" className="inline-flex items-center gap-3 theme-card bg-[var(--theme-primary)] px-10 py-4 font-bold text-[var(--theme-secondary)] hover:scale-105 transition">
                <Sailboat className="h-5 w-5" />
                Réserver une excursion
              </Link>
            </div>
          </motion.div>

          {!isSplit && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="relative aspect-[4/5] theme-card overflow-hidden shadow-2xl">
                <Image src={lakeImg} alt="Lac Kivu" fill className="object-cover hover:scale-105 transition duration-700" sizes="50vw" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
