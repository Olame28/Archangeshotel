"use client";

import { Share2, Camera, Mail, MapPin, Phone, Globe, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { site, logoPath } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer id="contact" className="relative border-t border-gold/10 bg-navy overflow-hidden scroll-mt-24">
      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold rounded-full blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          {/* Brand Section */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-4 group mb-8">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl shadow-lg border border-gold/20">
                <Image
                  src={logoPath}
                  alt={`${site.name} — logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="leading-tight">
                <span className="font-serif text-2xl font-bold tracking-tight text-cream group-hover:text-gold transition-colors">{site.shortName}</span>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80">{site.tagline}</p>
              </div>
            </Link>
            <p className="font-sans text-base leading-relaxed text-cream/60 mb-8 max-w-sm">
              Une oasis de luxe au bord du lac Kivu. Archanges Hôtel redéfinit l'hospitalité avec ses chambres d'exception, le Restaurant Maman Rica et ses espaces de réception prestigieux.
            </p>
            <div className="flex gap-4 mt-auto">
              <Link
                href={site.social.facebook}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/5 transition-all hover:border-gold/50 hover:bg-gold hover:text-navy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="h-5 w-5" />
              </Link>
              <Link
                href={site.social.instagram}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/5 transition-all hover:border-gold/50 hover:bg-gold hover:text-navy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera className="h-5 w-5" />
              </Link>
              <Link
                href={site.social.whatsapp}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-cream/10 bg-white/5 transition-all hover:border-gold/50 hover:bg-gold hover:text-navy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl text-gold mb-8">Navigation</h3>
            <ul className="space-y-4 font-sans text-base text-cream/70">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-gold transition-colors">
                  {t("nav.reservation")}
                </Link>
              </li>
              <li>
                <Link href="/#chambres" className="hover:text-gold transition-colors">
                  Chambres & Suites
                </Link>
              </li>
              <li>
                <Link href="/#restaurant" className="hover:text-gold transition-colors">
                  Restaurant Maman Rica
                </Link>
              </li>
              <li>
                <Link href="/#salles" className="hover:text-gold transition-colors">
                  Salles de Réception
                </Link>
              </li>
              <li>
                <Link href="/#evenements" className="hover:text-gold transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/#galerie" className="hover:text-gold transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/#prises-de-vues" className="hover:text-gold transition-colors">
                  Prises de Vues
                </Link>
              </li>
              <li>
                <Link href="/#lac-kivu" className="hover:text-gold transition-colors">
                  Lac Kivu
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-serif text-xl text-gold mb-8">Coordonnées</h3>
            <ul className="space-y-6 font-sans text-base text-cream/70">
              <li className="flex gap-4 items-start">
                <MapPin className="h-5 w-5 shrink-0 text-gold" />
                <span>{site.address}</span>
              </li>
              {site.phones.map((p, i) => (
                <li key={p} className="flex gap-4 items-center">
                  <Phone className="h-5 w-5 shrink-0 text-gold" />
                  <a href={`tel:${site.phonesRaw[i]}`} className="hover:text-gold transition-colors">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-4 items-center">
                <Globe className="h-5 w-5 shrink-0 text-gold" />
                <a
                  href={site.url}
                  className="hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  archangeshotel.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Emails Section */}
          <div>
            <h3 className="font-serif text-xl text-gold mb-8">E-mails Professionnels</h3>
            <ul className="space-y-5">
              {site.suggestedEmails.map((row) => (
                <li key={row.address} className="group">
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-cream/40 group-hover:text-gold/50 transition-colors mb-1">
                      {row.role}
                    </span>
                    <a 
                      href={`mailto:${row.address}`} 
                      className="flex items-center gap-2 font-sans text-base text-cream/80 hover:text-gold transition-colors"
                    >
                      <Mail className="h-4 w-4 text-gold" />
                      {row.address}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-sm text-cream/40">
            © {currentYear} {site.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-2 font-sans text-sm text-cream/40">
            <span>{t("footer.dev")}</span>
            <Link 
              href="https://wa.me/243980161910" 
              className="text-gold/60 hover:text-gold transition-colors font-bold"
            >
              @dieumedev.28
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
