"use client";

import Image from "next/image";

const LOGOS = [
  "Advisor Zone",
  "Easyway",
  "Expert Plus",
  "Positive Zone",
  "EBMS",
  "EBMS Realestate",
];

const LogoMarquee = () => {
  const marqueeItems = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Brands and ventures Nasser has been featured with"
      className="relative overflow-hidden border-t border-black/[0.06] bg-white py-12"
    >
      <p className="mb-10 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-black/40 sm:text-xs">
        As Seen In &amp; Ventures
      </p>

      {/* Narrower marquee viewport */}
      <div
        className="
          group relative mx-auto w-[85%] max-w-6xl overflow-hidden
          sm:w-[80%]
          lg:w-[75%]
          [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
        "
      >
        {/* Moving track */}
        <div
          className="
            flex w-max items-center
            gap-14
            animate-marquee
            motion-reduce:animate-none
            group-hover:[animation-play-state:paused]
            sm:gap-18
            lg:gap-24
          "
          style={{ animationDuration: "36s" }}
        >
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="
                flex h-14 shrink-0
                items-center justify-center
                px-3
                sm:h-16
                lg:h-18
              "
              aria-hidden={index >= LOGOS.length}
            >
              <Image
                src={`/images/${logo}.avif`}
                alt={index < LOGOS.length ? logo : ""}
                width={240}
                height={100}
                sizes="(max-width: 640px) 150px, (max-width: 1024px) 190px, 220px"
                loading="lazy"
                className="
                  h-11 w-auto max-w-[160px]
                  object-contain
                  opacity-85
                  transition-all duration-300
                  hover:opacity-100
                  sm:h-13 sm:max-w-[190px]
                  lg:h-15 lg:max-w-[220px]
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;