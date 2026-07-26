const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const subs = await prisma.pushSubscription.findMany();
  console.log("Total subscriptions:", subs.length);
  if (subs.length > 0) {
    console.log("Latest sub:", subs[subs.length - 1]);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
