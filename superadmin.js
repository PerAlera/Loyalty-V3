const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const prisma = new PrismaClient();

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Fallback for local testing if needed
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

async function main() {
  console.log("Super Admin hesabı oluşturuluyor...");

  // 1. Önce genel (boş) bir Super Admin Business/Tenant oluştur (isteğe bağlı, ama User modelimiz businessId gerektiriyor!)
  const superAdminBusiness = await prisma.business.upsert({
    where: { slug: 'system' },
    update: {},
    create: {
      name: "Sistem Yönetimi",
      slug: 'system',
      theme: '#000000', 
    }
  });

  const email = 'admin@peralera.com';
  const password = 'password123';

  // 2. Supabase Auth Admin ile kullanıcı oluştur
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      name: "Super",
      surname: "Admin",
      phone: "0000000000",
      role: "SUPER_ADMIN",
      businessId: superAdminBusiness.id
    }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log("Kullanıcı zaten mevcut, Supabase ID alınıyor...");
      // In a real scenario we'd query it, but let's assume it might fail if we don't have the ID.
    } else {
      console.error("Supabase Error:", authError.message);
      if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("LÜTFEN DİKKAT: .env dosyanızda SUPABASE_SERVICE_ROLE_KEY eksik olabilir! Bu scriptin Supabase tarafında çalışması için o key gereklidir.");
      }
      return;
    }
  }

  if (authData?.user) {
    // 3. Veritabanına kaydet
    await prisma.user.upsert({
      where: { id: authData.user.id },
      update: {},
      create: {
        id: authData.user.id,
        businessId: superAdminBusiness.id,
        phone: "0000000000",
        name: "Super",
        surname: "Admin",
        role: "SUPER_ADMIN",
        email: email,
      }
    });

    console.log("Super Admin Başarıyla Oluşturuldu!");
    console.log("Giriş E-postası: ", email);
    console.log("Şifre: ", password);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
