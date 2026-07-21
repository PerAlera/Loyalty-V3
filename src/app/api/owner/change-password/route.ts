import { getServerSession } from "@/lib/auth";
import { NextResponse } from "next/server";
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
    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { newPassword } = await req.json();
    if (!newPassword) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    // Supabase Admin API ile kullanıcının şifresini güncelle
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      session.user.id,
      { password: newPassword }
    );

    if (error) {
      return NextResponse.json({ error: "Şifre güncellenemedi" }, { status: 400 });
    }

    return NextResponse.json({ message: "Şifreniz başarıyla değiştirildi" }, { status: 200 });

  } catch (error) {
    console.error("Change Password Error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
