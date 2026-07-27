"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { SiteData } from "@/lib/site-data";
import { themeToCssVars } from "@/lib/theme-config";

type SiteContextValue = SiteData & {
  get: (key: string, fallback?: string) => string;
  cssVars: Record<string, string>;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ data, children }: { data: SiteData; children: ReactNode }) {
  const value = useMemo<SiteContextValue>(() => {
    const cssVars = themeToCssVars(data.theme);
    return {
      ...data,
      cssVars,
      get: (key: string, fallback = "") => data.content[key] ?? fallback,
    };
  }, [data]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteProvider");
  return ctx;
}

export function useSiteDataOptional() {
  return useContext(SiteContext);
}
