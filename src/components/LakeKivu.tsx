"use client";

import { Sailboat, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";

// Photo du Lac Kivu - Placez votre photo dans public/images/lake-kivu.jpg
// Dimensions recommandées : 1000 x 1250 px (4:5 portrait), < 400 Ko
const sideImage = "/images/lake-kivu.jpg";

export function LakeKivu() {
  return (
    <section id="lac-kivu" className="relative bg-navy py-24 sm:py-32 overflow-hidden scroll-mt-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#c9a227_0%,transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-sm font-bold uppercase tracking-[0.4em] text-gold">
              Évasion Naturelle
            </span>
            <h2 className="mt-6 font-serif text-4xl text-cream sm:text-5xl md:text-6xl leading-tight">
              La Magie du <br /> <span className="text-gold">Lac Kivu</span>
            </h2>
            <div className="mt-8 h-1 w-20 bg-gold/60" />
            
            <p className="mt-10 font-sans text-lg leading-relaxed text-cream/70">
              Laissez-vous envoûter par la sérénité du lac Kivu. Depuis nos terrasses, 
              contemplez l'horizon où le ciel embrasse l'eau dans un ballet de lumières changeantes. 
              Un spectacle naturel permanent qui apporte fraîcheur et apaisement à votre séjour.
            </p>
            
            <p className="mt-6 font-sans text-base leading-relaxed text-cream/60 italic border-l-2 border-gold/30 pl-6">
              "Une invitation au voyage, une parenthèse hors du temps au cœur du Sud-Kivu."
            </p>

            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                href="/reservation"
                className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-gold px-10 font-sans text-[15px] font-bold tracking-wide text-navy shadow-lg shadow-gold/10 transition-all hover:scale-105 hover:bg-gold-muted active:scale-95"
              >
                <Sailboat className="h-5 w-5" strokeWidth={2} />
                Réserver une excursion
              </Link>
              <Link
                href="#contact"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 font-sans text-[15px] font-bold text-cream hover:text-gold transition-colors"
              >
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] border border-gold/20 translate-x-4 translate-y-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src={sideImage}
                alt="Archanges Hôtel Minova - Vue panoramique sur le lac Kivu, hôtel de luxe au Sud-Kivu RDC"
                fill
                className="object-cover transition duration-1000 hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <p className="font-serif text-xl text-cream drop-shadow-lg">
                  L'horizon à perte de vue
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
