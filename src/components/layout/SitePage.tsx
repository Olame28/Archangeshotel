"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Establishment } from "@/components/Establishment";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Rooms } from "@/components/Rooms";
import { LakeKivu } from "@/components/LakeKivu";
import { Excursion } from "@/components/Excursion";
import { ReservationPromo } from "@/components/ReservationPromo";
import { PaymentSection } from "@/components/PaymentSection";
import { Services } from "@/components/Services";
import { ThemeWrapper } from "@/components/theme/ThemeWrapper";
import { useSiteData } from "@/context/SiteContext";

const SECTIONS: Record<string, React.ComponentType> = {
  hero: Hero,
  establishment: Establishment,
  events: Events,
  gallery: Gallery,
  rooms: Rooms,
  lake: LakeKivu,
  excursion: Excursion,
  reservation: ReservationPromo,
  payment: PaymentSection,
  services: Services,
};

export function SitePage() {
  const { theme } = useSiteData();
  const order = theme.sectionOrder?.length ? theme.sectionOrder : Object.keys(SECTIONS);

  return (
    <ThemeWrapper>
      <Header />
      <main className="flex-1">
        {order.map((id) => {
          const Component = SECTIONS[id];
          if (!Component) return null;
          return <Component key={id} />;
        })}
      </main>
      <Footer />
    </ThemeWrapper>
  );
}
