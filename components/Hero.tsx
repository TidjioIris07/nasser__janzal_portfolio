"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./ui/Button";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

const MARQUEE_TEXT =
  "INFLUENCER • CREATOR • ENTREPRENEUR • BRAND AMBASSADOR • MEDIA PERSONALITY • PUBLIC FIGURE • LIFESTYLE • PARTNERSHIPS • EVENTS • UAE • ";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const portrait = portraitRef.current;
    const content = contentRef.current;
    const marquee = marqueeRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (
      !hero ||
      !portrait ||
      !content ||
      !marquee ||
      !scrollIndicator
    ) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /* ----------------------------------
       CONFIG
    ---------------------------------- */

    const fadeDistance = 1100;
    const smoothing = 0.075;

    /* ----------------------------------
       STATE
    ---------------------------------- */

    let targetProgress = 0;
    let currentProgress = 0;

    let locked = false;
    let hasStartedScrolling = false;

    let touchY: number | null = null;
    let rafId: number | null = null;

    /* ----------------------------------
       HELPERS
    ---------------------------------- */

    const clamp = (value: number) =>
      Math.min(1, Math.max(0, value));

    const setPortraitY = gsap.quickSetter(
      portrait,
      "y",
      "px"
    );

    const setPortraitOpacity = gsap.quickSetter(
      portrait,
      "opacity"
    );

    const setContentScale = gsap.quickSetter(
      content,
      "scale"
    );

    const setContentOpacity = gsap.quickSetter(
      content,
      "opacity"
    );

    const setMarqueeScale = gsap.quickSetter(
      marquee,
      "scale"
    );

    const setMarqueeOpacity = gsap.quickSetter(
      marquee,
      "opacity"
    );

    const setIndicatorScale = gsap.quickSetter(
      scrollIndicator,
      "scale"
    );

    const setIndicatorOpacity = gsap.quickSetter(
      scrollIndicator,
      "opacity"
    );

    /* ----------------------------------
       RENDER
    ---------------------------------- */

    const render = (progress: number) => {
      const p = clamp(progress);

      // Portrait moves down + fades
      setPortraitY(p * 130);
      setPortraitOpacity(1 - p);

      // Main content zooms IN + fades
      setContentScale(1 + p * 0.8);
      setContentOpacity(1 - p);

      // Marquee zooms IN + fades
      setMarqueeScale(1 + p * 0.5);
      setMarqueeOpacity(1 - p);

      // Indicator disappears after first interaction
      if (!hasStartedScrolling) {
        setIndicatorScale(1);
        setIndicatorOpacity(1);
      } else {
        setIndicatorScale(1 + p * 0.25);
        setIndicatorOpacity(0);
      }
    };

    render(0);

    /* ----------------------------------
       SCROLL LOCK
    ---------------------------------- */

    const lockScroll = () => {
      if (locked) return;

      locked = true;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      if (!locked) return;

      locked = false;

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    /*
     * Start locked when page is at the top.
     */
    if (window.scrollY <= 1) {
      lockScroll();
    }

    /* ----------------------------------
       APPLY DELTA
    ---------------------------------- */

    const applyDelta = (delta: number) => {
      if (delta === 0) return;

      /*
       * First downward interaction.
       */
      if (delta > 0 && !hasStartedScrolling) {
        hasStartedScrolling = true;

        gsap.to(scrollIndicator, {
          opacity: 0,
          scale: 0.85,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });
      }

      /*
       * Limit very large wheel/key jumps.
       */
      const safeDelta = Math.max(
        -80,
        Math.min(80, delta)
      );

      targetProgress = clamp(
        targetProgress + safeDelta / fadeDistance
      );

      /*
       * Hero completely faded.
       * Give scrolling back to browser.
       */
      if (targetProgress >= 1) {
        targetProgress = 1;
        currentProgress = Math.min(
          currentProgress,
          1
        );

        unlockScroll();
      }

      /*
       * Hero completely restored.
       */
      if (targetProgress <= 0) {
        targetProgress = 0;

        /*
         * Keep the browser at the very top while
         * the hero is taking control.
         */
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        lockScroll();
      }
    };

    /* ----------------------------------
       WHEEL
    ---------------------------------- */

    const handleWheel = (event: WheelEvent) => {
      /*
       * When hero is locked, wheel controls
       * the animation instead of the browser.
       */
      if (locked) {
        event.preventDefault();
        applyDelta(event.deltaY);
        return;
      }

      /*
       * IMPORTANT:
       *
       * If the hero is already faded and the user
       * reaches the top while scrolling upward,
       * immediately start reversing the animation.
       */
      if (
        event.deltaY < 0 &&
        window.scrollY <= 1
      ) {
        event.preventDefault();

        lockScroll();

        applyDelta(event.deltaY);
      }
    };

    /* ----------------------------------
       KEYBOARD
    ---------------------------------- */

    const handleKeyDown = (event: KeyboardEvent) => {
      const isUpKey =
        event.key === "ArrowUp" ||
        event.key === "PageUp";

      const isDownKey =
        event.key === "ArrowDown" ||
        event.key === "PageDown";

      const isSpace =
        event.key === " " ||
        event.key === "Spacebar";

      /*
       * --------------------------------
       * HERO IS LOCKED
       * --------------------------------
       */

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
            delta = event.shiftKey ? -220 : 220;
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

      /*
       * --------------------------------
       * HERO IS UNLOCKED
       * --------------------------------
       *
       * This is the important fix.
       *
       * When the hero has faded out and the user
       * presses ArrowUp/PageUp at the top, we
       * take control back and reverse the animation.
       */

      if (
        isUpKey &&
        window.scrollY <= 1 &&
        targetProgress > 0
      ) {
        event.preventDefault();

        lockScroll();

        applyDelta(
          event.key === "PageUp" ? -220 : -70
        );

        return;
      }

      /*
       * Home should also restore the hero.
       */
      if (
        event.key === "Home" &&
        targetProgress > 0
      ) {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "auto",
        });

        lockScroll();

        targetProgress = 0;
        currentProgress = 0;

        render(0);

        return;
      }

      /*
       * Normal browser scrolling remains untouched
       * when the user is further down the page.
       */
      if (isDownKey || isSpace) {
        return;
      }
    };

    /* ----------------------------------
       NORMAL SCROLL
    ---------------------------------- */

    const handleScroll = () => {
      /*
       * When the browser naturally comes back
       * to the very top, prepare the hero to
       * reverse on the next upward interaction.
       */
      if (!locked && window.scrollY <= 1) {
        targetProgress = 1;
        currentProgress = 1;

        render(1);

        lockScroll();
      }
    };

    /* ----------------------------------
       TOUCH
    ---------------------------------- */

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) return;

      touchY = touch.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (
        !touch ||
        touchY === null ||
        !locked
      ) {
        return;
      }

      const delta =
        (touchY - touch.clientY) * 1.5;

      touchY = touch.clientY;

      event.preventDefault();

      applyDelta(delta);
    };

    const handleTouchEnd = () => {
      touchY = null;
    };

    /* ----------------------------------
       SMOOTH ANIMATION LOOP
    ---------------------------------- */

    const tick = () => {
      const difference =
        targetProgress - currentProgress;

      currentProgress +=
        difference * smoothing;

      if (Math.abs(difference) < 0.0005) {
        currentProgress = targetProgress;
      }

      render(currentProgress);

      rafId = requestAnimationFrame(tick);
    };

    /* ----------------------------------
       EVENTS
    ---------------------------------- */

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      { passive: false }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd
    );

    rafId = requestAnimationFrame(tick);

    /* ----------------------------------
       CLEANUP
    ---------------------------------- */

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

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
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
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

        {/* MARQUEE */}
        <div
          ref={marqueeRef}
          className="
            absolute
            left-0
            top-[32%]
            z-10
            w-full
            origin-center
            overflow-hidden
            pointer-events-none
            select-none
            sm:top-[35%]
          "
        >
          <div
            className="
              inline-flex
              whitespace-nowrap
              will-change-transform
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
              {MARQUEE_TEXT}
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
              {MARQUEE_TEXT}
            </span>
          </div>
        </div>

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
            will-change-transform
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
                alt="Nasser — UAE Influencer & Visionary"
                fill
                priority
                loading="eager"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 1250px"
                className="
                  select-none
                  object-contain
                  object-bottom
                  pointer-events-none
                  drop-shadow-[0_12px_28px_rgba(0,0,0,0.18)]
                "
              />
            </div>

            {/* PORTRAIT BOTTOM FADE */}
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

            {/* ZOOMING CONTENT */}
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
                will-change-transform
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
                  className="
                    mb-2
                    inline-flex
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

                  <span>UAE • DUBAI</span>
                </div>

                {/* HEADING */}
                <h1
                  className="
                    font-brand
                    text-4xl
                    font-bold
                    uppercase
                    leading-none
                    tracking-[-0.04em]
                    text-neutral-950
                    sm:text-6xl
                    md:text-7xl
                    lg:text-8xl
                  "
                >
                  NASSER
                </h1>

                {/* SEO */}
                <h2 className="sr-only">
                  Influencer Nasser — Top Emarati
                  Influencer & Dubai Influencer in
                  Dubai and Al Ain, UAE
                </h2>

                {/* ROLE */}
                <p
                  className="
                    mt-2.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-600
                    sm:mt-4
                    sm:text-xs
                    sm:tracking-[0.25em]
                    md:text-sm
                  "
                >
                  CREATOR • BRAND AMBASSADOR •
                  VISIONARY
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
                <p
                  className="
                    text-xs
                    font-normal
                    leading-relaxed
                    text-neutral-800
                    sm:text-base
                    md:text-[17px]
                  "
                >
                  An influential Emirati voice
                  shaping{" "}
                  <strong className="font-semibold text-neutral-950">
                    digital culture
                  </strong>
                  , enterprise growth, and luxury
                  brand partnerships across the UAE.
                </p>

                <Button
                  href="#journey"
                  className="
                    mt-4
                    sm:mt-6
                    md:ml-auto
                  "
                >
                  Discover My Story
                </Button>
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
            select-none
            flex-col
            items-center
            gap-2
            text-center
            pointer-events-none
            will-change-transform
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
              className="h-3.5 w-3.5 stroke-2"
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
            SCROLL TO EXPLORE
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;