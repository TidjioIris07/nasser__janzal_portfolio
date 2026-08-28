"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { useTranslations } from "next-intl";

import Button from "./ui/Button";

import LanguageSwitch from "./ui/LanguageSwitch";

import { scrollToSection, showForm } from "@/utils/utils";

const SCROLL_THRESHOLD = 40;

const NavBar = () => {
  const t = useTranslations("nav");
  const brand = useTranslations("brand");

  const navLinks = [
    { label: t("journey"), href: "#journey" },
    { label: t("impact"), href: "#impact" },
    { label: t("partnerships"), href: "#partnerships" },
    { label: t("services"), href: "#services" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* -------------------------------------------------------
     ANIMATION REFS
  ------------------------------------------------------- */

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileRightRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------
     SCROLL STATE
  ------------------------------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* -------------------------------------------------------
     NAVBAR INTRO ANIMATION
  ------------------------------------------------------- */

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const nav = navRef.current;
    const language = languageRef.current;
    const socials = socialsRef.current;
    const cta = ctaRef.current;
    const mobileRight = mobileRightRef.current;

    if (
      !header ||
      !logo ||
      !nav ||
      !language ||
      !socials ||
      !cta ||
      !mobileRight
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationPlayed = false;
    let ctx: gsap.Context | null = null;

    /* -------------------------------------------------------
       ANIMATE NAVBAR
    ------------------------------------------------------- */

    const animateNavbar = () => {
      if (animationPlayed) return;

      animationPlayed = true;

      if (reduceMotion) {
        gsap.set(
          [
            logo,
            nav,
            language,
            socials,
            cta,
            mobileRight,
          ],
          {
            clearProps: "all",
            opacity: 1,
            yPercent: 0,
          },
        );

        return;
      }

      ctx = gsap.context(() => {
        /*
         * Initial state is also defined directly on the
         * elements in JSX to prevent a flash before GSAP runs.
         */

        gsap.set(
          [
            logo,
            nav,
            language,
            socials,
            cta,
            mobileRight,
          ],
          {
            yPercent: -50,
            opacity: 0,
          },
        );

        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        /* ---------------------------------------------------
           LOGO
        --------------------------------------------------- */

        timeline.to(logo, {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
        });

        /* ---------------------------------------------------
           DESKTOP NAVIGATION
        --------------------------------------------------- */

        timeline.to(
          nav,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
          },
          "-=0.48",
        );

        /* ---------------------------------------------------
           LANGUAGE
        --------------------------------------------------- */

        timeline.to(
          language,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.42",
        );

        /* ---------------------------------------------------
           SOCIAL ICONS
        --------------------------------------------------- */

        timeline.to(
          socials,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.42",
        );

        /* ---------------------------------------------------
           CTA
        --------------------------------------------------- */

        timeline.to(
          cta,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
          },
          "-=0.42",
        );

        /* ---------------------------------------------------
           MOBILE RIGHT SIDE
        --------------------------------------------------- */

        timeline.to(
          mobileRight,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.42",
        );
      }, header);
    };

    /* -------------------------------------------------------
       WAIT FOR PRELOADER
    ------------------------------------------------------- */

    const handlePreloaderFinished = () => {
      animateNavbar();
    };

    window.addEventListener(
      "preloader:finished",
      handlePreloaderFinished,
    );

    /*
     * Fallback:
     *
     * If the preloader has already finished before this
     * component registered its listener, check whether the
     * preloader is still present.
     */

    const fallbackTimer = window.setTimeout(() => {
      if (animationPlayed) return;

      const preloader = document.querySelector(
        ".preloader-curtain",
      );

      if (!preloader) {
        animateNavbar();
      }
    }, 100);

    /* -------------------------------------------------------
       CLEANUP
    ------------------------------------------------------- */

    return () => {
      ctx?.revert();

      window.removeEventListener(
        "preloader:finished",
        handlePreloaderFinished,
      );

      window.clearTimeout(fallbackTimer);
    };
  }, []);

  /* -------------------------------------------------------
     NAVIGATION
  ------------------------------------------------------- */

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    scrollToSection(event, sectionId);
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "border-b border-black/8 bg-white/80 shadow-sm shadow-black/4 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent"
        }
      `}
    >
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className={`
          mx-auto flex w-full max-w-360 items-center justify-between
          transition-all duration-500 ease-out
          ${
            scrolled
              ? "px-6 py-3 md:px-12 lg:px-16"
              : "px-6 py-6 md:px-12 md:py-8 lg:px-16"
          }
        `}
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <a
          ref={logoRef}
          onClick={(event) => {
            setMenuOpen(false);
            scrollToSection(event, "#hero");
          }}
          style={{
            opacity: 0,
            transform: "translateY(-50%)",
          }}
          className={`
            group flex shrink-0 cursor-pointer items-center gap-1.5
            font-brand text-xl font-bold uppercase
            tracking-[-0.04em]
            transition-all duration-500
            md:text-2xl
            ${
              scrolled
                ? "text-black"
                : "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            }
          `}
        >
          <span data-preloader-logo>{brand("name")}</span>

          <span
            className={`
              h-2 w-2 rounded-full
              transition-transform duration-300
              group-hover:scale-125
              ${scrolled ? "bg-black" : "bg-white"}
            `}
          />
        </a>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          ref={navRef}
          style={{
            opacity: 0,
            transform: "translateY(-50%)",
          }}
          className="
            hidden
            items-center
            gap-9
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.2em]
            lg:flex
            xl:gap-10
          "
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) =>
                scrollToSection(
                  event,
                  link.href.slice(1),
                )
              }
              className={`
                transition-colors
                duration-300
                ${
                  scrolled
                    ? "text-neutral-600 hover:text-black"
                    : "text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] hover:text-white"
                }
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ===================================================
            DESKTOP RIGHT SIDE
        =================================================== */}

        <div
          className="
            hidden
            items-center
            gap-3
            sm:flex
            lg:gap-4
          "
        >
          {/* LANGUAGE */}

          <div
            ref={languageRef}
            style={{
              opacity: 0,
              transform: "translateY(-50%)",
            }}
          >
            <LanguageSwitch scrolled={scrolled} />
          </div>

          {/* SOCIALS */}

          <div
            ref={socialsRef}
            style={{
              opacity: 0,
              transform: "translateY(-50%)",
            }}
            className="flex items-center gap-2"
          >
            {/* Instagram */}

            <a
              href="https://www.instagram.com/nasserjanzal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("instagram")}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                hover:scale-105
                ${
                  scrolled
                    ? "border-black/10 bg-white/60 text-black/70 hover:border-black/20 hover:bg-white hover:text-black"
                    : "border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-white hover:bg-black/30"
                }
              `}
            >
              <InstagramIcon />
            </a>

            {/* TikTok */}

            <a
              href="https://www.tiktok.com/@nasserjanzal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("tiktok")}
              className={`
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                hover:scale-105
                ${
                  scrolled
                    ? "border-black/10 bg-white/60 text-black/70 hover:border-black/20 hover:bg-white hover:text-black"
                    : "border-white/30 bg-black/20 text-white backdrop-blur-sm hover:border-white hover:bg-black/30"
                }
              `}
            >
              <TikTokIcon />
            </a>
          </div>

          {/* CTA */}

          <div
            ref={ctaRef}
            style={{
              opacity: 0,
              transform: "translateY(-50%)",
            }}
          >
            <Button
              onClick={(event) => {
                event.preventDefault();
                showForm();
              }}
            >
              {t("enquiry")}
            </Button>
          </div>
        </div>

        {/* ===================================================
            MOBILE RIGHT SIDE
        =================================================== */}

        <div
          ref={mobileRightRef}
          style={{
            opacity: 0,
            transform: "translateY(-50%)",
          }}
          className="flex items-center gap-2 sm:hidden"
        >
          {/* Language */}

          <LanguageSwitch scrolled={scrolled} />

          {/* Menu */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label={
              menuOpen
                ? t("closeMenu")
                : t("openMenu")
            }
            aria-expanded={menuOpen}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              transition-all
              duration-300
              ${
                scrolled || menuOpen
                  ? "border-black/10 bg-white/60 text-black"
                  : "border-white/30 bg-black/20 text-white backdrop-blur-sm"
              }
            `}
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-full
          overflow-hidden
          border-b
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          sm:hidden
          ${
            menuOpen
              ? "visible max-h-[calc(100dvh-80px)] opacity-100"
              : "invisible max-h-0 opacity-0"
          }
          ${
            scrolled
              ? "border-black/6 bg-white"
              : "border-black/6 bg-[#fafafa]"
          }
        `}
      >
        <div
          className={`
            max-h-[calc(100dvh-80px)]
            overflow-y-auto
            overscroll-contain
            ${
              scrolled
                ? "bg-white"
                : "bg-[#fafafa]"
            }
          `}
        >
          {/* NAVIGATION */}

          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) =>
                  handleNavigation(
                    event,
                    link.href.slice(1),
                  )
                }
                className="
                  group
                  flex
                  min-h-18
                  items-center
                  border-b
                  border-neutral-200/60
                  px-6
                  text-[15px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-neutral-900
                  transition-colors
                  duration-300
                  hover:text-neutral-500
                "
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* CONNECT */}

          <div
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
            "
          >
            <span
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-neutral-400
              "
            >
              {t("connect")}
            </span>

            <div className="flex items-center gap-2">
              {/* Instagram */}

              <a
                href="https://www.instagram.com/nasserjanzal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("instagram")}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-200
                  bg-white
                  text-neutral-800
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-neutral-400
                "
              >
                <InstagramIcon />
              </a>

              {/* TikTok */}

              <a
                href="https://www.tiktok.com/@nasserjanzal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("tiktok")}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-200
                  bg-white
                  text-neutral-800
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:border-neutral-400
                "
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ===============================================================
   INSTAGRAM
=============================================================== */

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

/* ===============================================================
   TIKTOK
=============================================================== */

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3.5 w-3.5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.043.87.128V9.38a6.34 6.34 0 0 0-.87-.06A6.34 6.34 0 0 0 3.14 15.66a6.34 6.34 0 0 0 6.34 6.34 6.34 0 0 0 6.34-6.34V7.81a8.16 8.16 0 0 0 3.77.94V6.69z" />
  </svg>
);

/* ===============================================================
   MENU
=============================================================== */

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </svg>
);

/* ===============================================================
   CLOSE
=============================================================== */

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

export default NavBar;