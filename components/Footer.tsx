"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import Button from "./ui/Button";

import { scrollToSection, scrollToTop, showForm } from "@/utils/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ================================
  // Navigation Links
  // ================================
  const navigationLinks = [
    {
      label: "Hero",
      href: "#hero",
    },
    {
      label: "The Journey",
      href: "#journey",
    },
    {
      label: "Impact & Reach",
      href: "#impact",
    },
    {
      label: "Partnerships",
      href: "#partnerships",
    },
    {
      label: "Core Services",
      href: "#services",
    },
  ];

  // ================================
  // Social Links
  // ================================
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/nasserjanzal",
      external: true,
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@nasserjanzal",
      external: true,
    },
    {
      label: "WhatsApp Chat ↗",
      href: "https://wa.me/971508155158",
      external: true,
      highlight: true,
    },
  ];

  // ================================
  // Executive Contact
  // ================================
  const contactLinks = [
    {
      type: "email",
      value: "management@nasser.ae",
      icon: Mail,
    },
    {
      type: "phone",
      value: "+971 50 815 5158",
      icon: Phone,
    },
  ];

  const location = {
    value: "Downtown Dubai, UAE",
  };

  return (
    <footer
      className="
        relative
        z-20
        w-full
        border-t
        border-neutral-200/80
        bg-white
        pt-20
        pb-12
        text-neutral-900
      "
    >
      <div className="mx-auto w-full max-w-360 px-6 md:px-12 lg:px-16">

        {/* =========================================
            TOP FOOTER CONTENT
        ========================================== */}
        <div
          className="
            flex
            flex-col
            items-start
            justify-between
            gap-12
            border-b
            border-neutral-200/80
            pb-16
            lg:flex-row
            lg:items-end
          "
        >
          {/* =========================================
              BRAND / DESCRIPTION
          ========================================== */}
          <div className="max-w-md">

            {/* Logo */}
            <div className="mb-4 flex items-center gap-2">
              <span
                className="
                  font-brand
                  text-2xl
                  font-bold
                  uppercase
                  tracking-[-0.04em]
                  text-neutral-950
                  md:text-3xl
                "
              >
                Nasser
              </span>

              <span className="h-2 w-2 rounded-full bg-neutral-950" />
            </div>

            {/* Description */}
            <p
              className="
                mb-6
                text-sm
                font-light
                leading-relaxed
                text-neutral-600
              "
            >
              Prominent Emirati influencer, brand ambassador, and digital
              visionary based in Dubai, UAE. Partnering with top GCC
              enterprises for high-impact media campaigns and luxury
              ambassadorships.
            </p>

            {/* CTA */}
            <Button
                onClick={(event) => {
                    event.preventDefault();
                    showForm();
                }}
            >
              Request Media Kit & Rates
            </Button>
          </div>

          {/* =========================================
              FOOTER LINKS
          ========================================== */}
          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-8
              text-xs
              uppercase
              tracking-wider
              text-neutral-600
              sm:grid-cols-3
              sm:gap-12
              lg:w-auto
            "
          >

            {/* =========================================
                NAVIGATION
            ========================================== */}
            <div>
              <span
                className="
                  mb-3
                  block
                  font-semibold
                  text-neutral-950
                "
              >
                Navigation
              </span>

              <ul className="space-y-2 font-light">
                {navigationLinks.map((link) => (
                    <li key={link.href}>
                    <a
                        href={link.href}
                        onClick={(event) =>
                        scrollToSection(event, link.href)
                        }
                        className="
                        transition-colors
                        hover:text-black
                        "
                    >
                        {link.label}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* =========================================
                OFFICIAL SOCIALS
            ========================================== */}
            <div>
              <span
                className="
                  mb-3
                  block
                  font-semibold
                  text-neutral-950
                "
              >
                Official Socials
              </span>

              <ul className="space-y-2 font-light">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={
                        social.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={
                        social.highlight
                          ? `
                            font-medium
                            text-emerald-700
                            transition-colors
                            hover:text-emerald-800
                          `
                          : `
                            transition-colors
                            hover:text-black
                          `
                      }
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* =========================================
                EXECUTIVE CONTACT
            ========================================== */}
            <div className="col-span-2 sm:col-span-1">
              <span
                className="
                  mb-3
                  block
                  font-semibold
                  text-neutral-950
                "
              >
                Executive Contact
              </span>

              <div
                className="
                  space-y-2.5
                  font-light
                  normal-case
                  text-neutral-600
                "
              >
                {/* Email + Phone */}
                {contactLinks.map((contact) => {
                  const Icon = contact.icon;

                  return (
                    <div
                      key={contact.type}
                      className="flex items-center gap-2"
                    >
                      <Icon
                        size={14}
                        className="shrink-0 text-neutral-950"
                      />

                      <span
                        className="
                          text-xs
                          transition-colors
                          duration-200
                          hover:text-black
                        "
                      >
                        {contact.value}
                      </span>
                    </div>
                  );
                })}

                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin
                    size={14}
                    className="shrink-0 text-neutral-950"
                  />

                  <span className="text-xs">
                    {location.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM FOOTER
        ========================================== */}
        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-between
            gap-4
            text-xs
            font-light
            text-neutral-500
            sm:flex-row
          "
        >
          {/* Copyright */}
          <div>
            © {currentYear} Nasser. All Rights Reserved. Crafted for
            luxury brand representation.
          </div>

          {/* Back To Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              text-[11px]
              uppercase
              tracking-widest
              text-neutral-600
              transition-colors
              hover:text-black
            "
          >
            <span>Back to top</span>

            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-neutral-300
                transition-colors
                duration-200
                hover:border-neutral-950
              "
            >
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;