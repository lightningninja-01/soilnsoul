import React from 'react';
import { PACKAGES } from '../../data/seoPageData';

const TAG_COLORS: Record<string, string> = {
  'Best Seller': 'bg-green-600',
  'Quick Tour': 'bg-blue-600',
  'Pilgrimage': 'bg-purple-600',
  'Popular': 'bg-primary',
  'Premium': 'bg-amber-500 text-[#1A120B]',
};

export default function PackagesSection() {
  return (
    <section className="py-20 bg-[#1A120B] relative overflow-hidden" id="packages">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Most Booked in 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Most Booked Varanasi Tour Packages in 2026
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            From half-day city tours starting at ₹999 to luxury heritage experiences — choose a varanasi tour package
            that matches your budget, timeline, and spiritual intent. Every package by Soil N Soul is fully customizable,
            transparently priced, and includes 24/7 on-ground support throughout your stay.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg, i) => (
            <div
              key={i}
              className="bg-[#23160f] rounded-2xl border border-white/5 overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col group relative"
            >
              {/* Gradient top accent */}
              <div className="h-1 bg-gradient-to-r from-primary via-amber-500 to-primary" />

              {/* Tag */}
              <div className="px-6 pt-6 pb-0">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${TAG_COLORS[pkg.tag] || 'bg-primary'}`}>
                  {pkg.tag}
                </span>
              </div>

              <div className="p-6 pt-4 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {pkg.name}
                </h3>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  {pkg.duration}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  <strong className="text-slate-300">Inclusions:</strong> {pkg.inclusions}
                </p>

                <p className="text-slate-500 text-sm italic mb-6">{pkg.cta}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Starting from</div>
                    <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                  </div>
                  <a
                    href={`https://wa.me/919580417547?text=Hi%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.name)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional SEO content below packages */}
        <div className="mt-16 bg-[#23160f] rounded-2xl border border-white/10 p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">
            Looking for a Custom Varanasi Tour Package?
          </h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            The packages listed above are our most popular options, but Soil N Soul Travels specializes in building
            completely customized itineraries. Whether you need a <strong className="text-white">varanasi 1 night 2 days
            package</strong> for a quick spiritual stopover, a <strong className="text-white">luxury tour package
            in Varanasi</strong> with heritage hotel stays and private photography, a{' '}
            <strong className="text-white">varanasi pilgrimage tour package</strong> covering Kashi Vishwanath,
            Vindhyachal, and Prayagraj in one circuit, or a budget-friendly{' '}
            <strong className="text-white">varanasi sightseeing package</strong> for solo travelers — just tell us your
            dates, group size, budget, and interests. Our team will deliver a detailed, transparently priced itinerary
            to your WhatsApp within 30 minutes.
          </p>
          <a
            href="https://wa.me/919580417547?text=Hi%2C%20I%20need%20a%20custom%20Varanasi%20tour%20package"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Request Custom Package on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
