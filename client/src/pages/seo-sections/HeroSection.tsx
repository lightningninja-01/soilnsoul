import React from 'react';

export default function HeroSection() {
  return (
    <>
      {/* ═══ SECTION 1 — HERO SECTION (Above the Fold) ═══ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background image with LCP optimization */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/varanasi-hero.png"
            alt="Best tour and travel agency in Varanasi - Soil N Soul Travels"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B] via-[#1A120B]/85 to-[#1A120B]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-transparent opacity-60" />
        </div>

        {/* Animated grain overlay for premium feel */}
        <div className="absolute inset-0 z-[1] grain-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" style={{ animation: 'fadeSlideUp 0.8s ease-out' }}>
            {/* Breadcrumb for GEO */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-slate-400">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><span className="material-symbols-outlined text-xs">chevron_right</span></li>
                <li className="text-primary font-medium">Best Travel Agency Varanasi</li>
              </ol>
            </nav>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Best Tours & Travel Agency in Varanasi –{' '}
              <span className="text-primary italic font-serif">Soil N Soul Travels</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 mb-4 font-medium leading-snug">
              Varanasi's Most Trusted Travel Experts — Spiritual Journeys, City Tours, Pooja Booking & Custom Packages from ₹999
            </p>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Varanasi (also called Kashi or Banaras) is not just a destination — it is a doorway to the soul of India.
              And no one understands this ancient city's heartbeat better than <strong className="text-white">Soil N Soul
              Travels</strong>, the best travel agency in Varanasi with <strong className="text-white">500+ happy
              travelers</strong>, a <strong className="text-white">4.9★ Google rating</strong>, and{' '}
              <strong className="text-white">6+ years of born-and-raised local expertise</strong>. Whether you seek the
              golden fire of the Ganga Aarti at Dashashwamedh Ghat, a serene sunrise boat ride past Manikarnika, Kashi
              Vishwanath VIP darshan through the grand corridor, or a complete spiritual tour package covering Prayagraj,
              Ayodhya, and Vindhyachal — your journey begins here. Let Kashi's oldest living soul guide your travel, and
              let Soil N Soul turn every moment into a memory worth keeping.
            </p>

            {/* Dual CTA — WhatsApp + Explore */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://wa.me/919580417547?text=Hi%2C%20I%20want%20to%20book%20a%20Varanasi%20tour%20package"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl shadow-green-600/20 flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">chat</span>
                Book on WhatsApp
              </a>
              <a
                href="#packages"
                id="hero-packages-cta"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
              >
                Explore Packages
              </a>
              <a
                href="tel:+919580417547"
                id="hero-call-cta"
                className="border-2 border-white/30 hover:bg-white hover:text-[#1A120B] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all backdrop-blur-sm"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — TRUST SIGNALS / SOCIAL PROOF BAR ═══ */}
      <section className="py-10 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20 relative overflow-hidden">
        {/* Subtle animated glow */}
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Stat 1 */}
            <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">groups</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-white font-semibold">Happy Travelers</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">Families, pilgrims & solo explorers — all loved their Kashi experience</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">6+</div>
              <div className="text-sm text-white font-semibold">Years in Varanasi</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">Born here, raised here — we know every ghat, temple & shortcut</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">star</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">4.9★</div>
              <div className="text-sm text-white font-semibold">Google Rating</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">Consistently rated the best tour and travel agency in Varanasi</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-white font-semibold">WhatsApp Support</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">From airport pickup to last-minute darshan booking — we're always on</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
