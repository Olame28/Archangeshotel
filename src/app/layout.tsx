import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { GlobalChrome } from "@/components/GlobalChrome";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archangeshotel.com"),
  title: {
    default: "Archanges Hôtel — Luxe au lac Kivu | Sud-Kivu",
    template: "%s | Archanges Hôtel",
  },
  description:
    "Hébergement haut de gamme à Minova, Budondo. Admirez le lac Kivu, excursions, gastronomie. Notre différence, votre référence.",
  openGraph: {
    title: "Archanges Hôtel — Luxe au lac Kivu",
    description:
      "Séjour d'exception au bord du lac Kivu. Réservations, excursions, services premium.",
    url: "https://archangeshotel.com",
    siteName: "Archanges Hôtel",
    locale: "fr_CD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${playfair.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-cream font-sans text-navy pt-24">
        <LanguageProvider>
          {children}
          <GlobalChrome />
        </LanguageProvider>
      </body>
    </html>
  );
}
