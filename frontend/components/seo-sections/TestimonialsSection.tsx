import React from 'react';
import { TESTIMONIALS } from '@/lib/seo-page-data';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#23160f] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Verified Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Travelers Say About Soil N Soul Travels - Varanasi's Top Rated Agency
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Real reviews from real travelers. These are authentic experiences shared by families, solo explorers,
            international tourists, and corporate groups who chose Soil N Soul for their Varanasi journey.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex text-primary text-xl">★★★★★</div>
            <span className="text-white font-bold">4.9/5</span>
            <span className="text-slate-500">from 500+ verified reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((review, i) => (
            <div
              key={i}
              className="bg-[#1A120B] p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 relative group"
            >
              <div className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none pointer-events-none">"</div>

              <div className="flex items-center gap-1 text-primary mb-4">
                {Array.from({ length: review.stars }, (_, j) => (
                  <span key={j} className="text-lg">★</span>
                ))}
                <span className="text-xs text-slate-500 ml-2">{review.stars}.0 / 5.0</span>
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed text-[15px] relative z-10">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {review.city}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="material-symbols-outlined text-green-500 text-lg" title="Verified review">verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
