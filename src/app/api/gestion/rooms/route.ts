import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isGestionAuthenticated, gestionUnauthorized } from "@/lib/gestion-auth";

export async function GET(req: NextRequest) {
  if (!isGestionAuthenticated(req)) return gestionUnauthorized();

  try {
    const rooms = await prisma.room.findMany({
      orderBy: { price: "asc" },
    });

    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, type, price, description, image, amenities } = await req.json();

    const room = await prisma.room.create({
      data: {
        name,
        type,
        price,
        description,
        image,
        amenities,
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, name, type, price, description, image, amenities } = await req.json();

    const room = await prisma.room.update({
      where: { id },
      data: {
        name,
        type,
        price,
        description,
        image,
        amenities,
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }

    await prisma.room.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
