"use client";

import { motion } from "framer-motion";

const Videos = [
  "Nasser • Top Emirati Influencer in Dubai & Al Ain",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_2",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_3",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_4",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_5",
];

const VideoCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mt-24 w-full"
    >
      <div
        className="
          flex
          w-full
          gap-5
          overflow-x-auto
          pb-4
          snap-x
          snap-mandatory
          overscroll-x-contain
          scrollbar-none
          sm:gap-6
        "
      >
        {Videos.map((name, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              group
              relative
              aspect-9/16
              w-[72vw]
              max-w-75
              shrink-0
              snap-start
              overflow-hidden
              rounded-3xl
              border
              border-neutral-200/80
              bg-neutral-950
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              sm:w-[42vw]
              sm:max-w-70
              md:w-[30vw]
              md:max-w-70
              lg:w-[calc((100%-96px)/5)]
              lg:max-w-none
            "
          >
            <video
              src={`/videos/${encodeURIComponent(name)}.mp4`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.02]
              "
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                h-24
                bg-linear-to-t
                from-black/20
                to-transparent
                opacity-60
              "
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VideoCarousel;