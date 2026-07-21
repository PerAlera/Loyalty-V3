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

async function updateSuperAdmin() {
  console.log("Updating Super Admin email...");
  const oldEmail = "admin@peralera.com";
  // The phone might already be 0000000000 from seed.js
  const newEmail = "0000000000@peralera.com";
  const newPhone = "0000000000";

  // 1. Find user in Prisma
  const user = await prisma.user.findFirst({
    where: { email: oldEmail }
  });

  if (!user) {
    console.log("Super Admin with old email not found. Maybe already updated?");
    return;
  }

  // 2. Update in Supabase
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
    user.id,
    { email: newEmail, email_confirm: true }
  );

  if (authError) {
    console.error("Supabase update error:", authError);
    return;
  }
  
  console.log("Supabase Auth updated.");

  // 3. Update in Prisma
  await prisma.user.update({
    where: { id: user.id },
    data: { email: newEmail, phone: newPhone }
  });

  console.log("Prisma User updated. Super Admin is now phone-based!");
}

updateSuperAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
