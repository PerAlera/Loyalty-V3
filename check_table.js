const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    await prisma.pushSubscription.count();
    console.log("Table exists!");
  } catch (e) {
    console.error("Table error:", e.message);
  }
}
check().finally(() => prisma.$disconnect());
