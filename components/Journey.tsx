"use client";

import Image from "next/image";

const Journey = () => {
  return (
    <section
      id="journey"
      className="
        relative
        z-20
        w-full
        overflow-hidden
        border-t
        border-neutral-200/70
        bg-white
        py-32
        text-neutral-900
      "
    >
      <div className="mx-auto w-full max-w-360 px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div
          className="
            mb-16
            flex
            flex-col
            justify-between
            gap-8
            md:mb-20
            md:flex-row
            md:items-end
          "
        >
          <div>
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                whitespace-nowrap
                rounded-full
                bg-neutral-100
                px-3
                py-1
                text-[11px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-neutral-600
              "
            >
              <span>01 / Legacy &amp; Evolution</span>
            </div>

            <h2
              className="
                font-brand
                text-3xl
                font-extrabold
                uppercase
                tracking-tight
                text-black
                md:text-5xl
                lg:text-6xl
              "
            >
              The Journey
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-sm
              font-light
              leading-relaxed
              text-black/60
              sm:text-base
            "
          >
            A narrative of relentless ambition, uncompromising aesthetic
            standards, and enduring cultural impact in the heart of the
            United Arab Emirates.
          </p>
        </div>

        {/* Core Philosophy Card */}
        <div
          className="
            relative
            h-91.25
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-neutral-200/80
            bg-neutral-50
            shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]
            sm:h-100
            md:h-107.5
            lg:h-103.5
            xl:h-103.5
          "
        >
          {/* Background Image */}
          <Image
            src="/images/deskPhoto.avif"
            alt="Nasser working at his desk in Dubai"
            fill
            priority={false}
            sizes="100vw"
            className="
              object-fill
              object-right
            "
          />

          {/* Gradient Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-linear-to-r
              from-white
              from-0%
              via-white
              via-70%
              to-white/10
              to-100%
              opacity-60
              sm:via-white/95
              sm:via-58%
              md:via-white/90
              md:via-50%
              lg:via-white/92
              lg:via-42%
            "
          />

          {/* Card Content */}
          <div
            className="
              relative
              z-10
              flex
              h-full
              w-full
              items-center
              p-7
              sm:p-10
              md:p-12
            "
          >
            <div className="max-w-190">
              <blockquote
                className="
                  font-sans
                  text-[27px]
                  font-semibold
                  leading-[1.16]
                  tracking-tight
                  text-neutral-950
                  sm:text-[30px]
                  md:text-[34px]
                  lg:text-[39px]
                  xl:text-[41px]
                "
              >
                <span
                  className="
                    mb-7
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-neutral-500
                    sm:text-xs
                  "
                >
                  Core Philosophy
                </span>

                &ldquo;True influence is not about being seen everywhere—it is
                about creating an unmistakable presence that inspires
                elevation.&rdquo;

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    gap-4
                    sm:mt-8
                    sm:gap-5
                  "
                >
                  <div className="h-px w-10 shrink-0 bg-neutral-950 sm:w-11" />

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.24em]
                      text-neutral-800
                    "
                  >
                    Nasser — Dubai, UAE
                  </span>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;