const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Sıkışan cüzdanlar taranıyor...");
  
  // Tüm cüzdanları ve ilgili işletme ayarlarını çek
  const wallets = await prisma.wallet.findMany();

  const allSettings = await prisma.businessSettings.findMany({
    orderBy: { updatedAt: 'desc' }
  });

  const settingsMap = {};
  for (const s of allSettings) {
    if (!settingsMap[s.businessId]) {
      settingsMap[s.businessId] = s;
    }
  }

  let fixedCount = 0;

  for (const wallet of wallets) {
    // İşletme ayarlarını al, yoksa varsayılan 10 kabul et
    const settings = settingsMap[wallet.businessId];
    const requiredCoffees = settings?.requiredCoffees || 10;
    
    let newBeans = wallet.beans;
    let newRewards = wallet.rewards;
    let modified = false;

    // Eğer çekirdek sayısı gereken sayıya eşit veya büyükse dönüştür
    while (newBeans >= requiredCoffees) {
      newBeans -= requiredCoffees;
      newRewards += 1;
      modified = true;
    }

    // Değişiklik varsa veritabanını güncelle
    if (modified) {
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: { beans: newBeans, rewards: newRewards }
      });
      console.log(`Düzeltildi (Kullanıcı ID: ${wallet.userId}) -> Çekirdek: ${wallet.beans} => ${newBeans} | Ödül: ${wallet.rewards} => ${newRewards}`);
      fixedCount++;
    }
  }

  console.log(`İşlem tamamlandı! Toplam ${fixedCount} cüzdan düzeltildi.`);
}

main()
  .catch(e => {
    console.error("Hata oluştu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
