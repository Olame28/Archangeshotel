import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGestionAuthenticated, gestionUnauthorized } from "@/lib/gestion-auth";

export async function GET(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const halls = await prisma.hall.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, halls });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { name, capacity, price, description, image, images, video, features, order } = await req.json();
    const hall = await prisma.hall.create({
      data: {
        name,
        capacity,
        price: price || 0,
        description,
        image,
        images: images ? (Array.isArray(images) ? JSON.stringify(images) : images) : null,
        video,
        features: Array.isArray(features) ? features.join(", ") : features,
        order: order || 0,
      },
    });
    return NextResponse.json({ success: true, hall });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const { id, name, capacity, price, description, image, images, video, features, order } = await req.json();
    const hall = await prisma.hall.update({
      where: { id },
      data: {
        name,
        capacity,
        price,
        description,
        image,
        images: images !== undefined ? (Array.isArray(images) ? JSON.stringify(images) : images) : undefined,
        video,
        features: features !== undefined ? (Array.isArray(features) ? features.join(", ") : features) : undefined,
        order,
      },
    });
    return NextResponse.json({ success: true, hall });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    await prisma.hall.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
