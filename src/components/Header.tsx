"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { logoPath } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteContext";

type NavItem = { href: string; label: string; scrollTop?: true };

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, get } = useSiteData();
  const siteName = get("site.name", "Archanges Hôtel");
  const subtitle = get("site.subtitle", "Hôtel · Minova");
  const headerStyle = theme.headerStyle;

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
    { href: "/#lac-kivu", label: t("nav.lake") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.scrollTop && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      scrollToId(item.href.slice(2));
    }
  };

  const headerBg =
    headerStyle === "dark"
      ? isScrolled
        ? "bg-[var(--theme-secondary)] shadow-xl"
        : "bg-[var(--theme-secondary)]/95"
      : headerStyle === "glass"
        ? "bg-[var(--theme-bg)]/60 backdrop-blur-xl border-b border-[var(--theme-primary)]/10"
        : headerStyle === "minimal"
          ? "bg-transparent border-b border-[var(--theme-text)]/5"
          : headerStyle === "solid"
            ? "bg-[var(--theme-bg)] shadow-md"
            : isScrolled
              ? "bg-white/97 shadow-lg"
              : "bg-white/90 backdrop-blur-md";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className={`mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${isScrolled ? "py-2" : "py-4"}`}>
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex shrink-0 items-center gap-3 group"
        >
          <div className={`relative overflow-hidden transition-all ${isScrolled ? "h-11 w-11" : "h-14 w-14"}`}>
            <Image src={logoPath} alt={`${siteName} — logo`} fill className="object-contain" priority />
          </div>
          <div className={`leading-tight ${isScrolled ? "hidden sm:block" : "block"}`}>
            <span className="block font-heading font-bold uppercase tracking-tight text-[var(--theme-text)]" style={{ fontSize: isScrolled ? 16 : 20 }}>
              {siteName.split(" ")[0]}
            </span>
            <span className="mt-0.5 block font-body text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--theme-primary)]">{subtitle}</span>
          </div>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="rounded-lg px-3 py-2 font-body text-[11px] font-bold uppercase tracking-widest text-[var(--theme-text)]/70 hover:text-[var(--theme-primary)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <Link
            href="/reservation"
            className="hidden sm:inline-flex rounded-lg bg-[var(--theme-secondary)] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--theme-bg)] hover:opacity-90 transition"
          >
            {t("hero.book")}
          </Link>
          <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t lg:hidden bg-[var(--theme-bg)]"
          >
            <nav className="flex flex-col px-4 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href + "m"}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-[11px] font-bold uppercase tracking-widest"
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
