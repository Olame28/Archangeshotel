"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, Heart, PartyPopper, Camera, Check, ArrowRight, Calendar, Star, ChevronDown, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { HallGallery } from "@/components/HallGallery";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_IMAGES, RESTAURANT_MENU, RECEPTION_HALLS } from "@/data/content";

const restaurantImg = RESTAURANT_IMAGES[0];
const photoSpaceImg = RESTAURANT_IMAGES[4];

export function Establishment() {
  const { t } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-cream">
      {/* Restaurant Maman Rica */}
      <section id="restaurant" className="relative overflow-hidden py-20 sm:py-28 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                {t("restaurant.subtitle")}
              </span>
              <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
                {t("restaurant.title")}
              </h2>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/40" />
            </div>
          </Reveal>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={restaurantImg}
                alt="Archanges Hôtel Minova - Restaurant Maman Rica, gastronomie au lac Kivu Sud-Kivu"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-1 text-gold mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
                <p className="font-serif text-xl text-white">{t("restaurant.review_title")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-gold mb-6">
                <UtensilsCrossed className="h-8 w-8" strokeWidth={1} />
                <span className="font-serif text-2xl">{t("restaurant.tagline")}</span>
              </div>
              <p className="font-sans text-lg leading-relaxed text-navy/80 italic border-l-3 border-gold pl-5 mb-6">
                "{t("restaurant.quote")}"
              </p>
              <p className="font-sans text-base leading-relaxed text-navy/70 mb-8">
                {t("restaurant.desc")}
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2 mb-8">
                {[
                  "Poissons frais du lac",
                  "Petit-déjeuner complet",
                  "Service attentionné",
                  "Cadre calme",
                  "Menu varié",
                  "Produits du terroir"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" strokeWidth={3} />
                    <span className="font-sans text-sm text-navy/80">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/reservation"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-navy px-8 font-sans text-sm font-bold tracking-widest text-cream transition hover:bg-navy-light active:scale-95 shadow-lg"
              >
                {t("restaurant.book")} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Africain */}
      <section className="relative bg-gradient-to-br from-cream via-cream-dark to-cream py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-navy rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                Saveurs Authentiques
              </span>
              <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
                Notre Menu Africain
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-navy/70">
                Découvrez nos spécialités culinaires authentiques du cœur de l'Afrique
              </p>
              <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/40" />
            </div>
          </Reveal>

          {/* Menu Button */}
          <div className="text-center">
            <motion.button
              onClick={() => setShowMenu(!showMenu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-gradient-to-r from-navy via-navy-light to-navy shadow-2xl hover:shadow-3xl hover:shadow-gold/30 transition-all duration-500 group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-pulse" />
              <span className="relative font-sans text-base sm:text-lg font-bold uppercase tracking-widest text-cream">
                {showMenu ? "Masquer le Menu" : "Voir notre Menu"}
              </span>
              <motion.div
                animate={{ rotate: showMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
              </motion.div>
            </motion.button>
          </div>

          {/* Menu Grid */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pt-6 sm:pt-8">
                  {RESTAURANT_MENU.map((dish, idx) => (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-white"
                    >
                      <div className="relative h-36 sm:h-48 overflow-hidden">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gold/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                          <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy">
                            {dish.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <h3 className="font-serif text-lg sm:text-xl text-navy mb-2 sm:mb-3 group-hover:text-gold transition-colors">
                          {dish.name}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm leading-relaxed text-navy/70 mb-3 sm:mb-4 line-clamp-2">
                          {dish.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-navy/10">
                          <div className="flex items-baseline gap-1">
                            <span className="font-serif text-2xl sm:text-3xl font-bold text-gold">${dish.price}</span>
                          </div>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all">
                            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-navy/60 group-hover:text-navy" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 text-center">
            <Link
              href="/reservation"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-navy to-navy-light px-12 font-sans text-sm font-bold uppercase tracking-widest text-cream transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 active:scale-95"
            >
              Réserver une Table <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Salles de Réception */}
      <section id="salles" className="relative overflow-hidden bg-navy py-20 sm:py-28 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">
                {t("halls.subtitle")}
              </span>
              <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl">
                {t("halls.title")}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-sans text-base text-white/70">
                {t("halls.desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2">
            {RECEPTION_HALLS.map((hall, idx) => (
              <motion.article
                key={hall.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 transition-all hover:border-gold/30"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-gold mb-3">
                    <PartyPopper className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold/80">
                      Capacité : {hall.capacity} personnes
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3 sm:mb-4">{hall.name}</h3>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-white/70 mb-4 sm:mb-6">
                    {hall.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {hall.features.map((f) => (
                      <span
                        key={f}
                        className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 sm:px-3 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <HallGallery
                    images={hall.images}
                    video={hall.video}
                    name={hall.name}
                  />

                  <Link
                    href="/reservation"
                    className="mt-4 sm:mt-6 inline-flex min-h-[48px] sm:min-h-[52px] items-center justify-center gap-3 w-full rounded-full bg-gold px-6 sm:px-8 font-sans text-[10px] sm:text-xs font-bold tracking-widest text-navy transition hover:bg-white active:scale-95"
                  >
                    Réserver cette salle <Calendar className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Prises de Vues */}
      <section id="prises-de-vues" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                {t("photo.subtitle")}
              </span>
              <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
                {t("photo.title")}
              </h2>
              <p className="mt-8 font-sans text-base leading-relaxed text-navy/70">
                {t("photo.desc")}
              </p>
              
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-gold shadow-md">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-navy">{t("photo.light")}</h4>
                    <p className="mt-1 font-sans text-sm text-navy/60">{t("photo.light_desc")}</p>
                  </div>
                </div>
              </div>

              <Link
                href="/reservation"
                className="mt-10 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-navy bg-navy px-8 font-sans text-sm font-bold tracking-widest text-cream transition hover:bg-transparent hover:text-navy active:scale-95"
              >
                {t("photo.booking")} <Camera className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={photoSpaceImg}
                  alt="Espace photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/30 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
