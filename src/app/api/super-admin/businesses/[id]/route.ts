import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const resolvedParams = await params;
    const businessId = resolvedParams.id;

    const business = await prisma.business.findUnique({
      where: { id: businessId }
    });

    if (!business) {
      return NextResponse.json({ error: "İşletme bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Get Business Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const resolvedParams = await params;
    const businessId = resolvedParams.id;
    const body = await req.json();
    const { name, slug, theme, logo, coffeeMascot, foodMascot } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "İşletme adı ve slug zorunludur" }, { status: 400 });
    }

    // Slug benzersizliği kontrolü (kendi slug'ı hariç)
    const existingBusiness = await prisma.business.findFirst({
      where: { 
        slug,
        id: { not: businessId } 
      }
    });

    if (existingBusiness) {
      return NextResponse.json({ error: "Bu subdomain (slug) zaten başka bir işletme tarafından kullanılıyor." }, { status: 400 });
    }

    const updatedBusiness = await prisma.business.update({
      where: { id: businessId },
      data: {
        name,
        slug,
        theme,
        logo,
        coffeeMascot,
        foodMascot
      }
    });

    return NextResponse.json({ success: true, business: updatedBusiness });
  } catch (error) {
    console.error("Edit Business Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
