"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface LanguageSwitchProps {
  scrolled: boolean;
}

const LanguageSwitch = ({ scrolled }: LanguageSwitchProps) => {
  const locale = useLocale();
  const router = useRouter();

  const setLocale = (nextLocale: "en" | "ar") => {
    if (nextLocale === locale) return;
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const buttonClass = (active: boolean) => `rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all duration-300 ${active ? "bg-black text-white shadow-sm" : scrolled ? "text-black/60 hover:bg-black/5 hover:text-black" : "text-white/60 hover:bg-white/10 hover:text-white"}`;

  return (
    <div className={`flex items-center gap-1 rounded-full border px-1 backdrop-blur-xl shadow-sm transition-all duration-500 ease-out ${scrolled ? "border-black/10 bg-white/60" : "border-white/15 bg-white/10"}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500 ${scrolled ? "text-black/60" : "text-white/80"}`}>
        <Globe size={14}/>
      </div>
      <button type="button" onClick={() => setLocale("en")} className={buttonClass(locale === "en")}>EN</button>
      <button type="button" onClick={() => setLocale("ar")} className={buttonClass(locale === "ar")}>العربية</button>
    </div>
  );
};

export default LanguageSwitch;
