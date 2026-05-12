export const site = {
  name: "Archanges Hôtel",
  shortName: "Archanges",
  tagline: "Notre différence, votre référence",
  url: "https://archangeshotel.com",
  phones: ["+243 997721582", "+243 991570543"],
  phonesRaw: ["+243997721582", "+243991570543"] as const,
  address:
    "Minova — Budondo, route Bulenga, Sud-Kivu, République démocratique du Congo",
  suggestedEmails: [
    { role: "Accueil & informations", address: "contact@archangeshotel.com" },
    { role: "Réservations", address: "reservations@archangeshotel.com" },
    { role: "Direction", address: "direction@archangeshotel.com" },
  ],
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    whatsapp: "https://wa.me/243997721582",
  },
  /** Webmail Zoho (équipe) — connexion hors site */
  zohoMailWebUrl: "https://mail.zoho.com",
  developer: {
    label: "Développé par",
    handle: "dieumedev.28",
  },
} as const;

export const logoPath = "/logo-archanges.png" as const;
