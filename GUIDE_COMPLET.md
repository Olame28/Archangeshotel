# 📚 Guide Complet - Archanges Hotel Website

> **Pour débutants** : Comment modifier le site et changer les photos sans casser le design

---

## 🗺️ Structure du Projet (L'architecture du site)

```
archangeshotel/
├── 📁 public/                    → Images et fichiers statiques accessibles directement
│   ├── images/                   → 📸 Dossier pour VOS photos (actuellement vide)
│   │   ├── hotel/                → Photos carrousel accueil
│   │   ├── gallery/              → Photos galerie
│   │   ├── restaurant/           → Photos restaurant
│   │   ├── rooms/                → Photos chambres
│   │   ├── events/               → Photos événements
│   │   └── photos/               → Photos séances photo
│   ├── logo-archanges.png        → Logo de l'hôtel
│   └── ...
│
├── 📁 src/                       → Code source du site
│   ├── 📁 app/                   → Pages et routes du site
│   │   ├── page.tsx              → Page d'accueil (assemble tous les composants)
│   │   ├── layout.tsx            → Layout principal (fonts, métadonnées SEO)
│   │   ├── globals.css           → Styles globaux (couleurs, polices)
│   │   └── api/reservation/      → API pour envoyer les réservations par email
│   │       └── route.ts          → Gère l'envoi des formulaires de réservation
│   │
│   ├── 📁 components/            → Blocs réutilisables du site (LEGO 🧱)
│   │   ├── content.ts            → ❌ Ancien fichier (utilise des URLs Unsplash)
│   │   ├── Hero.tsx              → Section héro (carrousel d'images accueil)
│   │   ├── Gallery.tsx           → Section galerie photos (grille 4x2)
│   │   ├── Rooms.tsx             → Section chambres (3 cartes de chambres)
│   │   ├── Establishment.tsx     → Restaurant + Salles + Espace photo
│   │   ├── Events.tsx            → Section événements passés/à venir
│   │   ├── Services.tsx          → Section services (8 icônes)
│   │   ├── LakeKivu.tsx          → Section activités lac Kivu
│   │   ├── BookingForm.tsx       → Formulaire de réservation
│   │   ├── PaymentSection.tsx    → Méthodes de paiement
│   │   ├── Header.tsx            → En-tête avec navigation
│   │   ├── Footer.tsx            → Pied de page
│   │   └── Reveal.tsx            → Animation d'apparition
│   │
│   ├── 📁 data/                  → 📊 Données centralisées (NOUVEAU SYSTÈME)
│   │   └── content.ts            → ❌ Utilise encore les URLs Unsplash
│   │
│   └── 📁 context/               → Gestion globale (langue)
│       └── LanguageContext.tsx   → Gère le français/anglais
│
├── .env.local                    → Variables secrètes (email, API keys)
├── next.config.ts                → Configuration Next.js
└── package.json                  → Liste des dépendances
```

---

## 🎯 Comprendre le flux des images (AVANT → APRÈS)

### 🔴 AVANT (Système actuel avec URLs Unsplash)

```
src/data/content.ts  →  Contient des URLs Unsplash  →  Navigateur charge depuis internet
     ↓
HERO_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945...",  ← URL externe
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4...",
  ...
]
```

**Problèmes** :
- ⚠️ Dépend d'Internet
- ⚠️ Les photos ne sont pas VOTRE hôtel
- ⚠️ Si Unsplash supprime l'image → image cassée

### 🟢 APRÈS (Système local - VOS photos)

```
VOS photos JPG/PNG  →  Dossier public/images/  →  Chemin local "/images/..."  →  Site affiche VOS photos
```

---

## 📸 Guide Complet : Changer les Photos

### 🗂️ Étape 1 : Où mettre vos photos ?

Créez cette structure de dossiers dans `public/images/` :

```
public/images/
├── hotel/
│   ├── hotel-1.jpg     ← Carrousel accueil - Image 1
│   ├── hotel-2.jpg     ← Carrousel accueil - Image 2
│   ├── hotel-3.jpg     ← Carrousel accueil - Image 3
│   └── hotel-4.jpg     ← Carrousel accueil - Image 4
│
├── gallery/
│   ├── gallery-1.jpg   ← Galerie photo 1
│   ├── gallery-2.jpg   ← Galerie photo 2
│   ├── gallery-3.jpg   ← Galerie photo 3
│   ├── gallery-4.jpg   ← Galerie photo 4
│   ├── gallery-5.jpg   ← Galerie photo 5
│   ├── gallery-6.jpg   ← Galerie photo 6
│   ├── gallery-7.jpg   ← Galerie photo 7
│   └── gallery-8.jpg   ← Galerie photo 8
│
├── restaurant/
│   ├── restaurant-1.jpg  ← Restaurant image principale
│   ├── restaurant-2.jpg  ← Menu plat 1
│   ├── restaurant-3.jpg  ← Menu plat 2
│   ├── restaurant-4.jpg  ← Menu plat 3
│   └── restaurant-5.jpg  ← Espace photo
│
├── rooms/
│   ├── standard.jpg    ← Chambre Standard ($50)
│   ├── deluxe.jpg      ← Chambre Deluxe ($100)
│   └── vip.jpg         ← Suite VIP ($150)
│
├── events/
│   ├── event-1.jpg     ← Événement 1 (MINOVA pour Christ)
│   ├── event-2.jpg     ← Événement 2 (Mariage)
│   ├── event-2-bis.jpg ← Événement 2 (photo supplémentaire)
│   ├── event-3.jpg     ← Événement 3 (Séminaire)
│   ├── event-3-bis.jpg ← Événement 3 (photo supplémentaire)
│   ├── event-4.jpg     ← Événement 4 (Shooting)
│   └── event-4-bis.jpg ← Événement 4 (photo supplémentaire)
│
├── photos/
│   └── photoshoot.jpg   ← Photo espace prise de vue
│
└── lake-kivu.jpg      ← Photo section Lac Kivu (portrait)
```

### ✋ Étape 2 : Conditions pour que les photos fonctionnent

#### ✅ FORMATS acceptés
| Format | Extension | ✅ Recommandé ? |
|--------|-----------|----------------|
| **JPEG/JPG** | `.jpg` `.jpeg` | ✅✅✅ **OPTIMAL** - Bon compromis qualité/poids |
| **PNG** | `.png` | ✅✅ Bon pour logos/transparence |
| **WebP** | `.webp` | ✅✅✅ **MODERNE** - Meilleure compression |

#### ❌ FORMATS refusés
| Format | Pourquoi ça ne marche pas |
|--------|---------------------------|
| HEIC/HEIF (iPhone) | Navigateurs web ne les lisent pas nativement |
| RAW | Trop lourd, format pro |
| TIFF | Trop lourd, web incompatible |
| BMP | Trop lourd, obsolète |

#### 📐 TAILLES recommandées (pour ne pas casser le design)

| Section | Dimensions | Poids max | Pourquoi ? |
|---------|------------|-----------|------------|
| **Hero** (carrousel) | **1920 x 1080 px** (16:9) | < 500 Ko | Plein écran, haute qualité |
| **Gallery** | **800 x 800 px** (1:1 carré) | < 200 Ko | Grille carrée, clic pour agrandir |
| **Rooms** | **1200 x 900 px** (4:3) | < 300 Ko | Cartes rectangulaires |
| **Restaurant** | **1200 x 800 px** (3:2) | < 300 Ko | Section split texte/image |
| **Events** | **1200 x 800 px** (3:2) | < 300 Ko | Cartes événements |

#### 🎨 RATIOS d'aspect (très important !)

Le **ratio d'aspect** = proportion largeur/hauteur. Si vous mettez une photo avec le mauvais ratio, elle sera :
- 🟡 Étirée (personnes déformées)
- 🟡 Coupée (parties importantes masquées)
- 🟡 Avec des bords blancs/noirs

**Règle d'or** : Utilisez ces ratios pour chaque section :

```
┌─────────────────────────────────────┐
│         HERO (16:9)                 │
│    1920 x 1080 px                   │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
│    ▓▓▓▓▓ VOTRE PHOTO ▓▓▓▓▓▓▓▓▓▓▓   │
│    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │
└─────────────────────────────────────┘

┌──────────┐
│ GALLERY  │
│ (1:1)    │
│ 800x800  │
│  ▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓  │
└──────────┘

┌──────────────────┐
│ ROOMS (4:3)      │
│ 1200 x 900 px    │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└──────────────────┘
```

### 📝 Étape 3 : Renommer correctement vos fichiers

**Noms de fichiers acceptés** (en minuscules, sans espaces, sans accents) :
```
✅ hotel-1.jpg
✅ hotel_1.jpg
✅ standard-room.jpg
❌ Hotel 1.jpg        (espaces interdits)
❌ hôtel-1.jpg        (accents interdits)
❌ HOTEL-1.JPG        (majuscules déconseillées)
❌ 1.jpg              (pas descriptif)
```

### 🔄 Étape 4 : Modifier les fichiers de configuration

#### 🎯 Fichier principal à modifier : `src/components/content.ts`

Ce fichier contient les listes d'images. Vous devez **remplacer les URLs Unsplash** par les **chemins locaux**.

**AVANT (avec URLs)** :
```typescript
// HERO - Photos du carrousel accueil (4 images)
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=90",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=90",
  ...
];
```

**APRÈS (avec chemins locaux)** :
```typescript
// HERO - Photos du carrousel accueil (4 images)
export const HERO_IMAGES = [
  "/images/hotel/hotel-1.jpg",
  "/images/hotel/hotel-2.jpg",
  "/images/hotel/hotel-3.jpg",
  "/images/hotel/hotel-4.jpg",
];
```

#### 📋 Tableau de correspondance des chemins

| Section | Variable dans content.ts | Chemin local à utiliser |
|---------|---------------------------|------------------------|
| **Hero** | `HERO_IMAGES` | `/images/hotel/hotel-1.jpg` ... |
| **Gallery** | `GALLERY_IMAGES` | `/images/gallery/gallery-1.jpg` ... |
| **Restaurant** | `RESTAURANT_IMAGES` | `/images/restaurant/restaurant-1.jpg` ... |
| **Chambre Standard** | `ROOMS[0].image` | `/images/rooms/standard.jpg` |
| **Chambre Deluxe** | `ROOMS[1].image` | `/images/rooms/deluxe.jpg` |
| **Suite VIP** | `ROOMS[2].image` | `/images/rooms/vip.jpg` |
| **Événement 1** | `EVENTS[0].image` | `/images/events/event-1.jpg` |
| **Événement 2** | `EVENTS[1].image` | `/images/events/event-2.jpg` |
| **Événement 2 photos** | `EVENTS[1].photos[]` | `/images/events/event-2.jpg`, `event-2-bis.jpg` |
| **Lac Kivu** | `LakeKivu.tsx` | `/images/lake-kivu.jpg` |

### 🔧 Étape 5 : Procédure pas à pas (checklist)

#### 🔴 ATTENTION : Sauvegardez d'abord !

```bash
# Avant de commencer, faites une copie de vos fichiers originaux
copy src\components\content.ts src\components\content.ts.backup
```

#### ✅ Checklist de modification

- [ ] **1.** Préparez vos photos (redimensionnez au bon format avec un outil comme https://squoosh.app)
- [ ] **2.** Renommez les fichiers (minuscules, sans espaces)
- [ ] **3.** Créez les dossiers dans `public/images/` si non existants
- [ ] **4.** Copiez vos photos dans les bons dossiers
- [ ] **5.** Ouvrez `src/components/content.ts`
- [ ] **6.** Remplacez les URLs Unsplash par les chemins `/images/...`
- [ ] **7.** Sauvegardez le fichier
- [ ] **8.** Relancez le serveur : `npm run dev`
- [ ] **9.** Vérifiez dans le navigateur que les photos s'affichent

---

## 🔍 Dépannage (Problèmes courants)

### ❌ Problème : "Image not found" ou icône cassée

**Causes possibles** :
1. ❌ Fichier mal placé (vérifiez le chemin exact)
2. ❌ Extension incorrecte (`.jpg` vs `.JPG` vs `.jpeg`)
3. ❌ Faute de frappe dans le nom de fichier

**Solution** :
```
Vérifier que :
✅ Le fichier existe bien dans public/images/hotel/
✅ Le nom correspond EXACTEMENT (sensible à la casse)
✅ L'extension est correcte (.jpg et non .jpeg)
```

### ❌ Problème : Photo étirée ou déformée

**Cause** : Mauvais ratio d'aspect

**Solution** : Recadrez votre photo au bon ratio avant de l'ajouter :
- Hero : 16:9 (paysage large)
- Gallery : 1:1 (carré)
- Rooms : 4:3 (paysage moyen)

### ❌ Problème : Site très lent à charger

**Cause** : Photos trop lourdes

**Solution** : Compressez vos photos :
- Utilisez https://squoosh.app (gratuit)
- Ou https://tinypng.com
- Objectif : < 500 Ko pour hero, < 200 Ko pour gallery

---

## 🎓 Explications techniques simplifiées

### Qu'est-ce que `public/` ?

C'est un dossier spécial dans Next.js. Tout ce que vous mettez dedans est **directement accessible** depuis l'extérieur.

```
public/images/hotel/hotel-1.jpg
         ↓
Devient accessible via :
http://votresite.com/images/hotel/hotel-1.jpg
```

### Qu'est-ce que les composants ?

Imaginez que votre site est comme une maison LEGO :
- Chaque **composant** = une brique LEGO
- `Hero.tsx` = La brique du grand panneau d'entrée
- `Gallery.tsx` = La brique de la galerie photos
- `Rooms.tsx` = La brique des chambres

Le fichier `page.tsx` assemble toutes ces briques dans le bon ordre.

### Qu'est-ce que `content.ts` ?

C'est le **catalogue** qui dit où trouver chaque image. C'est comme une liste d'ingrédients pour une recette.

---

## 🛠️ Outils recommandés

### Pour redimensionner les photos
| Outil | Type | Lien |
|-------|------|------|
| **Squoosh** | Web gratuit | https://squoosh.app |
| **TinyPNG** | Web gratuit | https://tinypng.com |
| **Paint** | Windows (préinstallé) | Recherche "Paint" |

### Pour vérifier le ratio d'aspect
- Cliquez droit sur une image → Propriétés → Détails
- Ou utilisez Squoosh qui affiche les dimensions

---

## 📞 Récapitulatif rapide

### Pour changer UNE photo

1. Préparez votre photo (bon format, bonne taille, < 500 Ko)
2. Renommez-la correctement (ex: `hotel-1.jpg`)
3. Placez-la dans le bon dossier (`public/images/hotel/`)
4. Ouvrez `src/components/content.ts`
5. Modifiez la ligne correspondante :
   ```typescript
   // AVANT
   "/images/hotel/hotel-1.jpg"
   
   // APRÈS (si vous voulez une autre photo)
   "/images/hotel/ma-nouvelle-photo.jpg"
   ```
6. Relancez le serveur et vérifiez

---

**💡 Astuce finale** : Commencez par remplacer UNE seule photo pour tester, puis faites les autres quand ça marche !

**Bonne chance ! 🎉**
