import type { Metadata } from "next";
import { Inter, Noto_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-noto-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "CIRA – Product Transparency Platform",
  description: "Beautiful product transparency for brands and consumers. Create Digital Product Passports, validate sustainability claims, and discover ethically stunning fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-white">
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
