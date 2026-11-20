import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://leadgrowagency.com"),
  title: {
    default: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    template: "%s | LeadGrow Agency",
  },
  description:
    "Fiduciary Google Ads, Server-Side GTM tracking, and Google Business Profile Local SEO for B2B and high-ticket service teams. Flat retainers, 100% client asset ownership, and revenue-first reporting.",
  keywords: [
    "Zero-Waste Google Ads Agency",
    "Google Business Profile Local SEO",
    "Server-Side GTM GA4 Tracking Agency",
    "Transparent Search Marketing",
    "B2B Lead Generation Agency",
    "Flat-Fee Google Ads Management",
  ],
  openGraph: {
    title: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    description:
      "Seal 35%–70% conversion signal loss in Phase 0, then scale leak-proof Google Ads and Google Maps 3-Pack authority with 100% client asset ownership.",
    url: "https://leadgrowagency.com",
    siteName: "LeadGrow Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LeadGrow Agency - Zero-Waste Google Ads, sGTM Tracking & Local SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    description:
      "Flat-fee Google Ads, Server-Side GTM tracking, and GBP-First Local SEO with 100% client asset ownership and Money-In vs. Money-Out reporting.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "LeadGrow Agency",
              image: "https://leadgrowagency.com/logo.svg",
              priceRange: "$$",
              telephone: "+1-713-555-0199",
              email: "audit@leadgrowagency.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1200 Smith St, Suite 1600",
                addressLocality: "Houston",
                addressRegion: "TX",
                postalCode: "77002",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "City", name: "Houston" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "United Kingdom" },
                { "@type": "Country", name: "Singapore" },
              ],
              url: "https://leadgrowagency.com",
              sameAs: [
                "https://partnersdirectory.withgoogle.com/",
                "https://clutch.co/",
                "https://www.linkedin.com/",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                reviewCount: "111",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-ink focus:text-card focus:text-sm focus:font-semibold focus:shadow-floating"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
