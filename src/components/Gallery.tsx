"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { GALLERY_IMAGES } from "@/data/content";
import { useState } from "react";
import { X } from "lucide-react";

export function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="galerie" className="scroll-mt-24 overflow-hidden bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">
              Moments Capturés
            </span>
            <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl">
              Galerie Photos
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/40" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelected(src)}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group shadow-2xl"
            >
              <Image 
                src={src} 
                alt={`Galerie ${idx + 1}`} 
                fill 
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 sm:p-10"
          onClick={() => setSelected(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image 
              src={selected} 
              alt="Aperçu" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
