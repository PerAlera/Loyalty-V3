import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { getServerSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession();
    
    let whereClause: any = { isGlobal: true };
    
    if (session && session.user) {
      if (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") {
        whereClause = { businessId: session.user.businessId };
      } else {
        whereClause = {
          businessId: session.user.businessId,
          OR: [
            { isGlobal: true },
            { users: { some: { id: session.user.id } } }
          ]
        };
      }
    }

    const announcements = await prisma.announcement.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: 10
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
