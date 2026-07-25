"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket } from "lucide-react";
import CTAButton from "./CTAButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  const isHomepage = pathname === "/";
  const useTransparentHeader = isHomepage && !isScrolled && !isOpen;

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          useTransparentHeader
            ? "bg-transparent border-b border-transparent shadow-none"
            : "bg-white/80 backdrop-blur-md border-b border-gray-100/80 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div 
                  className={`p-2 rounded-xl text-white transition-all duration-300 group-hover:scale-105 ${
                    useTransparentHeader
                      ? "bg-white/10 border border-white/10 shadow-none"
                      : "bg-gradient-to-br from-brand-blue to-blue-800 shadow-xs group-hover:shadow-md"
                  }`}
                >
                  <Rocket 
                    className={`w-5 h-5 transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      useTransparentHeader ? "text-white" : "text-white"
                    }`} 
                    aria-hidden="true" 
                  />
                </div>
                <span 
                  className={`font-display font-black text-xl tracking-tight transition-colors duration-300 ${
                    useTransparentHeader 
                      ? "text-white" 
                      : "text-brand-blue group-hover:text-brand-blue-hover"
                  }`}
                >
                  LeadGrow<span className={useTransparentHeader ? "text-brand-green" : "text-brand-green"}>.</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1.5 items-center">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full transition-all duration-200 ${
                      useTransparentHeader
                        ? active
                          ? "bg-white/10 text-white"
                          : "text-blue-100 hover:text-white hover:bg-white/5"
                        : active
                          ? "bg-brand-blue/5 text-brand-blue"
                          : "text-gray-600 hover:text-brand-blue hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`ml-4 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 active:scale-95 shadow-xs ${
                  useTransparentHeader
                    ? "border border-white/30 text-white hover:bg-white hover:text-brand-blue"
                    : "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                }`}
              >
                Schedule Free Audit
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 focus:outline-none cursor-pointer ${
                  useTransparentHeader
                    ? "text-blue-100 hover:text-white hover:bg-white/5"
                    : "text-gray-500 hover:text-brand-blue hover:bg-gray-50"
                }`}
                aria-expanded={isOpen}
                aria-label="Toggle Navigation Menu"
              >
                <span className="sr-only">Open main menu</span>
                <div className="absolute flex flex-col justify-between w-5 h-3.5 transform transition-all duration-300">
                  <span className={`w-5 h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? "rotate-45 translate-x-0.5 -translate-y-0.5" : ""}`} />
                  <span className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                  <span className={`w-5 h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${isOpen ? "-rotate-45 translate-x-0.5 translate-y-0.5" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[550px] opacity-100 border-b border-gray-100 shadow-md"
              : "max-h-0 opacity-0 overflow-hidden pointer-events-none"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
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
