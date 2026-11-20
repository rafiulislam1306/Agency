"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "dark-primary" | "secondary" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: CTAButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-btn)] whitespace-nowrap shrink-0 transition-[background-color,border-color,color,scale,transform] duration-150 ease-[var(--ease-out-snappy)] motion-safe:active:scale-[0.98] motion-reduce:transition-none cursor-pointer";

  const variantStyles = {
    primary:
      "bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink",
    "dark-primary":
      "bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink",
    secondary:
      "bg-trust hover:bg-trust-hover text-white",
    outline:
      "border border-border-control bg-card text-ink hover:border-trust hover:text-trust hover:bg-trust-tint",
    white:
      "bg-card hover:bg-subtle text-ink border border-border-hairline",
  };

  // Enforce WCAG 2.2 SC 2.5.8 & Baymard 44px/48px minimum touch targets
  const sizeStyles = {
    sm: "min-h-11 px-4 py-2 text-sm",
    md: "min-h-11 px-6 py-2.5 text-sm",
    lg: "min-h-12 px-6 py-3 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  if (href) {
    if (
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:")
    ) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedStyles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedStyles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
