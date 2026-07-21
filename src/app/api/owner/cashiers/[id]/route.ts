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
    const cashierId = id;

    const business = await prisma.business.findUnique({ where: { id: session.user.businessId as string } });
    if (!business) return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });

    // Kasiyerin bu mağazaya ait olup olmadığını kontrol et
    const cashier = await prisma.user.findFirst({
      where: { id: cashierId, businessId: business.id, role: "CASHIER" }
    });

    if (!cashier) {
      return NextResponse.json({ error: "Kasiyer bulunamadı veya yetkiniz yok" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id: cashierId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
