import type { ReservationData, ValidationErrors } from "./reservationTypes";

type TFn = (key: string) => string;

export function validateStepStay(data: ReservationData, t: TFn): ValidationErrors {
  const e: ValidationErrors = {};
  if (!data.stayPurpose.trim() || data.stayPurpose.trim().length < 3) {
    e.stayPurpose = t("booking.error_required");
  }
  if (data.type === "room") {
    if (!data.checkin) e.checkin = t("booking.error_required");
    if (!data.checkout) e.checkout = t("booking.error_required");
    if (data.checkin && data.checkout) {
      const checkIn = new Date(data.checkin);
      const checkOut = new Date(data.checkout);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (checkIn < today) e.checkin = t("booking.error_dates");
      if (checkOut <= checkIn) e.checkout = t("booking.error_checkout");
    }
  }
  if (!Number.isFinite(data.guests) || data.guests < 1) e.guests = t("booking.error_required");
  return e;
}

export function validateStepGuest(data: ReservationData, t: TFn): ValidationErrors {
  const e: ValidationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{9,}$/;

  if (!data.firstName.trim()) e.firstName = t("booking.error_required");
  if (!data.lastName.trim()) e.lastName = t("booking.error_required");
  if (!emailRegex.test(data.email)) e.email = t("booking.error_email");
  if (!phoneRegex.test(data.phone.replace(/\D/g, ""))) e.phone = t("booking.error_phone");
  if (!data.countryOfOrigin.trim()) e.countryOfOrigin = t("booking.error_required");
  if (!data.nationality.trim()) e.nationality = t("booking.error_required");
  if (!data.idDocument.trim() || data.idDocument.trim().length < 4) e.idDocument = t("booking.error_required");
  if (!data.cityOfProvenance.trim()) e.cityOfProvenance = t("booking.error_required");
  return e;
}

export function validateStepBilling(data: ReservationData, t: TFn): ValidationErrors {
  const e: ValidationErrors = {};
  if (data.paymentMode === "company") {
    if (!data.companyName.trim()) e.companyName = t("booking.error_required");
    if (!data.companyContact.trim()) e.companyContact = t("booking.error_required");
  }
  if (!data.acceptTerms) e.acceptTerms = t("booking.error_accept");
  return e;
}

export function validateAll(data: ReservationData, t: TFn): ValidationErrors {
  return {
    ...validateStepStay(data, t),
    ...validateStepGuest(data, t),
    ...validateStepBilling(data, t),
  };
}
