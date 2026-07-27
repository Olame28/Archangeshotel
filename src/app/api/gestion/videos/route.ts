import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where = category ? { category } : {};

    const videos = await prisma.video.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, videos });
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
    const { title, url, category, thumbnail, order } = await req.json();

    const video = await prisma.video.create({
      data: {
        title,
        url,
        category,
        thumbnail,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, video });
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
    const { id, title, url, category, thumbnail, order } = await req.json();

    const video = await prisma.video.update({
      where: { id },
      data: {
        title,
        url,
        category,
        thumbnail,
        order,
      },
    });

    return NextResponse.json({ success: true, video });
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

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
