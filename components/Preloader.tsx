"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { useTranslations } from "next-intl";

interface PreloaderProps {
  onFinish?: () => void;
  onLogoMerge?: () => void;
}

export default function Preloader({
  onFinish,
  onLogoMerge,
}: PreloaderProps) {
  const t = useTranslations("preloader");
  const brand = useTranslations("brand");

  const curtainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const curtain = curtainRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const progressWrap = progressWrapRef.current;
    const progress = progressRef.current;
    const progressText = progressTextRef.current;

    if (
      !curtain ||
      !title ||
      !subtitle ||
      !progressWrap ||
      !progress ||
      !progressText
    ) {
      document.body.style.overflow = "";
      return;
    }

    const isMobile = window.matchMedia(
      "(max-width: 767px)",
    ).matches;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let finished = false;

    const finishPreloader = () => {
      if (finished) return;

      finished = true;

      document.body.style.overflow = "";

      window.dispatchEvent(
        new Event("preloader:finished"),
      );

      onFinish?.();

      setVisible(false);
    };

    /*
     * -------------------------------------------------------
     * SAFETY FALLBACK
     * -------------------------------------------------------
     */

    const fallbackTimer = window.setTimeout(() => {
      finishPreloader();
    }, 5000);

    /*
     * -------------------------------------------------------
     * GSAP CONTEXT
     * -------------------------------------------------------
     */

    const ctx = gsap.context(() => {
      /*
       * -----------------------------------------------------
       * INITIAL STATES
       * -----------------------------------------------------
       *
       * These states are also defined directly in JSX.
       * This prevents any flash before GSAP initializes.
       */

      gsap.set(curtain, {
        yPercent: 0,
      });

      gsap.set(title, {
        y: 70,
        opacity: 0,
        ...(isMobile ? {} : { filter: "blur(18px)" }),
      });

      gsap.set(subtitle, {
        y: 25,
        opacity: 0,
        ...(isMobile ? {} : { filter: "blur(8px)" }),
      });

      gsap.set(progressWrap, {
        opacity: 0,
        y: 15,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      /*
       * -----------------------------------------------------
       * REDUCED MOTION
       * -----------------------------------------------------
       */

      if (reduceMotion) {
        gsap.set(title, {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });

        gsap.set(subtitle, {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });

        gsap.set(progressWrap, {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });

        gsap.set(progress, {
          scaleX: 1,
        });

        progressText.textContent = "100%";

        gsap.to(curtain, {
          yPercent: -100,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            window.clearTimeout(fallbackTimer);
            finishPreloader();
          },
        });

        return;
      }

      /*
       * -----------------------------------------------------
       * INTRO TIMELINE
       * -----------------------------------------------------
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /*
       * -----------------------------------------------------
       * TITLE
       * -----------------------------------------------------
       */

      intro.to(title, {
        y: 0,
        opacity: 1,
        ...(isMobile ? {} : { filter: "blur(0px)" }),
        duration: 1.1,
      });

      /*
       * -----------------------------------------------------
       * SUBTITLE
       * -----------------------------------------------------
       */

      intro.to(
        subtitle,
        {
          y: 0,
          opacity: 1,
          ...(isMobile ? {} : { filter: "blur(0px)" }),
          duration: 0.8,
        },
        "-=0.65",
      );

      /*
       * -----------------------------------------------------
       * PROGRESS CONTAINER
       * -----------------------------------------------------
       */

      intro.to(
        progressWrap,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.35",
      );

      /*
       * -----------------------------------------------------
       * PROGRESS ANIMATION
       * -----------------------------------------------------
       */

      const progressValue = {
        value: 0,
      };

      const loading = gsap.to(progressValue, {
        value: 100,
        duration: 2.4,
        delay: 0.05,
        ease: "power2.out",

        onUpdate: () => {
          const value = Math.round(progressValue.value);

          gsap.set(progress, {
            scaleX: progressValue.value / 100,
          });

          progressText.textContent = `${value}%`;
        },
      });

      /*
       * -----------------------------------------------------
       * AFTER LOADING
       * -----------------------------------------------------
       */

      loading.then(() => {
        if (finished) return;

        const outro = gsap.timeline();

        /*
         * ---------------------------------------------------
         * HIDE SUBTITLE + PROGRESS
         * ---------------------------------------------------
         */

        outro.to(
          [subtitle, progressWrap],
          {
            opacity: 0,
            y: 10,
            ...(isMobile ? {} : { filter: "blur(5px)" }),
            duration: 0.35,
            ease: "power2.inOut",
          },
        );

        /*
         * ---------------------------------------------------
         * MERGE NASSER INTO NAVBAR
         * ---------------------------------------------------
         */

        outro.add(() => {
          const target = document.querySelector(
            "[data-preloader-logo]",
          ) as HTMLElement | null;

          if (!target) {
            return;
          }

          const titleRect =
            title.getBoundingClientRect();

          const targetRect =
            target.getBoundingClientRect();

          const titleCenterX =
            titleRect.left +
            titleRect.width / 2;

          const titleCenterY =
            titleRect.top +
            titleRect.height / 2;

          const targetCenterX =
            targetRect.left +
            targetRect.width / 2;

          const targetCenterY =
            targetRect.top +
            targetRect.height / 2;

          const x =
            targetCenterX - titleCenterX;

          const y =
            targetCenterY - titleCenterY;

          const scaleX =
            targetRect.width /
            titleRect.width;

          const scaleY =
            targetRect.height /
            titleRect.height;

          /*
           * Notify Navbar that the logo merge is starting.
           */

          onLogoMerge?.();

          /*
           * Merge animation.
           */

          gsap.to(title, {
            x,
            y,
            scaleX,
            scaleY,
            duration: 0.99,
            ease: "power3.inOut",
          });
        });

        /*
         * ---------------------------------------------------
         * CURTAIN REVEAL
         * ---------------------------------------------------
         */

        outro.to(
          curtain,
          {
            yPercent: -100,
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => {
              window.clearTimeout(fallbackTimer);
              finishPreloader();
            },
          },
          "+=0",
        );
      });
    }, curtainRef);

    /*
     * -------------------------------------------------------
     * CLEANUP
     * -------------------------------------------------------
     */

    return () => {
      window.clearTimeout(fallbackTimer);
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onFinish, onLogoMerge]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={curtainRef}
      className="
        preloader-curtain
        fixed
        inset-0
        z-999
        flex
        min-h-screen
        h-100vh
        w-screen
        flex-col
        justify-between
        overflow-hidden
        bg-black
        text-white
        select-none
        pointer-events-auto
      "
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {/* =====================================================
          TOP SPACER
      ====================================================== */}

      <div className="h-16 w-full shrink-0 sm:h-24" />

      {/* =====================================================
          CENTER BRAND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div className="inline-flex flex-col items-end">
          {/* =================================================
              NASSER
          ================================================== */}

          <h1
            ref={titleRef}
            className="
              font-brand
              text-[clamp(48px,14vw,140px)]
              font-bold
              uppercase
              leading-none
              tracking-[-0.04em]
            "
            style={{
              /*
               * IMPORTANT:
               * Must match GSAP's initial state.
               *
               * This guarantees the title remains hidden
               * before useEffect / GSAP executes.
               */
              opacity: 0,
              transform: "translateY(70px)",
              willChange: "transform, opacity",
            }}
          >
            {brand("name")}
          </h1>

          {/* =================================================
              SUBTITLE
          ================================================== */}

          <p
            ref={subtitleRef}
            className="
              mt-2
              self-end
              whitespace-nowrap
              text-right
              font-body
              text-[10px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-white/60
              sm:text-xs
              md:text-sm
            "
            style={{
              /*
               * IMPORTANT:
               * Must match GSAP's initial state.
               */
              opacity: 0,
              transform: "translateY(25px)",
              willChange: "transform, opacity",
            }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ====================================================== */}

      <div
        ref={progressWrapRef}
        className="
          relative
          z-20
          mt-auto
          hidden
          w-full
          shrink-0
          px-5
          pb-7
          md:block
          sm:px-10
          sm:pb-9
        "
        style={{
          /*
           * IMPORTANT:
           * The whole progress section is hidden from the
           * very first render.
           */
          opacity: 0,
          transform: "translateY(15px)",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="
            mb-2.5
            flex
            items-center
            justify-between
            font-mono
            text-[11px]
            tracking-widest
            text-white/70
            sm:text-xs
          "
        >
          <span>0%</span>

          <span
            ref={progressTextRef}
            className="font-semibold text-white/90"
          >
            0%
          </span>
        </div>

        <div
          className="
            relative
            h-0.5
            w-full
            overflow-hidden
            bg-white/15
          "
        >
          <div
            ref={progressRef}
            className="
              absolute
              inset-y-0
              left-0
              w-full
              origin-left
              bg-white
            "
            style={{
              /*
               * IMPORTANT:
               * The progress bar itself must also start at 0.
               * Otherwise the white bar can briefly appear before
               * GSAP applies scaleX(0).
               */
              transform: "scaleX(0)",
              transformOrigin: "left center",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    </div>
  );
}
