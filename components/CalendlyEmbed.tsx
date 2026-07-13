"use client";

import React, { useState } from "react";

interface CalendlyEmbedProps {
  url?: string;
}

export default function CalendlyEmbed({ url = "https://calendly.com/your-link" }: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Use a generic placeholder link if the url is still 'your-link' to show a functional demo, or direct to Calendly's home.
  const bookingUrl = url.includes("your-link") 
    ? "https://calendly.com/acme-demos/30min" // standard public demo link to ensure it renders correctly
    : url;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white min-h-[650px]">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/50 backdrop-blur-xs z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-blue"></div>
          <p className="mt-4 text-sm text-gray-500 font-medium">Loading scheduler...</p>
        </div>
      )}
      <iframe
        src={`${bookingUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=1f2937&primary_color=1e3a8a`}
        width="105%"
        height="700px"
        style={{ width: "100%", height: "700px", border: "0" }}
        onLoad={() => setIsLoading(false)}
        title="Schedule your free audit"
      ></iframe>
    </div>
  );
}
