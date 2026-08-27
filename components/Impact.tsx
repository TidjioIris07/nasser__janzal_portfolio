"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import VideoCarousel from "./ui/VideoCarousel";

const Impact = () => {
  const t = useTranslations("impact");
  const data = [
    { region: t("uae"), percentage: 54 },
    { region: t("gcc"), percentage: 28 },
    { region: t("europe"), percentage: 12 },
    { region: t("global"), percentage: 6 },
  ];
  return (
    <section
      id="impact"
      className="
        relative
        z-20
        w-full
        overflow-hidden
        border-t
        border-neutral-200/70
        bg-[#f6f6f7]
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
            gap-6
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
                bg-white
                px-3
                py-1
                text-[11px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-neutral-600
              "
            >
              <span>{t("eyebrow")}</span>
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
              {t("title")}
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
            {t("intro")}
          </p>
        </div>

        {/* Audience Distribution Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="
              rounded-3xl
              border
              border-neutral-200/60
              bg-white
              p-8
              shadow-[0_20px_25px_-5px_rgba(0,0,0,0.06),0_8px_10px_-6px_rgba(0,0,0,0.05)]
              sm:p-10
              md:p-12
            "
          >
            {/* Card Header */}
            <div
              className="
                mb-8
                flex
                flex-col
                justify-between
                gap-4
                md:flex-row
                md:items-center
              "
            >
              <div>
                <h3
                  className="
                    font-display
                    text-xl
                    font-bold
                    uppercase
                    text-neutral-950
                    sm:text-2xl
                  "
                >
                  {t("distribution")}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    font-light
                    text-neutral-500
                    sm:text-sm
                  "
                >
                  {t("analytics")}
                </p>
              </div>

              <span
                className="
                  self-start
                  rounded-full
                  bg-neutral-100
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  uppercase
                  tracking-widest
                  text-neutral-700
                  md:self-auto
                "
              >
                {t("focus")}
              </span>
            </div>

            {/* Data */}
            <div className="space-y-6">
              {data.map((item, index) => (
                <motion.div
                  key={item.region}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-xs font-medium sm:text-sm">
                    <span className="text-neutral-800">
                      {item.region}
                    </span>

                    <span className="font-semibold text-neutral-950">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                    <motion.div
                      className="h-full rounded-full bg-neutral-900"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: index * 0.12 + 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Video Carousel */}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Impact;
