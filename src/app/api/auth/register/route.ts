import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// Use service role key to bypass RLS and create users in auth schema
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, phone, password, slug, acceptedTerms, acceptedSms } = body;

    if (!name || !surname || !phone || !password || !slug) {
      return NextResponse.json({ error: "Eksik bilgi girdiniz." }, { status: 400 });
    }
    
    if (acceptedTerms !== true) {
      return NextResponse.json({ error: "Kullanıcı sözleşmesini onaylamanız gerekmektedir." }, { status: 400 });
    }

    const business = await prisma.business.findUnique({
      where: { slug }
    });

    if (!business) {
      return NextResponse.json({ error: "İşletme bulunamadı." }, { status: 404 });
    }

    // Check if phone exists for this specific business
    const existingUser = await prisma.user.findFirst({
      where: { phone, businessId: business.id }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Bu telefon numarası zaten kayıtlı." }, { status: 400 });
    }

    // Create user in Supabase Auth
    const email = `${phone}@${slug}.peralera.com`;
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, surname, phone, role: "CUSTOMER", businessId: business.id }
    });

    if (authError || !authData.user) {
      console.error("Supabase Auth Error:", authError);
      return NextResponse.json({ error: "Kimlik doğrulama sisteminde hata oluştu." }, { status: 500 });
    }

    // Müşteriler dışarıdan sadece CUSTOMER olarak kayıt olabilir.
    const userRole = "CUSTOMER";

    const newUser = await prisma.user.create({
      data: {
        id: authData.user.id, // Link to Supabase Auth ID
        businessId: business.id,
        name,
        surname,
        phone,
        role: userRole,
        acceptedTerms: true,
        acceptedSms: acceptedSms === true,
        wallets: {
          create: { businessId: business.id, beans: 0, rewards: 0 }
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Kayıt başarılı",
      user: { id: newUser.id, name: newUser.name }
    }, { status: 201 });

  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
