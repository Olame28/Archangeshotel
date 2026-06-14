"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, XCircle, Grid3X3 } from "lucide-react";

interface HallGalleryProps {
  images: string[];
  video?: string;
  name: string;
}

export function HallGallery({ images, video, name }: HallGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const nextImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedImage(null);
      setShowVideo(false);
    } else if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  };

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      {images.length > 1 && (
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs font-bold text-white/60 uppercase tracking-widest">
            {images.length} photos
          </span>
          <button
            onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Grid3X3 className="h-4 w-4 text-white" />
            <span className="font-sans text-xs font-bold text-white">
              {viewMode === "carousel" ? "Grille" : "Carrousel"}
            </span>
          </button>
        </div>
      )}

      {/* Carousel View */}
      {viewMode === "carousel" ? (
        <>
          {/* Main Image */}
          <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-2xl bg-navy/20">
            <Image
              src={images[0]}
              alt={`${name} - Photo principale`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 8).map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full h-16 overflow-hidden rounded-lg border-2 border-transparent hover:border-gold transition-colors"
                >
                  <Image
                    src={img}
                    alt={`${name} - Photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </motion.button>
              ))}
              {images.length > 8 && (
                <button
                  onClick={() => setSelectedImage(0)}
                  className="relative w-full h-16 overflow-hidden rounded-lg bg-navy/90 flex items-center justify-center hover:bg-navy transition-colors"
                >
                  <span className="font-sans text-xs font-bold text-white">
                    +{images.length - 8}
                  </span>
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              whileHover={{ scale: 1.05 }}
              className="relative w-full h-32 overflow-hidden rounded-lg border-2 border-transparent hover:border-gold transition-colors"
            >
              <Image
                src={img}
                alt={`${name} - Photo ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Video Button */}
      {video && (
        <button
          onClick={() => setShowVideo(true)}
          className="w-full py-4 rounded-xl bg-navy/5 border border-navy/10 flex items-center justify-center gap-3 hover:bg-navy/10 transition-colors"
        >
          <Play className="h-5 w-5 text-gold fill-current" />
          <span className="font-sans text-sm font-bold text-white">Voir la vidéo</span>
        </button>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-8">
              <Image
                src={images[selectedImage]}
                alt={`${name} - Photo ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="font-sans text-sm font-bold text-white">
                {selectedImage + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <XCircle className="h-8 w-8 text-white" />
            </button>

            <div className="relative w-full max-w-5xl aspect-video">
              <video
                src={video}
                controls
                autoPlay
                className="w-full h-full rounded-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
