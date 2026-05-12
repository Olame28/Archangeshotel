"use client";

import { HashScroll } from "@/components/HashScroll";
import { StaffMailDock } from "@/components/reservation/StaffMailDock";

/** Dock équipe / Zoho + correction scroll ancres sur tout le site. */
export function GlobalChrome() {
  return (
    <>
      <HashScroll />
      <StaffMailDock />
    </>
  );
}
