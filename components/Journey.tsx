"use client";

import Image from "next/image";

const Journey = () => {
  return (
    <section
      id="journey"
      className="bg-white px-6 pt-10 pb-32 md:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <span className="mb-5 inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
              01 / Legacy &amp; Evolution
            </span>
            <h2 className="font-brand text-3xl font-extrabold uppercase text-black md:text-5xl lg:text-6xl">
              The Journey
            </h2>
          </div>

          <p className="max-w-md text-sm font-light leading-relaxed text-black/60 sm:text-base">
            A narrative of relentless ambition, uncompromising aesthetic
            standards, and enduring cultural impact in the heart of the
            United Arab Emirates.
          </p>
        </div>

        

{/* Core Philosophy Card */}
<div
  className="
    relative
    h-[365px]
    w-full
    overflow-hidden

    rounded-3xl

    border
    border-neutral-200/80

    bg-neutral-50

    shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]

    sm:h-[400px]

    md:h-[430px]

    lg:h-[414px]

    xl:h-[414px]
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
      bg-gradient-to-r
      opacity-60
      from-white
      from-[0%]
      via-white
      via-[70%]
      to-white/10
      to-[100%]

      sm:via-white/95
      sm:via-[58%]

      md:via-white/90
      md:via-[50%]

      lg:via-white/92
      lg:via-[42%]
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
      p-12
    "
  >
    <div className="max-w-[760px]">
      <blockquote
        className="
          font-sans
          text-[27px]
          font-semibold
          leading-[1.16]
          tracking-[-0.025em]
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
