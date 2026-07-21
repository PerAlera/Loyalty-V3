const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Sistem için test verileri (Business ve Super Admin) oluşturuluyor...");

  // 1. Test İşletmesi Oluştur
  const business = await prisma.business.upsert({
    where: { slug: 'jays' },
    update: {},
    create: {
      name: "Jay's Cafe",
      slug: 'jays',
      theme: 'rose', 
      logo: '/logo.svg'
    }
  });
  console.log("İşletme başarıyla oluşturuldu:", business.name, " (Slug:", business.slug, ")");

  // 2. İşletme Ayarlarını Oluştur
  const exists = await prisma.businessSettings.findFirst({ where: { businessId: business.id } });
  if (!exists) {
    await prisma.businessSettings.create({
      data: {
        businessId: business.id,
        requiredCoffees: 5,
        requiredFoods: 5
      }
    });
  }

  console.log("Ayarlar oluşturuldu.");
  console.log("\n--- BAŞARI ---");
  console.log("Artık projeyi test edebilirsiniz.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
