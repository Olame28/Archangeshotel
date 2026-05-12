import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "active") return NextResponse.json({ success: false }, { status: 401 });

  try {
    const rooms = await prisma.room.findMany({ orderBy: { price: "asc" } });
    const halls = await prisma.hall.findMany({ orderBy: { capacity: "asc" } });
    return NextResponse.json({ success: true, rooms, halls });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "active") return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { type, id, price } = await req.json();
    
    if (type === "room") {
      await prisma.room.update({ where: { id }, data: { price: parseFloat(price) } });
    } else if (type === "hall") {
      await prisma.hall.update({ where: { id }, data: { price: parseFloat(price) } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
