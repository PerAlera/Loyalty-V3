-- Supabase RLS (Row Level Security) Policies
-- Bu sorguyu Supabase SQL Editor üzerinden Prisma migrate komutunu çalıştırdıktan sonra execute edin.

-- 1. Tüm tablolarda RLS'i aktifleştirin
ALTER TABLE "Business" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BusinessSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Announcement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Wallet" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QrToken" ENABLE ROW LEVEL SECURITY;

-- 2. Business (İşletme) Politikaları
-- Herkes işletmeleri okuyabilir (Giriş sayfasında logo ve temanın yüklenmesi için gereklidir)
CREATE POLICY "Public Business Select" ON "Business" FOR SELECT USING (true);

-- 3. User (Kullanıcı) Politikaları
-- Kullanıcı kendi verisini görebilir VEYA aynı işletmedeki Admin/Cashier görebilir
CREATE POLICY "User Select" ON "User" FOR SELECT USING (
  auth.uid()::text = id OR
  EXISTS (
    SELECT 1 FROM "User" AS caller 
    WHERE caller.id = auth.uid()::text 
    AND caller."businessId" = "User"."businessId"
    AND caller.role IN ('ADMIN', 'SUPER_ADMIN', 'CASHIER')
  )
);

-- Kullanıcı sadece kendi profilini güncelleyebilir
CREATE POLICY "User Update" ON "User" FOR UPDATE USING (
  auth.uid()::text = id
);

-- 4. Diğer Tablolar için Güvenlik (Wallet, Transaction, vb.)
-- Müşteriler yalnızca kendi cüzdan ve işlemlerini okuyabilir
-- Admin ve Kasiyerler işletmelerindeki herkesin verisini okuyabilir/yazabilir
CREATE POLICY "Tenant Isolation Select Wallet" ON "Wallet" FOR SELECT USING (
  "userId" = auth.uid()::text OR 
  EXISTS (
    SELECT 1 FROM "User" AS caller 
    WHERE caller.id = auth.uid()::text 
    AND caller."businessId" = "Wallet"."businessId"
    AND caller.role IN ('ADMIN', 'CASHIER', 'SUPER_ADMIN')
  )
);

-- (Benzer politikalar Transaction, QrToken ve Announcement için sistem çalıştığında otomatik veya ek scriptlerle genişletilebilir.)
