const fs = require('fs');

const path1 = 'src/app/api/owner/stats/route.ts';
let code1 = fs.readFileSync(path1, 'utf8');

code1 = code1.replace('where: { role: "CUSTOMER" }', 'where: { role: "CUSTOMER", businessId: business.id }');
code1 = code1.replace('where: { type: "REDEEM_REWARD" }', 'where: { type: "REDEEM_REWARD", businessId: business.id }');
code1 = code1.replace('where: { type: "EARN_BEAN" }', 'where: { type: "EARN_BEAN", businessId: business.id }');
code1 = code1.replace('where: { type: "REDEEM_FOOD" }', 'where: { type: "REDEEM_FOOD", businessId: business.id }');
code1 = code1.replace('where: { type: "EARN_FOOD" }', 'where: { type: "EARN_FOOD", businessId: business.id }');

const old_group = `where: { 
        type: { in: ["EARN_BEAN", "EARN_FOOD"] } 
      }`;
const new_group = `where: { 
        businessId: business.id,
        type: { in: ["EARN_BEAN", "EARN_FOOD"] } 
      }`;
code1 = code1.replace(old_group, new_group);

const old_users = `const users = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      select: { gender: true }
    });`;
const new_users = `const users = await prisma.user.findMany({
      where: { role: "CUSTOMER", businessId: business.id },
      select: { gender: true }
    });`;
code1 = code1.replace(old_users, new_users);

const old_recent = `take: 5,
      orderBy: { createdAt: "desc" }`;
const new_recent = `take: 5,
      where: { businessId: business.id },
      orderBy: { createdAt: "desc" }`;
code1 = code1.replace(old_recent, new_recent);

const old_today = `where: { 
        createdAt: { gte: todayUTCStart },
      }`;
const new_today = `where: { 
        businessId: business.id,
        createdAt: { gte: todayUTCStart },
      }`;
code1 = code1.replace(old_today, new_today);

const old_all = `const allTransactions = await prisma.transaction.findMany({
      select: { type: true, amount: true, createdAt: true, userId: true }
    });`;
const new_all = `const allTransactions = await prisma.transaction.findMany({
      where: { businessId: business.id },
      select: { type: true, amount: true, createdAt: true, userId: true }
    });`;
code1 = code1.replace(old_all, new_all);

fs.writeFileSync(path1, code1);


const path2 = 'src/app/api/owner/stats/weekly/route.ts';
let code2 = fs.readFileSync(path2, 'utf8');

const old_weekly = `where: {
        createdAt: {
          gte: startUTC,
          lte: endUTC
        }
      }`;
const new_weekly = `where: {
        businessId: session.user.businessId as string,
        createdAt: {
          gte: startUTC,
          lte: endUTC
        }
      }`;
code2 = code2.replace(old_weekly, new_weekly);

fs.writeFileSync(path2, code2);

console.log("Done");
