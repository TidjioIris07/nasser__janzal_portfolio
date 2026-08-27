"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const LOGOS = [
  "Advisor Zone",
  "Easyway",
  "Expert Plus",
  "Positive Zone",
  "EBMS",
  "EBMS Realestate",
];

const LogoMarquee = () => {
  const t = useTranslations("marquee");
  const marqueeItems = [...LOGOS, ...LOGOS];
  const logoLabels = [
    t("advisorZone"),
    t("easyway"),
    t("expertPlus"),
    t("positiveZone"),
    t("ebms"),
    t("ebmsRealEstate"),
  ];

  return (
    <section
      aria-label={t("label")}
      className="relative overflow-hidden border-t border-b border-black/6 bg-white py-16"
    >
      <p className="mb-10 text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-black/40 sm:text-xs">
        {t("title")}
      </p>

      {/* Narrower marquee viewport */}
      <div
        className="
          group relative mx-auto w-[85%] max-w-6xl overflow-hidden
          sm:w-[80%]
          lg:w-[75%]
          mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
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
                alt={index < LOGOS.length ? logoLabels[index] : ""}
                width={160}
                height={64}
                sizes="(max-width: 640px) 150px, (max-width: 1024px) 190px, 220px"
                loading="lazy"
                className="
                  h-11 w-auto max-w-40
                  object-contain
                  opacity-85
                  transition-all duration-300
                  hover:opacity-100
                  sm:h-13 sm:max-w-45.5
                  lg:h-15 lg:max-w-55
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
