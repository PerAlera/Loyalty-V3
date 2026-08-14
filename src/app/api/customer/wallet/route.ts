import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    let wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id }
    });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { profileRewardClaimed: true }
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId: session.user.id, businessId: session.user.businessId, beans: 0, rewards: 0 }
      });
    }

    const businessSettings = await prisma.businessSettings.findFirst({
      where: { businessId: session.user.businessId },
      orderBy: { updatedAt: 'desc' }
    });
    
    const requiredCoffees = businessSettings?.requiredCoffees || 10;
    const requiredFoods = businessSettings?.requiredFoods || 10;
    const profileRewardEnabled = businessSettings?.profileRewardEnabled || false;
    const profileRewardAmount = businessSettings?.profileRewardAmount || 1;
    const profileRewardClaimed = user?.profileRewardClaimed || false;

    return NextResponse.json({ wallet, requiredCoffees, requiredFoods, profileRewardEnabled, profileRewardAmount, profileRewardClaimed });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
