const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const prisma = new PrismaClient();

async function main() {
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'v3.peralera.com';
  console.log(`Migrating emails to use base domain: ${baseDomain}`);

  const users = await prisma.user.findMany({
    include: { business: true }
  });

  for (const user of users) {
    let newEmail = '';
    
    if (user.role === 'SUPER_ADMIN') {
      newEmail = `${user.phone}@${baseDomain}`;
    } else {
      newEmail = `${user.phone}@${user.business.slug}.${baseDomain}`;
    }

    if (user.email !== newEmail) {
      console.log(`Updating user ${user.id} (${user.phone}) from ${user.email} to ${newEmail}`);
      
      // Update Prisma
      await prisma.user.update({
        where: { id: user.id },
        data: { email: newEmail }
      });

      // Update Supabase
      const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        email: newEmail,
        email_confirm: true
      });

      if (error) {
        console.error(`Failed to update Supabase for ${user.id}:`, error);
      } else {
        console.log(`Successfully updated in Supabase.`);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
