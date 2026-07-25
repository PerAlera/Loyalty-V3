import "./globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#654321",
};

export const metadata: Metadata = {
  title: "Loyalty App - Dijital Sadakat Sistemi",
  description: "Modern, hızlı ve premium dijital sadakat sistemi.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Peralera",
  },
};

import { Inter, Caveat } from "next/font/google";
import { Providers } from "./providers";

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
