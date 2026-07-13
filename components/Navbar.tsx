"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import CTAButton from "./CTAButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-brand-blue p-2 rounded-xl text-white group-hover:bg-brand-blue-hover transition-colors">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-brand-blue">
                  LeadGrow<span className="text-brand-green">.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-brand-blue border-b-2 border-brand-orange py-1"
                      : "text-gray-600 hover:text-brand-blue"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <CTAButton
                href="/contact"
                variant="primary"
                size="sm"
                className="ml-4"
              >
                Schedule Free Audit
              </CTAButton>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-brand-blue hover:bg-gray-100 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[500px] opacity-100 border-b border-gray-100"
              : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-base font-bold transition-colors ${
                  isActive(link.href)
                    ? "bg-brand-blue/5 text-brand-blue"
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-blue"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <CTAButton
                href="/contact"
                variant="primary"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Schedule Free Audit
              </CTAButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
