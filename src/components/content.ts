/**
 * ✨ COMMENT REMPLACER LES PHOTOS - NOUVEAU SYSTÈME LOCAL ✨
 * 
 * 1. Allez dans le dossier : public/images/[section]/
 * 2. Remplacez les fichiers JPG par vos propres photos
 * 3. Accepte : JPG, PNG, WebP
 * 
 * STRUCTURE :
 * ├── public/images/
 * │   ├── hotel/        → Photos carrousel accueil (hotel-1.jpg, hotel-2.jpg, etc)
 * │   ├── gallery/      → Photos galerie (gallery-1.jpg à gallery-8.jpg)
 * │   ├── restaurant/   → Photos restaurant (restaurant-1.jpg à restaurant-5.jpg)
 * │   ├── rooms/        → Photos chambres (standard.jpg, deluxe.jpg, vip.jpg)
 * │   ├── events/       → Photos événements (event-1.jpg, event-2.jpg, etc)
 * │   └── photos/       → Photos séances photos (photoshoot.jpg)
 */

// HERO - Photos du carrousel accueil (4 images)
export const HERO_IMAGES = [
  "/images/hotel/hotel-1.jpg",
  "/images/hotel/hotel-2.jpg",
];

// GALERIE - Photos pour la galerie (8 images, grille 4x2)
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

// RESTAURANT - Photos pour l'album restaurant
export const RESTAURANT_IMAGES = [
  "/images/restaurant/restaurant-1.jpg",
  "/images/restaurant/restaurant-2.jpg",
  "/images/restaurant/restaurant-3.jpg",
  "/images/restaurant/restaurant-4.jpg",
  "/images/restaurant/restaurant-5.jpg",
];

export const ROOMS = [
  {
    id: 1,
    name: "Chambre Standard",
    price: 50,
    description: "Confortable et accueillante",
    amenities: ["Balcon privé", "Wi-Fi", "Smart TV", "Vue sur jardins"],
    image: "/images/rooms/standard.jpg",
  },
  {
    id: 2,
    name: "Chambre Deluxe",
    price: 100,
    description: "Spacieuse et luxueuse",
    amenities: ["Balcon privé", "Wi-Fi", "Smart TV", "Minibar", "Salle de bain spacieuse"],
    image: "/images/rooms/deluxe.jpg",
  },
  {
    id: 3,
    name: "Suite VIP",
    price: 150,
    description: "L'excellence du luxe",
    amenities: ["Salon séparé", "Baignoire", "Vue panoramique lac", "Service butler", "Minibar premium"],
    image: "/images/rooms/vip.jpg",
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
    title: "Mariage",
    date: "2024",
    type: "past",
    icon: "Heart",
    photoCount: 12,
    image: "/images/events/event-2.jpg",
    photos: [
      "/images/events/event-2.jpg",
      "/images/events/event-2-bis.jpg",
    ],
  },
  {
    id: 3,
    title: "Séminaire Régional",
    date: "2024",
    type: "past",
    icon: "BookOpen",
    photoCount: 8,
    image: "/images/events/event-3.jpg",
    photos: [
      "/images/events/event-3.jpg",
      "/images/events/event-3-bis.jpg",
    ],
  },
  {
    id: 4,
    title: "Shooting Mode Lac",
    date: "2024",
    type: "past",
    icon: "Camera",
    photoCount: 20,
    image: "//images/events/event-4.jpg",
    photos: [
      "/images/events/event-4.jpg",
      "/images/events/event-4-bis.jpg",
    ],
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
];

export const RECEPTION_HALLS = [
  {
    id: 1,
    name: "Malaika Hall",
    capacity: 100,
    type: "Réunions & Séminaires",
    features: ["Projecteur", "Insonorisation", "Pause-café", "Configuration flexible"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Arche de Noé Hall",
    capacity: 500,
    type: "Mariages & Galas",
    features: ["Scène", "Climatisation", "Traiteur", "Sonorisation", "Configuration modulable"],
    image: "https://images.unsplash.com/photo-1519671482677-36207b8f7324?w=400&h=300&fit=crop",
  },
];

export const LAKE_KIVU_ACTIVITIES = [
  {
    id: 1,
    name: "Balade en Bateau",
    description: "Découvrez les beautés du lac",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Pêche Traditionnelle",
    description: "Expérience authentique",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Coucher de Soleil",
    description: "Moments magiques",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
  },
];
