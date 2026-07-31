const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({ where: { role: 'SUPER_ADMIN' }});
  console.log('Super admins:', users);
}
main().finally(() => prisma.$disconnect());
