"use client";

import { showForm } from "@/utils/utils";
import Button from "./ui/Button";
import PartnerCard from "./ui/PartnerCard";

interface Partner {
    name: string;
    location: string;
    photo: string;
    details: string[];
}

const PARTNER: Partner[] = [
    {
        name: "EBMS",
        location: "Dubai, UAE",
        photo: "/images/EBMS.avif",
        details: [
            "Official digital media partner for Meydan Freezone Platinum Channel Partner announcements.",
            "Authored exclusive executive thought leadership content on corporate governance.",
        ],
    },
    {
        name: "EBMS Real Estate",
        location: "Dubai, UAE",
        photo: "/images/EBMS Realestate.avif",
        details: [
            "Featured brand host for prime commercial property tours and corporate real estate showcases.",
            "Facilitated high-level investor networking activations in Downtown Dubai & Business Bay.",
        ],
    },
    {
        name: "Advisor Zone",
        location: "Dubai, UAE",
        photo: "/images/Advisor Zone.avif",
        details: [
            "Served as key regional brand ambassador for high-net-worth investor onboarding in Dubai.",
            "Spearheaded strategic media campaigns reaching 5M+ regional founders across GCC.",
        ],
    },
    {
        name: "Expert Plus",
        location: "Dubai, UAE",
        photo: "/images/Expert Plus.avif",
        details: [
            "Produced exclusive digital storytelling series highlighting seamless business setup solutions.",
            "VIP Keynote speaker and brand partner for corporate launch events in Dubai.",
        ],
    },
    {
        name: "Positive Zone",
        location: "Dubai, UAE",
        photo: "/images/Positive Zone.avif",
        details: [
            "Led digital brand awareness initiatives driving 30%+ increase in enterprise inquiries.",
            "Featured brand ambassador showcasing turnkey incubator services in the UAE.",
        ],
    },
    {
        name: "Easyway",
        location: "Dubai, UAE",
        photo: "/images/Easyway.avif",
        details: [
            "Fronted express incorporation media campaigns highlighting 48-hour business setup.",
            "Collaborated on VIP founder spotlight series across social and digital channels.",
        ],
    },
];

const Partnership = () => {
    return (
        <section
            id="partnerships"
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
                            <span>03 / Brand Collaborations &amp; Timeline</span>
                        </div>

                        <h2
                            className="
                                font-brand
                                text-3xl
                                font-extrabold
                                uppercase
                                text-black
                                md:text-5xl
                                lg:text-6xl
                            "
                        >
                            Brand Partnerships
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
                        Collaborating with premier Dubai business setup, corporate
                        consultancy, and luxury real estate enterprises as an official
                        UAE brand ambassador and digital visionary.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative max-w-310 pl-6 sm:pl-10">
                    {/* Continuous timeline */}
                    <div
                        className="
                            absolute
                            left-6
                            top-4
                            bottom-4
                            -ml-2.5
                            md:ml-2.5
                            w-0.5
                            bg-neutral-300
                            sm:left-4.25
                        "
                    />

                    <div className="space-y-8">
                        {PARTNER.map((partner) => (
                            <div
                                key={partner.name}
                                className="group relative space-x-1.5"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="
                                        absolute
                                        -left-6
                                        top-6
                                        z-20
                                        h-4
                                        w-4
                                        rounded-full
                                        border-2
                                        border-neutral-950
                                        bg-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-neutral-950
                                        sm:-left-7.71
                                    "
                                />

                                <PartnerCard {...partner} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Request card */}
                <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-100/80 border border-neutral-200/80 text-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xs">
                  <div>
                    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-500 block mb-2">
                        Brand Ambassadorship & Partnerships
                    </span>

                    <h4 className="font-brand text-2xl sm:text-3xl font-extrabold text-neutral-950 leading-tight uppercase">
                        Partner with Nasser for your next UAE brand activation?
                    </h4>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light mt-2 max-w-xl">
                        Available for strategic brand ambassadorships, keynote speaking, commercial real estate showcases, and bespoke digital campaigns.
                    </p>
                  </div>

                  <Button
                    onClick={(event) => {
                        event.preventDefault();
                        showForm();
                    }}
                  >
                    Request Media Kit & Rates
                  </Button>
                </div>

            </div>
        </section>
    );
};

export default Partnership;