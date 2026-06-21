import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RECEPTION_HALLS, ROOMS } from "@/data/content";
import { prisma } from "@/lib/prisma";

function escapeHtml(s: string | undefined | null): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function roomLabelById(id: string | undefined): string {
  const n = parseInt(String(id), 10);
  const room = ROOMS.find((r) => r.id === n);
  return room ? `${room.name} ($${room.price}/nuit)` : String(id ?? "");
}

function hallLabelById(id: string | undefined): string {
  const n = parseInt(String(id), 10);
  const hall = RECEPTION_HALLS.find((h) => h.id === n);
  return hall ? `${hall.name} (${hall.capacity} places)` : String(id ?? "");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomType = searchParams.get("roomType");
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");

  if (!roomType || !checkin || !checkout) {
    return NextResponse.json({ available: true }); // Fallback
  }

  const roomId = parseInt(roomType, 10);
  const start = new Date(checkin);
  const end = new Date(checkout);

  const conflicts = await prisma.reservation.findMany({
    where: {
      type: "room",
      roomId,
      status: "CONFIRMED",
      OR: [
        {
          checkin: { lt: end },
          checkout: { gt: start },
        },
      ],
    },
  });

  return NextResponse.json({ available: conflicts.length === 0 });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      type,
      fullname,
      firstName,
      lastName,
      email,
      phone,
      countryOfOrigin,
      nationality,
      idDocument,
      cityOfProvenance,
      stayPurpose,
      paymentMode,
      companyName,
      companyContact,
      checkin,
      checkout,
      guests,
      roomType,
      hallType,
      message,
      acceptTerms,
      lang,
    } = data;

    if (!acceptTerms) {
      return NextResponse.json(
        { success: false, message: "Conditions non acceptées" },
        { status: 400 }
      );
    }

    const plainName =
      String(fullname?.trim() || `${String(firstName ?? "").trim()} ${String(lastName ?? "").trim()}`.trim()) ||
      "";
    const displayName = escapeHtml(plainName);
    if (!plainName || !email || !phone) {
      return NextResponse.json({ success: false, message: "Champs requis manquants" }, { status: 400 });
    }

    // Sauvegarde en base de données
    const reservation = await prisma.reservation.create({
      data: {
        type,
        firstName: firstName || plainName.split(" ")[0] || "",
        lastName: lastName || plainName.split(" ").slice(1).join(" ") || "",
        email,
        phone,
        countryOfOrigin,
        nationality,
        idDocument,
        cityOfProvenance,
        stayPurpose,
        paymentMode,
        companyName,
        companyContact,
        checkin: checkin ? new Date(checkin) : new Date(),
        checkout: checkout ? new Date(checkout) : new Date(),
        guests: parseInt(String(guests || 1), 10),
        roomId: type === "room" ? parseInt(String(roomType), 10) : null,
        hallId: type === "event" ? parseInt(String(hallType), 10) : null,
        message,
        lang,
        status: "PENDING",
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const typeLabels: Record<string, string> = {
      room: "Chambre",
      restaurant: "Restaurant",
      event: "Salle d'événement",
      photoshoot: "Séance photo",
      excursion: "Excursion Lac Kivu",
    };

    const paymentLabels: Record<string, string> = {
      private: "Particulier (paiement privé)",
      company: "Entreprise (partenariat / convention)",
    };

    const e = escapeHtml;
    const roomBlock =
      type === "room"
        ? `
      <p><strong>Date d'arrivée:</strong> ${e(checkin)}</p>
      <p><strong>Date de départ:</strong> ${e(checkout)}</p>
      <p><strong>Type de chambre:</strong> ${e(roomLabelById(roomType))}</p>
    `
        : "";
    const hallBlock =
      type === "event"
        ? `
      <p><strong>Salle:</strong> ${e(hallLabelById(hallType))}</p>
    `
        : "";

    const companyBlock =
      paymentMode === "company"
        ? `
      <p><strong>Raison sociale:</strong> ${e(companyName)}</p>
      <p><strong>Contact facturation:</strong> ${e(companyContact)}</p>
    `
        : "";

    const emailContent = `
      <h2>Nouvelle demande de réservation — ${e(typeLabels[type] || type)}</h2>
      <p><strong>ID Réservation (DB):</strong> ${reservation.id}</p>
      <p><strong>Nom:</strong> ${displayName}</p>
      <p><strong>E-mail:</strong> ${e(email)}</p>
      <p><strong>Téléphone:</strong> ${e(phone)}</p>
      <p><strong>Pays d'origine:</strong> ${e(countryOfOrigin)}</p>
      <p><strong>Nationalité:</strong> ${e(nationality)}</p>
      <p><strong>N° pièce d'identité / passeport:</strong> ${e(idDocument)}</p>
      <p><strong>Ville de provenance:</strong> ${e(cityOfProvenance)}</p>
      <p><strong>Motif:</strong> ${e(stayPurpose)}</p>
      <p><strong>Modalité de paiement:</strong> ${e(paymentLabels[paymentMode] || paymentMode)}</p>
      ${companyBlock}
      <p><strong>Type de demande:</strong> ${e(typeLabels[type] || type)}</p>
      ${roomBlock}
      ${hallBlock}
      <p><strong>Nombre de personnes:</strong> ${e(String(guests))}</p>
      <p><strong>Message:</strong> ${e(message) || "—"}</p>
      <hr>
      <p><em>Envoyé depuis le site Archanges Hôtel — Enregistré en base de données.</em></p>
    `;

    await transporter.sendMail({
      from: `"Archanges Hôtel" <${process.env.SMTP_USER}>`,
      to: "reservations@archangeshotel.com",
      subject: `Nouvelle réservation — ${typeLabels[type] || type} — ${plainName}`,
      html: emailContent,
      replyTo: email,
    });

    const isEn = lang === "en";
    const clientEmailContent = isEn
      ? `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #060f1b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1a365d; margin: 0;">Archanges Hôtel</h2>
          <p style="color: #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Notre différence, votre référence</p>
        </div>
        <h3 style="color: #1a365d;">Thank you, ${escapeHtml(plainName)}.</h3>
        <p style="line-height: 1.6;">We have received your <strong>${escapeHtml(typeLabels[type] || type)}</strong> request.</p>
        <p style="line-height: 1.6;">Our team will check availability and contact you shortly to confirm your booking and discuss payment options.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Reservation Details</p>
          <p style="margin: 0; font-size: 14px;"><strong>ID:</strong> ${reservation.id}</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Type:</strong> ${escapeHtml(typeLabels[type] || type)}</p>
          ${type === "room" ? `<p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Dates:</strong> ${e(checkin)} → ${e(checkout)}</p>` : ""}
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Guests:</strong> ${guests}</p>
        </div>
        <p style="line-height: 1.6; color: #64748b; font-size: 14px;">
          <strong>Payment Information:</strong><br>
          Once your reservation is confirmed, our team will provide you with payment options including mobile money (M-Pesa, Airtel Money, Orange Money) and bank transfer details.
        </p>
        <hr style="margin: 28px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 13px;">
          <strong>Archanges Hôtel</strong><br>
          Minova — Budondo, route Bulenga, Sud-Kivu, DRC<br>
          Tel: +243 997 721 582 / +243 991 570 543<br>
          Email: reservations@archangeshotel.com
        </p>
      </div>
    `
      : `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #060f1b;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1a365d; margin: 0;">Archanges Hôtel</h2>
          <p style="color: #c5a059; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Notre différence, votre référence</p>
        </div>
        <h3 style="color: #1a365d;">Merci, ${escapeHtml(plainName)}.</h3>
        <p style="line-height: 1.6;">Nous avons bien reçu votre demande pour : <strong>${escapeHtml(typeLabels[type] || type)}</strong>.</p>
        <p style="line-height: 1.6;">Notre équipe vérifie la disponibilité et vous recontacte rapidement pour confirmer votre réservation et discuter des options de paiement.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">Détails de la réservation</p>
          <p style="margin: 0; font-size: 14px;"><strong>ID :</strong> ${reservation.id}</p>
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Type :</strong> ${escapeHtml(typeLabels[type] || type)}</p>
          ${type === "room" ? `<p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Dates :</strong> ${e(checkin)} → ${e(checkout)}</p>` : ""}
          <p style="margin: 8px 0 0 0; font-size: 14px;"><strong>Personnes :</strong> ${guests}</p>
        </div>
        <p style="line-height: 1.6; color: #64748b; font-size: 14px;">
          <strong>Informations de paiement :</strong><br>
          Une fois votre réservation confirmée, notre équipe vous communiquera les options de paiement disponibles, notamment le mobile money (M-Pesa, Airtel Money, Orange Money) et les coordonnées bancaires.
        </p>
        <hr style="margin: 28px 0; border: none; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 13px;">
          <strong>Archanges Hôtel</strong><br>
          Minova — Budondo, route Bulenga, Sud-Kivu, RDC<br>
          Tél. : +243 997 721 582 / +243 991 570 543<br>
          Email : reservations@archangeshotel.com
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Archanges Hôtel" <${process.env.SMTP_USER}>`,
      to: email,
      subject: isEn
        ? "We received your request — Archanges Hôtel"
        : "Accusé de réception — Archanges Hôtel",
      html: clientEmailContent,
    });

    return NextResponse.json({ success: true, message: "Réservation envoyée avec succès", id: reservation.id });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la réservation:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'envoi de la réservation" },
      { status: 500 }
    );
  }
}

