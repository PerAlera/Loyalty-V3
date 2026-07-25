const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const business = await prisma.business.findFirst();
    if (!business) return console.log("No business");

    console.log("Testing returningCustomersData...");
    const returningCustomersData = await prisma.transaction.groupBy({
      by: ['userId'],
      where: { 
        businessId: business.id,
        type: { in: ["EARN_BEAN", "EARN_FOOD"] } 
      },
      having: {
        userId: {
          _count: {
            gt: 1
          }
        }
      }
    });
    console.log("returningCustomersData OK");

    console.log("Testing demographics...");
    const users = await prisma.user.findMany({
      where: { role: "CUSTOMER", businessId: business.id },
      select: { gender: true }
    });
    console.log("demographics OK");

    console.log("Testing recentTransactions...");
    const recentTransactions = await prisma.transaction.findMany({
      take: 5,
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, surname: true }
        }
      }
    });
    console.log("recentTransactions OK");

    console.log("Testing allTransactions...");
    const allTransactions = await prisma.transaction.findMany({
      where: { businessId: business.id },
      select: { type: true, amount: true, createdAt: true, userId: true }
    });
    console.log("allTransactions OK");

  } catch (e) {
    console.error("ERROR:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
