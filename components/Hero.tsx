"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import Image from "next/image";

import Button from "./ui/Button";

import { ArrowDown } from "lucide-react";

import gsap from "gsap";

import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("hero");
  const brand = useTranslations("brand");
  const accessibility = useTranslations("accessibility");

  const locale = useLocale();
  const isArabic = locale === "ar";

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Scroll animation refs */
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* Initial reveal refs */
  const locationRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  /*
   * -------------------------------------------------------
   * VIDEO
   * -------------------------------------------------------
   */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        /*
         * Some mobile browsers may block autoplay until
         * the first user interaction.
         *
         * The video will attempt to play again on the
         * first interaction.
         */
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, {
        once: true,
      });
    }

    const handleFirstInteraction = () => {
      playVideo();
    };

    window.addEventListener(
      "touchstart",
      handleFirstInteraction,
      {
        once: true,
        passive: true,
      },
    );

    window.addEventListener(
      "pointerdown",
      handleFirstInteraction,
      {
        once: true,
        passive: true,
      },
    );

    return () => {
      video.removeEventListener(
        "loadeddata",
        playVideo,
      );

      window.removeEventListener(
        "touchstart",
        handleFirstInteraction,
      );

      window.removeEventListener(
        "pointerdown",
        handleFirstInteraction,
      );
    };
  }, []);

  /*
   * -------------------------------------------------------
   * HERO / GSAP / SCROLL
   * -------------------------------------------------------
   */

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    const content = contentRef.current;
    const marquee = marqueeRef.current;
    const scrollIndicator =
      scrollIndicatorRef.current;

    const location = locationRef.current;
    const heading = headingRef.current;
    const role = roleRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;

    if (
      !hero ||
      !portrait ||
      !content ||
      !scrollIndicator ||
      !location ||
      !heading ||
      !role ||
      !description ||
      !button
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Mobile uses native browser scrolling.
     *
     * Desktop keeps the custom hero scroll interaction.
     */

    const isMobile = window.matchMedia(
      "(max-width: 767px)",
    ).matches;

    /*
     * -------------------------------------------------------
     * ELEMENT GROUPS
     * -------------------------------------------------------
     */

    const revealElements = [
      location,
      heading,
      role,
      description,
      button,
      scrollIndicator,
      ...(marquee ? [marquee] : []),
    ];

    /*
     * -------------------------------------------------------
     * INITIAL HERO REVEAL
     * -------------------------------------------------------
     */

    let introPlayed = false;
    let heroCtx: gsap.Context | null = null;

    const animateHero = () => {
      if (introPlayed) return;

      introPlayed = true;

      if (reduceMotion) {
        gsap.set(revealElements, {
          clearProps: "all",
          y: 0,
          opacity: 1,
        });

        return;
      }

      heroCtx = gsap.context(() => {
        /*
         * Keep the initial state synchronized with the
         * opacity-0 / translate-y-6 classes in the markup.
         *
         * This prevents any visible flash before animation.
         */

        gsap.set(revealElements, {
          y: 24,
          opacity: 0,
        });

        const reveal = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (marquee) {
          reveal.to(marquee, {
            y: 0,
            opacity: 1,
            duration: 0.8,
          });
        }

        reveal
          .to(
            location,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            marquee ? "-=0.55" : 0,
          )
          .to(
            heading,
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
            },
            "-=0.5",
          )
          .to(
            role,
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
            },
            "-=0.48",
          )
          .to(
            description,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.4",
          )
          .to(
            button,
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
            },
            "-=0.4",
          )
          .to(
            scrollIndicator,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
            },
            "-=0.35",
          );
      }, hero);
    };

    /*
     * -------------------------------------------------------
     * WAIT FOR PRELOADER
     * -------------------------------------------------------
     */

    const handlePreloaderFinished = () => {
      animateHero();
    };

    window.addEventListener(
      "preloader:finished",
      handlePreloaderFinished,
    );

    const fallbackTimer = window.setTimeout(() => {
      if (introPlayed) return;

      const preloader = document.querySelector(
        ".preloader-curtain",
      );

      if (!preloader) {
        animateHero();
      }
    }, 100);

    /*
     * -------------------------------------------------------
     * MOBILE NATIVE SCROLL
     * -------------------------------------------------------
     */

    let mobileScrollHandler:
      | (() => void)
      | null = null;

    if (isMobile) {
      const renderMobile = () => {
        const viewportHeight = window.innerHeight;

        /*
         * Use the viewport as the mobile fade distance.
         *
         * This means the hero naturally transitions during
         * one screen of scrolling.
         */

        const progress = Math.min(
          1,
          Math.max(
            0,
            window.scrollY /
              Math.max(viewportHeight, 1),
          ),
        );

        if (reduceMotion) return;

        gsap.set(portrait, {
          y: progress * 70,
          opacity: 1 - progress,
        });

        const contentScale =
          1 + progress * 0.18;

        gsap.set(content, {
          scale: contentScale,
          opacity: 1 - progress,
        });

        if (marquee) {
          gsap.set(marquee, {
            scale: 1 + progress * 0.15,
            opacity: 1 - progress,
          });
        }

        gsap.set(scrollIndicator, {
          scale: 1 + progress * 0.1,
          opacity:
            progress > 0.02 ? 0 : 1,
        });
      };

      mobileScrollHandler = renderMobile;

      window.addEventListener(
        "scroll",
        mobileScrollHandler,
        {
          passive: true,
        },
      );

      renderMobile();

      return () => {
        heroCtx?.revert();

        window.removeEventListener(
          "preloader:finished",
          handlePreloaderFinished,
        );

        window.clearTimeout(fallbackTimer);

        if (mobileScrollHandler) {
          window.removeEventListener(
            "scroll",
            mobileScrollHandler,
          );
        }
      };
    }

    /*
     * -------------------------------------------------------
     * DESKTOP SCROLL CONFIG
     * -------------------------------------------------------
     */

    const fadeDistance = 1100;
    const smoothing = 0.075;

    let targetProgress = 0;
    let currentProgress = 0;

    let locked = false;
    let hasStartedScrolling = false;

    let touchY: number | null = null;
    let rafId: number | null = null;

    const clamp = (value: number) =>
      Math.min(1, Math.max(0, value));

    /*
     * -------------------------------------------------------
     * QUICK SETTERS
     * -------------------------------------------------------
     */

    const setPortraitY = gsap.quickSetter(
      portrait,
      "y",
      "px",
    );

    const setPortraitOpacity =
      gsap.quickSetter(
        portrait,
        "opacity",
      );

    const setContentScale = gsap.quickSetter(
      content,
      "scale",
    );

    const setContentOpacity =
      gsap.quickSetter(
        content,
        "opacity",
      );

    const setMarqueeScale = marquee
      ? gsap.quickSetter(marquee, "scale")
      : null;

    const setMarqueeOpacity = marquee
      ? gsap.quickSetter(
          marquee,
          "opacity",
        )
      : null;

    const setIndicatorScale =
      gsap.quickSetter(
        scrollIndicator,
        "scale",
      );

    const setIndicatorOpacity =
      gsap.quickSetter(
        scrollIndicator,
        "opacity",
      );

    /*
     * -------------------------------------------------------
     * SCROLL RENDER
     * -------------------------------------------------------
     */

    const render = (progress: number) => {
      const p = clamp(progress);

      setPortraitY(p * 130);
      setPortraitOpacity(1 - p);

      setContentScale(1 + p * 0.8);
      setContentOpacity(1 - p);

      if (
        marquee &&
        setMarqueeScale &&
        setMarqueeOpacity
      ) {
        setMarqueeScale(1 + p * 0.5);
        setMarqueeOpacity(1 - p);
      }

      if (!hasStartedScrolling) {
        setIndicatorScale(1);
        setIndicatorOpacity(1);
      } else {
        setIndicatorScale(1 + p * 0.25);
        setIndicatorOpacity(0);
      }
    };

    render(0);

    /*
     * -------------------------------------------------------
     * SCROLL LOCK
     * -------------------------------------------------------
     */

    const lockScroll = () => {
      if (locked) return;

      locked = true;

      document.documentElement.style.overflow =
        "hidden";

      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      if (!locked) return;

      locked = false;

      document.documentElement.style.overflow =
        "";

      document.body.style.overflow = "";
    };

    /*
     * -------------------------------------------------------
     * COMPLETE HERO
     * -------------------------------------------------------
     */

    const completeHero = () => {
      targetProgress = 1;
      currentProgress = 1;

      hasStartedScrolling = true;

      render(1);

      unlockScroll();
    };

    window.addEventListener(
      "hero:complete",
      completeHero,
    );

    /*
     * -------------------------------------------------------
     * RESTORE HERO
     * -------------------------------------------------------
     */

    const restoreHero = () => {
      targetProgress = 0;
      currentProgress = 0;

      hasStartedScrolling = false;

      gsap.killTweensOf([
        portrait,
        content,
        ...(marquee ? [marquee] : []),
        scrollIndicator,
        location,
        heading,
        role,
        description,
        button,
      ]);

      gsap.set(portrait, {
        y: 0,
        opacity: 1,
      });

      gsap.set(content, {
        scale: 1,
        opacity: 1,
      });

      if (marquee) {
        gsap.set(marquee, {
          scale: 1,
          opacity: 1,
        });
      }

      gsap.set(scrollIndicator, {
        scale: 1,
        opacity: 1,
      });

      if (!reduceMotion) {
        gsap.set(revealElements, {
          y: 24,
          opacity: 0,
        });

        const restore = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        if (marquee) {
          restore.to(marquee, {
            y: 0,
            opacity: 1,
            duration: 0.7,
          });
        }

        restore
          .to(
            location,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            marquee ? "-=0.45" : 0,
          )
          .to(
            heading,
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
            },
            "-=0.42",
          )
          .to(
            role,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
            },
            "-=0.4",
          )
          .to(
            description,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.36",
          )
          .to(
            button,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
            },
            "-=0.35",
          )
          .to(
            scrollIndicator,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
            },
            "-=0.3",
          );
      } else {
        gsap.set(revealElements, {
          y: 0,
          opacity: 1,
        });
      }

      document.documentElement.style.overflow =
        "hidden";

      document.body.style.overflow =
        "hidden";

      locked = true;
    };

    window.addEventListener(
      "hero:restore",
      restoreHero,
    );

    if (window.scrollY <= 1) {
      lockScroll();
    }

    /*
     * -------------------------------------------------------
     * APPLY DELTA
     * -------------------------------------------------------
     */

    const applyDelta = (delta: number) => {
      if (delta === 0) return;

      if (
        delta > 0 &&
        !hasStartedScrolling
      ) {
        hasStartedScrolling = true;

        gsap.to(scrollIndicator, {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      }

      const safeDelta = Math.max(
        -80,
        Math.min(80, delta),
      );

      targetProgress = clamp(
        targetProgress +
          safeDelta / fadeDistance,
      );

      if (targetProgress >= 1) {
        targetProgress = 1;

        currentProgress = Math.min(
          currentProgress,
          1,
        );

        unlockScroll();
      }

      if (targetProgress <= 0) {
        targetProgress = 0;
        currentProgress = 0;

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        lockScroll();
      }
    };

    /*
     * -------------------------------------------------------
     * WHEEL
     * -------------------------------------------------------
     */

    const handleWheel = (
      event: WheelEvent,
    ) => {
      if (locked) {
        event.preventDefault();

        applyDelta(event.deltaY);

        return;
      }

      if (
        event.deltaY < 0 &&
        window.scrollY <= 1
      ) {
        event.preventDefault();

        lockScroll();

        applyDelta(event.deltaY);
      }
    };

    /*
     * -------------------------------------------------------
     * KEYBOARD
     * -------------------------------------------------------
     */

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const isUpKey =
        event.key === "ArrowUp" ||
        event.key === "PageUp";

      const isDownKey =
        event.key === "ArrowDown" ||
        event.key === "PageDown";

      const isSpace =
        event.key === " " ||
        event.key === "Spacebar";

      if (locked) {
        let delta = 0;

        switch (event.key) {
          case "ArrowDown":
            delta = 70;
            break;

          case "ArrowUp":
            delta = -70;
            break;

          case "PageDown":
            delta = 220;
            break;

          case "PageUp":
            delta = -220;
            break;

          case " ":
          case "Spacebar":
            delta = event.shiftKey
              ? -220
              : 220;
            break;

          case "Home":
            delta = -fadeDistance;
            break;

          default:
            return;
        }

        event.preventDefault();

        applyDelta(delta);

        return;
      }

      if (
        isUpKey &&
        window.scrollY <= 1 &&
        targetProgress > 0
      ) {
        event.preventDefault();

        lockScroll();

        applyDelta(
          event.key === "PageUp"
            ? -220
            : -70,
        );

        return;
      }

      if (
        event.key === "Home" &&
        targetProgress > 0
      ) {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        restoreHero();

        return;
      }

      if (isDownKey || isSpace) {
        return;
      }
    };

    /*
     * -------------------------------------------------------
     * NORMAL SCROLL
     * -------------------------------------------------------
     */

    const handleScroll = () => {
      if (
        !locked &&
        window.scrollY <= 1
      ) {
        targetProgress = 1;
        currentProgress = 1;

        render(1);

        lockScroll();
      }
    };

    /*
     * -------------------------------------------------------
     * TOUCH
     *
     * Desktop/tablet custom interaction only.
     * Mobile is handled by native scrolling.
     * -------------------------------------------------------
     */

    const handleTouchStart = (
      event: TouchEvent,
    ) => {
      const touch = event.touches[0];

      if (!touch) return;

      touchY = touch.clientY;
    };

    const handleTouchMove = (
      event: TouchEvent,
    ) => {
      const touch = event.touches[0];

      if (
        !touch ||
        touchY === null ||
        !locked
      ) {
        return;
      }

      const delta =
        (touchY - touch.clientY) * 1.2;

      touchY = touch.clientY;

      event.preventDefault();

      applyDelta(delta);
    };

    const handleTouchEnd = () => {
      touchY = null;
    };

    /*
     * -------------------------------------------------------
     * SMOOTH LOOP
     * -------------------------------------------------------
     */

    const tick = () => {
      const difference =
        targetProgress - currentProgress;

      currentProgress +=
        difference * smoothing;

      if (
        Math.abs(difference) <
        0.0005
      ) {
        currentProgress =
          targetProgress;
      }

      render(currentProgress);

      rafId =
        requestAnimationFrame(tick);
    };

    /*
     * -------------------------------------------------------
     * EVENTS
     * -------------------------------------------------------
     */

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: false,
      },
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd,
    );

    rafId =
      requestAnimationFrame(tick);

    /*
     * -------------------------------------------------------
     * CLEANUP
     * -------------------------------------------------------
     */

    return () => {
      heroCtx?.revert();

      window.removeEventListener(
        "preloader:finished",
        handlePreloaderFinished,
      );

      window.clearTimeout(
        fallbackTimer,
      );

      window.removeEventListener(
        "hero:complete",
        completeHero,
      );

      window.removeEventListener(
        "hero:restore",
        restoreHero,
      );

      window.removeEventListener(
        "wheel",
        handleWheel,
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart,
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove,
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd,
      );

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      document.documentElement.style.overflow =
        "";

      document.body.style.overflow =
        "";
    };
  }, [isArabic]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="
        relative
        z-10
        h-screen
        w-full
        overflow-hidden
        bg-white
      "
    >
      {/* HERO INNER */}
      <div
        className="
          hero-inner
          sticky
          top-0
          flex
          h-screen
          w-full
          flex-col
          justify-between
          overflow-hidden
        "
      >
        {/* BACKGROUND VIDEO */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            h-full
            w-full
            select-none
            overflow-hidden
            bg-neutral-900
          "
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/nasir.avif"
            aria-hidden="true"
            className="
              h-full
              w-full
              object-cover
              object-left
              opacity-90
              sm:object-center
            "
          >
            <source
              src="/videos/the_background_video.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-linear-to-b
              from-black/20
              via-transparent
              to-white/70
            "
          />
        </div>

        {/* MARQUEE — hidden completely in Arabic */}
        {!isArabic && (
          <div
            ref={marqueeRef}
            className="
              absolute
              left-0
              top-[32%]
              z-10
              w-full
              origin-center
              translate-y-6
              overflow-hidden
              pointer-events-none
              select-none
              opacity-0
              sm:top-[35%]
            "
          >
            <div
              className="
                inline-flex
                whitespace-nowrap
              "
            >
              <span
                className="
                  pr-8
                  font-brand
                  font-bold
                  uppercase
                  leading-none
                  tracking-[-0.04em]
                  text-white/22
                  text-[clamp(90px,26vw,170px)]
                  sm:text-[clamp(140px,18vw,320px)]
                  animate-marquee
                "
              >
                {t("marquee")}
              </span>

              <span
                aria-hidden="true"
                className="
                  pr-8
                  font-brand
                  font-bold
                  uppercase
                  leading-none
                  tracking-[-0.04em]
                  text-white/22
                  text-[clamp(90px,26vw,170px)]
                  sm:text-[clamp(140px,18vw,320px)]
                "
              >
                {t("marquee")}
              </span>
            </div>
          </div>
        )}

        {/* WHITE LOWER GRADIENT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-15
          "
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 66%, rgba(255,255,255,0.28) 78%, rgba(255,255,255,0.85) 90%, #ffffff 98%)",
          }}
        />

        {/* PORTRAIT */}
        <div
          ref={portraitRef}
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            flex
            items-end
            justify-center
          "
        >
          <div
            className="
              relative
              flex
              h-[58vh]
              w-full
              max-w-215
              items-end
              justify-center
              sm:h-[78vh]
              md:h-[95vh]
              md:max-w-275
              lg:h-[98vh]
              lg:max-w-312.5
            "
          >
            <div
              className="
                relative
                flex
                h-[58vh]
                w-full
                max-w-215
                items-end
                justify-center
                sm:h-[78vh]
                md:h-[92vh]
                md:max-w-250
                lg:h-[92vh]
                lg:max-w-275
              "
            >
              <Image
                src="/images/nasir.avif"
                alt={t("portraitAlt")}
                fill
                priority
                loading="eager"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 1250px"
                className="
                  pointer-events-none
                  select-none
                  object-contain
                  object-bottom
                  drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                "
              />
            </div>

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-30
                h-44
                bg-linear-to-t
                from-white
                via-white/90
                to-transparent
                sm:h-56
              "
            />
          </div>
        </div>

        {/* HERO CONTENT */}
        <div
          className="
            relative
            z-30
            flex
            h-full
            w-full
            flex-col
            justify-between
          "
        >
          <div
            className="
              relative
              z-30
              mx-auto
              flex
              h-full
              w-full
              max-w-360
              flex-col
              justify-between
              px-5
              pt-20
              pb-8
              pointer-events-none
              sm:px-8
              sm:pt-28
              sm:pb-14
              md:px-12
              lg:px-16
            "
          >
            <div className="w-full" />

            <div
              ref={contentRef}
              className="
                pointer-events-auto
                flex
                w-full
                origin-center
                flex-col
                items-start
                justify-between
                gap-4
                sm:gap-6
                md:flex-row
                md:items-end
                md:gap-4
              "
            >
              {/* LEFT */}
              <div
                className="
                  flex
                  max-w-sm
                  flex-col
                  items-start
                  sm:max-w-xl
                "
              >
                {/* LOCATION */}
                <div
                  ref={locationRef}
                  className="
                    mb-2
                    inline-flex
                    translate-y-6
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-black/10
                    bg-white/90
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-700
                    opacity-0
                    shadow-xs
                    backdrop-blur-sm
                    sm:mb-3
                    sm:px-3.5
                    sm:py-1.5
                    sm:text-[11px]
                    sm:tracking-[0.2em]
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-500
                      shadow-[0_0_8px_rgba(16,185,129,0.8)]
                      sm:h-2
                      sm:w-2
                    "
                  />

                  <span>
                    {t("location")}
                  </span>
                </div>

                {/* HEADING */}
                <h1
                  ref={headingRef}
                  className="
                    translate-y-6
                    font-brand
                    text-4xl
                    font-bold
                    uppercase
                    leading-none
                    tracking-[-0.04em]
                    text-neutral-950
                    opacity-0
                    sm:text-6xl
                    md:text-7xl
                    lg:text-8xl
                  "
                >
                  {brand("name")}
                </h1>

                <h2 className="sr-only">
                  {accessibility(
                    "heroTitle",
                  )}
                </h2>

                {/* ROLE */}
                <p
                  ref={roleRef}
                  className="
                    mt-2.5
                    translate-y-6
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-600
                    opacity-0
                    sm:mt-4
                    sm:text-xs
                    sm:tracking-[0.25em]
                    md:text-sm
                  "
                >
                  {t("role")}
                </p>
              </div>

              {/* RIGHT */}
              <div
                className="
                  flex
                  max-w-xs
                  flex-col
                  items-start
                  sm:max-w-sm
                  md:items-end
                  md:text-right
                "
              >
                {/* DESCRIPTION */}
                <p
                  ref={descriptionRef}
                  className="
                    translate-y-6
                    text-xs
                    font-normal
                    leading-relaxed
                    text-neutral-800
                    opacity-0
                    sm:text-base
                    md:text-[17px]
                  "
                >
                  {t("description")}
                </p>

                {/* BUTTON */}
                <div
                  ref={buttonRef}
                  className="
                    translate-y-6
                    opacity-0
                  "
                >
                  <Button
                    href="#journey"
                    onClick={(event) => {
                      event.preventDefault();

                      window.dispatchEvent(
                        new Event(
                          "hero:complete",
                        ),
                      );

                      requestAnimationFrame(
                        () => {
                          const journey =
                            document.getElementById(
                              "journey",
                            );

                          if (!journey)
                            return;

                          journey.scrollIntoView(
                            {
                              behavior:
                                "smooth",
                              block: "start",
                            },
                          );

                          window.history.pushState(
                            null,
                            "",
                            "#journey",
                          );
                        },
                      );
                    }}
                    className="
                      mt-4
                      sm:mt-6
                      md:ml-auto
                    "
                  >
                    {t("discover")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div
          ref={scrollIndicatorRef}
          className="
            absolute
            bottom-6
            left-1/2
            z-30
            hidden
            -translate-x-1/2
            translate-y-6
            select-none
            flex-col
            items-center
            gap-2
            text-center
            pointer-events-none
            opacity-0
            sm:bottom-8
            sm:flex
          "
        >
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-black/15
              bg-white/70
              text-neutral-800
              shadow-xs
              backdrop-blur-xs
              animate-bounce
            "
          >
            <ArrowDown
              className="
                h-3.5
                w-3.5
                stroke-2
              "
              aria-hidden="true"
            />
          </div>

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-neutral-500
              sm:text-[11px]
            "
          >
            {t("scroll")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;