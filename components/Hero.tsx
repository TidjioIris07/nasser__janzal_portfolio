import Image from "next/image";
import Button from "./ui/Button";

const MARQUEE_WORDS = [
  "INFLUENCER",
  "CREATOR",
  "ENTREPRENEUR",
  "BRAND AMBASSADOR",
  "MEDIA PERSONALITY",
  "PUBLIC FIGURE",
  "LIFESTYLE",
  "PARTNERSHIPS",
  "EVENTS",
  "UAE",
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        className="
          absolute inset-0 z-0
          h-full w-full
          object-cover
          max-md:w-[180%] max-md:max-w-none max-md:object-left
          md:w-[135%] md:object-left
          lg:w-full lg:object-center
        "
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/the_background_video.mp4" type="video/mp4" />
      </video>

      {/* Marquee ticker */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 overflow-hidden whitespace-nowrap opacity-[0.20] motion-reduce:hidden">
        <div className="animate-marquee flex w-max items-center">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <div key={i} className="flex items-center">
              <span
                className="mx-4 inline-block font-brand font-bold uppercase leading-none text-white sm:mx-6"
                style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}
              >
                {word}
              </span>

              <span
                className="font-brand font-bold leading-none text-white"
                style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}
              >
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Portrait */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center lg:pr-24">
        <Image
          src="/images/nasir.avif"
          alt="Nasser Janzal"
          width={900}
          height={1200}
          priority
          className="h-[46vh] w-auto object-contain object-bottom sm:h-[56vh] md:h-[68vh] lg:h-[88vh]"
        />
      </div>

      {/* Legibility gradient — above video/portrait, BELOW the text content.
          Two stops: mobile clears earlier because the text block takes up
          proportionally more of a short viewport than it does on desktop. */}
      <div
        className="
          pointer-events-none absolute inset-0 z-30
          bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.08)_28%,rgba(255,255,255,0.92)_50%,#ffffff_100%)]
          lg:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.05)_38%,rgba(255,255,255,0.9)_62%,#ffffff_100%)]
        "
      />

      {/* Hero content */}
      <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-10 lg:px-10 lg:pb-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-neutral-900 shadow-sm lg:mb-6 lg:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              UAE • Dubai
            </span>

            <h1 className="font-brand text-[clamp(2.75rem,15vw,7.5rem)] font-semibold uppercase leading-[0.85] tracking-tight text-neutral-950">
              Nasser
            </h1>

            <p className="mt-3 text-[11px] font-display font-medium uppercase tracking-[0.25em] text-neutral-500 sm:text-xs lg:mt-4 lg:tracking-[0.3em]">
              Creator • Brand Ambassador • Visionary
            </p>
          </div>

          <div className="max-w-sm lg:text-right">
            <p className="text-base leading-relaxed text-neutral-700 lg:text-lg">
              An influential Emirati voice shaping{" "}
              <strong className="font-semibold text-neutral-950">
                digital culture
              </strong>
              , enterprise growth, and{" "}
              <strong className="font-semibold text-neutral-950">
                luxury brand
              </strong>{" "}
              partnerships across the UAE.
            </p>

            <Button
              href=""
              className="mt-5 lg:mt-6 lg:ml-auto"
            >
              Discover My Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;