import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGestionAuthenticated, gestionUnauthorized } from "@/lib/gestion-auth";

export async function GET(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const category = new URL(req.url).searchParams.get("category");
    const where = category ? { category } : {};
    const content = await prisma.content.findMany({ where, orderBy: [{ category: "asc" }, { key: "asc" }] });
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { key, value, category, label } = await req.json();
    const content = await prisma.content.upsert({
      where: { key },
      update: { value, category, label: label || key },
      create: { key, value, category, label: label || key },
    });
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { id, key, value, category, label } = await req.json();
    if (id) {
      const content = await prisma.content.update({
        where: { id },
        data: { ...(key && { key }), ...(value !== undefined && { value }), ...(category && { category }), ...(label && { label }) },
      });
      return NextResponse.json({ success: true, content });
    }
    if (key) {
      const content = await prisma.content.update({ where: { key }, data: { value, category, label } });
      return NextResponse.json({ success: true, content });
    }
    return NextResponse.json({ success: false, message: "id or key required" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const params = new URL(req.url).searchParams;
    const id = params.get("id");
    const key = params.get("key");
    if (id) {
      await prisma.content.delete({ where: { id } });
    } else if (key) {
      await prisma.content.delete({ where: { key } });
    } else {
      return NextResponse.json({ success: false, message: "id or key required" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
