import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const business = await prisma.business.findUnique({
      where: { id: session.user.businessId as string },
      include: { settings: true }
    });

    if (!business || !business.settings) {
      return NextResponse.json({ error: "Ayarlar bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ settings: business.settings, business: { name: business.name, theme: business.theme } });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { requiredCoffees, requiredFoods, profileRewardEnabled, profileRewardAmount, name, theme } = body;

    if (!requiredCoffees || requiredCoffees < 1 || !requiredFoods || requiredFoods < 1) {
      return NextResponse.json({ error: "Geçersiz değer" }, { status: 400 });
    }

    const business = await prisma.business.findUnique({ where: { id: session.user.businessId as string } });
    if (!business) return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });

    const updatedSettings = await prisma.businessSettings.update({
      where: { businessId: business.id },
      data: { 
        requiredCoffees: parseInt(requiredCoffees),
        requiredFoods: parseInt(requiredFoods),
        profileRewardEnabled: profileRewardEnabled ?? false,
        profileRewardAmount: profileRewardAmount ? parseInt(profileRewardAmount) : 1
      }
    });

    if (name || theme !== undefined) {
      await prisma.business.update({
        where: { id: business.id },
        data: {
          name: name || business.name,
          theme: theme !== undefined ? theme : business.theme
        }
      });
    }

    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
