import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CIRA - Conscious Fashion Rewards",
  description: "Discover ethical, enduring pieces — guided by meaning, not trends.",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
