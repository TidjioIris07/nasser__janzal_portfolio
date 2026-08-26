"use client";

import { useState } from "react";

interface LanguageSwitchProps {
  scrolled: boolean;
}

const LanguageSwitch = ({ scrolled }: LanguageSwitchProps) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");

  return (
    <div
      className={`
        flex items-center gap-1
        rounded-full
        px-1
        border
        backdrop-blur-xl
        shadow-sm
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "border-black/10 bg-white/60"
            : "border-white/15 bg-white/10"
        }
      `}
    >
      {/* Globe */}
      <div
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-full
          transition-colors duration-500
          ${scrolled ? "text-black/60" : "text-white/80"}
        `}
      >
        <svg
          className="h-3.5 w-3.5"
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
      </div>

      {/* English */}
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`
          rounded-full
          px-3 py-1
          text-[11px]
          font-semibold
          tracking-wide
          transition-all duration-300
          ${
            locale === "en"
              ? "bg-black text-white shadow-sm"
              : scrolled
                ? "text-black/60 hover:bg-black/5 hover:text-black"
                : "text-white/60 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        EN
      </button>

      {/* Arabic */}
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={`
          rounded-full
          px-3 py-1
          text-[11px]
          font-semibold
          tracking-wide
          transition-all duration-300
          ${
            locale === "ar"
              ? "bg-black text-white shadow-sm"
              : scrolled
                ? "text-black/60 hover:bg-black/5 hover:text-black"
                : "text-white/60 hover:bg-white/10 hover:text-white"
          }
        `}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitch;