import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "Peralera",
    short_name: "Peralera",
    description: "Peralera Sadakat Sistemi",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#654321",
    icons: [
      {
        src: "/Peralera-Logo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/Peralera-Logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
