"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "white";
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
    "inline-flex items-center justify-center font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] cursor-pointer";

  const variantStyles = {
    primary:
      "bg-brand-orange hover:bg-brand-orange-hover text-white focus-visible:ring-brand-orange shadow-xs",
    secondary:
      "bg-brand-blue hover:bg-brand-blue-hover text-white focus-visible:ring-brand-blue shadow-xs",
    outline:
      "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue",
    white:
      "bg-white hover:bg-slate-100 text-brand-blue focus-visible:ring-white shadow-xs",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
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
