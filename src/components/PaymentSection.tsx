"use client";

import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { PAYMENT_METHODS } from "@/data/content";
import Link from "next/link";

export function PaymentSection() {
  const { t } = useLanguage();

  const handlePaymentClick = (method: typeof PAYMENT_METHODS[0]) => {
    // Intégration API pour chaque fournisseur
    console.log("Traitement paiement:", method.id);
    // Redirection vers le provider de paiement spécifique
    window.open(method.documentation, "_blank");
  };

  return (
    <section id="paiement" className="relative bg-navy py-24 sm:py-32 overflow-hidden scroll-mt-24">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#c9a227_0%,transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-gold mb-6">
              <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
              <span className="font-sans text-sm font-bold uppercase tracking-[0.4em]">
                {t("payment.subtitle")}
              </span>
            </div>
            <h2 className="font-serif text-4xl text-cream sm:text-5xl md:text-6xl">
              {t("payment.title")}
            </h2>
            <div className="mx-auto mt-6 h-1 w-24 bg-gold/40" />
            <p className="mx-auto mt-8 max-w-2xl font-sans text-lg text-cream/60">
              Pour votre confort, nous acceptons tous les principaux services de paiement mobile et cartes internationales.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-12">
          {PAYMENT_METHODS.map((method, i) => (
            <motion.button
              key={method.id}
              onClick={() => handlePaymentClick(method)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative flex flex-col items-center justify-center py-8 px-4 rounded-xl bg-gradient-to-br ${
                method.colors.from.replace("#", "") && method.colors.to.replace("#", "")
                  ? "hover:shadow-2xl"
                  : ""
              } text-white transition-all hover:-translate-y-2 border border-white/10 cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(to right, ${method.colors.from}, ${method.colors.to})`,
              }}
            >
              <div className="text-center">
                <div className="font-bold text-2xl mb-2">{method.name.split(" ")[0][0]}</div>
                <h4 className="font-sans font-bold text-sm mb-2">{method.name}</h4>
                <p className="text-xs text-white/70 mb-3">{method.provider || "International"}</p>
                <div className="flex items-center justify-center gap-1 text-xs">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{t("payment.available")}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Security Info */}
        <Reveal className="mt-8" delay={0.2}>
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-gold/20 bg-white/5 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-4 text-gold">
              <Lock className="h-6 w-6" />
              <h4 className="font-serif text-xl text-cream">{t("payment.security")}</h4>
            </div>
            <p className="font-sans text-base leading-relaxed text-cream/60 mb-4">
              {t("payment.security_desc")}
            </p>
            <p className="font-sans text-sm text-cream/50">
              Nos partenaires de paiement sont certifiés PCI DSS (Payment Card Industry Data Security Standard).
            </p>
          </div>
        </Reveal>

        {/* API Integration Info */}
        <Reveal className="mt-12" delay={0.3}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg border border-gold/10 bg-white/5 p-6 backdrop-blur-sm">
              <h5 className="font-sans font-bold text-cream mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gold"></span>
                Intégration M-Pesa
              </h5>
              <p className="text-sm text-cream/70">
                Connecté à l'API Safaricom M-Pesa pour transactions instantanées en RDC.
              </p>
            </div>
            <div className="rounded-lg border border-gold/10 bg-white/5 p-6 backdrop-blur-sm">
              <h5 className="font-sans font-bold text-cream mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gold"></span>
                Intégration Stripe
              </h5>
              <p className="text-sm text-cream/70">
                Accepte Visa, MasterCard et plus via Stripe pour les clients internationaux.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
