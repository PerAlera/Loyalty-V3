const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2];
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[match[1]] = val;
  }
});
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');

const prisma = new PrismaClient();
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const email = "0000000000@peralera.com";
  const password = "password123";

  console.log("Super admin hesabi olusturuluyor...");

  // 1. Create fake business for Super Admin (since Users must belong to a business in Prisma, though we might bypass it, wait, Super Admin doesn't strictly need a business, but schema says `businessId String`. Let's create a dummy Peralera business).
  let peralera = await prisma.business.findUnique({ where: { slug: "peralera" } });
  if (!peralera) {
    peralera = await prisma.business.create({
      data: {
        name: "Peralera HQ",
        slug: "peralera",
        settings: {
          create: {}
        }
      }
    });
    console.log("Peralera HQ isletmesi olusturuldu.");
  }

  // 2. Create Supabase User
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "SUPER_ADMIN", businessId: peralera.id }
  });

  if (authError) {
    console.error("Supabase Auth Hatasi:", authError);
    return;
  }

  console.log("Supabase Auth kullanicisi olusturuldu:", authData.user.id);

  // 3. Create Prisma User
  await prisma.user.create({
    data: {
      id: authData.user.id,
      businessId: peralera.id,
      phone: "0000000000",
      name: "Super",
      surname: "Admin",
      role: "SUPER_ADMIN",
      email: email,
      acceptedTerms: true,
      acceptedSms: true
    }
  });

  console.log("Prisma User (SUPER_ADMIN) basariyla olusturuldu!");
  console.log("Giris Bilgileri:");
  console.log("Email:", email);
  console.log("Sifre:", password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
