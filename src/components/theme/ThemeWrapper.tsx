"use client";

import { useEffect } from "react";
import { useSiteData } from "@/context/SiteContext";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, cssVars } = useSiteData();

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.dataset.theme = theme.layoutVariant;
    document.body.dataset.hero = theme.heroStyle;
    document.body.dataset.header = theme.headerStyle;
    document.body.dataset.card = theme.cardStyle;
    document.body.dataset.spacing = theme.sectionSpacing;
    document.body.dataset.animation = theme.animationStyle;
    document.body.style.background = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    document.body.style.fontFamily = `"${theme.fontBody}", sans-serif`;

    // Load Google Font for theme if different from defaults
    const fontId = `theme-font-${theme.id}`;
    if (!document.getElementById(fontId)) {
      const families = [theme.fontHeading, theme.fontBody].filter(Boolean);
      const unique = [...new Set(families)];
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${unique.map((f) => f.replace(/ /g, "+") + ":wght@400;500;600;700").join("&family=")}&display=swap`;
      document.head.appendChild(link);
    }
  }, [theme, cssVars]);

  return (
    <div
      className={`theme-root theme-${theme.layoutVariant}`}
      style={cssVars as React.CSSProperties}
    >
      {children}
    </div>
  );
}
