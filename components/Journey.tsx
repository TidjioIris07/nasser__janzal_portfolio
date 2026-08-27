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
          overflow-hidden
          rounded-3xl
          border
          border-neutral-200/80
          bg-neutral-50
          p-8
          text-neutral-950
          shadow-xl
          sm:p-12
          md:p-16
        "
      >
        {/* Background Image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/images/deskPhoto.avif"
            alt="Nasser Seated with Laptop"
            fill
            priority={false}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="
              object-cover
              object-right
              opacity-95
              md:object-top-right
            "
          />

          {/* Horizontal Gradient */}
          <div
            className="
              absolute
              inset-0
              bg-linear-to-r
              from-neutral-50
              via-neutral-50/80
              to-transparent
              sm:via-neutral-50/65
            "
          />

          {/* Vertical Gradient */}
          <div
            className="
              absolute
              inset-0
              bg-linear-to-t
              from-neutral-50/40
              via-transparent
              to-neutral-50/20
            "
          />
        </div>

        {/* Card Content */}
        <div className="relative z-10 max-w-4xl">
          <span
            className="
              mb-4
              block
              text-xs
              font-semibold
              uppercase
              tracking-[0.25em]
              text-neutral-500
            "
          >
            Core Philosophy
          </span>

          <blockquote
            className="
              font-sans
              text-2xl
              font-semibold
              leading-snug
              tracking-tight
              text-neutral-950
              sm:text-3xl
              sm:leading-tight
              md:text-4xl
              lg:text-[42px]
            "
          >
            “True influence is not about being seen everywhere—it is about
            creating an unmistakable presence that inspires elevation.”
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-0.5 w-10 bg-neutral-950" />

            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-neutral-800
              "
            >
              Nasser — Dubai, UAE
            </span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Journey;