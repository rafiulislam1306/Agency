import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leadgrowagency.com"),
  title: {
    default: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    template: "%s | LeadGrow Agency",
  },
  description:
    "Fiduciary Google Ads and Google Business Profile Local SEO for SMBs. Flat-fee pricing, 100% client asset ownership, month-to-month terms, and revenue-first reporting.",
  keywords: [
    "Zero-Waste Google Ads Agency",
    "Google Business Profile Local SEO",
    "Transparent Search Marketing",
    "SMB Lead Generation",
    "Flat-Fee Google Ads Management",
  ],
  openGraph: {
    title: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    description:
      "Stop bleeding budget on broad match, bots, and vanity metrics. Flat-fee Google Ads & Local Map Pack dominance with 100% client asset ownership.",
    url: "https://leadgrowagency.com",
    siteName: "LeadGrow Agency",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LeadGrow Agency - Zero-Waste Google Ads & Local SEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadGrow Agency | Zero-Waste Google Ads & GBP-First Local SEO",
    description:
      "Flat-fee Google Ads and GBP-First Local SEO with 100% client asset ownership and Money-In vs. Money-Out reporting.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "LeadGrow Agency",
              image: "https://leadgrowagency.com/logo.png",
              priceRange: "$$",
              telephone: "+1-713-555-0199",
              email: "audit@leadgrowagency.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Houston",
                addressRegion: "TX",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "City", name: "Houston" },
                { "@type": "Country", name: "United States" },
                { "@type": "Country", name: "United Kingdom" },
                { "@type": "Country", name: "Singapore" },
              ],
              url: "https://leadgrowagency.com",
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
      <body className="min-h-full flex flex-col bg-white text-slate-800">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
