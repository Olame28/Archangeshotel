import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "active") return NextResponse.json({ success: false }, { status: 401 });

  try {
    const { reservationId, to, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Archanges Hôtel — Direction" <${process.env.SMTP_USER}>`,
      to,
      subject: `RE: ${subject}`,
      html: `
        <div style="font-family: 'Playfair Display', serif; color: #060f1b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1a365d; margin: 0;">Archanges Hôtel</h2>
            <p style="color: #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Notre différence, votre référence</p>
          </div>
          <div style="line-height: 1.6; color: #334155;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #f1f5f9;">
          <div style="color: #64748b; font-size: 13px;">
            <p><strong>Direction Archanges Hôtel</strong><br>
            Minova — Budondo, route Bulenga, Sud-Kivu<br>
            Tél: +243 997 721 582</p>
          </div>
        </div>
      `,
    });

    // Mettre à jour la réservation pour marquer qu'une réponse a été envoyée
    await prisma.reservation.update({
      where: { id: reservationId },
      data: { repliedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reply error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
