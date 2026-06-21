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
  "/images/hotel/hotel-1.jpg",
  "/images/hotel/hotel-2.jpg",
  "/images/hotel/hotel-3.jpg",
  "/images/hotel/hotel-4.jpg",
  "/images/hotel/hotel-5.jpg",
  "/images/hotel/hotel-6.jpg",
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
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
];

// PHOTOSHOOT - Photos séances photos espace vert au bord du lac
export const PHOTOSHOOT_IMAGES = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Chambre Deluxe",
    price: 100,
    description: "Spacieuse et luxueuse",
    amenities: ["Balcon privé", "Wi-Fi", "Smart TV", "Minibar", "Salle de bain spacieuse"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Suite VIP",
    price: 150,
    description: "L'excellence du luxe",
    amenities: ["Salon séparé", "Baignoire", "Vue panoramique lac", "Service butler", "Minibar premium"],
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Nyama Choma",
    description: "Viande grillée à la braise servie avec ugali (farine de maïs) et sauce tomate-oignons",
    price: 22,
    category: "Plats Principaux",
    icon: "🥩",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Matoke aux Cacahuètes",
    description: "Bananes vertes écrasées avec sauce riche à la cacahuète et légumes du marché",
    price: 14,
    category: "Plats Principaux",
    icon: "🥜",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Poulet Moembé",
    description: "Poulet tendre mijoté dans une sauce onctueuse à base de feuilles d'épinards et noix de coco",
    price: 16,
    category: "Plats Principaux",
    icon: "🍗",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Chapati Authentique",
    description: "Pain plat traditionnel africain chaud avec beurre et miel",
    price: 6,
    category: "Accompagnements",
    icon: "🥖",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Ugali Maison",
    description: "Farine de maïs bouillie, accompagnement traditionnel parfait pour tous les plats",
    price: 5,
    category: "Accompagnements",
    icon: "🌾",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Ensalada Africana",
    description: "Salade frais avec tomates, concombres, oignons et vinaigrette maison épicée",
    price: 8,
    category: "Entrées",
    icon: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Brochettes de Viande",
    description: "Viande marinée sur brochettes, grillée à la perfection avec sauce ndazi",
    price: 12,
    category: "Entrées",
    icon: "🍢",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
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
    image: "https://img.youtube.com/vi/d7yRJFqAvsw/0.jpg",
    isVideo: true,
    photoCount: 1,
    photos: [
      "https://img.youtube.com/vi/d7yRJFqAvsw/0.jpg",
    ],
    link: "https://www.youtube.com/watch?v=d7yRJFqAvsw",
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
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  },
  photoshoot: {
    title: "Espace Créatif",
    subtitle: "Lumière & Décor",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
  }
};

export const LAKE_KIVU_ACTIVITIES = [
  {
    id: 1,
    name: "Balade en Bateau",
    description: "Découvrez les beautés du lac",
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 2,
    name: "Pêche Traditionnelle",
    description: "Expérience authentique",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 3,
    name: "Coucher de Soleil",
    description: "Moments magiques",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&h=300&q=80",
  },
];
