import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReservationWizard } from "@/components/reservation/ReservationWizard";

export const metadata: Metadata = {
  title: "Réservation",
  description:
    "Parcours de réservation — Archanges Hôtel, Minova. Chambres, restaurant, salles Malaika & Arche de Noé, séances photo.",
};

export default function ReservationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ReservationWizard />
      </main>
      <Footer />
    </>
  );
}
