"use client";

import Image from "next/image";

import Button from "./ui/Button";
import { ArrowDown } from "lucide-react";

const MARQUEE_TEXT =
  "INFLUENCER • CREATOR • ENTREPRENEUR • BRAND AMBASSADOR • MEDIA PERSONALITY • PUBLIC FIGURE • LIFESTYLE • PARTNERSHIPS • EVENTS • UAE • ";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-10 h-screen w-full overflow-hidden bg-white"
    >
      {/* =========================================================
          HERO INNER
      ========================================================= */}
      <div className="hero-inner sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
        {/* =======================================================
            BACKGROUND VIDEO
        ======================================================= */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-neutral-900 pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="h-full w-full object-cover object-left opacity-90 transition-opacity duration-1000 sm:object-center"
          >
            <source
              src="/videos/the_background_video.mp4"
              type="video/mp4"
            />
          </video>

          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-white/70" />
        </div>

        {/* =======================================================
            LARGE MARQUEE
        ======================================================= */}
        <div
          className="
            absolute
            left-0
            top-[32%]
            z-10
            w-full
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

        {/* =======================================================
            WHITE FADE / LOWER GRADIENT
        ======================================================= */}
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

        {/* =======================================================
            PORTRAIT
        ======================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center">
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
            {/* <div className="portrait-fade-mask relative flex h-full w-full items-end justify-center"> */}
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

            {/* Bottom portrait fade */}
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

        {/* =======================================================
            HERO CONTENT
        ======================================================= */}
        <div className="relative z-30 flex h-full w-full flex-col justify-between">
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
            {/* =================================================
                TOP SPACER
            ================================================= */}
            <div className="w-full" />

            {/* =================================================
                BOTTOM CONTENT
            ================================================= */}
            <div
              className="
                pointer-events-auto
                flex
                w-full
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
              {/* ===============================================
                  LEFT CONTENT
              =============================================== */}
              <div
                className="
                  flex
                  max-w-sm
                  flex-col
                  items-start
                  sm:max-w-xl
                "
              >
                {/* Location badge */}
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

                {/* Main heading */}
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

                {/* SEO heading */}
                <h2 className="sr-only">
                  Influencer Nasser — Top Emarati Influencer & Dubai
                  Influencer in Dubai and Al Ain, UAE
                </h2>

                {/* Role */}
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
                  CREATOR • BRAND AMBASSADOR • VISIONARY
                </p>
              </div>

              {/* ===============================================
                  RIGHT CONTENT
              =============================================== */}
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
                {/* Description */}
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
                  An influential Emirati voice shaping{" "}
                  <strong className="font-semibold text-neutral-950">
                    digital culture
                  </strong>
                  , enterprise growth, and luxury brand partnerships across
                  the UAE.
                </p>

                {/* CTA */}
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

        {/* =======================================================
            SCROLL INDICATOR
        ======================================================= */}
        <div
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