import type { Metadata } from "next";
import { Geist, Geist_Mono, Abril_Fatface } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CartDrawer from "@/app/components/ui/shop/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
  display: "swap",
});

const bebit = localFont({
  src: [
    {
      path: "./fonts/Bebit/bebit_regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Bebit/bebit_regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Creative Explorer",
  description: "Explore Creativity. Build Innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebit.variable} ${abril.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children} <CartDrawer /></body>
    </html>
  );
}