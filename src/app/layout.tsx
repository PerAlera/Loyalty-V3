import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: "#654321",
};

export const metadata: Metadata = {
  title: "Loyalty App - Dijital Sadakat Sistemi",
  description: "Modern, hızlı ve premium dijital sadakat sistemi.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Peralera",
  },
};

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
