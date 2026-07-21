import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";


import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { id } = await params;

    const business = await prisma.business.findUnique({ where: { id: session.user.businessId as string } });
    if (!business) return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });

    const announcement = await prisma.announcement.findFirst({
      where: { id, businessId: business.id }
    });

    if (!announcement) {
      return NextResponse.json({ error: "Duyuru bulunamadı veya yetkiniz yok" }, { status: 404 });
    }

    await prisma.announcement.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
