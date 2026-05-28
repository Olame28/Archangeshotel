import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { room: true, hall: true },
    });

    if (!reservation) {
      return NextResponse.json({ success: false, message: "Réservation introuvable" }, { status: 404 });
    }

    if (reservation.status !== "CONFIRMED") {
      return NextResponse.json({ success: false, message: "Cette réservation n'est pas encore confirmée" }, { status: 400 });
    }

    return NextResponse.json({ success: true, reservation });
  } catch (error) {
    console.error("Payment fetch error:", error);
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { paymentMethod, transactionRef } = await req.json();

    const reservation = await prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      return NextResponse.json({ success: false, message: "Réservation introuvable" }, { status: 404 });
    }

    // Update reservation with payment info
    await prisma.reservation.update({
      where: { id },
      data: {
        adminNotes: [
          reservation.adminNotes || "",
          `[PAIEMENT] ${paymentMethod} — Réf : ${transactionRef || "manuelle"} — ${new Date().toISOString()}`,
        ].join("\n"),
      },
    });

    return NextResponse.json({ success: true, message: "Paiement enregistré" });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
