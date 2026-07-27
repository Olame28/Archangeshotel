"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";

export function Rooms() {
  const { rooms, get, theme } = useSiteData();
  const gridClass =
    theme.layoutVariant === "editorial"
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      : theme.layoutVariant === "minimal"
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8";

  return (
    <section id="chambres" className="relative bg-[var(--theme-bg)] section-pad overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--theme-primary)]">
              {get("rooms.eyebrow", "Hébergement")}
            </span>
            <h2 className="mt-4 font-heading text-3xl text-[var(--theme-text)] sm:text-4xl md:text-5xl">
              {get("rooms.title", "Chambres & Suites")}
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-[var(--theme-primary)]/40" />
          </div>
        </Reveal>

        <div className={`grid ${gridClass}`}>
          {rooms.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="theme-card group flex flex-col overflow-hidden bg-white shadow-xl transition hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {room.image && (
                  <Image src={room.image} alt={room.name} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="33vw" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-secondary)]/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-[var(--theme-primary)]/95 px-3 py-1.5 rounded-full">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-2.5 w-2.5 fill-[var(--theme-secondary)] text-[var(--theme-secondary)]" />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm theme-card p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold uppercase text-[var(--theme-text)]/60">À partir de</span>
                      <span className="font-heading text-2xl font-bold text-[var(--theme-primary)]">${room.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl text-[var(--theme-text)] mb-2 group-hover:text-[var(--theme-primary)] transition">{room.name}</h3>
                <p className="text-sm text-[var(--theme-text)]/70 mb-4">{room.description}</p>
                <div className="mt-auto space-y-2 mb-6">
                  {room.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)]" />
                      <span className="text-xs font-medium text-[var(--theme-text)]/70 uppercase">{a}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/reservation"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--theme-secondary)] px-8 py-3 text-xs font-bold uppercase tracking-widest text-[var(--theme-bg)] hover:opacity-90 transition"
                >
                  Réserver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
