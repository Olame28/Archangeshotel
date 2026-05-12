"use client";

import Image from "next/image";
import { BedDouble, Wifi, Bath, Wind, Tv, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { ROOMS } from "@/data/content";

const icons = [Wifi, Bath, Wind, Tv, Coffee, BedDouble];

export function Rooms() {
  return (
    <section id="chambres" className="relative bg-cream-dark py-20 sm:py-28 overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7x1 px-5 sm:px-8 lg:px-4">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-sans text-[15px] font-bold uppercase tracking-[0.4em] text-gold">
              Hébergement
            </span>
            <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
              Chambres & Suites
            </h2>
            <div className="mx-auto mt-1 h-0.5 w-16 bg-gold/40" />
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-baseline gap-1 rounded-full bg-gold px-3 py-1 text-navy shadow-md">
                    <span className="text-[10px] font-bold uppercase">Prix</span>
                    <span className="text-lg font-bold">${room.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl text-navy mb-2">{room.name}</h3>
                <p className="mb-6 font-sans text-sm leading-relaxed text-navy/60">
                  {room.description}
                </p>
                
                <div className="mt-auto space-y-3">
                  {room.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2">
                      <div className="flex h-1 w-1 items-center justify-center rounded-full bg-navy/5 text-gold">
                        {/* Just use a generic bullet for simplicity in small UI */}
                        <div className="h-1 w-1 rounded-full bg-gold" />
                      </div>
                      <span className="font-sans text-[11px] font-medium text-navy/70 uppercase tracking-wider">{a}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/reservation"
                  className="mt-8 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-navy px-6 font-sans text-xs font-bold uppercase tracking-widest text-cream transition hover:bg-gold hover:text-navy active:scale-95"
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
