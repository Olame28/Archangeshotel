/**
 * ✨ IMAGES ARCHANGES HOTEL - Photos professionnelles hôtel de luxe africain ✨
 * 
 * Toutes les images utilisent des IDs Unsplash garantis fonctionnels :
 * - Hôtel de luxe avec vue sur lac/piscine
 * - Chambres modernes et suites élégantes  
 * - Restaurant gastronomique Maman Rica
 * - Salles de réception pour événements
 * - Activités lacustres (Kivu)
 */

/**
 * ✨ IMAGES ARCHANGES HOTEL - Guide de remplacement des photos ✨
 * 
 * Pour remplacer ces images par vos propres photos :
 * 1. Placez vos photos dans public/images/[dossier]/
 * 2. Formats acceptés : JPG, PNG, WebP
 * 3. Taille recommandée : voir GUIDE_COMPLET.md
 * 
 * DOSSIERS :
 * - public/images/hotel/      → Photos carrousel accueil
 * - public/images/gallery/    → Photos galerie (8 images)
 * - public/images/restaurant/ → Photos restaurant
 * - public/images/rooms/      → Photos chambres
 * - public/images/events/     → Photos événements
 */

export const HOTEL_LOGO = "/logo-archanges.png";

// HERO - Photos du carrousel accueil (6 images)
// Dimensions recommandées : 1920 x 1080 px (16:9), < 500 Ko
export const HERO_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
];

// GALERIE - Photos pour la galerie (8 images, grille masonry)
// Dimensions recommandées : 1200 x 800 px (3:2) ou carré, < 300 Ko chaque
export const GALLERY_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
  "/images/gallery/gallery-7.jpg",
  "/images/gallery/gallery-8.jpg",
];

// RESTAURANT - Photos pour l'album restaurant Maman Rica
export const RESTAURANT_IMAGES = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
];

// PHOTOSHOOT - Photos séances photos espace vert au bord du lac
export const PHOTOSHOOT_IMAGES = [
  "/images/gallery/gallery-6.jpg",
];

// SALLES D'ÉVÉNEMENTS - Images des salles de réception
// Placez vos images dans public/images/halls/
// Dimensions recommandées : 1400x900px (16:9) ou 1400x1050px (4:3), < 500 Ko
export const HALLS_IMAGES = [
  "/images/halls/hall-malaika-1.jpg", // Salle Malaika - photo principale
  "/images/halls/hall-arche-1.jpg", // Salle Arche de Noé - photo principale
];

export const RECEPTION_HALLS = [
  {
    id: 1,
    name: "Salle Malaika",
    capacity: 100,
    description: "Réunions & Séminaires",
    images: [
      "/images/halls/hall-malaika-1.jpg",
      "/images/halls/hall-malaika-2.jpg",
      "/images/halls/hall-malaika-3.jpg",
    ], // Ajoutez autant de photos que vous voulez
    video: "/images/halls/hall-malaika-video.mp4", // Optionnel : vidéo de la salle
    features: ["Projecteur", "Insonorisation", "Pause-café", "Configuration flexible"],
  },
  {
    id: 2,
    name: "Salle Arche de Noé",
    capacity: 500,
    description: "Mariages & Grands événements",
    images: [
      "/images/halls/hall-arche-1.jpg",
      "/images/halls/hall-arche-2.jpg",
      "/images/halls/hall-arche-3.jpg",
    ], // Ajoutez autant de photos que vous voulez
    video: "/images/halls/hall-arche-video.mp4", // Optionnel : vidéo de la salle
    features: ["Scène", "Climatisation", "Traiteur", "Sonorisation", "Configuration modulable"],
  },
];

export const ROOMS = [
  {
    id: 1,
    name: "Chambre Standard",
    price: 50,
    description: "Confortable et accueillante",
    amenities: ["Balcon privé", "Wi-Fi", "Smart TV", "Vue sur jardins"],
    image: "/images/gallery/gallery-7.jpg",
  },
  {
    id: 2,
    name: "Chambre Deluxe",
    price: 100,
    description: "Spacieuse et luxueuse",
    amenities: ["Balcon privé", "Wi-Fi", "Smart TV", "Minibar", "Salle de bain spacieuse"],
    image: "/images/gallery/gallery-8.jpg",
  },
  {
    id: 3,
    name: "Suite VIP",
    price: 150,
    description: "L'excellence du luxe",
    amenities: ["Salon séparé", "Baignoire", "Vue panoramique lac", "Service butler", "Minibar premium"],
    image: "/images/gallery/gallery-1.jpg",
  },
];

// MENU RESTAURANT - Plats Africains authentiques
export const RESTAURANT_MENU = [
  {
    id: 1,
    name: "Tilapia Frite Africain",
    description: "Tilapia frais du lac Kivu, frit croustillant, accompagné de légumes grillés et sauce pimentée maison",
    price: 18,
    category: "Plats Principaux",
    icon: "🐟",
    image: "/images/gallery/gallery-1.jpg",
  },
  {
    id: 2,
    name: "Nyama Choma",
    description: "Viande grillée à la braise servie avec ugali (farine de maïs) et sauce tomate-oignons",
    price: 22,
    category: "Plats Principaux",
    icon: "🥩",
    image: "/images/gallery/gallery-2.jpg",
  },
  {
    id: 3,
    name: "Matoke aux Cacahuètes",
    description: "Bananes vertes écrasées avec sauce riche à la cacahuète et légumes du marché",
    price: 14,
    category: "Plats Principaux",
    icon: "🥜",
    image: "/images/gallery/gallery-3.jpg",
  },
  {
    id: 4,
    name: "Poulet Moembé",
    description: "Poulet tendre mijoté dans une sauce onctueuse à base de feuilles d'épinards et noix de coco",
    price: 16,
    category: "Plats Principaux",
    icon: "🍗",
    image: "/images/gallery/gallery-4.jpg",
  },
  {
    id: 5,
    name: "Chapati Authentique",
    description: "Pain plat traditionnel africain chaud avec beurre et miel",
    price: 6,
    category: "Accompagnements",
    icon: "🥖",
    image: "/images/gallery/gallery-5.jpg",
  },
  {
    id: 6,
    name: "Ugali Maison",
    description: "Farine de maïs bouillie, accompagnement traditionnel parfait pour tous les plats",
    price: 5,
    category: "Accompagnements",
    icon: "🌾",
    image: "/images/gallery/gallery-6.jpg",
  },
  {
    id: 7,
    name: "Ensalada Africana",
    description: "Salade frais avec tomates, concombres, oignons et vinaigrette maison épicée",
    price: 8,
    category: "Entrées",
    icon: "🥗",
    image: "/images/gallery/gallery-7.jpg",
  },
  {
    id: 8,
    name: "Brochettes de Viande",
    description: "Viande marinée sur brochettes, grillée à la perfection avec sauce ndazi",
    price: 12,
    category: "Entrées",
    icon: "🍢",
    image: "/images/gallery/gallery-8.jpg",
  },
];

export const SERVICES = [
  {
    id: 1,
    icon: "Users",
    title: "Conciergerie 24/7",
    description: "Équipe disponible jour et nuit pour vos réservations et événements",
  },
  {
    id: 2,
    icon: "Wifi",
    title: "Star Link",
    description: "Connexion WiFi ultra-rapide et gratuite dans tout l'établissement",
  },
  {
    id: 3,
    icon: "Shield",
    title: "Sécurité Totale",
    description: "Sécurité professionnelle 24 heures sur 24",
  },
  {
    id: 4,
    icon: "Car",
    title: "Parking Privé",
    description: "Stationnement sécurisé pour tous les véhicules",
  },
  {
    id: 5,
    icon: "Waves",
    title: "Espace Détente",
    description: "Piscine et jardins avec vue sur le lac",
  },
  {
    id: 6,
    icon: "Zap",
    title: "Service Rapide",
    description: "Check-in et check-out express",
  },
  {
    id: 7,
    icon: "Coffee",
    title: "Petit-Déjeuner",
    description: "Buffet varié : local et international",
  },
  {
    id: 8,
    icon: "MapPin",
    title: "Emplacement Idéal",
    description: "Entre ville et nature, accès direct au lac",
  },
];

export const EVENTS = [
  {
    id: 1,
    title: "Gala de louanges et adorations",
    date: "dimanche 2 mai",
    type: "past",
    icon: "Calendar",
    description: "Concert d'Évangélisation avec l'Évangéliste Eustache DUNIA",
    // Dimensions recommandées : 1200 x 800 px (3:2), < 300 Ko
    image: "/images/gallery/gallery-1.jpg",
    isVideo: false,
    photoCount: 1,
    photos: [
      "/images/gallery/gallery-1.jpg",
    ],
    link: "",
  },
];

export const PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    provider: "Safaricom",
    icon: "Smartphone",
    colors: { from: "#31A24C", to: "#1F7A35" },
    available: true,
    description: "Paiement rapide et sécurisé via M-Pesa Safaricom.",
    apiKey: "https://api.safaricom.co.ke/mpesa",
    documentation: "https://developer.safaricom.co.ke/",
  },
  {
    id: "airtel",
    name: "Airtel Money",
    provider: "Airtel",
    icon: "Phone",
    colors: { from: "#E41C38", to: "#B81428" },
    available: true,
    description: "Réglez votre séjour en toute simplicité avec Airtel Money.",
    apiKey: "https://api.airtelcongo.com/payment",
    documentation: "https://developer.airtelcongo.com/",
  },
  {
    id: "orange",
    name: "Orange Money",
    provider: "Orange",
    icon: "Globe",
    colors: { from: "#FF8000", to: "#E67E00" },
    available: true,
    description: "Service de paiement mobile Orange Money disponible.",
    apiKey: "https://api.orangecongo.com/payment",
    documentation: "https://developer.orangecongo.com/",
  },
  {
    id: "visa",
    name: "Visa Card",
    icon: "CreditCard",
    colors: { from: "#1434CB", to: "#1E90FF" },
    available: true,
    description: "Paiement sécurisé par carte Visa internationale.",
    apiKey: "https://api.stripe.com/v1/charges",
    documentation: "https://stripe.com/docs/api",
  },
  {
    id: "mastercard",
    name: "MasterCard",
    icon: "CreditCard",
    colors: { from: "#EB001B", to: "#FF5F00" },
    available: true,
    description: "Paiement par carte MasterCard avec Stripe.",
    apiKey: "https://api.stripe.com/v1/charges",
    documentation: "https://stripe.com/docs/api",
  },
];

export const RESERVATION_TYPES = [
  {
    id: "room",
    label: "Chambre",
    icon: "BedDouble",
    description: "Réserver une chambre",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: "UtensilsCrossed",
    description: "Réserver une table",
  },
  {
    id: "event",
    label: "Salle d'Événement",
    icon: "Megaphone",
    description: "Réserver une salle",
  },
  {
    id: "photoshoot",
    label: "Séance Photo",
    icon: "Camera",
    description: "Réserver une séance photo",
  },
  {
    id: "excursion",
    label: "Excursion Lac Kivu",
    icon: "Sailboat",
    description: "Réserver une excursion en canon rapide",
  },
];

// ÉTABLISSEMENT - Restaurant + Salles + Espace photo
export const ESTABLISHMENT_CONTENT = {
  restaurant: {
    title: "Maman Rica",
    subtitle: "Gastronomie & Saveurs",
    image: "/images/gallery/gallery-1.jpg",
  },
  photoshoot: {
    title: "Espace Créatif",
    subtitle: "Lumière & Décor",
    image: "/images/gallery/gallery-6.jpg",
  }
};

export const LAKE_KIVU_ACTIVITIES = [
  {
    id: 1,
    name: "Balade en Bateau",
    description: "Découvrez les beautés du lac",
    image: "/images/lake-kivu.jpg",
  },
  {
    id: 2,
    name: "Pêche Traditionnelle",
    description: "Expérience authentique",
    image: "/images/lake-kivu.jpg",
  },
  {
    id: 3,
    name: "Coucher de Soleil",
    description: "Moments magiques",
    image: "/images/lake-kivu.jpg",
  },
];
