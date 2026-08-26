"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

const Form = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [scope, setScope] = useState("Brand Partnership");

  const scopeOptions = [
    {
      value: "Brand Partnership",
      label: "Brand Campaign & Ambassadorship",
    },
    {
      value: "Keynote Speaking",
      label: "Keynote Speaker / Panelist",
    },
    {
      value: "VIP Event Appearance",
      label: "VIP Event & Launch Host",
    },
    {
      value: "Editorial & Press",
      label: "Editorial Interview / Media Feature",
    },
    {
      value: "Private Consultation",
      label: "Private Strategy Advisory",
    },
  ];

  const selectedScope =
    scopeOptions.find((option) => option.value === scope)?.label ??
    scopeOptions[0].label;

  // Listen for the custom event used to open the form
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
      setIsOpen(false);
      setScopeOpen(false);
    };

    window.addEventListener("open-enquiry-form", handleOpen);
    window.addEventListener("close-enquiry-form", handleClose);

    return () => {
      window.removeEventListener("open-enquiry-form", handleOpen);
      window.removeEventListener("close-enquiry-form", handleClose);
    };
  }, []);

  // Prevent the page behind the modal from scrolling
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!scopeOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-scope-dropdown]")) {
        setScopeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [scopeOpen]);

  if (!isOpen) return null;

  const closeForm = () => {
    setIsOpen(false);
    setScopeOpen(false);
  };

  const inputClasses = `
    w-full
    rounded-xl
    border border-neutral-200
    bg-neutral-50
    px-4 py-3
    text-sm
    text-neutral-950
    placeholder:text-neutral-400
    transition-all
    focus:border-neutral-900
    focus:bg-white
    focus:outline-none
  `;

  const labelClasses = `
    mb-1.5
    block
    text-xs
    font-semibold
    uppercase
    tracking-wider
    text-neutral-700
  `;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <button
        type="button"
        aria-label="Close enquiry form"
        onClick={closeForm}
        className="
          fixed
          inset-0
          cursor-default
          bg-black/60
          backdrop-blur-md
        "
      />

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className="
          relative
          z-10
          my-8
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-neutral-100
          bg-white
          p-6
          shadow-2xl
          sm:p-10
        "
      >
        {/* =====================================================
            CLOSE BUTTON
        ====================================================== */}

        <button
          type="button"
          onClick={closeForm}
          aria-label="Close modal"
          className="
            absolute
            right-6
            top-6
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-neutral-100
            text-neutral-700
            transition-colors
            hover:bg-neutral-200
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 pr-10">
          <span
            className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-neutral-400
            "
          >
            Executive Representation & Bookings
          </span>

          <h3
            className="
              font-brand
              text-2xl
              font-extrabold
              text-neutral-950
              sm:text-3xl
            "
          >
            Send an Official Enquiry
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
            Connect directly with Nasser’s management team for brand
            partnerships, media appearances, and keynotes.
          </p>
        </div>

        {/* =====================================================
            FORM
        ====================================================== */}

        <form className="space-y-4">
          {/* ===================================================
              NAME + EMAIL
          ==================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Full Name */}

            <div>
              <label htmlFor="fullName" className={labelClasses}>
                Your Full Name *
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Tariq Al-Hashimi"
                className={inputClasses}
              />
            </div>

            {/* Email */}

            <div>
              <label htmlFor="email" className={labelClasses}>
                Official Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tariq@luxurybrand.com"
                className={inputClasses}
              />
            </div>
          </div>

          {/* ===================================================
              COMPANY + ENGAGEMENT SCOPE
          ==================================================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Company */}

            <div>
              <label htmlFor="company" className={labelClasses}>
                Brand / Company
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder="e.g. Dubai Luxury Group"
                className={inputClasses}
              />
            </div>

            {/* Engagement Scope */}

            <div>
              <label htmlFor="scope" className={labelClasses}>
                Engagement Scope
              </label>

              <div
                className="relative"
                data-scope-dropdown
              >
                {/* Dropdown trigger */}

                <button
                  id="scope"
                  type="button"
                  onClick={() => setScopeOpen((prev) => !prev)}
                  className={`
                    ${inputClasses}
                    flex
                    cursor-pointer
                    items-center
                    justify-between
                    text-left
                  `}
                  aria-haspopup="listbox"
                  aria-expanded={scopeOpen}
                >
                  <span>{selectedScope}</span>

                  <ChevronDown
                    className={`
                      h-4
                      w-4
                      shrink-0
                      text-neutral-500
                      transition-transform
                      duration-200
                      ${scopeOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* Dropdown options */}

                {scopeOpen && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-[calc(100%+6px)]
                      z-50
                      overflow-hidden
                      rounded-xl
                      border
                      border-neutral-200
                      bg-white
                      p-1
                      shadow-xl
                    "
                    role="listbox"
                    aria-label="Engagement Scope"
                  >
                    {scopeOptions.map((option) => {
                      const isSelected = scope === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setScope(option.value);
                            setScopeOpen(false);
                          }}
                          className={`
                            flex
                            w-full
                            cursor-pointer
                            items-center
                            justify-between
                            rounded-lg
                            px-3
                            py-2.5
                            text-left
                            text-sm
                            transition-colors
                            duration-150

                            ${
                              isSelected
                                ? "bg-neutral-100 text-neutral-950"
                                : "text-neutral-700 hover:bg-neutral-950 hover:text-white"
                            }
                          `}
                        >
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Hidden form value */}

                <input
                  type="hidden"
                  name="scope"
                  value={scope}
                />
              </div>
            </div>
          </div>

          {/* ===================================================
              MESSAGE
          ==================================================== */}

          <div>
            <label htmlFor="message" className={labelClasses}>
              Proposal & Message *
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Outline campaign objectives, deliverables, timeline, or event details..."
              className={`
                ${inputClasses}
                resize-none
              `}
            />
          </div>

          {/* ===================================================
              SUBMIT BUTTON
          ==================================================== */}

          <button
            type="submit"
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-neutral-950
              py-4
              text-sm
              font-medium
              text-white
              shadow-md
              transition-all
              hover:bg-neutral-800
              active:scale-[0.99]
            "
          >
            <span>Submit Executive Enquiry</span>

            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* =====================================================
            CONTACT DETAILS
        ====================================================== */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-neutral-100
            pt-6
            text-xs
            text-neutral-500
          "
        >
          {/* Email */}

          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-neutral-800" />

            <span>management@nasser.ae</span>
          </div>

          {/* WhatsApp */}

          <a
            href="https://wa.me/971508155158"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              font-medium
              text-emerald-700
              transition-colors
              hover:text-emerald-900
            "
          >
            <Phone className="h-3.5 w-3.5" />

            <span>WhatsApp: +971 50 815 5158</span>
          </a>

          {/* Location */}

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-neutral-800" />

            <span>Downtown Dubai, UAE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;