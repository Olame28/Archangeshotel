"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Après navigation client vers `/#id`, assure le scroll vers la section cible. */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
