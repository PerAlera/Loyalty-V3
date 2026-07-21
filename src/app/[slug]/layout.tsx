import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { TenantProvider } from "@/components/TenantProvider";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
  });

  if (!business) return { title: "Not Found" };

  return {
    title: business.name,
  };
}

export default async function TenantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug },
  });

  if (!business) {
    notFound();
  }

  // Dinamik CSS Değişkenleri (Tema Motoru)
  // theme alanı 'rose', 'blue', 'green' gibi anahtar kelimeler içerebileceği gibi
  // doğrudan JSON objesi olarak da tutulabilir. V3'te basitlik için renk kodları atayacağız.
  let primaryColor = "#f43f5e"; // varsayılan rose
  let primaryHover = "#e11d48";
  
  if (business.theme === "blue") {
    primaryColor = "#3b82f6";
    primaryHover = "#2563eb";
  } else if (business.theme === "green") {
    primaryColor = "#10b981";
    primaryHover = "#059669";
  } else if (business.theme && business.theme.startsWith("#")) {
    primaryColor = business.theme;
    primaryHover = business.theme; // Gelişmiş bir sistemde renk parlaklığı düşürülebilir
  }

  return (
    <div style={{
      "--primary": primaryColor,
      "--primary-hover": primaryHover,
    } as React.CSSProperties}>
      <TenantProvider business={{ 
        id: business.id, 
        name: business.name, 
        slug: business.slug, 
        logo: business.logo, 
        theme: business.theme,
        coffeeMascot: business.coffeeMascot,
        foodMascot: business.foodMascot
      }}>
        {children}
      </TenantProvider>
    </div>
  );
}
