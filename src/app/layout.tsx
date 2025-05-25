import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIRA - Are your clothes lying to you?",
  description: "Instantly see the fabric truth, construction grade, human impact score — and your wardrobe's future value.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
