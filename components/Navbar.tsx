"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  Server,
  Target,
  X,
} from "lucide-react";
import CTAButton from "./CTAButton";
import { computeMobileHeaderVisible } from "@/lib/homepageBlueprintLogic";

const SERVICE_PANEL_CARDS = [
  {
    title: "Google Ads Management",
    description: "Pipeline-focused Search, PMax & LSA tied to offline CRM deals.",
    href: "/services#google-ads",
    icon: Target,
  },
  {
    title: "Local SEO & GBP",
    description: "Google Maps 3-Pack coverage & AI local search visibility.",
    href: "/services#local-seo",
    icon: MapPin,
  },
  {
    title: "GA4 & Server-Side Tracking",
    description: "First-party sGTM attribution recovering 35%–70% lost signals.",
    href: "/services#tracking-architecture",
    icon: Server,
  },
] as const;

const DIRECT_NAV_LINKS = [
  { name: "Results", href: "/case-studies" },
  { name: "Pricing", href: "/pricing" },
  { name: "Process", href: "/#process" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(true);

  const pathname = usePathname() || "/";
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeDrawerBtnRef = useRef<HTMLButtonElement | null>(null);
  const servicesBtnRef = useRef<HTMLButtonElement | null>(null);
  const servicesPanelRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);

  // Subtle floating elevation + partially persistent mobile header on reading scrolls
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setMobileHeaderVisible((prev) =>
        computeMobileHeaderVisible({
          scrollY: y,
          prevScrollY: lastScrollYRef.current,
          currentlyVisible: prev,
          menuOrDrawerOpen: isOpen || servicesOpen,
        })
      );
      lastScrollYRef.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, servicesOpen]);

  // Click-activated Services 3-card panel: Escape + click-outside dismissal
  useEffect(() => {
    if (!servicesOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setServicesOpen(false);
        servicesBtnRef.current?.focus();
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        servicesPanelRef.current &&
        !servicesPanelRef.current.contains(target) &&
        servicesBtnRef.current &&
        !servicesBtnRef.current.contains(target)
      ) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [servicesOpen]);

  // Apply native inert to collapsed mobile drawer, move focus inside on open, and trap Tab/Escape
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    if (isOpen) {
      el.removeAttribute("inert");
      const rafId = window.requestAnimationFrame(() => {
        closeDrawerBtnRef.current?.focus();
      });

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
          toggleBtnRef.current?.focus();
          return;
        }
        if (e.key === "Tab") {
          const focusables = el.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("keydown", onKeyDown);
      };
    } else {
      el.setAttribute("inert", "");
    }
  }, [isOpen]);

  // Hide Navbar on standalone conversion template pages
  if (pathname.startsWith("/templates")) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  const primaryCtaHref = pathname === "/" ? "#free-audit-form" : "/contact";

  return (
    <header
      className={`sticky-header-guard sticky top-0 z-50 w-full bg-card border-b border-border-hairline transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-smooth)] motion-reduce:transition-none lg:translate-y-0 ${
        scrolled ? "shadow-floating" : ""
      } ${mobileHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Fixed 64px (h-16) opaque single-row header */}
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16">
          {/* Far Left: Compact Brand Wordmark */}
          <Link
            href="/"
            onClick={() => {
              setServicesOpen(false);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 whitespace-nowrap shrink-0 min-h-11 rounded-[var(--radius-input)]"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
              <Image
                src="/logo.svg"
                alt="LeadGrow Logo"
                fill
                sizes="32px"
                loading="eager"
                fetchPriority="high"
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ink">
              LeadGrow<span className="text-kpi-positive">.</span>
            </span>
          </Link>

          {/* Desktop Zone 2: Exact 4 top-level links in Serial Position order */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7"
          >
            {/* Slot 1 (Primacy): Click-activated Services 3-card panel */}
            <div className="relative">
              <button
                ref={servicesBtnRef}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-panel"
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 min-h-11 px-1.5 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 cursor-pointer rounded-[var(--radius-chip)] ${
                  pathname.startsWith("/services") || servicesOpen
                    ? "text-trust border-trust font-semibold"
                    : "text-ink-secondary border-transparent hover:text-trust hover:border-border-strong"
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 motion-reduce:transition-none ${
                    servicesOpen ? "rotate-180 text-trust" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {DIRECT_NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setServicesOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center min-h-11 px-1 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors duration-150 rounded-[var(--radius-chip)] ${
                    active
                      ? "text-trust border-trust font-semibold"
                      : "text-ink-secondary border-transparent hover:text-trust hover:border-border-strong"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Zone 3 (Recency Anchor): Single exclusive-accent CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <CTAButton
              href={primaryCtaHref}
              variant="primary"
              size="sm"
              onClick={() => setServicesOpen(false)}
            >
              Get Free Audit
            </CTAButton>
          </div>

          {/* Mobile (< lg): Compact CTA + Explicitly Labeled "Menu" Toggle (3-element header) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={primaryCtaHref}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center min-h-11 px-3 py-2 rounded-[var(--radius-btn)] bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              Book Audit
            </Link>
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 min-h-11 px-3 rounded-[var(--radius-btn)] border border-border-control bg-card text-ink hover:border-trust hover:text-trust cursor-pointer transition-colors text-xs font-semibold shrink-0"
              aria-expanded={isOpen}
              aria-controls="mobile-primary-drawer"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
            >
              {isOpen ? (
                <X className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Click-Activated 3-Column Services Mini-Panel (2-Click Goal Path) */}
      {servicesOpen ? (
        <div
          id="desktop-services-panel"
          ref={servicesPanelRef}
          className="hidden lg:block absolute inset-x-0 top-full bg-card border-b border-border-hairline shadow-floating"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {SERVICE_PANEL_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    onClick={() => setServicesOpen(false)}
                    className="group p-4 rounded-[var(--radius-tile)] border border-border-hairline bg-canvas hover:border-trust hover:bg-trust-tint/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-display font-bold text-sm text-ink group-hover:text-trust transition-colors">
                        <Icon
                          className="w-4 h-4 text-trust shrink-0"
                          aria-hidden="true"
                        />
                        {card.title}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 text-ink-muted group-hover:text-trust transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="pt-3 border-t border-border-hairline flex items-center justify-between text-xs">
              <span className="text-ink-muted">
                All three channels run under 100% client account ownership and flat monthly retainers.
              </span>
              <Link
                href="/services"
                onClick={() => setServicesOpen(false)}
                className="inline-flex items-center gap-1.5 font-semibold text-trust hover:text-trust-hover min-h-9 px-2"
              >
                <span>View Full-Funnel Approach</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile Navigation Drawer (Dialog semantics, focus trap, inert when closed) */}
      <div
        id="mobile-primary-drawer"
        ref={drawerRef}
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-label={isOpen ? "Primary menu" : undefined}
        aria-hidden={!isOpen}
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--ease-out-smooth)] motion-reduce:transition-none ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 border-t border-border-hairline bg-card"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pt-3 pb-1 flex items-center justify-between border-b border-border-hairline/60">
            <span className="eyebrow-mono text-ink-muted">Navigation</span>
            <button
              ref={closeDrawerBtnRef}
              type="button"
              onClick={() => {
                setIsOpen(false);
                toggleBtnRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center min-h-11 min-w-11 -mr-2 rounded-[var(--radius-btn)] text-ink-secondary hover:text-trust hover:bg-subtle transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <nav
            aria-label="Mobile"
            className="px-5 pt-3 pb-6 space-y-1.5 pointer-coarse:space-y-2.5"
          >
            <p className="px-3 pt-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
              Core Services
            </p>
            {SERVICE_PANEL_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between min-h-11 px-3.5 rounded-[var(--radius-btn)] text-sm font-semibold text-ink hover:bg-canvas hover:text-trust transition-colors"
              >
                <span>{card.title}</span>
                <ArrowRight className="w-4 h-4 text-ink-muted" aria-hidden="true" />
              </Link>
            ))}

            <div className="pt-2 border-t border-border-hairline space-y-1 pointer-coarse:space-y-2">
              {DIRECT_NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center min-h-11 px-3.5 rounded-[var(--radius-btn)] text-base font-medium transition-colors ${
                      active
                        ? "bg-trust-tint text-trust font-semibold"
                        : "text-ink-secondary hover:bg-canvas hover:text-trust"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3">
              <CTAButton
                href={primaryCtaHref}
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Get Free Audit
              </CTAButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
