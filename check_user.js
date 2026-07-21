const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2];
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[match[1]] = val;
  }
});

const prisma = new PrismaClient();
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const users = await prisma.user.findMany();
  console.log("Prisma Users:", users);

  const { data: authUsers, error } = await supabaseAdmin.auth.admin.listUsers();
  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("Supabase Users:", authUsers.users.map(u => ({ id: u.id, email: u.email })));
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
