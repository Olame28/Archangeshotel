"use client";

import { Wifi, Car, Waves, ConciergeBell, Shield, Clock, Coffee, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

const services = [
  {
    icon: ConciergeBell,
    title: "Conciergerie 24/7",
    text: "Une équipe dévouée pour répondre à vos moindres désirs, de la réservation de table à l'organisation d'événements.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Wifi,
    title: "Star link",
    text: "Une connexion internet ultra-rapide et stable, accessible gratuitement dans tout l'établissement.",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Shield,
    title: "Sécurité Totale",
    text: "Votre sérénité est notre priorité avec un service de sécurité professionnel présent jour et nuit.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Car,
    title: "Parking Privé",
    text: "Espace de stationnement sécurisé et spacieux, facile d'accès depuis la route principale.",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Waves,
    title: "Espace Détente",
    text: "Profitez de notre piscine et de nos jardins pour une relaxation absolue face au lac.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Clock,
    title: "Service Rapide",
    text: "Check-in et check-out express pour optimiser votre temps précieux chez nous.",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Coffee,
    title: "Petit-Déjeuner",
    text: "Commencez votre journée avec un buffet varié mêlant saveurs locales et internationales.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: MapPin,
    title: "Emplacement Idéal",
    text: "Situé stratégiquement à Minova, entre ville et nature, avec un accès direct au lac.",
    color: "bg-navy/5 text-navy",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-cream py-24 sm:py-32 overflow-hidden scroll-mt-24">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <span className="font-sans text-sm font-bold uppercase tracking-[0.4em] text-gold">
              Services & Prestige
            </span>
            <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl md:text-6xl">
              Votre Confort Avant Tout
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gold/40" />
            <p className="mx-auto mt-8 max-w-2xl font-sans text-lg text-navy/60">
              Nous mettons tout en œuvre pour que chaque instant passé à l'Archanges Hôtel soit synonyme de perfection.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative h-full rounded-[2rem] border border-navy/5 bg-white p-8 shadow-xl shadow-navy/[0.02] transition-all hover:-translate-y-2 hover:border-gold/30 hover:shadow-navy/[0.05]"
            >
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${s.color} transition-all group-hover:scale-110 group-hover:rotate-3`}>
                <s.icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-navy mb-3">{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-navy/60">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
