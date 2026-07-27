import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("gestion_session");

  if (session?.value !== "active") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where = category ? { category } : {};

    const images = await prisma.image.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, images });
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
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const alt = formData.get("alt") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!file) {
      return NextResponse.json({ success: false, message: "File required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier s'il n'existe pas
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(uploadDir, filename);

    // Sauvegarder le fichier
    await writeFile(filepath, buffer);

    // Sauvegarder dans la base de données
    const image = await prisma.image.create({
      data: {
        filename,
        url: `/uploads/${filename}`,
        category,
        alt,
        order,
      },
    });

    return NextResponse.json({ success: true, image });
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

    await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
