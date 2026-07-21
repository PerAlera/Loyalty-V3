import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin Client for creating users without signing in
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Kasiyerleri Getir
export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const business = await prisma.business.findUnique({
      where: { id: session.user.businessId as string },
      include: {
        users: {
          where: { role: "CASHIER" },
          select: { id: true, name: true, surname: true, phone: true, createdAt: true }
        }
      }
    });

    if (!business) {
      return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ cashiers: business.users });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// Yeni Kasiyer Ekle
export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 403 });
    }

    const body = await req.json();
    const { name, surname, phone, password } = body;

    if (!name || !surname || !phone || !password) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    const business = await prisma.business.findUnique({ where: { id: session.user.businessId as string } });
    if (!business) return NextResponse.json({ error: "Mağaza bulunamadı" }, { status: 404 });

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return NextResponse.json({ error: "Bu telefon numarası zaten sistemde kayıtlı." }, { status: 400 });
    }

    const email = `${phone}@${business.slug}.peralera.com`;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        surname,
        phone,
        role: "CASHIER",
        businessId: business.id
      }
    });

    if (authError || !authData.user) {
      console.error("Supabase Auth Error:", authError);
      return NextResponse.json({ error: "Kasiyer hesabı oluşturulamadı." }, { status: 500 });
    }

    const userId = authData.user.id;

    const newCashier = await prisma.user.create({
      data: {
        id: userId,
        name,
        surname,
        phone,
        email,
        role: "CASHIER",
        businessId: business.id
      }
    });

    return NextResponse.json({ success: true, cashier: newCashier });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
