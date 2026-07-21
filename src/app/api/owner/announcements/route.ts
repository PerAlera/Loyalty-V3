import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";


import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Başlık ve içerik gereklidir" }, { status: 400 });
    }

    const business = await prisma.business.findUnique({ where: { id: session.user.businessId as string } });
    if (!business) return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
        businessId: business.id
      }
    });

    return NextResponse.json({ success: true, announcement: newAnnouncement });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
