"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UtensilsCrossed, Heart, PartyPopper, Camera, Check, ArrowRight, Calendar, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { RESTAURANT_IMAGES, RESTAURANT_MENU, HALLS_IMAGES, RECEPTION_HALLS } from "@/data/content";

const restaurantImg = RESTAURANT_IMAGES[0];
const hallImg = RECEPTION_HALLS[0].image;
const hall2Img = RECEPTION_HALLS[1].image;
const photoSpaceImg = RESTAURANT_IMAGES[4];

const halls = [
  {
    key: "malaika",
    nameKey: "halls.malaika",
    subtitleKey: "halls.malaika_subtitle",
    descKey: "halls.malaika_desc",
    image: RECEPTION_HALLS[0].image,
    tagsKey: "halls.malaika_tags" as const,
  },
  {
    key: "arche",
    nameKey: "halls.arche",
    subtitleKey: "halls.arche_subtitle",
    descKey: "halls.arche_desc",
    image: RECEPTION_HALLS[1].image,
    tagsKey: "halls.arche_tags" as const,
  },
];

export function Establishment() {
  const { t } = useLanguage();

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
                alt="Restaurant Maman Rica"
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
      <section className="relative bg-cream-dark py-20 sm:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {RESTAURANT_MENU.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/60 to-navy/20" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div>
                    <p className="font-sans text-xs text-gold/80 uppercase tracking-widest mb-2">{dish.category}</p>
                    <p className="font-sans text-sm text-white/90 leading-relaxed mb-4 line-clamp-3">{dish.description}</p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl mb-1">{(dish as any).icon}</div>
                      <h3 className="font-serif text-lg text-white">{dish.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-xs text-white/70">À partir de</p>
                      <span className="font-serif text-2xl font-bold text-gold">${dish.price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/reservation"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-navy px-8 font-sans text-sm font-bold tracking-widest text-cream transition hover:bg-navy-light active:scale-95 shadow-lg"
            >
              Réserver une Table <ArrowRight className="h-4 w-4" />
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

          <div className="grid gap-8 lg:grid-cols-2">
            {halls.map((h, idx) => (
              <motion.article
                key={h.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all hover:border-gold/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={h.image}
                    alt={t(h.nameKey)}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gold mb-3">
                    <PartyPopper className="h-5 w-5" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold/80">
                      {t(h.subtitleKey)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-4">{t(h.nameKey)}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/70 mb-6">
                    {t(h.descKey)}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {t(h.tagsKey)
                      .split("|")
                      .map((f) => f.trim())
                      .filter(Boolean)
                      .map((f) => (
                        <span
                          key={f}
                          className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                  </div>

                  <Link
                    href="/reservation"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gold px-8 font-sans text-xs font-bold tracking-widest text-navy transition hover:bg-white active:scale-95"
                  >
                    {t("halls.book")} <Calendar className="h-4 w-4" />
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
