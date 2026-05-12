"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Bell } from "lucide-react";
import { site, logoPath } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

type NavItem =
  | { href: string; label: string; scrollTop?: true }
  | { href: string; label: string };

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showEvent, setShowEvent] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setShowEvent(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav: NavItem[] = [
    { href: "/", label: t("nav.home"), scrollTop: true },
    { href: "/reservation", label: t("nav.reservation") },
    { href: "/#restaurant", label: t("nav.restaurant") },
    { href: "/#chambres", label: t("nav.rooms") },
    { href: "/#salles", label: t("nav.halls") },
    { href: "/#evenements", label: t("nav.events") },
    { href: "/#galerie", label: t("nav.gallery") },
    { href: "/#prises-de-vues", label: t("nav.photo") },
    { href: "/#lac-kivu", label: t("nav.lake") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if ("scrollTop" in item && item.scrollTop && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      scrollToId(item.href.slice(2));
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeMobile = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/97 shadow-lg" : "bg-white/90"} backdrop-blur-md border-b ${isScrolled ? "border-navy/15" : "border-transparent"}`}
    >
      <AnimatePresence>
        {showEvent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative overflow-hidden bg-gold py-2 px-4 text-center"
          >
            <p className="flex items-center justify-center gap-3 font-sans text-[11px] font-black uppercase tracking-[0.2em] text-navy">
              <Bell className="h-3.5 w-3.5 shrink-0 animate-bounce" />
              <span className="min-w-0">
                {lang === "fr"
                  ? "Événement : Gala de louanges et adorations - Dimanche 2 mai !"
                  : "Event: Gala of praise and worship - Sunday May 2nd!"}
              </span>
              <button type="button" onClick={() => setShowEvent(false)} className="ml-2 shrink-0 hover:scale-110 transition-transform" aria-label="Fermer">
                <X className="h-4 w-4" />
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      >
        <Link href="/" onClick={handleLogoClick} className="flex shrink-0 items-center gap-3 group">
          <div className={`relative overflow-hidden transition-all duration-300 ${isScrolled ? "h-11 w-11" : "h-16 w-16"}`}>
            <Image src={logoPath} alt={`${site.name} — logo`} fill className="object-contain group-hover:scale-105 transition-transform" priority />
          </div>
          <div className={`leading-tight group-hover:text-gold transition-colors ${isScrolled ? "hidden sm:block" : "block"}`}>
            <span className="block font-serif font-bold uppercase tracking-tight text-navy" style={{ fontSize: isScrolled ? "16px" : "22px" }}>
              Archanges
            </span>
            <span className="mt-0.5 block font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-gold">Hôtel · Minova</span>
          </div>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="rounded-lg px-3 py-2 font-sans text-[11px] font-bold uppercase tracking-widest text-navy/70 transition-all hover:bg-navy/5 hover:text-navy active:scale-95"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 rounded-lg border-2 border-navy/20 px-2.5 py-1.5 font-sans text-[10px] font-bold uppercase tracking-widest text-navy transition-all hover:border-navy/50 hover:bg-navy/5"
            title={lang === "fr" ? "Switch to English" : "Passer au Français"}
          >
            <Globe className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{lang === "fr" ? "EN" : "FR"}</span>
          </button>

          <Link
            href="/reservation"
            className="hidden sm:inline-flex rounded-lg bg-gradient-to-r from-navy to-navy-light px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-widest text-cream shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {t("hero.book")}
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-navy transition-colors hover:bg-navy/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t-2 border-navy/10 bg-gradient-to-b from-cream to-cream/80 lg:hidden"
          >
            <nav className="flex flex-col space-y-1 px-4 py-4" aria-label="Navigation mobile">
              {nav.map((item) => (
                <Link
                  key={item.href + item.label + "m"}
                  href={item.href}
                  className="rounded-lg px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-widest text-navy/90 transition-colors hover:bg-navy/5 hover:text-navy"
                  onClick={(e) => {
                    handleNavClick(e, item);
                    closeMobile();
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="mt-2 rounded-lg bg-gradient-to-r from-navy to-navy-light px-4 py-3 text-center font-sans text-[11px] font-bold uppercase tracking-widest text-cream shadow-md transition-shadow hover:shadow-lg"
                onClick={closeMobile}
              >
                {t("hero.book")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
