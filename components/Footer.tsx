"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/templates")) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Fiduciary Pledge */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="bg-white p-1.5 rounded-lg w-8 h-8 relative flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="LeadGrow Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                LeadGrow<span className="text-brand-green">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Zero-waste Google Ads and GBP-first Local SEO for small and medium businesses. Flat monthly fees, month-to-month terms, and 100% client asset ownership from day one.
            </p>
            <p className="text-xs text-slate-500">
              Serving local trades, clinics, e-commerce, and B2B advisors across the US, UK &amp; APAC.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-display font-semibold text-white mb-4">
              Agency
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Services", href: "/services" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Pricing", href: "/pricing" },
                { name: "About & Ownership", href: "/about" },
                { name: "Playbooks", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-150"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Proof & Samples */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-display font-semibold text-white mb-4">
              Proof &amp; Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/templates/hvac"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  HVAC Landing Page Demo
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/seal-5-google-ads-budget-leaks"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  5-Point Ad Leak Checklist
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/digital-bill-of-rights-asset-ownership"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Digital Bill of Rights
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing#roi-calculator"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ROI Reality Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-display font-semibold text-white">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                <a
                  href="mailto:audit@leadgrowagency.com"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  audit@leadgrowagency.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                <a
                  href="tel:+17135550199"
                  className="text-slate-300 hover:text-white transition-colors tabular-nums"
                >
                  +1 (713) 555-0199
                </a>
              </li>
            </ul>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 font-semibold rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white transition-colors duration-150 text-sm whitespace-nowrap"
              >
                Request Free Leak Audit
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} LeadGrow Agency. 100% Client Asset Ownership Guaranteed.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms &amp; Bill of Rights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
