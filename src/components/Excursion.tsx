"use client";

import { Sailboat, Waves, Anchor, Compass, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const boatImage = "/images/canon-rapide.jpg";

export function Excursion() {
  return (
    <section id="excursion" className="relative bg-gradient-to-b from-navy via-navy-light to-navy py-24 sm:py-32 overflow-hidden scroll-mt-24">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Sailboat className="h-6 w-6" />
              </div>
              <span className="font-sans text-sm font-bold uppercase tracking-[0.4em] text-cyan-400">
                Excursions
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-cream">
              Découvrez le Lac Kivu<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-gold">
                en Canon Rapide
              </span>
            </h2>

            <div className="mt-8 h-1 w-24 bg-gradient-to-r from-cyan-400 to-gold rounded-full" />

            <p className="mt-10 font-sans text-lg leading-relaxed text-cream/80">
              Vivez une expérience unique à bord de notre canon rapide professionnel. 
              Traversez les eaux scintillantes du Lac Kivu, découvrez les îles secrètes, 
              les villages de pêcheurs et les paysages à couper le souffle du Sud-Kivu.
            </p>

            {/* Features */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                { icon: Waves, text: "Vitesse et confort" },
                { icon: Anchor, text: "Équipement de sécurité" },
                { icon: Compass, text: "Guides expérimentés" },
                { icon: Sailboat, text: "Vues panoramiques" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="font-sans text-sm font-medium text-cream">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/reservation"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-10 font-sans text-[15px] font-bold tracking-wide text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
              >
                <Sailboat className="h-5 w-5" />
                Réserver une excursion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 font-sans text-[15px] font-bold text-cream hover:text-cyan-400 transition-colors"
              >
                En savoir plus
              </Link>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] border-2 border-cyan-400/30 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src={boatImage}
                alt="Canon rapide Archanges Hôtel - Excursion Lac Kivu, bateau professionnel"
                fill
                className="object-cover transition duration-1000 hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
                    <Sailboat className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-serif text-lg font-bold text-cream">Canon Rapide</p>
                    <p className="font-sans text-xs text-cream/70">Excursions professionnelles</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
