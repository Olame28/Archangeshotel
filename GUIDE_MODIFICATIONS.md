# 📸 GUIDE DE MODIFICATION DES IMAGES & CONTENUS

## **1. COMMENT CHANGER LES PHOTOS ?**

### Option A : Utiliser Unsplash (Gratuit)
1. Allez sur **https://unsplash.com**
2. Cherchez une image (ex: "hotel", "restaurant", "room")
3. Cliquez sur l'image → **Download Free**
4. Copiez l'URL du lien
5. Remplacez dans **`src/data/content.ts`**

### Option B : Utiliser votre propre serveur
1. Uploadez l'image sur un serveur (Cloudinary, Vercel, etc.)
2. Copiez l'URL complète
3. Remplacez dans `src/data/content.ts`

---

## **2. FICHIER À MODIFIER : `src/data/content.ts`**

### **HERO (Accueil) - 4 images**
```typescript
export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-XXXXX-1?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-XXXXX-2?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-XXXXX-3?w=1920&h=1080&fit=crop&q=80",
  "https://images.unsplash.com/photo-XXXXX-4?w=1920&h=1080&fit=crop&q=80",
];
```

### **GALERIE - 8 images (grille 4×2)**
```typescript
export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-XXXXX-1?w=600&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-XXXXX-2?w=600&h=600&fit=crop&q=80",
  // ... 6 autres images
];
```

### **RESTAURANT - 5 images (album)**
```typescript
export const RESTAURANT_IMAGES = [
  "https://images.unsplash.com/photo-XXXXX-1?w=600&h=400&fit=crop&q=80",
  // ... 4 autres images
];
```

### **CHAMBRES - 3 images**
```typescript
export const ROOMS = [
  {
    id: 1,
    name: "Chambre Standard",
    price: 50,
    image: "https://images.unsplash.com/photo-XXXXX?w=600&h=400&fit=crop&q=80",
    // ...
  },
  // ... 2 autres chambres
];
```

---

## **3. FORMAT DES URLS UNSPLASH**

Toujours utiliser ce format :
```
https://images.unsplash.com/photo-XXXXX?w=LARGEUR&h=HAUTEUR&fit=crop&q=80
```

**Tailles recommandées :**
- **Hero** : `w=1920&h=1080`
- **Galerie** : `w=600&h=600`
- **Restaurant/Chambres** : `w=600&h=400`

---

## **4. TRADUCTION COMPLÈTE**

✅ **130+ clés de traduction ajoutées** dans `src/context/LanguageContext.tsx`

Les traductions couvrent :
- Navigation
- Hero & CTA
- Restaurant, Salles, Chambres
- Événements & Galerie
- Réservation & Paiements
- Services & Footer

**Ajouter une nouvelle traduction :**
```typescript
// Dans LanguageContext.tsx
"nouvelle_cle": "Texte en français"  // FR
"nouvelle_cle": "Text in English"     // EN
```

Puis utilisez : `const { t } = useLanguage(); t("nouvelle_cle")`

---

## **5. RÉSERVATION DES TYPES**

La réservation peut être pour 4 types :
- 🛏️ **room** → Chambre
- 🍽️ **restaurant** → Restaurant
- 🎪 **event** → Salle d'événement
- 📸 **photoshoot** → Séance photo

---

## **6. PAIEMENTS INTÉGRÉS**

✅ **5 méthodes de paiement configurées :**
1. M-Pesa (Safaricom)
2. Airtel Money
3. Orange Money
4. Visa Card
5. MasterCard

Modifiez dans `src/data/content.ts` → `PAYMENT_METHODS`

---

## **7. LIENS AVEC HEADER STICKY**

Tous les liens fonctionnent grâce à `scroll-mt-24` :
- `#accueil` → Hero
- `#restaurant` → Restaurant
- `#chambres` → Chambres
- `#salles` → Salles réception
- `#evenements` → Événements
- `#galerie` → Galerie
- `#prises-de-vues` → Prise de vues
- `#lac-kivu` → Lac Kivu
- `#reservation` → Réservation
- `#paiement` → Paiements
- `#services` → Services
- `#contact` → Footer/Contact

---

## **8. STRUCTURE DES FICHIERS IMPORTANTS**

```
src/
├── data/
│   └── content.ts          ← MODIFIER ICI POUR LES IMAGES
├── context/
│   └── LanguageContext.tsx ← TRADUCTIONS FR/EN
├── components/
│   ├── Header.tsx          ← Navigation sticky
│   ├── Hero.tsx            ← Carrousel
│   ├── Gallery.tsx         ← Galerie lightbox
│   ├── BookingForm.tsx     ← Réservation 4 types
│   ├── PaymentSection.tsx  ← Paiements
│   └── ... autres sections
└── app/
    ├── layout.tsx          ← Config globale
    └── page.tsx            ← Page d'accueil
```

---

## **RÉSUMÉ : CE QUI EST OPÉRATIONNEL** ✅

| Composant | État | Location |
|-----------|------|----------|
| Header sticky | ✅ | `Header.tsx` |
| Traduction FR/EN | ✅ | `LanguageContext.tsx` |
| Hero changeable | ✅ | `content.ts` + `HERO_IMAGES` |
| Galerie | ✅ | `Gallery.tsx` |
| Réservation 4 types | ✅ | `BookingForm.tsx` |
| Paiements 5 méthodes | ✅ | `PaymentSection.tsx` |
| Tous les liens | ✅ | Navigation complète |
| Logo agrandi | ✅ | `Header.tsx` |
