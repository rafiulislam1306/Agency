"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";

/**
 * Section 8: High-Utility 4-Column Doormat Footer
 * - Column 1: Brand mark, positioning statement, verified physical NAP & clickable tel/mailto
 * - Column 2: Core Services doormat (3 services + Free Audit)
 * - Column 3: Proof & Company (Case Studies, Pricing, Process, Senior Team, Bill of Rights)
 * - Column 4: Resources, Compliance, Socials (kept out of header) & 2026 credentials
 */
export default function Footer() {
  const pathname = usePathname() || "/";
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/templates")) {
    return null;
  }

  return (
    <footer className="surface-dark bg-canvas text-ink-secondary pt-16 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-12 border-t border-border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-hairline">
          {/* Column 1: Brand & Local NAP Entity Anchor */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 min-h-11 rounded-[var(--radius-input)]"
            >
              <div className="bg-white p-1.5 rounded-[var(--radius-btn)] w-8 h-8 relative flex items-center justify-center shrink-0">
                <Image
                  src="/logo.svg"
                  alt="LeadGrow Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                LeadGrow<span className="text-kpi-positive">.</span>
              </span>
            </Link>

            <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
              Zero-waste Google Ads, Server-Side GTM tracking, and GBP-first Local SEO for B2B and high-ticket service teams. Flat monthly fees and 100% client asset ownership from day one.
            </p>

            {/* Verified Physical NAP + Direct Contact (matches ProfessionalService JSON-LD 1:1) */}
            <address className="not-italic space-y-1.5 text-sm text-ink-secondary pt-1">
              <p className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 text-kpi-positive shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>1200 Smith St, Suite 1600, Houston, TX 77002</span>
              </p>
              <p>
                <a
                  href="tel:+17135550199"
                  className="inline-flex items-center gap-2 min-h-11 hover:text-ink transition-colors metric-tabular"
                >
                  <Phone
                    className="w-4 h-4 text-kpi-positive shrink-0"
                    aria-hidden="true"
                  />
                  <span>+1 (713) 555-0199</span>
                </a>
              </p>
              <p>
                <a
                  href="mailto:audit@leadgrowagency.com"
                  className="inline-flex items-center gap-2 min-h-11 hover:text-ink transition-colors"
                >
                  <Mail
                    className="w-4 h-4 text-kpi-positive shrink-0"
                    aria-hidden="true"
                  />
                  <span>audit@leadgrowagency.com</span>
                </a>
              </p>
            </address>
          </div>

          {/* Columns 2 & 3 & 4 inside Footer Navigation Landmark */}
          <nav
            aria-label="Footer"
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {/* Column 2: Core Services Doormat */}
            <div>
              <h2 className="text-sm font-display font-semibold text-ink mb-3">
                Core Services
              </h2>
              <ul className="space-y-1 pointer-coarse:space-y-2.5 text-sm">
                {[
                  { name: "Google Ads Management", href: "/services#google-ads" },
                  { name: "Local SEO & GBP", href: "/services#local-seo" },
                  {
                    name: "GA4 & Server-Side Tracking",
                    href: "/services#tracking-architecture",
                  },
                  { name: "1:1 Landing Page CRO", href: "/services#cro-heuristics" },
                  { name: "Free 12-Min Video Audit", href: "/#free-audit-form" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Proof & Company */}
            <div>
              <h2 className="text-sm font-display font-semibold text-ink mb-3">
                Proof &amp; Company
              </h2>
              <ul className="space-y-1 pointer-coarse:space-y-2.5 text-sm">
                {[
                  { name: "Case Studies", href: "/case-studies" },
                  { name: "Transparent Pricing", href: "/pricing" },
                  { name: "30-60-90 Process", href: "/#process" },
                  { name: "Senior Team", href: "/about" },
                  { name: "Digital Bill of Rights", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Self-Serve Resources, Compliance & Credentials */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-display font-semibold text-ink mb-3">
                  Resources &amp; Legal
                </h2>
                <ul className="space-y-1 pointer-coarse:space-y-2.5 text-sm">
                  <li>
                    <Link
                      href="/pricing#roi-calculator"
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors"
                    >
                      Pipeline ROI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors"
                    >
                      Playbooks &amp; Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/templates/hvac"
                      className="inline-flex items-center gap-1 min-h-11 text-ink-secondary hover:text-trust transition-colors"
                    >
                      <span>HVAC 1:1 CRO Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="inline-flex items-center min-h-11 text-ink-secondary hover:text-trust transition-colors"
                    >
                      Contact &amp; Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* 2026 Verified Credentials Badge Box */}
              <div className="dark-panel rounded-[var(--radius-tile)] p-3.5 space-y-2 text-xs">
                <a
                  href="https://partnersdirectory.withgoogle.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-kpi-positive hover:underline"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>2026 Google Premier Partner</span>
                </a>
                <div className="flex items-center gap-1.5 text-ink-secondary metric-tabular">
                  <Star
                    className="w-3.5 h-3.5 fill-kpi-warning text-kpi-warning shrink-0"
                    aria-hidden="true"
                  />
                  <span>4.9★ Clutch &amp; Google (111)</span>
                </div>
                <p className="text-[11px] text-ink-muted">
                  GA4 · sGTM · Consent Mode v2 Certified
                </p>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Legal & Google Partner / SEO Non-Endorsement Compliance Notice */}
        <div className="pt-8 space-y-4 caption-meta text-ink-muted">
          <p className="leading-relaxed max-w-4xl">
            LeadGrow Agency is an independent performance marketing and analytics agency. Google Ads Partner credentials apply solely to qualifying paid advertising accounts; Google Business Profile optimization and Local SEO services are not verified, certified, or endorsed by Google.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p>
              &copy; {currentYear} LeadGrow Agency. 100% Client Asset Ownership Guaranteed.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://clutch.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 hover:text-ink transition-colors"
              >
                Clutch Profile
              </a>
              <Link
                href="/privacy"
                className="inline-flex items-center min-h-11 hover:text-ink transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center min-h-11 hover:text-ink transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
