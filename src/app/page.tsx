import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Establishment } from "@/components/Establishment";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Rooms } from "@/components/Rooms";
import { LakeKivu } from "@/components/LakeKivu";
import { ReservationPromo } from "@/components/ReservationPromo";
import { PaymentSection } from "@/components/PaymentSection";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

/**
 * Page d’accueil — Archanges Hôtel (Sud-Kivu).
 * Ordre : Hero → Établissement (restaurant, salles, espace photo) → Événements → Galerie → Chambres → Lac Kivu (court) → …
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Establishment />
        <Events />
        <Gallery />
        <Rooms />
        <LakeKivu />
        <ReservationPromo />
        <PaymentSection />
        <Services />
      </main>
      <Footer />
    </>
  );
}
