"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, History, ChevronLeft, ChevronRight, Play, X, Images, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { EVENTS } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { youtubeVideoIdFromUrl } from "@/lib/youtube";

type HotelEvent = (typeof EVENTS)[number];

function youtubeIdFromEvent(event: HotelEvent): string | null {
  if (event.link) {
    const id = youtubeVideoIdFromUrl(event.link);
    if (id) return id;
  }
  const thumb = typeof event.image === "string" ? event.image : "";
  const m = thumb.match(/\/vi\/([^/]+)\//);
  return m && /^[\w-]{11}$/.test(m[1]) ? m[1] : null;
}

export function Events() {
  const { t } = useLanguage();
  const [viewer, setViewer] = useState<HotelEvent | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const upcomingEvents = EVENTS.filter((e) => e.type === "upcoming");
  const pastEvents = EVENTS.filter((e) => e.type === "past");

  const openViewer = (event: HotelEvent) => {
    setPhotoIndex(0);
    setViewer(event);
  };

  const closeViewer = useCallback(() => {
    setViewer(null);
  }, []);

  useEffect(() => {
    if (!viewer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [viewer, closeViewer]);

  const viewerPhotos = viewer?.photos?.length ? viewer.photos : viewer ? [viewer.image] : [];
  const videoId = viewer ? youtubeIdFromEvent(viewer) : null;
  const isEmbedVideo = Boolean(viewer?.isVideo && videoId);

  const goPrevPhoto = () => {
    setPhotoIndex((i) => (i <= 0 ? viewerPhotos.length - 1 : i - 1));
  };
  const goNextPhoto = () => {
    setPhotoIndex((i) => (i >= viewerPhotos.length - 1 ? 0 : i + 1));
  };

  return (
    <section id="evenements" className="scroll-mt-24 overflow-hidden bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
              {t("events.kicker")}
            </span>
            <h2 className="mt-4 font-serif text-3xl text-navy sm:text-4xl md:text-5xl">{t("events.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-navy/65">{t("events.subtitle")}</p>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold/40" />
          </div>
        </Reveal>

        {upcomingEvents.length > 0 && (
          <div className="mb-20">
            <div className="mb-10 flex items-center gap-3">
              <Calendar className="h-6 w-6 text-gold" />
              <h3 className="font-serif text-2xl uppercase tracking-wider text-navy">{t("events.upcoming")}</h3>
            </div>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4 sm:gap-6 rounded-xl sm:rounded-2xl border border-navy/8 bg-white p-3 sm:p-4 shadow-lg sm:flex-row"
                >
                  <div className="relative h-40 sm:h-48 w-full shrink-0 overflow-hidden rounded-lg sm:rounded-xl sm:h-auto sm:w-48 sm:min-h-[12rem]">
                    <Image src={event.image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 200px" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="mb-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold">{event.date}</span>
                    <h4 className="mb-2 sm:mb-3 font-serif text-lg sm:text-xl text-navy">{event.title}</h4>
                    <p className="mb-4 text-sm leading-relaxed text-navy/65">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <div className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <History className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-serif text-2xl uppercase tracking-wider text-navy">{t("events.past_section")}</h3>
                  <p className="mt-1 max-w-xl font-sans text-sm text-navy/60">{t("events.past_hint")}</p>
                </div>
              </div>
            </div>

            <ul className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
              {pastEvents.map((event, idx) => {
                const hasVideo = Boolean(event.isVideo && youtubeIdFromEvent(event));
                const label = hasVideo ? t("events.open_video") : t("events.open_album");
                return (
                  <motion.li
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -8 }}
                  >
                    <button
                      type="button"
                      onClick={() => openViewer(event)}
                      className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl transition-all hover:shadow-3xl hover:shadow-gold/10"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={event.image}
                          alt=""
                          fill
                          className="object-cover transition duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                        
                        {hasVideo && (
                          <span className="absolute inset-0 flex items-center justify-center bg-navy/30 transition group-hover:bg-navy/20">
                            <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gold/95 backdrop-blur-sm text-navy shadow-2xl transition-transform group-hover:scale-110">
                              <Play className="ml-1 h-8 w-8 sm:h-10 sm:w-10 fill-current" />
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="bg-gold/95 backdrop-blur-sm px-4 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest text-navy shadow-lg">
                            {event.date}
                          </span>
                          <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider text-navy shadow-md">
                            {hasVideo ? t("events.badge_video") : t("events.badge_album")}
                            {typeof event.photoCount === "number" && !hasVideo ? ` · ${event.photoCount} photos` : ""}
                          </span>
                        </div>
                        
                        <h4 className="font-serif text-2xl sm:text-3xl text-white mb-3 drop-shadow-lg">{event.title}</h4>
                        <p className="font-sans text-sm leading-relaxed text-white/90 line-clamp-2 sm:line-clamp-3 drop-shadow">
                          {event.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-gold font-sans text-xs font-bold uppercase tracking-widest">
                          {hasVideo ? <Play className="h-4 w-4" /> : <Images className="h-4 w-4" />}
                          {label}
                        </div>
                      </div>

                      <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold/30 transition-all duration-500 rounded-3xl" />
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-viewer-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy/75 backdrop-blur-sm"
              aria-label={t("events.close")}
              onClick={closeViewer}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{viewer.date}</p>
                  <h2 id="event-viewer-title" className="mt-1 font-serif text-xl text-cream sm:text-2xl">
                    {viewer.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeViewer}
                  className="shrink-0 rounded-full border border-white/15 p-2 text-cream transition hover:bg-white/10"
                  aria-label={t("events.close")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {isEmbedVideo && videoId ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      title={viewer.title}
                      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] w-full bg-navy sm:aspect-[16/9]">
                    <Image
                      src={viewerPhotos[photoIndex] ?? viewer.image}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(max-width: 896px) 100vw, 896px"
                    />
                    {viewerPhotos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={goPrevPhoto}
                          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-cream backdrop-blur-sm transition hover:bg-navy"
                          aria-label={t("events.prev")}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          type="button"
                          onClick={goNextPhoto}
                          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-cream backdrop-blur-sm transition hover:bg-navy"
                          aria-label={t("events.next")}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {viewerPhotos.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setPhotoIndex(i)}
                              className={`h-2 rounded-full transition-all ${i === photoIndex ? "w-6 bg-gold" : "w-2 bg-white/35"}`}
                              aria-label={`${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="border-t border-white/10 px-5 py-5 sm:px-6">
                  <p className="font-sans text-sm leading-relaxed text-cream/80">{viewer.description}</p>
                  {viewer.link && (
                    <p className="mt-4 font-sans text-xs text-cream/45">{t("events.external_note")}</p>
                  )}
                  {viewer.link && (
                    <a
                      href={viewer.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-muted"
                    >
                      {t("events.open_youtube_tab")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
