import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || session.user.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        surname: true,
        phone: true,
        email: true,
        birthDate: true,
        gender: true,
        profileRewardClaimed: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user || session.user.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const body = await req.json();
    const { birthDate, gender } = body;

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });

    let updateData: any = {};
    if (birthDate !== undefined) updateData.birthDate = birthDate ? new Date(birthDate) : null;
    if (gender !== undefined) updateData.gender = gender || null;

    // Check if profile is complete now
    const willHaveBirthDate = birthDate !== undefined ? !!birthDate : !!user.birthDate;
    const willHaveGender = gender !== undefined ? !!gender : !!user.gender;

    const businessSettings = await prisma.businessSettings.findFirst({ orderBy: { updatedAt: 'desc' } });
    
    let rewardGranted = false;

    if (businessSettings?.profileRewardEnabled && !user.profileRewardClaimed && willHaveBirthDate && willHaveGender) {
      updateData.profileRewardClaimed = true;
      rewardGranted = true;
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        surname: true,
        phone: true,
        email: true,
        birthDate: true,
        gender: true,
        profileRewardClaimed: true
      }
    });

    if (rewardGranted && businessSettings?.profileRewardAmount) {
      // Grant reward
      const requiredCoffees = businessSettings?.requiredCoffees || 10;
      const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
      
      let newBeans = wallet ? wallet.beans : 0;
      let newRewards = wallet ? wallet.rewards : 0;
      
      newBeans += businessSettings.profileRewardAmount;
      
      while (newBeans >= requiredCoffees) {
        newBeans -= requiredCoffees;
        newRewards += 1;
      }

      if (wallet) {
        await prisma.wallet.update({
          where: { userId: user.id },
          data: { beans: newBeans, rewards: newRewards }
        });
      } else {
        await prisma.wallet.create({
          data: { userId: user.id, businessId: user.businessId, beans: newBeans, rewards: newRewards }
        });
      }

      // Add transaction
      await prisma.transaction.create({
        data: {
          userId: user.id,
          businessId: user.businessId,
          type: "EARN_BEAN",
          amount: businessSettings.profileRewardAmount
        }
      });
    }

    return NextResponse.json({ user: updatedUser, message: "Profil güncellendi" + (rewardGranted ? ` ve ${businessSettings?.profileRewardAmount} çekirdek kazandınız!` : "") });
  } catch (error) {
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: "Güncelleme sırasında bir hata oluştu" }, { status: 500 });
  }
}
