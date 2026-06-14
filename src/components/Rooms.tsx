"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { ROOMS } from "@/data/content";

export function Rooms() {
  return (
    <section id="chambres" className="relative bg-gradient-to-br from-cream via-cream-dark to-cream py-20 sm:py-28 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-navy rounded-full blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-4">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              Hébergement
            </span>
            <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
              Chambres & Suites
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/40" />
          </div>
        </Reveal>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl transition-all hover:shadow-3xl hover:shadow-gold/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={`Archanges Hôtel Minova - ${room.name}, chambre de luxe au lac Kivu Sud-Kivu`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gold/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-navy text-navy" />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                    <div className="flex items-baseline justify-between">
                      <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy/60">À partir de</span>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">${room.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h3 className="font-serif text-lg sm:text-2xl text-navy mb-2 sm:mb-3 group-hover:text-gold transition-colors">{room.name}</h3>
                <p className="mb-4 sm:mb-6 font-sans text-xs sm:text-sm leading-relaxed text-navy/70">
                  {room.description}
                </p>
                
                <div className="mt-auto space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {room.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 sm:gap-3">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gold" />
                      <span className="font-sans text-[10px] sm:text-xs font-medium text-navy/70 uppercase tracking-wider">{a}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/reservation"
                  className="inline-flex min-h-[44px] sm:min-h-[52px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-navy to-navy-light px-6 sm:px-8 font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cream transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 active:scale-95"
                >
                  Réserver <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="absolute inset-0 border-2 sm:border-4 border-transparent group-hover:border-gold/30 transition-all duration-500 rounded-2xl sm:rounded-3xl pointer-events-none" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
