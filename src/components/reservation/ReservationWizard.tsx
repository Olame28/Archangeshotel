"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  UtensilsCrossed,
  Megaphone,
  Camera,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Headphones,
  MapPin,
  Shield,
  Sparkles,
  User,
  CreditCard,
  FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ROOMS, RECEPTION_HALLS, RESERVATION_TYPES } from "@/data/content";
import { site } from "@/lib/site";
import { notifyStaffActivity } from "@/lib/staff-notify";
import type { PaymentMode, ReservationData, ValidationErrors } from "./reservationTypes";
import { emptyReservation, inputClass, labelClass } from "./reservationTypes";
import { validateStepStay, validateStepGuest, validateStepBilling, validateAll } from "./validateReservation";

const stayErrorKeys = ["checkin", "checkout", "stayPurpose", "guests"];
const guestErrorKeys = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "countryOfOrigin",
  "nationality",
  "idDocument",
  "cityOfProvenance",
];
const billingErrorKeys = ["companyName", "companyContact", "acceptTerms"];

function firstStepWithErrors(err: ValidationErrors): number {
  if (stayErrorKeys.some((k) => err[k])) return 0;
  if (guestErrorKeys.some((k) => err[k])) return 1;
  if (billingErrorKeys.some((k) => err[k])) return 2;
  return 0;
}

function nightsBetween(checkin: string, checkout: string): number {
  if (!checkin || !checkout) return 0;
  const a = new Date(checkin).getTime();
  const b = new Date(checkout).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86400000);
}

export function ReservationWizard() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ReservationData>(() => emptyReservation());
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nights = useMemo(() => nightsBetween(data.checkin, data.checkout), [data.checkin, data.checkout]);

  const roomDisplayName = (id: number) => {
    const m: Record<number, string> = {
      1: t("rooms.standard"),
      2: t("rooms.deluxe"),
      3: t("rooms.vip"),
    };
    return m[id] ?? "";
  };

  const typeLabel = (id: string) => t(`booking.res_type.${id}`);
  const getTypeIcon = (type: string) => {
    const map: Record<string, typeof BedDouble> = {
      room: BedDouble,
      restaurant: UtensilsCrossed,
      event: Megaphone,
      photoshoot: Camera,
    };
    const Icon = map[type];
    return Icon ? <Icon className="h-5 w-5 shrink-0" /> : null;
  };

  const hallLabel = (id: string) => {
    const n = parseInt(id, 10);
    const h = RECEPTION_HALLS.find((x) => x.id === n);
    return h ? `${h.name} (${h.capacity})` : id;
  };

  const roomLine = () => {
    const id = parseInt(String(data.roomType), 10);
    const room = ROOMS.find((r) => r.id === id);
    return room ? `${roomDisplayName(room.id)} · $${room.price}` : "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const v = name === "guests" ? Number(value) : value;
    setData((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) {
      const n = { ...errors };
      delete n[name];
      setErrors(n);
    }
  };

  const setPaymentMode = (mode: PaymentMode) => {
    setData((prev) => ({
      ...prev,
      paymentMode: mode,
      ...(mode === "private" ? { companyName: "", companyContact: "" } : {}),
    }));
    setErrors((prev) => {
      const n = { ...prev };
      delete n.companyName;
      delete n.companyContact;
      return n;
    });
  };

  const handleTypeChange = (type: string) => {
    setData((prev) => ({ ...prev, type, checkin: "", checkout: "" }));
    setErrors({});
  };

  const clearError = (key: string) => {
    setErrors((prev) => {
      const n = { ...prev };
      delete n[key];
      return n;
    });
  };

  const tabs = [
    { id: 0, label: t("booking.wizard.tab_stay"), icon: Calendar },
    { id: 1, label: t("booking.wizard.tab_guest"), icon: User },
    { id: 2, label: t("booking.wizard.tab_billing"), icon: CreditCard },
    { id: 3, label: t("booking.wizard.tab_review"), icon: Sparkles },
  ];

  const goNext = () => {
    let e: ValidationErrors = {};
    if (step === 0) e = validateStepStay(data, t);
    else if (step === 1) e = validateStepGuest(data, t);
    else if (step === 2) e = validateStepBilling(data, t);

    if (step < 3 && Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    const all = validateAll(data, t);
    if (Object.keys(all).length > 0) {
      setErrors(all);
      setStep(firstStepWithErrors(all));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          fullname: `${data.firstName.trim()} ${data.lastName.trim()}`.trim(),
          lang,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
        notifyStaffActivity({ source: "booking" });
        setData(emptyReservation());
        setStep(0);
      } else alert(t("booking.send_error"));
    } catch {
      alert(t("booking.network_error"));
    } finally {
      setLoading(false);
    }
  };

  const err = (key: string) =>
    errors[key] ? (
      <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
        <AlertCircle className="h-4 w-4 shrink-0" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-[#eef2f6]">
      {/* Hero réservation */}
      <section className="relative overflow-hidden border-b border-navy/10 bg-gradient-to-br from-navy via-[#0d1530] to-navy-light pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-gold/20 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-8 font-sans text-[11px] font-bold uppercase tracking-widest text-cream/50">
            <Link href="/" className="transition hover:text-gold">
              {t("booking.wizard.breadcrumb_home")}
            </Link>
            <span className="mx-2 text-cream/30">/</span>
            <span className="text-gold">{t("nav.reservation")}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold">
                {site.shortName} · Minova
              </p>
              <h1 className="mt-3 font-serif text-4xl leading-tight text-cream sm:text-5xl md:text-6xl">
                {t("booking.wizard.hero_title")}
              </h1>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-cream/70 sm:text-lg">
                {t("booking.wizard.hero_subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Shield, text: t("booking.trust_secure") },
                { icon: Clock, text: t("booking.trust_response") },
                { icon: Headphones, text: t("booking.trust_direct") },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                >
                  <Icon className="mx-auto h-6 w-6 text-gold" strokeWidth={1.25} />
                  <p className="mt-2 font-sans text-[10px] font-semibold uppercase leading-snug tracking-wide text-cream/80">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stepper */}
      <div className="sticky top-24 z-30 border-b border-navy/8 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-navy/45">
            {t("booking.wizard.progress_label")}
          </p>
          <ol className="flex flex-wrap items-center gap-2 sm:gap-0 sm:justify-between">
            {tabs.map((tab, idx) => {
              const done = step > idx;
              const active = step === idx;
              const Icon = tab.icon;
              return (
                <li key={tab.id} className="flex flex-1 items-center sm:min-w-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (idx < step) {
                        setErrors({});
                        setStep(idx);
                      }
                    }}
                    disabled={idx > step}
                    className={`group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition sm:px-3 ${
                      idx <= step ? "cursor-pointer hover:bg-navy/5" : "cursor-not-allowed opacity-40"
                    } ${active ? "bg-navy text-cream shadow-lg" : ""}`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
                        active
                          ? "border-gold bg-gold text-navy"
                          : done
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-navy/20 bg-white text-navy/50"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" strokeWidth={3} /> : idx + 1}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`flex items-center gap-1.5 font-sans text-[9px] font-bold uppercase tracking-widest ${
                          active ? "text-gold" : "text-navy/40"
                        }`}
                      >
                        <Icon className="hidden h-3.5 w-3.5 sm:block" />
                        {tab.label}
                      </span>
                    </span>
                  </button>
                  {idx < tabs.length - 1 && (
                    <div
                      className={`mx-1 hidden h-0.5 w-6 shrink-0 sm:block ${done ? "bg-emerald-500" : "bg-navy/10"}`}
                      aria-hidden
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 pb-32 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-12">
          <motion.div layout className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="rounded-3xl border border-navy/8 bg-white p-6 shadow-xl sm:p-9"
              >
                {step === 0 && (
                  <div className="space-y-8">
                    <h2 className="font-serif text-2xl text-navy sm:text-3xl">{t("booking.wizard.stay_heading")}</h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {RESERVATION_TYPES.map((res) => {
                        const Icon = getTypeIcon(res.id);
                        const active = data.type === res.id;
                        return (
                          <button
                            key={res.id}
                            type="button"
                            onClick={() => handleTypeChange(res.id)}
                            className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all ${
                              active
                                ? "border-navy bg-navy text-cream shadow-lg"
                                : "border-navy/10 bg-cream/30 text-navy hover:border-navy/25"
                            }`}
                          >
                            {Icon}
                            <span className="text-[10px] font-bold uppercase leading-tight tracking-wide">
                              {typeLabel(res.id)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {data.type === "room" && (
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="rw-in">
                            {t("booking.checkin")} *
                          </label>
                          <input
                            id="rw-in"
                            type="date"
                            name="checkin"
                            value={data.checkin}
                            onChange={handleChange}
                            className={inputClass}
                          />
                          {err("checkin")}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="rw-out">
                            {t("booking.checkout")} *
                          </label>
                          <input
                            id="rw-out"
                            type="date"
                            name="checkout"
                            value={data.checkout}
                            onChange={handleChange}
                            className={inputClass}
                          />
                          {err("checkout")}
                        </div>
                      </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="rw-guests">
                          {t("booking.guests")}
                        </label>
                        <input
                          id="rw-guests"
                          type="number"
                          name="guests"
                          min={1}
                          value={data.guests}
                          onChange={handleChange}
                          className={`${inputClass} max-w-full sm:max-w-[200px]`}
                        />
                        {err("guests")}
                      </div>
                      {data.type === "room" && (
                        <div>
                          <label className={labelClass} htmlFor="rw-room">
                            {t("booking.room_type")}
                          </label>
                          <select
                            id="rw-room"
                            name="roomType"
                            value={data.roomType}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            {ROOMS.map((room) => (
                              <option key={room.id} value={String(room.id)}>
                                {roomDisplayName(room.id)} — ${room.price} / {t("booking.per_night")}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {data.type === "event" && (
                        <div className="sm:col-span-2">
                          <label className={labelClass} htmlFor="rw-hall">
                            {t("halls.title")}
                          </label>
                          <select
                            id="rw-hall"
                            name="hallType"
                            value={data.hallType}
                            onChange={handleChange}
                            className={inputClass}
                          >
                            {RECEPTION_HALLS.map((hall) => (
                              <option key={hall.id} value={String(hall.id)}>
                                {hall.name} — {hall.capacity}{" "}
                                {lang === "en" ? "guests max." : "places max."}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="rw-purpose">
                        {t("booking.stay_purpose")} *
                      </label>
                      <textarea
                        id="rw-purpose"
                        name="stayPurpose"
                        value={data.stayPurpose}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t("booking.ph_purpose")}
                        className={`${inputClass} resize-none`}
                      />
                      {err("stayPurpose")}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-navy sm:text-3xl">{t("booking.wizard.guest_heading")}</h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass} htmlFor="rw-ln">
                          {t("booking.lastname")} *
                        </label>
                        <input id="rw-ln" name="lastName" value={data.lastName} onChange={handleChange} className={inputClass} />
                        {err("lastName")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-fn">
                          {t("booking.firstname")} *
                        </label>
                        <input id="rw-fn" name="firstName" value={data.firstName} onChange={handleChange} className={inputClass} />
                        {err("firstName")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-em">
                          {t("booking.email")} *
                        </label>
                        <input id="rw-em" type="email" name="email" value={data.email} onChange={handleChange} className={inputClass} />
                        {err("email")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-ph">
                          {t("booking.phone")} *
                        </label>
                        <input id="rw-ph" type="tel" name="phone" value={data.phone} onChange={handleChange} className={inputClass} />
                        {err("phone")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-co">
                          {t("booking.country_origin")} *
                        </label>
                        <input
                          id="rw-co"
                          name="countryOfOrigin"
                          value={data.countryOfOrigin}
                          onChange={handleChange}
                          placeholder={t("booking.ph_country")}
                          className={inputClass}
                        />
                        {err("countryOfOrigin")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-na">
                          {t("booking.nationality")} *
                        </label>
                        <input id="rw-na" name="nationality" value={data.nationality} onChange={handleChange} className={inputClass} />
                        {err("nationality")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-id">
                          {t("booking.id_document")} *
                        </label>
                        <input
                          id="rw-id"
                          name="idDocument"
                          value={data.idDocument}
                          onChange={handleChange}
                          placeholder={t("booking.ph_id")}
                          className={inputClass}
                        />
                        {err("idDocument")}
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="rw-city">
                          {t("booking.city_origin")} *
                        </label>
                        <input
                          id="rw-city"
                          name="cityOfProvenance"
                          value={data.cityOfProvenance}
                          onChange={handleChange}
                          className={inputClass}
                        />
                        {err("cityOfProvenance")}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="font-serif text-2xl text-navy sm:text-3xl">{t("booking.wizard.billing_heading")}</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode("private")}
                        className={`rounded-2xl border-2 px-5 py-5 text-left transition-all ${
                          data.paymentMode === "private"
                            ? "border-navy bg-navy/5 shadow-md"
                            : "border-navy/10 bg-cream/40 hover:border-navy/20"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">A</span>
                        <p className="mt-2 font-serif text-lg text-navy">{t("booking.payment_private")}</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode("company")}
                        className={`rounded-2xl border-2 px-5 py-5 text-left transition-all ${
                          data.paymentMode === "company"
                            ? "border-navy bg-navy/5 shadow-md"
                            : "border-navy/10 bg-cream/40 hover:border-navy/20"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">B</span>
                        <p className="mt-2 font-serif text-lg text-navy">{t("booking.payment_company")}</p>
                      </button>
                    </div>

                    {data.paymentMode === "company" && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass} htmlFor="rw-cn">
                            {t("booking.company_name")} *
                          </label>
                          <input
                            id="rw-cn"
                            name="companyName"
                            value={data.companyName}
                            onChange={handleChange}
                            placeholder={t("booking.ph_company")}
                            className={inputClass}
                          />
                          {err("companyName")}
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="rw-cc">
                            {t("booking.company_contact")} *
                          </label>
                          <input
                            id="rw-cc"
                            name="companyContact"
                            value={data.companyContact}
                            onChange={handleChange}
                            className={inputClass}
                          />
                          {err("companyContact")}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className={labelClass} htmlFor="rw-msg">
                        {t("booking.message")}
                      </label>
                      <textarea
                        id="rw-msg"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <div className="rounded-2xl border border-navy/10 bg-cream/50 p-5">
                      <div className="flex gap-4">
                        <input
                          id="rw-acc"
                          type="checkbox"
                          checked={data.acceptTerms}
                          onChange={(e) => {
                            setData((p) => ({ ...p, acceptTerms: e.target.checked }));
                            clearError("acceptTerms");
                          }}
                          className="mt-1 h-5 w-5 shrink-0 rounded border-navy/30 text-navy focus:ring-navy"
                        />
                        <div>
                          <label htmlFor="rw-acc" className="font-sans text-sm leading-relaxed text-navy/90">
                            {t("booking.accept_terms")}{" "}
                            <Link href="/#contact" className="font-bold text-navy underline decoration-gold decoration-2 underline-offset-2">
                              {t("booking.accept_terms_link")}
                            </Link>
                          </label>
                          {err("acceptTerms")}
                          <p className="mt-3 flex items-start gap-2 font-sans text-xs text-navy/50">
                            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold-muted" />
                            {t("booking.privacy_blurb")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="font-serif text-2xl text-navy sm:text-3xl">{t("booking.wizard.review_heading")}</h2>
                    <p className="font-sans text-sm text-navy/65">{t("booking.wizard.review_intro")}</p>

                    <dl className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-cream/30">
                      <div className="flex justify-between gap-4 px-5 py-4">
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                          {t("booking.type")}
                        </dt>
                        <dd className="text-right font-medium text-navy">{typeLabel(data.type)}</dd>
                      </div>
                      {data.type === "room" && (
                        <>
                          <div className="flex justify-between gap-4 px-5 py-4">
                            <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                              {t("booking.dates")}
                            </dt>
                            <dd className="text-right text-sm text-navy">
                              {data.checkin} → {data.checkout}
                              {nights > 0 && (
                                <span className="mt-1 block text-xs text-navy/55">
                                  {nights} {nights === 1 ? t("booking.wizard.night_one") : t("booking.wizard.night_other")}
                                </span>
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-4 px-5 py-4">
                            <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                              {t("booking.room_type")}
                            </dt>
                            <dd className="text-right text-sm text-navy">{roomLine()}</dd>
                          </div>
                        </>
                      )}
                      {data.type === "event" && (
                        <div className="flex justify-between gap-4 px-5 py-4">
                          <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                            {t("halls.title")}
                          </dt>
                          <dd className="text-right text-sm text-navy">{hallLabel(String(data.hallType))}</dd>
                        </div>
                      )}
                      <div className="flex justify-between gap-4 px-5 py-4">
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                          {t("booking.guests")}
                        </dt>
                        <dd className="text-right text-navy">{data.guests}</dd>
                      </div>
                      <div className="px-5 py-4">
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                          {t("booking.wizard.review_guest")}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-navy">
                          {data.firstName} {data.lastName}
                          <br />
                          {data.email} · {data.phone}
                          <br />
                          {data.countryOfOrigin} · {data.nationality}
                          <br />
                          <span className="text-navy/60">
                            {t("booking.id_document")}: {data.idDocument}
                          </span>
                          <br />
                          {data.cityOfProvenance}
                        </dd>
                      </div>
                      <div className="px-5 py-4">
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                          {t("booking.stay_purpose")}
                        </dt>
                        <dd className="mt-2 text-sm text-navy">{data.stayPurpose}</dd>
                      </div>
                      <div className="px-5 py-4">
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                          {t("booking.payment_mode")}
                        </dt>
                        <dd className="mt-2 text-sm text-navy">
                          {data.paymentMode === "private" ? t("booking.payment_private") : t("booking.payment_company")}
                          {data.paymentMode === "company" && (
                            <>
                              <br />
                              {data.companyName} — {data.companyContact}
                            </>
                          )}
                        </dd>
                      </div>
                      {data.message.trim() && (
                        <div className="px-5 py-4">
                          <dt className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/45">
                            {t("booking.message")}
                          </dt>
                          <dd className="mt-2 text-sm text-navy/80">{data.message}</dd>
                        </div>
                      )}
                    </dl>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-navy to-navy-light py-4 font-sans text-sm font-bold uppercase tracking-[0.2em] text-cream shadow-lg transition hover:shadow-xl disabled:opacity-50"
                    >
                      {loading ? t("booking.sending") : t("booking.wizard.confirm_send")}
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 px-6 py-3 font-sans text-[11px] font-bold uppercase tracking-widest text-navy transition hover:border-navy/35 disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("booking.wizard.back")}
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 font-sans text-[11px] font-bold uppercase tracking-widest text-cream shadow-lg transition hover:bg-navy-light"
                >
                  {t("booking.wizard.next")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Résumé sticky */}
          <aside className="lg:sticky lg:top-36">
            <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl">
              <div className="bg-gradient-to-br from-navy to-navy-light px-6 py-5 text-cream">
                <div className="flex items-center gap-2 text-gold">
                  <MapPin className="h-4 w-4" />
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest">{t("booking.wizard.summary_title")}</span>
                </div>
                <p className="mt-2 font-serif text-xl">{site.name}</p>
                <p className="mt-1 font-sans text-xs text-cream/65">{site.address}</p>
              </div>
              <div className="space-y-4 p-6 font-sans text-sm text-navy/80">
                <div className="flex justify-between gap-2">
                  <span className="text-navy/50">{t("booking.type")}</span>
                  <span className="font-semibold text-navy">{typeLabel(data.type)}</span>
                </div>
                {data.type === "room" && data.checkin && (
                  <div className="flex justify-between gap-2">
                    <span className="text-navy/50">{t("booking.dates")}</span>
                    <span className="text-right font-medium text-navy">
                      {data.checkin}
                      <br />→ {data.checkout}
                    </span>
                  </div>
                )}
                {data.type === "room" && nights > 0 && (
                  <div className="rounded-xl bg-gold/10 px-3 py-2 text-center text-xs font-bold uppercase tracking-widest text-navy">
                    {nights} {nights === 1 ? t("booking.wizard.night_one") : t("booking.wizard.night_other")}
                  </div>
                )}
                <div className="flex justify-between gap-2">
                  <span className="text-navy/50">{t("booking.guests")}</span>
                  <span className="font-semibold text-navy">{data.guests}</span>
                </div>
                {data.type === "room" && <p className="border-t border-navy/8 pt-3 text-xs text-navy/60">{roomLine()}</p>}
                {data.type === "event" && (
                  <p className="border-t border-navy/8 pt-3 text-xs text-navy/60">{hallLabel(String(data.hallType))}</p>
                )}
                <div className="border-t border-navy/8 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold">{t("booking.wizard.summary_note_title")}</p>
                  <p className="mt-2 text-xs leading-relaxed text-navy/55">{t("booking.wizard.summary_note")}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-navy/10 bg-white/80 p-5 text-center backdrop-blur-sm">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-navy/40">{t("booking.promo_phone_label")}</p>
              <a href={`tel:${site.phonesRaw[0]}`} className="mt-2 block font-serif text-lg text-navy hover:text-gold-muted">
                {site.phones[0]}
              </a>
            </div>
          </aside>
        </div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/45 backdrop-blur-md"
            aria-label={t("booking.close")}
            onClick={() => setSuccess(false)}
          />
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative max-w-md rounded-3xl border border-white/20 bg-white p-10 text-center shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-9 w-9 text-emerald-600" />
            </div>
            <h3 className="font-serif text-2xl text-navy">{t("booking.success_title")}</h3>
            <p className="mt-3 font-sans text-sm text-navy/70">{t("booking.success_body")}</p>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="mt-8 rounded-full bg-navy px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest text-cream"
            >
              {t("booking.close")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
