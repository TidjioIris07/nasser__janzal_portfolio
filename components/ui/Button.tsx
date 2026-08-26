import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "dark" | "light";
  showArrow?: boolean;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "children"
>;

const VARIANT_STYLES: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  dark: "bg-black text-white focus-visible:ring-black",
  light: "bg-white text-neutral-900 focus-visible:ring-neutral-900",
};

const Button = ({
  href,
  children,
  variant = "dark",
  showArrow = true,
  className = "",
  ...anchorProps
}: ButtonProps) => {
  return (
    <a
      href={href}
      className={`
        group inline-flex items-center gap-2
        rounded-full px-6 py-3
        text-xs font-semibold tracking-wide
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        ${VARIANT_STYLES[variant]}
        ${className}
      `}
      {...anchorProps}
    >
      {children}

      {showArrow && (
        <span
          aria-hidden
          className="
            inline-block
            transition-transform
            duration-300
            ease-out
            group-hover:translate-x-1
          "
        >
          →
        </span>
      )}
    </a>
  );
};

export default Button;