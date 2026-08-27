"use client";

import { UserRound, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

const WHATSAPP_URL = "https://wa.me/971508155158";
const AVATAR_URL =
  "https://whatsapp.ebms.ae/uploads/logos/1787396141974-c7f4fd355b8f.png";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const t = useTranslations("whatsapp");

  const startConversation = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-5 right-5 z-90 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          role="dialog"
          aria-label={t("dialogLabel")}
          className="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-neutral-200 bg-white text-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        >
          <header className="flex items-start justify-between gap-4 bg-[#1d8d5a] px-5 py-4 text-white">
            <div>
              <h3 className="text-base font-semibold">{t("title")}</h3>
              <p className="mt-0.5 text-xs text-white/75">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t("close")}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="bg-[#f7f8f7] p-5">
            <h4 className="text-lg font-semibold text-neutral-900">{t("heading")}</h4>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">{t("description")}</p>

            <button
              type="button"
              onClick={startConversation}
              aria-label={t("chatWith")}
              className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-neutral-200 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d8d5a]"
            >
              {imageFailed ? (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-400">
                  <UserRound size={22} />
                </span>
              ) : (
                <Image
                  src={AVATAR_URL}
                  alt={t("agentName")}
                  onError={() => setImageFailed(true)}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
              )}

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] text-neutral-500">{t("role")}</span>
                <span className="block truncate text-sm font-semibold text-neutral-900">{t("agentName")}</span>
                <span className="block truncate text-[11px] text-neutral-400">{t("languages")}</span>
              </span>

              <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {t("online")}
              </span>
            </button>
          </div>

          <footer className="border-t border-neutral-100 bg-white px-5 py-3 text-center text-[11px] text-neutral-400">
            {t("poweredBy")}
          </footer>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? t("close") : t("open")}
        aria-expanded={isOpen}
        className="relative isolate grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25d366]/35"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366]/60 animate-ping" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.296-.178-3.073.806.82-2.993-.196-.312A7.96 7.96 0 014 12a8 8 0 1116 0 8 8 0 01-8 8z" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppChat;
