"use client";

import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteContext";

export function PaymentSection() {
  const { t } = useLanguage();
  const { paymentMethods } = useSiteData();

  return (
    <section id="paiement" className="relative bg-[var(--theme-secondary)] section-pad overflow-hidden scroll-mt-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[var(--theme-primary)] mb-6">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-body text-sm font-bold uppercase tracking-[0.4em]">{t("payment.subtitle")}</span>
            </div>
            <h2 className="font-heading text-4xl text-[var(--theme-bg)] sm:text-5xl">{t("payment.title")}</h2>
            <p className="mx-auto mt-8 max-w-2xl text-[var(--theme-bg)]/60">{t("payment.security_desc")}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {paymentMethods.filter((m) => m.available).map((method, i) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="theme-card group relative overflow-hidden bg-white/5 border border-white/10 p-6 text-center hover:border-[var(--theme-primary)]/40 transition"
            >
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white font-bold text-lg"
                style={{ background: `linear-gradient(135deg, ${method.colorFrom}, ${method.colorTo})` }}
              >
                {method.name.charAt(0)}
              </div>
              <h3 className="font-heading text-lg text-[var(--theme-bg)] mb-1">{method.name}</h3>
              {method.provider && <p className="text-[10px] uppercase tracking-widest text-[var(--theme-bg)]/50 mb-2">{method.provider}</p>}
              <p className="text-xs text-[var(--theme-bg)]/60">{method.description}</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-emerald-400 text-xs">
                <CheckCircle2 className="h-3 w-3" /> Disponible
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-[var(--theme-bg)]/40 text-xs">
          <Lock className="h-4 w-4" />
          <span>Paiements sécurisés — PCI DSS compliant</span>
        </div>
      </div>
    </section>
  );
}
