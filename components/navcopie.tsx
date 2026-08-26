"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  showLogo?: boolean;
}

export default function Navbar({ showLogo = true }: NavbarProps) {
  const [lang, setLang] = useState<"EN" | "AR">("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-transparent px-6 py-6 md:px-12">
      {/* Brand Logo */}
      <div
        className={`transition-opacity duration-500 ${
          showLogo ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase flex items-center gap-1.5">
          NASSER <span className="inline-block w-2.5 h-2.5 rounded-full bg-white"></span>
        </Link>
      </div>

      {/* Center & Right Navigation Items */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/15 shadow-sm">
          <svg
            className="w-3.5 h-3.5 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          <button
            onClick={() => setLang("EN")}
            className={`px-1 transition-colors ${
              lang === "EN" ? "text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            EN
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={() => setLang("AR")}
            className={`px-1 transition-colors ${
              lang === "AR" ? "text-white font-bold" : "text-white/60 hover:text-white"
            }`}
          >
            العربية
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
            aria-label="TikTok"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.55-1.34 1.49-1.38 2.49-.06 1.16.51 2.3 1.47 2.94.94.63 2.19.74 3.2.3 1.05-.44 1.83-1.41 1.98-2.53.07-1.33.03-2.67.03-4.01V.02z" />
            </svg>
          </a>
        </div>

        {/* CTA Button */}
        <button className="bg-black hover:bg-zinc-900 text-white font-medium text-xs md:text-sm px-5 py-2.5 rounded-full flex items-center gap-2 border border-white/20 shadow-xl transition-all transform hover:scale-[1.03]">
          Send an Enquiry
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
