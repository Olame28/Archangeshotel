"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BedDouble,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Globe,
  Lock,
  Megaphone,
  Phone,
  Shield,
  Smartphone,
  Star,
  UtensilsCrossed,
  Camera,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

/* ────────────────────────────────────────────
   Types
   ──────────────────────────────────────────── */
interface ReservationData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  checkin: string;
  checkout: string;
  guests: number;
  room?: { name: string; price: number };
  hall?: { name: string; capacity: number; price: number };
  totalAmount: number | null;
  currency: string | null;
  paymentMode: string;
  lang: string;
}

type PaymentMethod = "mpesa" | "airtel" | "orange" | "visa" | "mastercard" | null;
type Step = "review" | "method" | "details" | "success";

const METHODS = [
  { id: "mpesa" as PaymentMethod, name: "M-Pesa", provider: "Safaricom", icon: Smartphone, gradient: "from-[#31A24C] to-[#1F7A35]", tag: "Mobile Money" },
  { id: "airtel" as PaymentMethod, name: "Airtel Money", provider: "Airtel", icon: Phone, gradient: "from-[#E41C38] to-[#B81428]", tag: "Mobile Money" },
  { id: "orange" as PaymentMethod, name: "Orange Money", provider: "Orange", icon: Globe, gradient: "from-[#FF8000] to-[#E67E00]", tag: "Mobile Money" },
  { id: "visa" as PaymentMethod, name: "Visa", provider: "International", icon: CreditCard, gradient: "from-[#1434CB] to-[#1E90FF]", tag: "Carte bancaire" },
  { id: "mastercard" as PaymentMethod, name: "MasterCard", provider: "International", icon: CreditCard, gradient: "from-[#EB001B] to-[#FF5F00]", tag: "Carte bancaire" },
];

const typeIcons: Record<string, typeof BedDouble> = { room: BedDouble, restaurant: UtensilsCrossed, event: Megaphone, photoshoot: Camera };
const typeLabels: Record<string, string> = { room: "Chambre", restaurant: "Restaurant", event: "Salle d'événement", photoshoot: "Séance photo" };

const fmtDate = (d: string) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
};
function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return ms > 0 ? Math.round(ms / 86400000) : 0;
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export default function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState<Step>("review");
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [submitting, setSubmitting] = useState(false);

  // Mobile money fields
  const [mobilePhone, setMobilePhone] = useState("");
  const [mobileName, setMobileName] = useState("");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Fetch reservation
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/payment/${id}`);
        const j = await r.json();
        if (j.success) setReservation(j.reservation);
        else setError(j.message || "Réservation introuvable");
      } catch {
        setError("Erreur de connexion");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Format card number with spaces
  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  // Format expiry MM/YY
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  // Submit payment
  const handleSubmit = async () => {
    if (!reservation || !method) return;
    setSubmitting(true);
    try {
      await fetch(`/api/payment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod: METHODS.find((m) => m.id === method)?.name || method,
          transactionRef: method && ["mpesa", "airtel", "orange"].includes(method) ? mobilePhone : `CARD-${cardNumber.slice(-4)}`,
        }),
      });
      setStep("success");
    } catch {
      setError("Erreur lors du paiement");
    } finally {
      setSubmitting(false);
    }
  };

  const isMobile = method && ["mpesa", "airtel", "orange"].includes(method);
  const isCard = method && ["visa", "mastercard"].includes(method);
  const canSubmit = isMobile
    ? mobilePhone.replace(/\D/g, "").length >= 9
    : isCard
      ? cardNumber.replace(/\D/g, "").length >= 15 && cardExpiry.length >= 5 && cardCvv.length >= 3 && cardName.trim().length > 0
      : false;

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gold/30 border-t-gold" />
          <p className="font-sans text-sm text-cream/50">Chargement…</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error && !reservation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e] p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-4 font-serif text-xl text-cream">{error}</h2>
          <p className="mt-2 font-sans text-sm text-cream/50">Veuillez vérifier le lien ou contacter l'hôtel.</p>
          <a href={`tel:${site.phonesRaw[0]}`} className="mt-6 inline-block rounded-full bg-gold px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest text-navy">
            Appeler l'hôtel
          </a>
        </div>
      </div>
    );
  }

  if (!reservation) return null;

  const nights = nightsBetween(reservation.checkin, reservation.checkout);
  const amount = reservation.totalAmount || 0;
  const TypeIcon = typeIcons[reservation.type] || BedDouble;

  /* ══════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/3 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block">
            <p className="font-serif text-2xl text-cream sm:text-3xl">Archanges Hôtel</p>
          </Link>
          <div className="mx-auto mt-3 h-0.5 w-12 bg-gold/60" />
          <p className="mt-3 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">Paiement sécurisé</p>
        </div>

        {/* Steps indicator */}
        <div className="mb-10 flex items-center justify-center gap-1">
          {[
            { key: "review", label: "Résumé" },
            { key: "method", label: "Mode" },
            { key: "details", label: "Détails" },
          ].map((s, i) => {
            const stepOrder = ["review", "method", "details"];
            const currentIdx = stepOrder.indexOf(step);
            const thisIdx = i;
            const done = currentIdx > thisIdx;
            const active = step === s.key || (step === "success" && i === 2);
            return (
              <div key={s.key} className="flex items-center gap-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all ${
                  active ? "border-gold bg-gold text-navy" : done ? "border-emerald-400 bg-emerald-400 text-white" : "border-white/15 text-white/30"
                }`}>
                  {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </div>
                <span className={`hidden font-sans text-[9px] font-bold uppercase tracking-widest sm:block ${
                  active ? "text-gold" : "text-white/30"
                }`}>{s.label}</span>
                {i < 2 && <div className={`mx-1 h-0.5 w-4 ${done ? "bg-emerald-400" : "bg-white/10"}`} />}
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Main content */}
          <AnimatePresence mode="wait">
            {/* ── STEP: Review ── */}
            {step === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                <div className="bg-gradient-to-r from-navy to-navy-light px-7 py-6">
                  <div className="flex items-center gap-3">
                    <TypeIcon className="h-5 w-5 text-gold" />
                    <div>
                      <p className="font-serif text-lg text-cream">{typeLabels[reservation.type] || reservation.type}</p>
                      <p className="font-sans text-xs text-cream/50">Réservation {reservation.id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-7">
                  {/* Dates */}
                  {reservation.type === "room" && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-gold/70">Arrivée</p>
                          <p className="mt-1 font-serif text-base text-cream">{fmtDate(reservation.checkin)}</p>
                        </div>
                        <div>
                          <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-gold/70">Départ</p>
                          <p className="mt-1 font-serif text-base text-cream">{fmtDate(reservation.checkout)}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold/10 px-3 py-2">
                        <Clock className="h-3.5 w-3.5 text-gold" />
                        <span className="font-sans text-xs font-bold text-gold">{nights} nuit{nights > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  )}

                  {/* Room/Hall info */}
                  {reservation.type === "room" && reservation.room && (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <BedDouble className="h-6 w-6 text-gold" />
                      <div>
                        <p className="font-sans text-sm font-medium text-cream">{reservation.room.name}</p>
                        <p className="font-sans text-xs text-cream/50">{reservation.room.price} $ / nuit</p>
                      </div>
                    </div>
                  )}
                  {reservation.type === "event" && reservation.hall && (
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Building2 className="h-6 w-6 text-gold" />
                      <div>
                        <p className="font-sans text-sm font-medium text-cream">{reservation.hall.name}</p>
                        <p className="font-sans text-xs text-cream/50">{reservation.hall.capacity} places</p>
                      </div>
                    </div>
                  )}

                  {/* Guest */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <span className="font-serif text-sm font-bold">{reservation.firstName[0]}</span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-medium text-cream">{reservation.firstName} {reservation.lastName}</p>
                      <p className="font-sans text-xs text-cream/45">{reservation.guests} personne{reservation.guests > 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep("method")}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-[#d4a843] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-navy shadow-lg transition hover:shadow-xl"
                  >
                    Procéder au paiement <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP: Choose method ── */}
            {step === "method" && (
              <motion.div
                key="method"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                <div className="px-7 pt-7 pb-2">
                  <h2 className="font-serif text-xl text-cream">Choisir le mode de paiement</h2>
                  <p className="mt-2 font-sans text-sm text-cream/50">Sélectionnez votre moyen de paiement préféré.</p>
                </div>

                <div className="space-y-3 p-7 pt-4">
                  {METHODS.map((m) => {
                    const Icon = m.icon;
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? "border-gold bg-gold/10 shadow-lg"
                            : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/5"
                        }`}
                      >
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${m.gradient} text-white shadow-md`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-sans text-sm font-semibold text-cream">{m.name}</p>
                          <p className="font-sans text-xs text-cream/45">{m.provider} · {m.tag}</p>
                        </div>
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          active ? "border-gold bg-gold" : "border-white/20"
                        }`}>
                          {active && <Check className="h-3 w-3 text-navy" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 px-7 pb-7">
                  <button
                    onClick={() => setStep("review")}
                    className="rounded-xl border border-white/15 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream/70 transition hover:bg-white/5"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => { if (method) setStep("details"); }}
                    disabled={!method}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#d4a843] py-3 font-sans text-xs font-bold uppercase tracking-[0.15em] text-navy shadow-lg transition hover:shadow-xl disabled:opacity-40"
                  >
                    Continuer <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP: Payment details ── */}
            {step === "details" && method && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                <div className="px-7 pt-7 pb-2">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const m = METHODS.find((x) => x.id === method);
                      if (!m) return null;
                      const Icon = m.icon;
                      return (
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${m.gradient} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className="font-serif text-xl text-cream">{METHODS.find((m) => m.id === method)?.name}</h2>
                      <p className="font-sans text-xs text-cream/50">Renseignez vos informations de paiement</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-7">
                  {isMobile && (
                    <>
                      <div>
                        <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">Numéro de téléphone</label>
                        <div className="flex items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-gold">
                          <Phone className="h-4 w-4 text-gold/60" />
                          <input
                            type="tel"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                            placeholder="Ex : 099 772 1582"
                            className="flex-1 bg-transparent font-sans text-sm text-cream placeholder:text-cream/25 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">Nom complet (tel que sur le compte)</label>
                        <input
                          type="text"
                          value={mobileName}
                          onChange={(e) => setMobileName(e.target.value)}
                          placeholder={`${reservation.firstName} ${reservation.lastName}`}
                          className="w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/25 transition focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
                        <p className="font-sans text-xs leading-relaxed text-cream/60">
                          Vous recevrez une notification sur votre téléphone pour confirmer le paiement. Assurez-vous que le numéro correspond à votre compte {METHODS.find((m) => m.id === method)?.name}.
                        </p>
                      </div>
                    </>
                  )}

                  {isCard && (
                    <>
                      <div>
                        <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">Numéro de carte</label>
                        <div className="flex items-center gap-2 rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-gold">
                          <CreditCard className="h-4 w-4 text-gold/60" />
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                            className="flex-1 bg-transparent font-sans text-sm tracking-wider text-cream placeholder:text-cream/25 focus:outline-none"
                          />
                          <div className="flex gap-1">
                            {method === "visa" && <span className="font-sans text-[9px] font-bold text-blue-400">VISA</span>}
                            {method === "mastercard" && <span className="font-sans text-[9px] font-bold text-orange-400">MC</span>}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">Titulaire de la carte</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="NOM PRÉNOM"
                          className="w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 font-sans text-sm uppercase text-cream placeholder:text-cream/25 transition focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">Expiration</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            placeholder="MM/AA"
                            maxLength={5}
                            className="w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/25 transition focus:border-gold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block font-sans text-[10px] font-bold uppercase tracking-widest text-cream/50">CVV</label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            placeholder="•••"
                            maxLength={4}
                            className="w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 font-sans text-sm text-cream placeholder:text-cream/25 transition focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Security note */}
                  <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-4">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="font-sans text-xs font-semibold text-cream/70">Paiement 100 % sécurisé</p>
                      <p className="mt-1 font-sans text-[11px] leading-relaxed text-cream/40">Vos données sont chiffrées de bout en bout. Conformité PCI DSS.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("method")}
                      className="rounded-xl border border-white/15 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-cream/70 transition hover:bg-white/5"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !canSubmit}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-[#d4a843] py-3.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-navy shadow-lg transition hover:shadow-xl disabled:opacity-40"
                    >
                      {submitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-navy/30 border-t-navy" />
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Payer {amount.toLocaleString("fr-FR")} {reservation.currency || "USD"}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP: Success ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
              >
                <div className="px-7 pt-10 pb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </motion.div>
                  <h2 className="font-serif text-2xl text-cream">Paiement effectué</h2>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-cream/55">
                    Votre paiement de <strong className="text-cream">{amount.toLocaleString("fr-FR")} {reservation.currency || "USD"}</strong> a été traité avec succès.
                    Vous recevrez une confirmation par e-mail.
                  </p>
                </div>
                <div className="mx-7 mb-7 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="space-y-3 font-sans text-sm">
                    <div className="flex justify-between">
                      <span className="text-cream/45">Référence</span>
                      <span className="font-medium text-cream">{reservation.id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream/45">Mode de paiement</span>
                      <span className="font-medium text-cream">{METHODS.find((m) => m.id === method)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream/45">Montant</span>
                      <span className="font-bold text-gold">{amount.toLocaleString("fr-FR")} {reservation.currency || "USD"}</span>
                    </div>
                  </div>
                </div>
                <div className="px-7 pb-7 text-center">
                  <p className="font-sans text-xs text-cream/35">Archanges Hôtel — Minova, Sud-Kivu, RDC</p>
                  <p className="mt-1 font-sans text-xs text-cream/25">Tél. : +243 997 721 582 / +243 991 570 543</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar — summary */}
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md">
              {/* Hotel header */}
              <div className="bg-gradient-to-br from-navy to-navy-light px-6 py-5">
                <div className="flex items-center gap-2 text-gold">
                  <MapPin className="h-4 w-4" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Récapitulatif</span>
                </div>
                <p className="mt-2 font-serif text-lg text-cream">{site.name}</p>
                <p className="mt-0.5 font-sans text-xs text-cream/50">{site.address}</p>
              </div>

              <div className="space-y-4 p-6">
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-cream/45">Type</span>
                  <span className="font-sans text-sm font-medium text-cream">{typeLabels[reservation.type]}</span>
                </div>
                {reservation.type === "room" && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-cream/45">Séjour</span>
                      <span className="text-right font-sans text-sm text-cream">
                        {fmtDate(reservation.checkin)}<br />→ {fmtDate(reservation.checkout)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-xs text-cream/45">Durée</span>
                      <span className="font-sans text-sm font-medium text-cream">{nights} nuit{nights > 1 ? "s" : ""}</span>
                    </div>
                    {reservation.room && (
                      <div className="flex justify-between">
                        <span className="font-sans text-xs text-cream/45">Chambre</span>
                        <span className="font-sans text-sm text-cream">{reservation.room.name}</span>
                      </div>
                    )}
                  </>
                )}
                {reservation.type === "event" && reservation.hall && (
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-cream/45">Salle</span>
                    <span className="font-sans text-sm text-cream">{reservation.hall.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-sans text-xs text-cream/45">Client</span>
                  <span className="font-sans text-sm text-cream">{reservation.firstName} {reservation.lastName}</span>
                </div>

                {/* Amount */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-end justify-between">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold/70">Montant total</span>
                    <div className="text-right">
                      <p className="font-serif text-3xl text-cream">{amount.toLocaleString("fr-FR")}</p>
                      <p className="font-sans text-xs text-cream/40">{reservation.currency || "USD"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { icon: Lock, label: "Chiffré" },
                { icon: Shield, label: "PCI DSS" },
                { icon: Star, label: "Sécurisé" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-white/5 bg-white/3 p-3 text-center">
                  <b.icon className="mx-auto h-4 w-4 text-gold/60" />
                  <p className="mt-1 font-sans text-[8px] font-bold uppercase tracking-wider text-cream/35">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="mt-5 rounded-2xl border border-white/5 bg-white/3 p-4 text-center backdrop-blur-sm">
              <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-cream/30">Besoin d'aide ?</p>
              <a href={`tel:${site.phonesRaw[0]}`} className="mt-1 block font-serif text-base text-gold hover:text-gold/80">
                {site.phones[0]}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
