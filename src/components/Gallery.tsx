"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { useSiteData } from "@/context/SiteContext";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Grid3x3 } from "lucide-react";

export function Gallery() {
  const { galleryImages, get, theme } = useSiteData();
  const images = galleryImages.length > 0 ? galleryImages : ["/images/gallery/gallery-1.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">(
    theme.layoutVariant === "editorial" ? "grid" : "carousel"
  );

  const handlePrevious = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrevious, handleNext]);

  useEffect(() => {
    if (viewMode !== "carousel" || images.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [viewMode, handleNext, images.length]);

  return (
    <section id="galerie" className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-[var(--theme-secondary)] to-[var(--theme-bg)] section-pad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--theme-primary)]/80">
              {get("gallery.eyebrow", "Moments Capturés")}
            </span>
            <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl md:text-5xl">
              {get("gallery.title", "Galerie Photos")}
            </h2>
          </div>
        </Reveal>

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-[var(--theme-primary)] text-white px-6 py-3 theme-card transition hover:scale-105"
          >
            {viewMode === "carousel" ? <Grid3x3 className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
            <span className="text-sm font-bold uppercase">{viewMode === "carousel" ? "Vue Grille" : "Vue Carrousel"}</span>
          </button>
        </div>

        {viewMode === "carousel" && (
          <div className="relative w-full max-w-6xl mx-auto aspect-video theme-card overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                <Image src={images[currentIndex]} alt={`Galerie ${currentIndex + 1}`} fill className="object-cover" priority sizes="100vw" />
              </motion.div>
            </AnimatePresence>
            <button onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 theme-card z-10">
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-4 theme-card z-10">
              <ChevronRight className="h-8 w-8 text-white" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-2 theme-card text-sm font-bold z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}

        {viewMode === "grid" && (
          <div className={`grid gap-4 ${theme.layoutVariant === "editorial" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
            {images.map((src, idx) => (
              <motion.div
                key={src + idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => { setCurrentIndex(idx); setViewMode("carousel"); }}
                className="relative aspect-square theme-card overflow-hidden cursor-pointer group shadow-xl"
              >
                <Image src={src} alt={`Galerie ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="25vw" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
