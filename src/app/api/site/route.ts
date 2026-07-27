import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/site-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : 'Erreur serveur' }, { status: 500 });
  }
}
