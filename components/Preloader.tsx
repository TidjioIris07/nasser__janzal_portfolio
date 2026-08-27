"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinish?: () => void;
  onLogoMerge?: () => void;
}

export default function Preloader({
  onFinish,
  onLogoMerge,
}: PreloaderProps) {
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
      return;
    }

    const ctx = gsap.context(() => {
      const progressValue = { value: 0 };

      /*
       * -------------------------------------------------------
       * INITIAL STATES
       * -------------------------------------------------------
       */

      // Full black screen.
      gsap.set(curtain, {
        yPercent: 0,
      });

      // NASSER enters from below, blurred and invisible.
      gsap.set(title, {
        y: 70,
        opacity: 0,
        filter: "blur(18px)",
      });

      // Subtitle follows slightly behind.
      gsap.set(subtitle, {
        y: 25,
        opacity: 0,
        filter: "blur(8px)",
      });

      // Progress starts empty.
      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(progressWrap, {
        opacity: 1,
      });

      /*
       * -------------------------------------------------------
       * INTRO
       * -------------------------------------------------------
       */

      const intro = gsap.timeline();

      intro.to(title, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      });

      intro.to(
        subtitle,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.65",
      );

      /*
       * -------------------------------------------------------
       * PROGRESS
       * -------------------------------------------------------
       */

      const loading = gsap.to(progressValue, {
        value: 100,
        duration: 2.4,
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
       * -------------------------------------------------------
       * AFTER LOADING
       * -------------------------------------------------------
       */

      loading.then(() => {
        const outro = gsap.timeline();

        /*
         * Hide subtitle + progress.
         */

        outro.to(
          [subtitle, progressWrap],
          {
            opacity: 0,
            y: 10,
            filter: "blur(5px)",
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

          if (!target) return;

          const titleRect = title.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();

          const titleCenterX =
            titleRect.left + titleRect.width / 2;

          const titleCenterY =
            titleRect.top + titleRect.height / 2;

          const targetCenterX =
            targetRect.left + targetRect.width / 2;

          const targetCenterY =
            targetRect.top + targetRect.height / 2;

          const x = targetCenterX - titleCenterX;
          const y = targetCenterY - titleCenterY;

          const scaleX =
            targetRect.width / titleRect.width;

          const scaleY =
            targetRect.height / titleRect.height;

          gsap.to(title, {
            x,
            y,
            scaleX,
            scaleY,
            duration: 0.99,
            ease: "power3.inOut",
            onStart: () => {
              onLogoMerge?.();
            },
          });
        });

        /*
         * ---------------------------------------------------
         * BOTTOM → TOP
         * ---------------------------------------------------
         *
         * The entire black curtain moves upward.
         *
         * This reveals the page from the bottom first.
         */

        outro.to(
          curtain,
          {
            yPercent: -100,
            duration: 1.5,
            ease: "power4.inOut",

            onComplete: () => {
              setVisible(false);
              document.body.style.overflow = "";

              window.dispatchEvent(new Event("preloader:finished"));

              onFinish?.();
            },
          },
        );
      });
    }, curtainRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onFinish, onLogoMerge]);

  if (!visible) return null;

  return (
    <div
      ref={curtainRef}
      className="
        preloader-curtain
        fixed
        inset-0
        z-999
        flex
        h-100dvh
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
          {/* NASSER */}

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
              willChange:
                "transform, opacity, filter",
            }}
          >
            NASSER
          </h1>

          {/* SUBTITLE */}

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
              willChange:
                "transform, opacity, filter",
            }}
          >
            AN EMIRATI INFLUENCER
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
          w-full
          shrink-0
          px-5
          pb-7
          sm:px-10
          sm:pb-9
          hidden
          md:block
        "
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
          />
        </div>
      </div>
    </div>
  );
}