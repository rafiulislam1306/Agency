"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas text-ink flex items-center justify-center p-6 font-sans antialiased">
        <div className="max-w-lg w-full bento-card p-8 text-center space-y-5">
          <div className="w-12 h-12 rounded-tile bg-kpi-negative-bg text-kpi-negative flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <p className="eyebrow-mono text-ink-muted">
              Unexpected Application Error
            </p>
            <h1 className="type-h3 font-display font-bold text-ink">
              Something went wrong loading this view
            </h1>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Your audit request data is safe. Try reloading this view or return to the LeadGrow homepage.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-btn bg-cta hover:bg-cta-hover active:bg-cta-active text-cta-ink text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-btn border border-border-control bg-card text-ink hover:bg-subtle text-sm font-semibold inline-flex items-center justify-center transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
