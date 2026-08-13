import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "CUSTOMER") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { answer, skipped, isNewUser } = body;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { businessId: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const surveyResponse = await prisma.surveyResponse.create({
      data: {
        userId: session.user.id,
        businessId: user.businessId,
        isNewUser: Boolean(isNewUser),
        answer: skipped ? null : String(answer),
        skipped: Boolean(skipped)
      }
    });

    return NextResponse.json({ success: true, surveyResponse });
  } catch (error) {
    console.error("Survey Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
