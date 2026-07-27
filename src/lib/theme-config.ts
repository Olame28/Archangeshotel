export type LayoutVariant =
  | "classic"
  | "modern"
  | "luxury"
  | "minimal"
  | "nature"
  | "african"
  | "glass"
  | "editorial"
  | "bold"
  | "romantic";

export type HeroStyle =
  | "carousel"
  | "fullscreen"
  | "split"
  | "minimal"
  | "cinematic"
  | "glass"
  | "editorial"
  | "bold"
  | "nature"
  | "african";

export type HeaderStyle = "transparent" | "solid" | "glass" | "minimal" | "dark";
export type CardStyle = "rounded" | "sharp" | "glass" | "bordered" | "elevated";
export type SectionSpacing = "compact" | "normal" | "spacious";
export type AnimationStyle = "smooth" | "dynamic" | "subtle" | "none";

export type SiteTheme = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  layoutVariant: LayoutVariant;
  fontHeading: string;
  fontBody: string;
  headerStyle: HeaderStyle;
  heroStyle: HeroStyle;
  cardStyle: CardStyle;
  sectionSpacing: SectionSpacing;
  animationStyle: AnimationStyle;
  borderRadius: string;
  sectionOrder: string[];
  effects: Record<string, unknown>;
  active: boolean;
};

export const DEFAULT_SECTION_ORDER = [
  "hero",
  "establishment",
  "events",
  "gallery",
  "rooms",
  "lake",
  "excursion",
  "reservation",
  "payment",
  "services",
];

export const DEFAULT_THEMES: Omit<SiteTheme, "id" | "active">[] = [
  {
    name: "Or Élégant",
    primaryColor: "#D4AF37",
    secondaryColor: "#060f1b",
    accentColor: "#e4eaf0",
    backgroundColor: "#e4eaf0",
    textColor: "#060f1b",
    layoutVariant: "classic",
    fontHeading: "Playfair Display",
    fontBody: "DM Sans",
    headerStyle: "transparent",
    heroStyle: "carousel",
    cardStyle: "rounded",
    sectionSpacing: "normal",
    animationStyle: "smooth",
    borderRadius: "24px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Bleu Royal",
    primaryColor: "#1e3a8a",
    secondaryColor: "#0f172a",
    accentColor: "#60a5fa",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    layoutVariant: "modern",
    fontHeading: "Inter",
    fontBody: "Inter",
    headerStyle: "solid",
    heroStyle: "split",
    cardStyle: "sharp",
    sectionSpacing: "compact",
    animationStyle: "dynamic",
    borderRadius: "8px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Vert Forêt",
    primaryColor: "#166534",
    secondaryColor: "#14532d",
    accentColor: "#4ade80",
    backgroundColor: "#f0fdf4",
    textColor: "#14532d",
    layoutVariant: "nature",
    fontHeading: "Merriweather",
    fontBody: "Source Sans 3",
    headerStyle: "glass",
    heroStyle: "nature",
    cardStyle: "rounded",
    sectionSpacing: "spacious",
    animationStyle: "subtle",
    borderRadius: "32px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: true },
  },
  {
    name: "Rouge Luxe",
    primaryColor: "#991b1b",
    secondaryColor: "#450a0a",
    accentColor: "#f87171",
    backgroundColor: "#fef2f2",
    textColor: "#450a0a",
    layoutVariant: "luxury",
    fontHeading: "Cormorant Garamond",
    fontBody: "Lato",
    headerStyle: "dark",
    heroStyle: "fullscreen",
    cardStyle: "elevated",
    sectionSpacing: "spacious",
    animationStyle: "smooth",
    borderRadius: "4px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: true, patterns: false },
  },
  {
    name: "Violet Mystique",
    primaryColor: "#7c3aed",
    secondaryColor: "#4c1d95",
    accentColor: "#a78bfa",
    backgroundColor: "#faf5ff",
    textColor: "#4c1d95",
    layoutVariant: "editorial",
    fontHeading: "Libre Baskerville",
    fontBody: "Work Sans",
    headerStyle: "minimal",
    heroStyle: "editorial",
    cardStyle: "bordered",
    sectionSpacing: "normal",
    animationStyle: "subtle",
    borderRadius: "0px",
    sectionOrder: ["hero", "gallery", "rooms", "establishment", "events", "lake", "excursion", "services", "reservation", "payment"],
    effects: { grain: false, patterns: false },
  },
  {
    name: "Rose Élégant",
    primaryColor: "#be185d",
    secondaryColor: "#831843",
    accentColor: "#f472b6",
    backgroundColor: "#fdf2f8",
    textColor: "#831843",
    layoutVariant: "romantic",
    fontHeading: "Playfair Display",
    fontBody: "Nunito",
    headerStyle: "glass",
    heroStyle: "glass",
    cardStyle: "glass",
    sectionSpacing: "spacious",
    animationStyle: "smooth",
    borderRadius: "40px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Orange Chaleur",
    primaryColor: "#ea580c",
    secondaryColor: "#7c2d12",
    accentColor: "#fb923c",
    backgroundColor: "#fff7ed",
    textColor: "#7c2d12",
    layoutVariant: "bold",
    fontHeading: "Oswald",
    fontBody: "Roboto",
    headerStyle: "solid",
    heroStyle: "bold",
    cardStyle: "sharp",
    sectionSpacing: "compact",
    animationStyle: "dynamic",
    borderRadius: "12px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Turquoise Calme",
    primaryColor: "#0d9488",
    secondaryColor: "#134e4a",
    accentColor: "#2dd4bf",
    backgroundColor: "#f0fdfa",
    textColor: "#134e4a",
    layoutVariant: "glass",
    fontHeading: "Poppins",
    fontBody: "Poppins",
    headerStyle: "glass",
    heroStyle: "glass",
    cardStyle: "glass",
    sectionSpacing: "normal",
    animationStyle: "smooth",
    borderRadius: "28px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Gris Moderne",
    primaryColor: "#475569",
    secondaryColor: "#1e293b",
    accentColor: "#94a3b8",
    backgroundColor: "#f8fafc",
    textColor: "#1e293b",
    layoutVariant: "minimal",
    fontHeading: "Inter",
    fontBody: "Inter",
    headerStyle: "minimal",
    heroStyle: "minimal",
    cardStyle: "bordered",
    sectionSpacing: "compact",
    animationStyle: "none",
    borderRadius: "0px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: false, patterns: false },
  },
  {
    name: "Bronze Africain",
    primaryColor: "#b45309",
    secondaryColor: "#451a03",
    accentColor: "#fbbf24",
    backgroundColor: "#fffbeb",
    textColor: "#451a03",
    layoutVariant: "african",
    fontHeading: "Bitter",
    fontBody: "Open Sans",
    headerStyle: "dark",
    heroStyle: "african",
    cardStyle: "elevated",
    sectionSpacing: "normal",
    animationStyle: "dynamic",
    borderRadius: "16px",
    sectionOrder: DEFAULT_SECTION_ORDER,
    effects: { grain: true, patterns: true },
  },
];

export function parseTheme(raw: Record<string, unknown>): SiteTheme {
  let sectionOrder = DEFAULT_SECTION_ORDER;
  if (typeof raw.sectionOrder === "string" && raw.sectionOrder) {
    try {
      sectionOrder = JSON.parse(raw.sectionOrder);
    } catch {
      sectionOrder = DEFAULT_SECTION_ORDER;
    }
  }
  let effects: Record<string, unknown> = {};
  if (typeof raw.effects === "string" && raw.effects) {
    try {
      effects = JSON.parse(raw.effects);
    } catch {
      effects = {};
    }
  }
  return {
    id: String(raw.id),
    name: String(raw.name),
    primaryColor: String(raw.primaryColor),
    secondaryColor: String(raw.secondaryColor),
    accentColor: String(raw.accentColor),
    backgroundColor: String(raw.backgroundColor),
    textColor: String(raw.textColor),
    layoutVariant: (raw.layoutVariant as LayoutVariant) || "classic",
    fontHeading: String(raw.fontHeading || "Playfair Display"),
    fontBody: String(raw.fontBody || "DM Sans"),
    headerStyle: (raw.headerStyle as HeaderStyle) || "transparent",
    heroStyle: (raw.heroStyle as HeroStyle) || "carousel",
    cardStyle: (raw.cardStyle as CardStyle) || "rounded",
    sectionSpacing: (raw.sectionSpacing as SectionSpacing) || "normal",
    animationStyle: (raw.animationStyle as AnimationStyle) || "smooth",
    borderRadius: String(raw.borderRadius || "24px"),
    sectionOrder,
    effects,
    active: Boolean(raw.active),
  };
}

export function themeToCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--theme-primary": theme.primaryColor,
    "--theme-secondary": theme.secondaryColor,
    "--theme-accent": theme.accentColor,
    "--theme-bg": theme.backgroundColor,
    "--theme-text": theme.textColor,
    "--theme-radius": theme.borderRadius,
    "--gold": theme.primaryColor,
    "--navy": theme.secondaryColor,
    "--cream": theme.backgroundColor,
    "--cream-dark": theme.accentColor,
    "--background": theme.backgroundColor,
    "--foreground": theme.textColor,
    "--font-heading": `"${theme.fontHeading}", serif`,
    "--font-body": `"${theme.fontBody}", sans-serif`,
  };
}
