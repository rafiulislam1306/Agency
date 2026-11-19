"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import CTAButton from "./CTAButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on standalone conversion template pages
  if (pathname?.startsWith("/templates")) {
    return null;
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Resources", href: "/blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/logo.svg"
                alt="LeadGrow Logo"
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-brand-blue">
              LeadGrow<span className="text-brand-green">.</span>
            </span>
          </Link>

          {/* Zone 2: Clean single-line typography navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-xs ${
                  isActive(link.href)
                    ? "text-brand-blue border-brand-blue font-semibold"
                    : "text-slate-600 border-transparent hover:text-brand-blue hover:border-slate-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="hidden lg:flex items-center shrink-0">
            <CTAButton href="/contact" variant="primary" size="sm">
              Free Leak Audit
            </CTAButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="flex flex-col justify-between w-5 h-3.5">
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-transform duration-200 origin-left ${
                    isOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-transform duration-200 origin-left ${
                    isOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden transition-all duration-200 ease-out overflow-hidden ${
          isOpen
            ? "max-h-[460px] opacity-100 border-t border-slate-200 bg-white"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-slate-100 text-brand-blue font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-blue"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3">
            <CTAButton
              href="/contact"
              variant="primary"
              fullWidth
              onClick={() => setIsOpen(false)}
            >
              Free Leak Audit
            </CTAButton>
          </div>
        </div>
      </div>
    </header>
  );
}
