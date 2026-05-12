export type PaymentMode = "private" | "company";

export interface ReservationData {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryOfOrigin: string;
  nationality: string;
  idDocument: string;
  cityOfProvenance: string;
  stayPurpose: string;
  paymentMode: PaymentMode;
  companyName: string;
  companyContact: string;
  checkin: string;
  checkout: string;
  guests: number;
  roomType?: string;
  hallType?: string;
  message: string;
  acceptTerms: boolean;
}

export type ValidationErrors = Record<string, string>;

export function emptyReservation(): ReservationData {
  return {
    type: "room",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryOfOrigin: "",
    nationality: "",
    idDocument: "",
    cityOfProvenance: "",
    stayPurpose: "",
    paymentMode: "private",
    companyName: "",
    companyContact: "",
    checkin: "",
    checkout: "",
    guests: 1,
    roomType: "1",
    hallType: "1",
    message: "",
    acceptTerms: false,
  };
}

export const inputClass =
  "w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 text-navy placeholder:text-navy/35 transition focus:border-navy focus:outline-none focus:ring-0";

export const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-widest text-navy/80";
