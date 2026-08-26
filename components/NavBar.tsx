"use client";

import { useEffect, useState } from "react";

import Button from "./ui/Button";
import LanguageSwitch from "./ui/LanguageSwitch";

const NAV_LINKS = [
  { label: "The Journey", href: "#journey" },
  { label: "Impact & Reach", href: "#impact" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Services", href: "#services" },
];

const SCROLL_THRESHOLD = 40;

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50
        border-b
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "border-black/10 bg-white/75 backdrop-blur-2xl shadow-sm shadow-black/5"
            : "border-transparent bg-transparent"
        }
      `}
    >
      <div
        className={`
          mx-auto flex max-w-7xl items-center justify-between
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "px-5 py-3 lg:px-8"
              : "px-6 py-5 lg:px-10"
          }
        `}
      >
        {/* Logo */}
        <a
          href="#hero"
          className={`
            text-lg font-brand font-bold uppercase
            tracking-[0.2em]
            transition-colors duration-500
            ${scrolled ? "text-black" : "text-white"}
          `}
        >
          Nasser •
        </a>

        {/* In-page navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`
                text-xs font-medium uppercase
                tracking-[0.15em]
                transition-colors duration-500
                ${
                  scrolled
                    ? "text-black/60 hover:text-black"
                    : "text-white/80 hover:text-white"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <LanguageSwitch scrolled={scrolled}/>

          {/* Socials */}
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href="https://instagram.com/nasserjanzal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`
                grid h-9 w-9 place-items-center
                rounded-full
                border
                backdrop-blur-xl
                shadow-sm
                transition-all duration-500 ease-out
                ${
                  scrolled
                    ? "border-black/10 bg-white/60 text-black/70 hover:bg-white/80 hover:text-black"
                    : "border-white/15 bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
                }
              `}
            >
              <InstagramIcon />
            </a>

            <a
              href="https://tiktok.com/@nasserjanzal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={`
                grid h-9 w-9 place-items-center
                rounded-full
                border
                backdrop-blur-xl
                shadow-sm
                transition-all duration-500 ease-out
                ${
                  scrolled
                    ? "border-black/10 bg-white/60 text-black/70 hover:bg-white/80 hover:text-black"
                    : "border-white/15 bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
                }
              `}
            >
              <TikTokIcon />
            </a>
          </div>

          {/* CTA */}
          <Button href="">Send An Enquiry</Button>
        </div>
      </div>
    </header>
  );
};

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M16.6 5.82a4.28 4.28 0 0 1-.94-2.65h-3.14v13.4a2.6 2.6 0 1 1-1.86-2.49v-3.24a5.85 5.85 0 1 0 5 5.79V9.4a7.4 7.4 0 0 0 4.29 1.36V7.6a4.27 4.27 0 0 1-3.35-1.78z" />
  </svg>
);

export default NavBar;