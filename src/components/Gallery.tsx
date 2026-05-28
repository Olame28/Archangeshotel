"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { GALLERY_IMAGES } from "@/data/content";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3 } from "lucide-react";

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? GALLERY_IMAGES.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === GALLERY_IMAGES.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Auto-play carousel
  useEffect(() => {
    if (viewMode === "carousel") {
      const timer = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, viewMode]);

  return (
    <section id="galerie" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-navy via-navy/95 to-cream py-20 sm:py-28">
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

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-gold/90 text-white hover:text-navy px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            {viewMode === "carousel" ? <Grid3x3 className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            <span className="font-sans text-sm font-bold uppercase tracking-wider">
              {viewMode === "carousel" ? "Vue Grille" : "Vue Carrousel"}
            </span>
          </button>
        </div>

        {/* Carousel View */}
        {viewMode === "carousel" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-6xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={GALLERY_IMAGES[currentIndex]}
                  alt={`Archanges Hôtel Minova - Photo galerie ${currentIndex + 1}, hôtel de luxe au lac Kivu Sud-Kivu`}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-gold/90 text-white hover:text-navy rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-gold/90 text-white hover:text-navy rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-wider z-10">
              {currentIndex + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 mt-16 bg-black/40 backdrop-blur-md rounded-full p-3 z-10">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {GALLERY_IMAGES.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode("carousel");
                }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <Image
                  src={src}
                  alt={`Galerie ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ZoomIn className="h-8 w-8 text-gold" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
