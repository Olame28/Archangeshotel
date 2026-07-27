import { NextRequest } from "next/server";

export function isGestionAuthenticated(req: NextRequest): boolean {
  return req.cookies.get("gestion_session")?.value === "active";
}

export function gestionUnauthorized() {
  return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

export const GESTION_PASSWORD = process.env.GESTION_PASSWORD || process.env.ADMIN_PASSWORD || "archanges2026";
