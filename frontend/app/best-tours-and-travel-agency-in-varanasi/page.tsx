import type { Metadata } from 'next';
import { buildSchemaGraph } from '@/lib/seo-page-data';
import HeroSection from '@/components/seo-sections/HeroSection';
import AboutSection from '@/components/seo-sections/AboutSection';
import ServicesSection from '@/components/seo-sections/ServicesSection';
import WhyChooseSection from '@/components/seo-sections/WhyChooseSection';
import PackagesSection from '@/components/seo-sections/PackagesSection';
import TestimonialsSection from '@/components/seo-sections/TestimonialsSection';
import LocalCoverageSection from '@/components/seo-sections/LocalCoverageSection';
import SeasonalGuideSection from '@/components/seo-sections/SeasonalGuideSection';
import FaqSection from '@/components/seo-sections/FaqSection';
import CtaSection from '@/components/seo-sections/CtaSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Best Tours & Travel Agency in Varanasi | Soil N Soul',
  description:
    'Book trusted tours & travel packages in Varanasi with Soil N Soul Travels. Ganga Aarti, pooja booking, city tours, car rental & spiritual packages from Rs 999.',
  alternates: { canonical: '/best-tours-and-travel-agency-in-varanasi' },
};

export default function BestToursVaranasiPage() {
  const schemaGraph = buildSchemaGraph();

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <PackagesSection />
      <TestimonialsSection />
      <LocalCoverageSection />
      <SeasonalGuideSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
