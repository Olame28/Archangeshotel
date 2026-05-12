import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // Mot de passe simple pour l'administration (à changer dans .env idéalement)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "archanges2026";

  if (password === ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });
    
    // On définit un cookie simple pour la session (en prod, utilisez un vrai JWT)
    response.cookies.set("admin_session", "active", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });
    
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}

export async function GET() {
  return NextResponse.json({ authenticated: false });
}
