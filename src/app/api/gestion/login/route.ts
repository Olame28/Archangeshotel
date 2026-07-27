import { NextRequest, NextResponse } from "next/server";
import { GESTION_PASSWORD } from "@/lib/gestion-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password === GESTION_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("gestion_session", "active", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false, message: "Mot de passe incorrect" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get("gestion_session");
  return NextResponse.json({ authenticated: session?.value === "active" });
}
