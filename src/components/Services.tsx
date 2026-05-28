"use client";

import { Wifi, Car, Waves, ConciergeBell, Shield, Clock, Coffee, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

const services = [
  {
    icon: ConciergeBell,
    title: "Conciergerie 24/7",
    text: "Une équipe dévouée pour répondre à vos moindres désirs, de la réservation de table à l'organisation d'événements.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: Wifi,
    title: "Star Link",
    text: "Une connexion internet ultra-rapide et stable, accessible gratuitement dans tout l'établissement.",
    color: "from-navy/20 to-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: Shield,
    title: "Sécurité Totale",
    text: "Votre sérénité est notre priorité avec un service de sécurité professionnel présent jour et nuit.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: Car,
    title: "Parking Privé",
    text: "Espace de stationnement sécurisé et spacieux, facile d'accès depuis la route principale.",
    color: "from-navy/20 to-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: Waves,
    title: "Espace Détente",
    text: "Profitez de notre piscine et de nos jardins pour une relaxation absolue face au lac.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: Clock,
    title: "Service Rapide",
    text: "Check-in et check-out express pour optimiser votre temps précieux chez nous.",
    color: "from-navy/20 to-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: Coffee,
    title: "Petit-Déjeuner",
    text: "Commencez votre journée avec un buffet varié mêlant saveurs locales et internationales.",
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
  },
  {
    icon: MapPin,
    title: "Emplacement Idéal",
    text: "Situé stratégiquement à Minova, entre ville et nature, avec un accès direct au lac.",
    color: "from-navy/20 to-navy/5",
    iconColor: "text-navy",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-gradient-to-br from-cream via-cream to-cream-dark py-24 sm:py-32 overflow-hidden scroll-mt-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-gold/10 to-navy/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-gold" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                Services & Prestige
              </span>
              <Sparkles className="h-6 w-6 text-gold" />
            </div>
            <h2 className="mt-4 font-serif text-4xl text-navy sm:text-5xl md:text-6xl">
              Votre Confort Avant Tout
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />
            <p className="mx-auto mt-8 max-w-2xl font-sans text-lg text-navy/70">
              Nous mettons tout en œuvre pour que chaque instant passé à l'Archanges Hôtel soit synonyme de perfection.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-full rounded-3xl bg-gradient-to-br from-white to-white/50 backdrop-blur-sm border border-navy/10 p-8 shadow-2xl transition-all hover:shadow-3xl hover:shadow-gold/10 hover:border-gold/30"
            >
              <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} transition-all group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                <s.icon className={`h-10 w-10 ${s.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-navy mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-navy/70">
                {s.text}
              </p>
              
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold/20 transition-all duration-500 rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
