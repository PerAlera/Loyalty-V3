import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  let name = "Peralera";
  let iconUrl = "/Peralera-Logo.png";

  if (slug) {
    const business = await prisma.business.findUnique({
      where: { slug }
    });
    if (business) {
      name = business.name;
      if (business.logo) {
        iconUrl = business.logo;
      }
    }
  }

  let iconType = "image/png";
  if (iconUrl.endsWith(".svg")) {
    iconType = "image/svg+xml";
  } else if (iconUrl.endsWith(".jpg") || iconUrl.endsWith(".jpeg")) {
    iconType = "image/jpeg";
  }

  const manifest = {
    name: name,
    short_name: name,
    description: `${name} Sadakat Sistemi`,
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#654321",
    icons: [
      {
        src: iconUrl,
        sizes: "192x192",
        type: iconType
      },
      {
        src: iconUrl,
        sizes: "512x512",
        type: iconType
      }
    ]
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
