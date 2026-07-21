import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    // Yalnızca SUPER_ADMIN yetkisi olanlar işletme açabilir
    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const body = await req.json();
    const { name, slug, theme, adminName, adminSurname, adminPhone, adminPassword } = body;

    if (!name || !slug || !adminName || !adminSurname || !adminPhone || !adminPassword) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    // 1. İşletme (Business) slug kontrolü
    const existingBusiness = await prisma.business.findUnique({
      where: { slug }
    });

    if (existingBusiness) {
      return NextResponse.json({ error: "Bu subdomain (slug) zaten kullanımda." }, { status: 400 });
    }

    // 2. İşletmeyi (Business) veritabanında oluştur ki ID'sini alabilelim
    const newBusiness = await prisma.business.create({
      data: {
        name,
        slug,
        theme,
        settings: {
          create: {
            requiredCoffees: 10,
            requiredFoods: 10,
            profileRewardEnabled: true,
            profileRewardAmount: 5,
          }
        }
      }
    });

    // 3. Supabase Admin API ile ADMIN kullanıcısını oluştur
    const email = `${adminPhone}@${slug}.peralera.com`;
    
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
        surname: adminSurname,
        phone: adminPhone,
        role: "ADMIN",
        businessId: newBusiness.id
      }
    });

    if (authError || !authData.user) {
      console.error("Supabase Auth Error:", authError);
      // Supabase'de hata olursa oluşturduğumuz işletmeyi geri al (Rollback)
      await prisma.business.delete({ where: { id: newBusiness.id } });
      return NextResponse.json({ error: "Yönetici hesabı oluşturulamadı." }, { status: 500 });
    }

    const userId = authData.user.id;

    // 4. Admin User'ı Prisma DB'ye ekle
    const newAdmin = await prisma.user.create({
      data: {
        id: userId,
        businessId: newBusiness.id,
        phone: adminPhone,
        name: adminName,
        surname: adminSurname,
        role: "ADMIN",
        email: email,
      }
    });

    return NextResponse.json({ business: newBusiness, admin: newAdmin }, { status: 201 });

  } catch (error: any) {
    console.error("New Business API Error:", error);
    return NextResponse.json({ error: error.message || "İç sunucu hatası" }, { status: 500 });
  }
}
