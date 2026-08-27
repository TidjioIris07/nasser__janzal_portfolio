"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Videos = [
  "Nasser • Top Emirati Influencer in Dubai & Al Ain",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_2",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_3",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_4",
  "Nasser • Top Emirati Influencer in Dubai & Al Ain_5",
];

const VideoCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Touch already scrolls natively with momentum — only take over for mouse
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;

    isDragging.current = true;
    setIsPointerDown(true);
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;

    el.style.scrollSnapType = "none";
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollerRef.current;
    if (!el) return;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) velocity.current = (e.clientX - lastX.current) / dt;

    el.scrollLeft = startScrollLeft.current - (e.clientX - startX.current);

    lastX.current = e.clientX;
    lastTime.current = now;
  };

  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsPointerDown(false);

    const el = scrollerRef.current;
    if (!el) return;

    el.style.scrollSnapType = "x mandatory";

    // Small coast in the flick direction, then scroll-snap settles on the nearest card
    const flick = velocity.current * -180;
    if (Math.abs(flick) > 20) {
      el.scrollBy({ left: flick, behavior: "smooth" });
    }
  };

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
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        className={`
          flex
          w-full
          gap-5
          overflow-x-auto
          pb-4
          snap-x
          snap-mandatory
          overscroll-x-contain
          scrollbar-none
          select-none
          sm:gap-6
          ${isPointerDown ? "cursor-grabbing" : "cursor-grab"}
        `}
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
              w-[68vw]
              max-w-75
              shrink-0
              snap-start
              overflow-hidden
              rounded-2xl
              border
              border-neutral-200/80
              bg-neutral-950
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              sm:w-[42vw]
              sm:max-w-[280px]
              md:w-[30vw]
              md:max-w-[280px]
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
              draggable={false}
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