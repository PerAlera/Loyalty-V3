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
    const { name, slug, theme, logo, coffeeMascot, foodMascot, isFoodEnabled } = body;

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
        foodMascot,
        isFoodEnabled: isFoodEnabled !== undefined ? isFoodEnabled : true,
      }
    });

    return NextResponse.json({ success: true, business: updatedBusiness });
  } catch (error) {
    console.error("Edit Business Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const resolvedParams = await params;
    const businessId = resolvedParams.id;
    const body = await req.json();
    const { action } = body;

    const business = await prisma.business.findUnique({
      where: { id: businessId }
    });

    if (!business) {
      return NextResponse.json({ error: "İşletme bulunamadı" }, { status: 404 });
    }

    if (action === "RESTORE") {
      // Restore slug by removing '-deleted-timestamp' suffix if present
      let restoredSlug = business.slug;
      const match = restoredSlug.match(/^(.*?)-deleted-\d+$/);
      if (match && match[1]) {
        restoredSlug = match[1];
      }

      // Check if restored slug is taken
      const existing = await prisma.business.findFirst({
        where: { slug: restoredSlug, id: { not: businessId } }
      });
      if (existing) {
        restoredSlug = `${restoredSlug}-${Math.floor(Math.random() * 1000)}`;
      }

      await prisma.business.update({
        where: { id: businessId },
        data: {
          isActive: true,
          slug: restoredSlug
        }
      });
      return NextResponse.json({ success: true, slug: restoredSlug });
    }

    return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 });
  } catch (error) {
    console.error("Patch Business Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

import { createClient } from "@supabase/supabase-js";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    const resolvedParams = await params;
    const businessId = resolvedParams.id;

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: { users: true }
    });

    if (!business) {
      return NextResponse.json({ error: "İşletme bulunamadı" }, { status: 404 });
    }

    if (action === "permanent") {
      // 1. Supabase'den kullanıcıları temizle
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      for (const user of business.users) {
        const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
        if (error) {
          console.error(`Kullanıcı silinemedi (${user.id}):`, error);
        }
      }

      // 2. İşletmeyi veritabanından tamamen sil
      await prisma.business.delete({
        where: { id: businessId }
      });

      return NextResponse.json({ success: true, message: "İşletme tamamen silindi." });
    }

    // Soft Delete: isActive = false, and modify slug to free it up
    const deletedSlug = `${business.slug}-deleted-${Date.now()}`;

    await prisma.business.update({
      where: { id: businessId },
      data: {
        isActive: false,
        slug: deletedSlug
      }
    });

    return NextResponse.json({ success: true, message: "İşletme donduruldu." });
  } catch (error) {
    console.error("Delete Business Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
