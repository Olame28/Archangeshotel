import type { Metadata } from "next";
import { getSiteData } from "@/lib/site-data";
import { SiteProvider } from "@/context/SiteContext";
import { ThemeWrapper } from "@/components/theme/ThemeWrapper";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReservationWizard } from "@/components/reservation/ReservationWizard";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Parcours de réservation — Archanges Hôtel, Minova.",
};

export default async function ReservationPage() {
  const data = await getSiteData();
  return (
    <SiteProvider data={data}>
      <ThemeWrapper>
        <Header />
        <main className="flex-1">
          <ReservationWizard />
        </main>
        <Footer />
      </ThemeWrapper>
    </SiteProvider>
  );
}
