import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LeadGrow Agency | Google Ads + Local SEO for SMBs",
  description:
    "We help small & medium businesses get qualified customers from Google Ads and Local Search. Free audit + 30-min strategy call to show you what's possible.",
  keywords: ["Google Ads Agency", "Local SEO Agency", "Google Business Profile Optimization", "SMB Marketing", "Lead Generation"],
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
              "@type": "LocalBusiness",
              "name": "LeadGrow Agency",
              "image": "https://leadgrowagency.com/logo.png",
              "priceRange": "$$",
              "telephone": "+15550199",
              "email": "contact@leadgrowagency.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Search Marketing Way",
                "addressLocality": "Houston",
                "addressRegion": "TX",
                "postalCode": "77001",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.7604,
                "longitude": -95.3698
              },
              "url": "https://leadgrowagency.com",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              },
              "sameAs": [
                "https://www.linkedin.com/company/leadgrow",
                "https://twitter.com/leadgrow"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-dark">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
