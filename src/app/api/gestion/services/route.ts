import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, services });
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
    const { icon, title, description, order } = await req.json();

    const service = await prisma.service.create({
      data: {
        icon,
        title,
        description,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, service });
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
    const { id, icon, title, description, order } = await req.json();

    const service = await prisma.service.update({
      where: { id },
      data: {
        icon,
        title,
        description,
        order,
      },
    });

    return NextResponse.json({ success: true, service });
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

    await prisma.service.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
