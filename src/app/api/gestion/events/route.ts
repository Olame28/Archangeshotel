import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGestionAuthenticated, gestionUnauthorized } from "@/lib/gestion-auth";

export async function GET(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const events = await prisma.event.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { title, description, date, image, link, isVideo, type, photos, featured, order } = await req.json();
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: date ? new Date(date) : null,
        image,
        link,
        isVideo: isVideo || false,
        type: type || "past",
        photos: photos ? JSON.stringify(photos) : null,
        featured: featured || false,
        order: order || 0,
      },
    });
    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { id, title, description, date, image, link, isVideo, type, photos, featured, order } = await req.json();
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: date ? new Date(date) : null,
        image,
        link,
        isVideo,
        type,
        photos: photos ? JSON.stringify(photos) : undefined,
        featured,
        order,
      },
    });
    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
