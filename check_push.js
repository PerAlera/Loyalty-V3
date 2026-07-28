const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  console.log("User:", user?.id);
  const subs = await prisma.pushSubscription.findMany();
  console.log("Subscriptions:", subs);
}
main().finally(() => prisma.$disconnect());
