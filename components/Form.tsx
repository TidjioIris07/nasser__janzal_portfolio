"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

const Form = () => {
  const t = useTranslations("form");
  const contact = useTranslations("contact");
  const [isOpen, setIsOpen] = useState(false);
  const [scopeOpen, setScopeOpen] = useState(false);
  const [scope, setScope] = useState("Brand Partnership");
  const [hoveredScope, setHoveredScope] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const scopeOptions = [
    {
      value: "Brand Partnership",
      label: t("brand"),
    },
    {
      value: "Keynote Speaking",
      label: t("keynote"),
    },
    {
      value: "VIP Event Appearance",
      label: t("event"),
    },
    {
      value: "Editorial & Press",
      label: t("editorial"),
    },
    {
      value: "Private Consultation",
      label: t("consultation"),
    },
  ];

  const selectedScope =
    scopeOptions.find((option) => option.value === scope)?.label ??
    scopeOptions[0].label;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
      setIsOpen(false);
      setScopeOpen(false);
      setHoveredScope(null);
    };

    window.addEventListener("open-enquiry-form", handleOpen);
    window.addEventListener("close-enquiry-form", handleClose);

    return () => {
      window.removeEventListener("open-enquiry-form", handleOpen);
      window.removeEventListener("close-enquiry-form", handleClose);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!scopeOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-scope-dropdown]")) {
        setScopeOpen(false);
        setHoveredScope(null);
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
    setHoveredScope(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "We could not send your enquiry.");
      }

      form.reset();
      setScope("Brand Partnership");
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Your enquiry has been sent. A confirmation email is on its way.",
      );
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Overlay */}
      <button
        type="button"
        aria-label={t("closeForm")}
        onClick={closeForm}
        className="
          fixed
          inset-0
          cursor-default
          bg-black/60
          backdrop-blur-md
        "
      />

      {/* Modal */}
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
        {/* Close Button */}
        <button
          type="button"
          onClick={closeForm}
          aria-label={t("closeModal")}
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

        {/* Header */}
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
            {t("eyebrow")}
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
            {t("title")}
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
            {t("description")}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className={labelClasses}>
                {t("name")}
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder={t("namePlaceholder")}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                {t("email")}
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

          {/* Company + Scope */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Company */}
            <div>
              <label htmlFor="company" className={labelClasses}>
                {t("company")}
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder={t("companyPlaceholder")}
                className={inputClasses}
              />
            </div>

            {/* Engagement Scope */}
            <div className="min-w-0">
              <label htmlFor="scope" className={labelClasses}>
                {t("scope")}
              </label>

              <div
                className="relative w-full min-w-0"
                data-scope-dropdown
              >
                {/* Select Trigger */}
                <button
                  id="scope"
                  type="button"
                  onClick={() => {
                    setScopeOpen((prev) => !prev);
                    setHoveredScope(null);
                  }}
                  className={`
                    ${inputClasses}
                    flex
                    w-full
                    min-w-0
                    cursor-pointer
                    items-center
                    justify-between
                    gap-3
                    text-left
                  `}
                  aria-haspopup="listbox"
                  aria-expanded={scopeOpen}
                >
                  <span className="min-w-0 flex-1 truncate">
                    {selectedScope}
                  </span>

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

                {/* Dropdown */}
                {scopeOpen && (
                  <div
                    className="
                      absolute
                      left-0
                      right-0
                      top-[calc(100%+6px)]
                      z-50
                      w-full
                      overflow-hidden
                      rounded-xl
                      border
                      border-neutral-200
                      bg-white
                      p-1
                      shadow-xl
                    "
                    role="listbox"
                    aria-label={t("scope")}
                  >
                    {scopeOptions.map((option) => {
                      const isSelected = scope === option.value;
                      const isHovered = hoveredScope === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() =>
                            setHoveredScope(option.value)
                          }
                          onMouseLeave={() =>
                            setHoveredScope(null)
                          }
                          onClick={() => {
                            setScope(option.value);
                            setScopeOpen(false);
                            setHoveredScope(null);
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
                              isHovered ||
                              (isSelected && hoveredScope === null)
                                ? "bg-neutral-600 text-white"
                                : "bg-white text-neutral-700"
                            }
                          `}
                        >
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Hidden Form Value */}
                <input
                  type="hidden"
                  name="scope"
                  value={scope}
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              {t("message")}
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder={t("messagePlaceholder")}
              className={`
                ${inputClasses}
                resize-none
              `}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <span>{isSubmitting ? "Sending…" : t("submit")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {submissionStatus && (
            <p
              className={`text-center text-sm ${
                submissionStatus === "success"
                  ? "text-emerald-700"
                  : "text-red-600"
              }`}
              role="status"
              aria-live="polite"
            >
              {submissionMessage}
            </p>
          )}
        </form>

        {/* Contact Details */}
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
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-neutral-800" />
            <span>management@nasser.ae</span>
          </div>

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
            <span>{contact("whatsapp")}</span>
          </a>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-neutral-800" />
            <span>{contact("location")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
