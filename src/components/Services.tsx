"use client";

import {
  Wifi, Car, Waves, ConciergeBell, Shield, Clock, Coffee, MapPin, Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteContext";
import { getServiceIcon } from "@/lib/icons";

const FALLBACK = [
  { icon: ConciergeBell, title: "Conciergerie 24/7", text: "Équipe disponible jour et nuit." },
  { icon: Wifi, title: "Star Link", text: "WiFi ultra-rapide gratuit." },
  { icon: Shield, title: "Sécurité Totale", text: "Sécurité professionnelle 24h/24." },
  { icon: Car, title: "Parking Privé", text: "Stationnement sécurisé." },
  { icon: Waves, title: "Espace Détente", text: "Piscine et jardins vue lac." },
  { icon: Clock, title: "Service Rapide", text: "Check-in express." },
  { icon: Coffee, title: "Petit-Déjeuner", text: "Buffet local et international." },
  { icon: MapPin, title: "Emplacement Idéal", text: "Minova, accès direct au lac." },
];

export function Services() {
  const { services, get, theme } = useSiteData();
  const items =
    services.length > 0
      ? services.map((s) => ({ Icon: getServiceIcon(s.icon), title: s.title, text: s.description }))
      : FALLBACK.map((s) => ({ Icon: s.icon, title: s.title, text: s.text }));

  const cols =
    theme.layoutVariant === "minimal" ? "lg:grid-cols-2" : theme.layoutVariant === "bold" ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <section id="services" className="relative bg-[var(--theme-bg)] section-pad overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-[var(--theme-primary)]" />
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--theme-primary)]">
                {get("services.eyebrow", "Services & Prestige")}
              </span>
            </div>
            <h2 className="font-heading text-4xl text-[var(--theme-text)] sm:text-5xl">{get("services.title", "Votre Confort Avant Tout")}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--theme-text)]/70">{get("services.desc", "")}</p>
          </div>
        </Reveal>

        <div className={`grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 ${cols}`}>
          {items.map((s, i) => (
            <motion.div
              key={s.title + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="theme-card group bg-white/80 border border-[var(--theme-text)]/10 p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center theme-card bg-[var(--theme-primary)]/10">
                <s.Icon className="h-8 w-8 text-[var(--theme-primary)]" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg text-[var(--theme-text)] mb-2 group-hover:text-[var(--theme-primary)] transition">{s.title}</h3>
              <p className="text-sm text-[var(--theme-text)]/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
