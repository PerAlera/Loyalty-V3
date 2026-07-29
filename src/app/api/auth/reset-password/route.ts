import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { phone, name, surname, newPassword, slug } = await req.json();

    if (!phone || !name || !surname || !newPassword || !slug) {
      return NextResponse.json({ error: "Eksik bilgi gönderdiniz." }, { status: 400 });
    }

    // 1. Find business
    const business = await prisma.business.findUnique({
      where: { slug }
    });

    if (!business) {
      return NextResponse.json({ error: "İşletme bulunamadı." }, { status: 404 });
    }

    // 2. Find user with case-insensitive name/surname and exact phone
    const users = await prisma.user.findMany({
      where: {
        businessId: business.id,
        phone,
      }
    });

    const user = users.find(u => 
      u.name.toLowerCase() === name.toLowerCase() && 
      u.surname.toLowerCase() === surname.toLowerCase()
    );

    if (!user) {
      return NextResponse.json({ error: "Girdiğiniz isim ve soyisim, bu telefon numarasına ait kayıtla eşleşmedi." }, { status: 404 });
    }

    // 3. Update password in Supabase using Admin API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase Admin credentials missing.");
      return NextResponse.json({ error: "Sunucu yapılandırma hatası." }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // user.id in Prisma is exactly the Supabase Auth User ID (UUID)
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Şifre güncellenirken bir hata oluştu." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Şifre başarıyla güncellendi." });

  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "İşlem sırasında bir hata oluştu." }, { status: 500 });
  }
}
