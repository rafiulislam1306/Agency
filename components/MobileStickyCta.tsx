"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { shouldShowStickyCta } from "@/lib/designSystemLogic";

export default function MobileStickyCta() {
  const pathname = usePathname() || "/";
  const [sentinelState, setSentinelState] = useState<{
    path: string;
    heroVisible: boolean;
    footerCtaVisible: boolean;
  }>({ path: pathname, heroVisible: true, footerCtaVisible: false });
  const [inputFocused, setInputFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heroEl = document.querySelector('[data-cta-sentinel="hero"]');
    const footerEl = document.querySelector('[data-cta-sentinel="footer-cta"]');

    const rafId = window.requestAnimationFrame(() => {
      setSentinelState({
        path: pathname,
        heroVisible: Boolean(heroEl),
        footerCtaVisible: false,
      });
    });

    if (typeof IntersectionObserver === "undefined") {
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setSentinelState((prev) => {
          let nextHero = prev.path === pathname ? prev.heroVisible : Boolean(heroEl);
          let nextFooter = prev.path === pathname ? prev.footerCtaVisible : false;
          for (const entry of entries) {
            const role = entry.target.getAttribute("data-cta-sentinel");
            if (role === "hero") {
              nextHero = entry.isIntersecting;
            } else if (role === "footer-cta") {
              nextFooter = entry.isIntersecting;
            }
          }
          return {
            path: pathname,
            heroVisible: nextHero,
            footerCtaVisible: nextFooter,
          };
        });
      },
      { threshold: 0.05 }
    );

    if (heroEl) observer.observe(heroEl);
    if (footerEl) observer.observe(footerEl);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const isFormControl = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (isFormControl(e.target)) {
        setInputFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (isFormControl(e.target)) {
        // Defer slightly so moving between two form fields keeps bar suppressed
        window.setTimeout(() => {
          const active = document.activeElement;
          setInputFocused(isFormControl(active));
        }, 60);
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  const isVisible = shouldShowStickyCta({
    pathname,
    heroVisible:
      sentinelState.path === pathname ? sentinelState.heroVisible : true,
    footerCtaVisible:
      sentinelState.path === pathname ? sentinelState.footerCtaVisible : false,
    inputFocused,
  });

  // Apply native inert property when hidden to eliminate ghost Tab stops
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isVisible) {
      el.removeAttribute("inert");
    } else {
      el.setAttribute("inert", "");
    }
  }, [isVisible]);

  const auditHref = pathname === "/" ? "#free-audit-form" : "/contact";
  const callHref = pathname === "/" ? "#book-audit" : "/contact";

  return (
    <div
      ref={containerRef}
      aria-hidden={!isVisible}
      data-testid="mobile-sticky-cta"
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border-hairline bg-card px-3 sm:px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] transition-[transform,opacity] duration-200 ease-[var(--ease-out-smooth)] motion-reduce:transition-none ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 pointer-coarse:gap-3 max-w-lg mx-auto">
        <Link
          href={auditHref}
          className="flex-1 min-h-12 px-3 sm:px-4 py-2.5 rounded-[var(--radius-btn)] bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink font-semibold text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>Get Free Audit</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </Link>
        <Link
          href={callHref}
          className="min-h-12 px-3 sm:px-3.5 py-2.5 rounded-[var(--radius-btn)] border border-border-control bg-card text-ink hover:bg-canvas font-semibold text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
        >
          <Calendar className="w-4 h-4 text-trust shrink-0" aria-hidden="true" />
          <span>Book Call</span>
        </Link>
      </div>
    </div>
  );
}
