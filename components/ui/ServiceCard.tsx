"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MouseEventHandler } from "react";

interface ServiceCardProps {
  index: string;
  title: string;
  description: string;
  image: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ServiceCard = ({
  index,
  title,
  description,
  image,
  onClick,
}: ServiceCardProps) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        relative
        cursor-pointer
        border-b
        border-neutral-200/80
        py-8
        transition-colors
        duration-300
        hover:bg-neutral-50/50
        sm:py-10
      "
    >
      {/* MAIN CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          min-h-15
          flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
          md:gap-8
        "
      >
        {/* LEFT — INDEX + TITLE */}

        <div
          className="
            flex
            items-start
            gap-6
            sm:gap-10
            md:w-1/2
            md:items-center
          "
        >
          <span
            className="
              shrink-0
              pt-1
              font-mono
              text-xs
              font-medium
              text-neutral-400
              sm:text-sm
              md:pt-0
            "
          >
            / {index}
          </span>

          <h3
            className="
              font-brand
              text-lg
              font-bold
              uppercase
              tracking-[-0.03em]
              text-neutral-950
              transition-opacity
              duration-300
              group-hover:opacity-0
              sm:text-xl
              md:text-2xl
            "
          >
            {title}
          </h3>
        </div>

        {/* RIGHT — DESCRIPTION + ARROW */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
            md:w-1/2
            md:justify-end
          "
        >
          <p
            className="
              max-w-md
              text-xs
              font-light
              text-neutral-500
              transition-opacity
              duration-300
              group-hover:opacity-0
              sm:text-sm
            "
          >
            {description}
          </p>

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-neutral-200
              bg-white
              text-neutral-800
              transition-all
              duration-300
              group-hover:border-neutral-950
              group-hover:bg-neutral-950
              group-hover:text-white
            "
          >
            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </div>
        </div>
      </div>

      {/* HOVER IMAGE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          overflow-hidden
          opacity-0
          transition-opacity
          duration-500
          ease-out
          group-hover:opacity-100
        "
      >
        <div
          className="
            relative
            flex
            h-full
            w-full
            items-center
            justify-start
            pl-16
            sm:pl-28
            md:pl-44
          "
        >
          <div
            style={{ position: "relative" }}
            className="
              h-[calc(100%+2px)]
              w-64
              overflow-hidden
              sm:w-80
              md:w-110
            "
          >
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              sizes="
                (max-width: 640px) 256px,
                (max-width: 768px) 320px,
                440px
              "
              className="
                absolute
                -inset-px
                h-[calc(100%+2px)]!
                w-[calc(100%+2px)]!
                max-w-none
                object-cover
                object-top
                scale-105
                transition-transform
                duration-700
                sm:object-[center_15%]
                group-hover:scale-100
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-10
                w-12
                bg-linear-to-r
                from-white
                via-white/85
                to-transparent
                sm:w-16
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-10
                w-12
                bg-linear-to-l
                from-white
                via-white/85
                to-transparent
                sm:w-16
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
