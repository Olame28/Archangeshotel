import { prisma } from "@/lib/prisma";
import {
  DEFAULT_THEMES,
  DEFAULT_SECTION_ORDER,
  parseTheme,
  type SiteTheme,
} from "@/lib/theme-config";
import {
  HERO_IMAGES,
  GALLERY_IMAGES,
  RESTAURANT_IMAGES,
  RECEPTION_HALLS,
  ROOMS,
  RESTAURANT_MENU,
  SERVICES,
  EVENTS,
  PAYMENT_METHODS,
} from "@/data/content";

export type SiteRoom = {
  id: number;
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
  amenities: string[];
};

export type SiteHall = {
  id: number;
  name: string;
  capacity: number;
  price: number;
  description: string;
  image: string;
  images: string[];
  video?: string;
  features: string[];
};

export type SiteMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  icon?: string;
  featured: boolean;
  order: number;
};

export type SiteEvent = {
  id: string;
  title: string;
  description: string;
  date?: string;
  image?: string;
  link?: string;
  isVideo: boolean;
  type: string;
  photos: string[];
  featured: boolean;
};

export type SiteImage = {
  id: string;
  url: string;
  category: string;
  alt?: string;
  order: number;
};

export type SiteVideo = {
  id: string;
  title: string;
  url: string;
  category: string;
  thumbnail?: string;
  order: number;
};

export type SiteService = {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
};

export type SitePaymentMethod = {
  id: string;
  name: string;
  provider?: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
  available: boolean;
  description: string;
};

export type SiteData = {
  content: Record<string, string>;
  rooms: SiteRoom[];
  halls: SiteHall[];
  menuItems: SiteMenuItem[];
  events: SiteEvent[];
  images: SiteImage[];
  videos: SiteVideo[];
  services: SiteService[];
  paymentMethods: SitePaymentMethod[];
  theme: SiteTheme;
  heroImages: string[];
  galleryImages: string[];
  restaurantImages: string[];
};

const DEFAULT_CONTENT: Record<string, string> = {
  "site.name": "Archanges Hôtel",
  "site.tagline": "Notre différence, votre référence",
  "site.subtitle": "Hôtel · Minova",
  "site.address": "Minova — Budondo, route Bulenga, Sud-Kivu, République démocratique du Congo",
  "site.phone1": "+243 997721582",
  "site.phone2": "+243 991570543",
  "site.email.contact": "contact@archangeshotel.com",
  "site.email.reservations": "reservations@archangeshotel.com",
  "site.email.direction": "direction@archangeshotel.com",
  "site.social.facebook": "https://www.facebook.com",
  "site.social.instagram": "https://www.instagram.com",
  "site.social.whatsapp": "https://wa.me/243997721582",
  "hero.title": "Hôtel Archanges",
  "hero.tagline": "Notre différence, votre référence",
  "hero.desc": "L'excellence hôtelière au cœur du Sud-Kivu, face au majestueux lac Kivu.",
  "rooms.eyebrow": "Hébergement",
  "rooms.title": "Chambres & Suites",
  "gallery.eyebrow": "Moments Capturés",
  "gallery.title": "Galerie Photos",
  "services.eyebrow": "Services & Prestige",
  "services.title": "Votre Confort Avant Tout",
  "services.desc": "Nous mettons tout en œuvre pour que chaque instant passé à l'Archanges Hôtel soit synonyme de perfection.",
  "restaurant.title": "Maman Rica",
  "restaurant.subtitle": "Gastronomie & Saveurs",
  "restaurant.desc": "Une expérience culinaire authentique au bord du lac Kivu.",
  "restaurant.features": "Cuisine africaine authentique,Produits frais du lac,Vue panoramique,Terrasse extérieure,Service traiteur,Événements privés",
  "menu.title": "Notre Menu Africain",
  "menu.subtitle": "Saveurs authentiques du lac Kivu",
  "photoshoot.title": "Espace Créatif",
  "photoshoot.subtitle": "Lumière & Décor",
  "photoshoot.desc": "Un cadre naturel exceptionnel pour vos séances photo et vidéo.",
  "lake.title": "Le Lac Kivu",
  "lake.desc": "Un joyau naturel au cœur de l'Afrique centrale, offrant des paysages à couper le souffle.",
  "lake.quote": "« Le lac Kivu, entre ciel et eau, invite à la contemplation et à l'évasion. »",
  "excursion.title": "Excursion en Canon Rapide",
  "excursion.desc": "Vivez une aventure inoubliable sur les eaux cristallines du lac Kivu.",
  "excursion.features": "Balade guidée sur le lac,Observation des îles,Coucher de soleil magique,Sécurité garantie",
  "footer.desc": "Archanges Hôtel — votre destination de luxe au bord du lac Kivu, Minova, Sud-Kivu.",
  "booking.promo_title": "Réservez votre séjour",
  "booking.promo_desc": "Profitez de nos offres exclusives et vivez une expérience inoubliable.",
};

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split(",").map((s) => s.trim()).filter(Boolean);
  }
}

export async function seedDatabaseIfEmpty(): Promise<boolean> {
  const [contentCount, roomCount, themeCount] = await Promise.all([
    prisma.content.count(),
    prisma.room.count(),
    prisma.theme.count(),
  ]);

  if (contentCount > 0 && roomCount > 0 && themeCount > 0) return false;

  // Content
  if (contentCount === 0) {
    await prisma.content.createMany({
      data: Object.entries(DEFAULT_CONTENT).map(([key, value]) => ({
        key,
        value,
        category: key.split(".")[0],
        label: key,
      })),
    });
  }

  // Rooms
  if (roomCount === 0) {
    for (const [i, room] of ROOMS.entries()) {
      await prisma.room.create({
        data: {
          name: room.name,
          type: i === 0 ? "standard" : i === 1 ? "deluxe" : "vip",
          price: room.price,
          description: room.description,
          image: room.image,
          amenities: room.amenities.join(", "),
          order: i,
        },
      });
    }
  }

  // Halls
  const hallCount = await prisma.hall.count();
  if (hallCount === 0) {
    for (const [i, hall] of RECEPTION_HALLS.entries()) {
      await prisma.hall.create({
        data: {
          name: hall.name,
          capacity: hall.capacity,
          price: 0,
          description: hall.description,
          image: hall.images[0],
          images: JSON.stringify(hall.images),
          video: hall.video || null,
          features: hall.features.join(", "),
          order: i,
        },
      });
    }
  }

  // Menu
  const menuCount = await prisma.menuItem.count();
  if (menuCount === 0) {
    for (const [i, item] of RESTAURANT_MENU.entries()) {
      const catMap: Record<string, string> = {
        "Plats Principaux": "main",
        Accompagnements: "side",
        Entrées: "starter",
      };
      await prisma.menuItem.create({
        data: {
          name: item.name,
          description: item.description,
          price: item.price,
          category: catMap[item.category] || "main",
          image: item.image,
          icon: item.icon,
          featured: false,
          order: i,
        },
      });
    }
  }

  // Events
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    for (const [i, event] of EVENTS.entries()) {
      await prisma.event.create({
        data: {
          title: event.title,
          description: event.description,
          date: event.date ? new Date() : null,
          image: event.image,
          link: event.link || null,
          isVideo: event.isVideo || false,
          type: event.type || "past",
          photos: JSON.stringify(event.photos || []),
          featured: true,
          order: i,
        },
      });
    }
  }

  // Images
  const imageCount = await prisma.image.count();
  if (imageCount === 0) {
    const imageData: { filename: string; url: string; category: string; alt: string; order: number }[] = [];
    HERO_IMAGES.forEach((url, i) =>
      imageData.push({ filename: `hero-${i}`, url, category: "hero", alt: `Hero ${i + 1}`, order: i })
    );
    GALLERY_IMAGES.forEach((url, i) =>
      imageData.push({ filename: `gallery-${i}`, url, category: "gallery", alt: `Galerie ${i + 1}`, order: i })
    );
    RESTAURANT_IMAGES.forEach((url, i) =>
      imageData.push({ filename: `restaurant-${i}`, url, category: "restaurant", alt: `Restaurant ${i + 1}`, order: i })
    );
    imageData.push({ filename: "lake-kivu", url: "/images/lake-kivu.jpg", category: "lake", alt: "Lac Kivu", order: 0 });
    imageData.push({ filename: "excursion", url: "/images/canon-rapide.jpg", category: "excursion", alt: "Canon rapide", order: 0 });
    await prisma.image.createMany({ data: imageData });
  }

  // Services
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    for (const [i, s] of SERVICES.entries()) {
      await prisma.service.create({
        data: { icon: s.icon, title: s.title, description: s.description, order: i },
      });
    }
  }

  // Payment methods
  const paymentCount = await prisma.paymentMethod.count();
  if (paymentCount === 0) {
    await prisma.paymentMethod.createMany({
      data: PAYMENT_METHODS.map((p, i) => ({
        id: p.id,
        name: p.name,
        provider: p.provider || null,
        icon: p.icon,
        colorFrom: p.colors.from,
        colorTo: p.colors.to,
        available: p.available,
        description: p.description,
        order: i,
      })),
    });
  }

  // Themes
  if (themeCount === 0) {
    for (const [i, t] of DEFAULT_THEMES.entries()) {
      await prisma.theme.create({
        data: {
          name: t.name,
          primaryColor: t.primaryColor,
          secondaryColor: t.secondaryColor,
          accentColor: t.accentColor,
          backgroundColor: t.backgroundColor,
          textColor: t.textColor,
          layoutVariant: t.layoutVariant,
          fontHeading: t.fontHeading,
          fontBody: t.fontBody,
          headerStyle: t.headerStyle,
          heroStyle: t.heroStyle,
          cardStyle: t.cardStyle,
          sectionSpacing: t.sectionSpacing,
          animationStyle: t.animationStyle,
          borderRadius: t.borderRadius,
          sectionOrder: JSON.stringify(t.sectionOrder),
          effects: JSON.stringify(t.effects),
          active: i === 0,
        },
      });
    }
  }

  return true;
}

export async function getSiteData(): Promise<SiteData> {
  await seedDatabaseIfEmpty();

  const [
    contentRows,
    rooms,
    halls,
    menuItems,
    events,
    images,
    videos,
    services,
    paymentMethods,
    themes,
  ] = await Promise.all([
    prisma.content.findMany(),
    prisma.room.findMany({ orderBy: { order: "asc" } }),
    prisma.hall.findMany({ orderBy: { order: "asc" } }),
    prisma.menuItem.findMany({ orderBy: { order: "asc" } }),
    prisma.event.findMany({ orderBy: { order: "asc" } }),
    prisma.image.findMany({ orderBy: { order: "asc" } }),
    prisma.video.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.paymentMethod.findMany({ orderBy: { order: "asc" } }),
    prisma.theme.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const content: Record<string, string> = { ...DEFAULT_CONTENT };
  for (const row of contentRows) {
    content[row.key] = row.value;
  }

  const activeThemeRaw = themes.find((t) => t.active) || themes[0];
  const theme = activeThemeRaw
    ? parseTheme(activeThemeRaw as unknown as Record<string, unknown>)
    : parseTheme({ ...DEFAULT_THEMES[0], id: "default", active: true });

  const heroImages =
    images.filter((i) => i.category === "hero").map((i) => i.url).length > 0
      ? images.filter((i) => i.category === "hero").map((i) => i.url)
      : HERO_IMAGES;

  const galleryImages =
    images.filter((i) => i.category === "gallery").map((i) => i.url).length > 0
      ? images.filter((i) => i.category === "gallery").map((i) => i.url)
      : GALLERY_IMAGES;

  const restaurantImages =
    images.filter((i) => i.category === "restaurant").map((i) => i.url).length > 0
      ? images.filter((i) => i.category === "restaurant").map((i) => i.url)
      : RESTAURANT_IMAGES;

  return {
    content,
    rooms: rooms.map((r) => ({
      id: r.id,
      name: r.name,
      type: r.type,
      price: r.price,
      description: r.description || "",
      image: r.image || "",
      amenities: r.amenities ? r.amenities.split(",").map((a) => a.trim()) : [],
    })),
    halls: halls.map((h) => ({
      id: h.id,
      name: h.name,
      capacity: h.capacity,
      price: h.price,
      description: h.description || "",
      image: h.image || "",
      images: parseJsonArray(h.images).length > 0 ? parseJsonArray(h.images) : h.image ? [h.image] : [],
      video: h.video || undefined,
      features: h.features ? h.features.split(",").map((f) => f.trim()) : [],
    })),
    menuItems: menuItems.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description || "",
      price: m.price,
      category: m.category,
      image: m.image || undefined,
      icon: m.icon || undefined,
      featured: m.featured,
      order: m.order,
    })),
    events: events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description || "",
      date: e.date?.toISOString(),
      image: e.image || undefined,
      link: e.link || undefined,
      isVideo: e.isVideo,
      type: e.type,
      photos: parseJsonArray(e.photos),
      featured: e.featured,
    })),
    images: images.map((i) => ({
      id: i.id,
      url: i.url,
      category: i.category,
      alt: i.alt || undefined,
      order: i.order,
    })),
    videos: videos.map((v) => ({
      id: v.id,
      title: v.title,
      url: v.url,
      category: v.category,
      thumbnail: v.thumbnail || undefined,
      order: v.order,
    })),
    services: services.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      description: s.description,
      order: s.order,
    })),
    paymentMethods: paymentMethods.map((p) => ({
      id: p.id,
      name: p.name,
      provider: p.provider || undefined,
      icon: p.icon,
      colorFrom: p.colorFrom,
      colorTo: p.colorTo,
      available: p.available,
      description: p.description,
    })),
    theme,
    heroImages,
    galleryImages,
    restaurantImages,
  };
}

export function getContentValue(content: Record<string, string>, key: string, fallback = ""): string {
  return content[key] ?? fallback;
}

export { DEFAULT_SECTION_ORDER };
