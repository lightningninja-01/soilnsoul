import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import { buildSchemaGraph, SITE_DOMAIN } from '../data/seoPageData';

// ── Section Components (11 Sections as per Master SEO/AEO/GEO Prompt) ────────
import HeroSection from './seo-sections/HeroSection';
import AboutSection from './seo-sections/AboutSection';
import ServicesSection from './seo-sections/ServicesSection';
import WhyChooseSection from './seo-sections/WhyChooseSection';
import PackagesSection from './seo-sections/PackagesSection';
import TestimonialsSection from './seo-sections/TestimonialsSection';
import LocalCoverageSection from './seo-sections/LocalCoverageSection';
import SeasonalGuideSection from './seo-sections/SeasonalGuideSection';
import FaqSection from './seo-sections/FaqSection';
import CtaSection from './seo-sections/CtaSection';

/**
 * BestToursVaranasi — Master SEO/AEO/GEO Landing Page
 *
 * This page targets 50+ keywords across primary, secondary, LSI, AEO, and GEO
 * clusters. It implements all 11 content sections from the master prompt, with
 * full JSON-LD schema (TravelAgency, FAQPage, BreadcrumbList), optimized meta
 * tags, and conversion-focused CTAs.
 *
 * Target word count: 4,000–5,000 words
 * H1: Best Tours & Travel Agency in Varanasi – Soil N Soul Travels
 * Canonical: /best-tours-and-travel-agency-in-varanasi
 */
export default function BestToursVaranasi() {
  // ── SEO Meta & Schema ──────────────────────────────────────────────────────
  const schemaGraph = buildSchemaGraph();

  useSEO({
    title: 'Best Tours & Travel Agency in Varanasi | Soil N Soul',
    description:
      'Book trusted tours & travel packages in Varanasi with Soil N Soul Travels. Ganga Aarti, pooja booking, city tours, car rental & spiritual packages from ₹999.',
    url: '/best-tours-and-travel-agency-in-varanasi',
    canonical: '/best-tours-and-travel-agency-in-varanasi',
    structuredData: schemaGraph as any,
    keywords:
      'best tours and travel agency in varanasi, tour and travel agency in varanasi, travel agent in varanasi, best travel agency in varanasi, varanasi travel agency, varanasi tour packages, tours and travels varanasi, varanasi city tour packages 2026, spiritual tour packages varanasi, luxury tour packages varanasi, varanasi pooja booking service, ganga aarti tour varanasi, varanasi sightseeing packages, car rental service in varanasi, hotel booking varanasi near ghats',
  });

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 font-sans">
      <Navbar />

      {/* Section 1 + 2: Hero + Trust Signals */}
      <HeroSection />

      {/* Section 3: About — Who We Are */}
      <AboutSection />

      {/* Section 4: Our Services (6-service grid) */}
      <ServicesSection />

      {/* Section 5: Why Choose Us (6 differentiators) */}
      <WhyChooseSection />

      {/* Section 6: Popular Tour Packages (5 package cards) */}
      <PackagesSection />

      {/* Section 7: Testimonials / Social Proof (4 reviews) */}
      <TestimonialsSection />

      {/* Section 8: Local Area Coverage (GEO + Hyperlocal SEO) */}
      <LocalCoverageSection />

      {/* Section 9: Seasonal Travel Guide (AEO + Featured Snippet) */}
      <SeasonalGuideSection />

      {/* Section 10: FAQ Section (10 FAQs — AEO / PAA) */}
      <FaqSection />

      {/* Section 11: Final CTA + Map + Address */}
      <CtaSection />

      <Footer />
    </div>
  );
}
