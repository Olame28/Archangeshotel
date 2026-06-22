import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { GlobalChrome } from "@/components/GlobalChrome";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    default: "Archanges Hôtel Minova — Hôtel de luxe au lac Kivu, Sud-Kivu RDC",
    template: "%s | Archanges Hôtel Minova",
  },
  description:
    "Archanges Hôtel : Hébergement haut de gamme à Minova, Sud-Kivu. Hôtel de luxe au bord du lac Kivu avec chambres, restaurant, événements. Réservez votre séjour.",
  keywords: ["archanges", "archanges hotel", "hotel minova", "lac kivu", "sud kivu", "hotel luxe", "hebergement rdc", "hotel budondo", "archanges minova"],
  openGraph: {
    title: "Archanges Hôtel Minova — Hôtel de luxe au lac Kivu",
    description:
      "Découvrez Archanges Hôtel, l'hôtel de luxe de Minova au bord du lac Kivu. Chambres premium, restaurant gastronomique, événements. Réservation en ligne.",
    url: "https://archangeshotel.com",
    siteName: "Archanges Hôtel Minova",
    locale: "fr_CD",
    type: "website",
    images: [
      {
        url: "https://archangeshotel.com/images/hotel/hotel-1.jpg",
        width: 1920,
        height: 1080,
        alt: "Archanges Hôtel Minova - Vue sur le lac Kivu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archanges Hôtel Minova — Hôtel de luxe au lac Kivu",
    description: "Hébergement haut de gamme à Minova, Sud-Kivu. Réservez votre séjour de luxe au bord du lac Kivu.",
    images: ["https://archangeshotel.com/images/hotel/hotel-1.jpg"],
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
        <SpeedInsights />
      </body>
    </html>
  );
}
