import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./editorial.css";
import SiteChrome from "@/components/SiteChrome";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Discover Kashi, Beyond Tourism | Soil n Soul Travels",
    template: "%s | Soil n Soul Travels",
  },
  description:
    "Signature Experiences and Premium Personalised Journeys in Kashi, thoughtfully curated by local hosts.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.soilnsoultravels.com",
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Soil N Soul Travels",
    images: [{ url: "/images/hero/hero-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#1A120B] text-slate-100 font-display antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
