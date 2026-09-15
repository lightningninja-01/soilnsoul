'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ServiceInquiryModal from '@/components/ServiceInquiryModal';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { SEO_PAGES } from '@/lib/seo-pages';

type SeoPage = (typeof SEO_PAGES)[keyof typeof SEO_PAGES];

const SeoLandingClient = ({ page }: { page: SeoPage }) => {
  const slug = page.slug;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // If page not found, redirect to first page
  if (!page) {
    return (
      <div className="min-h-screen bg-[#1A120B] text-slate-100 flex items-center justify-center">
        
        <div className="text-center py-32 px-4">
          <span className="material-symbols-outlined text-6xl text-primary/40 mb-4 block">search_off</span>
          <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
          <p className="text-slate-400 mb-6">The travel guide you're looking for doesn't exist yet.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all">
            <span className="material-symbols-outlined text-sm">home</span>
            Return Home
          </Link>
        </div>
        
      </div>
    );
  }

  // SEO
  // SEO handled by server

  // (siteUrl available for future use)
  // const siteUrl = 'https://www.soilnsoultravels.com';

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      

      {/* HERO */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/80 via-[#1A120B]/60 to-[#1A120B]" />

        {/* Decorative orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
            {page.breadcrumb.map((crumb, i) => (
              <React.Fragment key={crumb.url}>
                {i > 0 && (
                  <span className="material-symbols-outlined text-slate-600" style={{ fontSize: '14px' }}>
                    chevron_right
                  </span>
                )}
                {i < page.breadcrumb.length - 1 ? (
                  <Link href={crumb.url}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Soil n Soul Travels - Varanasi
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            {page.heroHeading.split(' - ').length > 1 ? (
              <>
                {page.heroHeading.split(' - ')[0]} -{' '}
                <span className="text-primary italic font-light">{page.heroHeading.split(' - ')[1]}</span>
              </>
            ) : (
              <>
                {page.heroHeading.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-primary italic font-light">
                  {page.heroHeading.split(' ').slice(-2).join(' ')}
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
            {page.heroSubtitle}
          </p>

          {/* Trust metrics */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { icon: 'verified', label: '500+ Journeys' },
              { icon: 'star', label: '4.9 Rating' },
              { icon: 'language', label: '38 Countries' },
              { icon: 'support_agent', label: '24/7 Support' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-slate-300">
                <span className="material-symbols-outlined text-primary text-lg">{b.icon}</span>
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/919580417547"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              {page.cta}
            </a>
            <Link href="/services"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-primary text-white hover:text-primary px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              Explore Services
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 sm:py-20 bg-[#23160f]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-5">
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase">About This Guide</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Why Trust <span className="text-primary italic font-light">Soil n Soul</span> for Your Varanasi Journey?
              </h2>
              {page.intro.map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Stat card */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-5">
                {[
                  { number: '500+', label: 'Journeys Curated' },
                  { number: '4.9 stars', label: 'Average Rating' },
                  { number: '38', label: 'Countries Served' },
                  { number: '24/7', label: 'Support Available' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/8 pb-4 last:border-0 last:pb-0">
                    <span className="text-slate-400 text-sm">{s.label}</span>
                    <span className="text-2xl font-black text-primary">{s.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SECTIONS */}
      <section className="py-16 sm:py-20 bg-[#1A120B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">What We Offer</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {page.sections.map((sec, i) => (
              <article
                key={i}
                className="group p-6 sm:p-7 bg-white/4 border border-white/8 hover:border-primary/40 rounded-2xl transition-all duration-300 hover:bg-white/7"
              >
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {sec.icon}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-primary transition-colors">
                      {sec.heading}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{sec.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-[#23160f]/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {page.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full text-left flex justify-between items-center px-6 py-5 gap-4"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <h3 className="text-white font-semibold text-base" itemProp="name">
                    {faq.q}
                  </h3>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-56 pb-5' : 'max-h-0'}`}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p className="px-6 text-slate-400 text-sm leading-relaxed" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 sm:py-20 bg-[#1A120B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/25 rounded-3xl p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary mb-4 block">travel_explore</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Experience Varanasi?
              </h2>
              <p className="text-slate-300 mb-8 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Talk to Anchal and our team directly. We respond within the hour and will design a completely personalised Varanasi experience for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/919580417547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Us Now
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Send an Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ INTERNAL LINKS (related SEO pages) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-12 sm:py-16 bg-[#23160f]/40 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-6 text-center">
            More Varanasi Travel Guides
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(SEO_PAGES)
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/travel/${p.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 text-slate-300 hover:text-primary px-4 py-2 rounded-full text-xs font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  {p.keyword}
                </Link>
              ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default SeoLandingClient;
