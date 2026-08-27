import type { Metadata } from "next";

import { Plus_Jakarta_Sans, Syncopate, Syne } from "next/font/google";

import "./globals.css";

import Preloader from "@/components/Preloader";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nasser • Top Emirati Influencer in Dubai & Al Ain",
  description:
    "Official portfolio of Nasser — Leading Emirati Influencer, Dubai Influencer & Brand Ambassador based in Dubai and Al Ain, UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${syncopate.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Preloader />
        <NavBar />
        <Hero />
        {children}
      </body>
    </html>
  );
}