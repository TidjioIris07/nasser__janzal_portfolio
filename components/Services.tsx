"use client";

import { showForm } from "@/utils/utils";
import ServiceCard from "./ui/ServiceCard";

interface Service {
  title: string;
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    title: "UGC Content Creation",
    description:
      "Authentic short-form videos brands use for paid ads & organic reach across GCC.",
    image: "/images/Seat With Laptop nasser.avif",
  },
  {
    title: "Modeling",
    description:
      "Print, lifestyle, fashion & commercial — luxury UAE campaigns & brand ambassadorships.",
    image: "/images/services_modeling.avif",
  },
  {
    title: "Acting",
    description:
      "On-screen for ads, films, web series, and executive brand storytelling.",
    image: "/images/services_acting.avif",
  },
  {
    title: "Brand Campaigns",
    description:
      "End-to-end promotional content — concept to ad-ready commercial creatives.",
    image: "/images/nasir.avif",
  },
  {
    title: "Viral Reels",
    description:
      "Comedy, lifestyle, and scroll-stopping reels engineered to spread fast and build genuine social proof.",
    image: "/images/services_reels.avif",
  },
  {
    title: "Long-term Partnerships",
    description:
      "Ambassadorships & influencer-led regional campaigns built on authentic audience chemistry.",
    image: "/images/services_partnerships.avif",
  },
];

const Services = () => {
  return (
    <section
      id="services"
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
            mb-20
            flex
            flex-col
            justify-between
            gap-8
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
                        rounded-full
                        bg-neutral-100
                        px-3
                        py-1
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-neutral-600
                        whitespace-nowrap
                    "
                >
                    <span>
                        04 / Core Services & Offerings
                    </span>
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
              What I Bring To The Table
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
            Delivering high-impact brand campaigns, modeling, acting, and
            executive influencer partnerships across the UAE and GCC.
          </p>
        </div>

        {/* Services */}
        <div className="w-full border-t border-neutral-200/80">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={String(index + 1).padStart(2, "0")}
              title={service.title}
              description={service.description}
              image={service.image}
              onClick={showForm}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;