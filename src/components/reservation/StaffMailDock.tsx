"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, X, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import { STAFF_NOTIFY_EVENT } from "@/lib/staff-notify";

const BC_NAME = "archanges-staff";

export function StaffMailDock() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [hasPing, setHasPing] = useState(false);
  const zoho = site.zohoMailWebUrl;

  useEffect(() => {
    const onNotify = () => setHasPing(true);
    window.addEventListener(STAFF_NOTIFY_EVENT, onNotify);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel(BC_NAME);
      bc.onmessage = () => setHasPing(true);
    } catch {
      /* ignore */
    }

    return () => {
      window.removeEventListener(STAFF_NOTIFY_EVENT, onNotify);
      bc?.close();
    };
  }, []);

  const togglePanel = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) setHasPing(false);
      return next;
    });
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.aside
            id="staff-mail-dock-panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto w-[min(100vw-2.5rem,22rem)] overflow-hidden rounded-2xl border border-navy/10 bg-white/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-navy/8 bg-navy px-4 py-3">
              <div className="flex items-center gap-2 text-cream">
                <Shield className="h-4 w-4 text-gold" aria-hidden />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">
                  {t("staff.mail_badge")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-cream/80 transition hover:bg-white/10 hover:text-cream"
                aria-label={t("booking.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4 p-4">
              <div className="flex items-start gap-3 rounded-xl border border-gold/25 bg-gold/8 p-3">
                <Bell className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/60">
                    {t("staff.notify_title")}
                  </p>
                  <p className="mt-1 font-sans text-xs leading-relaxed text-navy/80">{t("staff.notify_body")}</p>
                </div>
              </div>

              <p className="font-sans text-xs leading-relaxed text-navy/75">{t("staff.mail_desc")}</p>
              <a
                href={zoho}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-navy to-navy-light py-3 font-sans text-[10px] font-bold uppercase tracking-widest text-cream shadow-md transition hover:shadow-lg"
              >
                {t("staff.mail_open_zoho")}
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>
              <Link
                href={`mailto:${site.suggestedEmails[1].address}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-navy/15 py-3 font-sans text-[10px] font-bold uppercase tracking-widest text-navy transition hover:border-navy/40"
              >
                <Mail className="h-3.5 w-3.5" />
                {t("staff.mail_write")}
              </Link>
              <p className="border-t border-navy/8 pt-3 font-sans text-[10px] leading-relaxed text-navy/45">
                {t("staff.mail_note")}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto relative">
        {hasPing && !open && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white animate-pulse"
            aria-hidden
          >
            !
          </span>
        )}
        <motion.button
          type="button"
          layout
          onClick={togglePanel}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-cream shadow-2xl ring-4 ring-cream/40 transition hover:scale-105 hover:ring-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          aria-expanded={open}
          aria-controls="staff-mail-dock-panel"
          title={t("staff.mail_title")}
        >
          <Mail className="h-6 w-6" />
          <span className="sr-only">{t("staff.mail_title")}</span>
        </motion.button>
      </div>
    </div>
  );
}
