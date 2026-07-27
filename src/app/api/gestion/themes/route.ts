import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGestionAuthenticated, gestionUnauthorized } from "@/lib/gestion-auth";

export async function GET(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const themes = await prisma.theme.findMany({ orderBy: { createdAt: "asc" } });
    return NextResponse.json({ success: true, themes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const body = await req.json();
    const { activate, ...data } = body;
    if (activate) {
      await prisma.theme.updateMany({ data: { active: false } });
    }
    const theme = await prisma.theme.create({
      data: {
        name: data.name,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        accentColor: data.accentColor,
        backgroundColor: data.backgroundColor,
        textColor: data.textColor,
        layoutVariant: data.layoutVariant || "classic",
        fontHeading: data.fontHeading || "Playfair Display",
        fontBody: data.fontBody || "DM Sans",
        headerStyle: data.headerStyle || "transparent",
        heroStyle: data.heroStyle || "carousel",
        cardStyle: data.cardStyle || "rounded",
        sectionSpacing: data.sectionSpacing || "normal",
        animationStyle: data.animationStyle || "smooth",
        borderRadius: data.borderRadius || "24px",
        sectionOrder: data.sectionOrder ? JSON.stringify(data.sectionOrder) : null,
        effects: data.effects ? JSON.stringify(data.effects) : null,
        active: Boolean(activate),
      },
    });
    return NextResponse.json({ success: true, theme });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const body = await req.json();
    const { id, activate, ...data } = body;

    if (activate || data.active) {
      await prisma.theme.updateMany({ where: { id: { not: id } }, data: { active: false } });
    }

    const theme = await prisma.theme.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.primaryColor !== undefined && { primaryColor: data.primaryColor }),
        ...(data.secondaryColor !== undefined && { secondaryColor: data.secondaryColor }),
        ...(data.accentColor !== undefined && { accentColor: data.accentColor }),
        ...(data.backgroundColor !== undefined && { backgroundColor: data.backgroundColor }),
        ...(data.textColor !== undefined && { textColor: data.textColor }),
        ...(data.layoutVariant !== undefined && { layoutVariant: data.layoutVariant }),
        ...(data.fontHeading !== undefined && { fontHeading: data.fontHeading }),
        ...(data.fontBody !== undefined && { fontBody: data.fontBody }),
        ...(data.headerStyle !== undefined && { headerStyle: data.headerStyle }),
        ...(data.heroStyle !== undefined && { heroStyle: data.heroStyle }),
        ...(data.cardStyle !== undefined && { cardStyle: data.cardStyle }),
        ...(data.sectionSpacing !== undefined && { sectionSpacing: data.sectionSpacing }),
        ...(data.animationStyle !== undefined && { animationStyle: data.animationStyle }),
        ...(data.borderRadius !== undefined && { borderRadius: data.borderRadius }),
        ...(data.sectionOrder !== undefined && { sectionOrder: JSON.stringify(data.sectionOrder) }),
        ...(data.effects !== undefined && { effects: JSON.stringify(data.effects) }),
        ...(activate !== undefined || data.active !== undefined ? { active: Boolean(activate ?? data.active) } : {}),
      },
    });
    return NextResponse.json({ success: true, theme });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    await prisma.theme.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
