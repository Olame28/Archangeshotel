import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        room: true,
        hall: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const updated = await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "active") {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ success: false, message: "ID requis" }, { status: 400 });
    }

    await prisma.reservation.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
