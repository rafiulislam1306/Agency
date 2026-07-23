"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, Rocket, Linkedin, Twitter, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-blue-800">
          
          {/* Column 1: Brand & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-white p-2 rounded-xl text-brand-blue group-hover:bg-brand-light transition-colors">
                <Rocket className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                LeadGrow<span className="text-brand-green">.</span>
              </span>
            </Link>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              We help small and medium businesses dominate search and paid advertising to acquire qualified customers from Google.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-brand-green transition-colors"
                aria-label="Visit our LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-brand-green transition-colors"
                aria-label="Visit our Twitter profile"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "About Us", href: "/about" },
                { name: "Pricing", href: "/pricing" },
                { name: "Blog / Resources", href: "/blog" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-brand-green text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-lg font-display font-bold text-white mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-green flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:contact@leadgrowagency.com"
                  className="text-blue-100 hover:text-brand-green text-sm transition-colors"
                >
                  contact@leadgrowagency.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+15550199"
                  className="text-blue-100 hover:text-brand-green text-sm transition-colors"
                >
                  +1 (555) 0199
                </a>
              </li>
              <li className="text-xs text-blue-200 leading-relaxed pt-2">
                Response within 24 hours guaranteed. No high-pressure sales calls.
              </li>
            </ul>
          </div>

          {/* Column 4: Conversion / Calendly CTA */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-white mb-2">Ready to Grow?</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Schedule your free Google Ads OR Local SEO audit and get 3 specific growth ideas.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full px-5 py-3 font-bold rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white transition-all duration-300 hover:shadow-md cursor-pointer text-sm text-center"
            >
              Book Free Audit Call
              <ExternalLink className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-200">
          <p>&copy; {currentYear} LeadGrow Agency. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-brand-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-green transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
