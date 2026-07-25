import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const businessId = session.user.businessId as string;

    const customers = await prisma.user.findMany({
      where: {
        businessId: businessId,
        role: "CUSTOMER"
      },
      select: {
        id: true,
        name: true,
        surname: true,
        phone: true,
        pushSubscriptions: {
          select: { id: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // We can also flag if they have push enabled to help the admin
    const mapped = customers.map(c => ({
      id: c.id,
      name: c.name,
      surname: c.surname,
      phone: c.phone,
      hasPush: c.pushSubscriptions.length > 0
    }));

    return NextResponse.json({ customers: mapped });
  } catch (error) {
    console.error("Customers Fetch Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
