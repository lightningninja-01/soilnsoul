import React from 'react';

export default function SeasonalGuideSection() {
  return (
    <section className="py-20 bg-[#23160f] relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Seasonal Travel Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Best Time to Visit Varanasi — A Month-by-Month Guide
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            The best time to visit Varanasi depends on what you want to experience. Here is a season-by-season breakdown
            to help you choose the perfect window for your spiritual journey, city tour, or pilgrimage package with
            Soil N Soul Travels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Peak Season */}
          <div className="bg-[#1A120B] rounded-2xl border border-white/5 overflow-hidden hover:border-orange-500/30 transition-all duration-300 group">
            {/* Color accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <span className="material-symbols-outlined text-orange-400 text-2xl">wb_sunny</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">October to March</h3>
                  <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Peak Season — Best for First-Timers</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                This is the golden window for visiting Varanasi. The weather is pleasant (15–25°C), mornings on the
                ghats are crisp and atmospheric, and the city hosts its most spectacular festivals. Witness the magical{' '}
                <strong className="text-white">Dev Deepawali</strong> (Kartik Purnima) when a million diyas illuminate
                every ghat from Assi to Rajghat, experience the <strong className="text-white">Ganga Mahotsav</strong>{' '}
                cultural festival with classical music performances on the ghats, and enjoy foggy winter sunrises over the
                Ganga that photographers dream about for years. This is the ideal season for spiritual ceremonies, outdoor
                sightseeing, walking tours through the old city lanes, and the full varanasi city tour experience. Soil N
                Soul Travels recommends booking at least 2 weeks in advance during this period, as accommodation near ghats
                and VIP Kashi Vishwanath darshan slots sell out rapidly.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-medium">Dev Deepawali</span>
                <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-medium">Ganga Mahotsav</span>
                <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-medium">Maha Shivratri</span>
              </div>
            </div>
          </div>

          {/* Summer */}
          <div className="bg-[#1A120B] rounded-2xl border border-white/5 overflow-hidden hover:border-yellow-500/30 transition-all duration-300 group">
            <div className="h-1.5 bg-gradient-to-r from-yellow-500 to-lime-400" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <span className="material-symbols-outlined text-yellow-400 text-2xl">thermostat</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">April to June</h3>
                  <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">Summer — Budget Travel Window</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Summers in Varanasi are intense, with temperatures climbing to 45°C — but this is also when the city
                reveals a quieter, more intimate side. The ghats are less crowded, temple queues at Kashi Vishwanath are
                shorter (often under 15 minutes), and hotel rates drop 30–50% from peak pricing. Budget travelers can
                access premium ghat-view rooms at off-season prices. Soil N Soul's summer packages focus on early
                morning (5–8 AM) and evening (5–9 PM) activities — the best strategy for avoiding midday heat while
                still capturing the full spiritual experience. Short 1-night spiritual packages are especially popular
                during this window. This season is best suited for budget travelers, short business trips, repeat
                visitors, and families with flexible school holiday schedules who want maximum value.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Budget Deals</span>
                <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Short Queues</span>
                <span className="px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium">Ganga Dussehra</span>
              </div>
            </div>
          </div>

          {/* Monsoon */}
          <div className="bg-[#1A120B] rounded-2xl border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all duration-300 group">
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <span className="material-symbols-outlined text-blue-400 text-2xl">water_drop</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">July to September</h3>
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Monsoon — Spiritual Intensity</span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The monsoon transforms Varanasi into its most spiritually charged form. The Ganga swells to its fullest,
                the ghats take on a raw, primordial energy, and the city celebrates some of its most sacred observances:{' '}
                <strong className="text-white">Sawan Somvar</strong> (Monday fasts dedicated to Lord Shiva when Kashi
                Vishwanath sees massive devotee turnout),{' '}
                <strong className="text-white">Nag Panchami</strong> (serpent worship at ancient temples),{' '}
                <strong className="text-white">Raksha Bandhan</strong> ceremonies at the ghats, and the breathtaking
                intensity of daily Ganga Aarti performed in monsoon rain. With fewer tourists, this is the season for
                truly immersive, authentic local experiences that most visitors never get to see. Soil N Soul's monsoon
                packages include covered boat rides, temple-focused itineraries, indoor heritage walks through the silk
                weaving lanes, and curated culinary walks — perfect for travelers who want Kashi at its most raw and real.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">Sawan Somvar</span>
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">Nag Panchami</span>
                <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">Authentic Kashi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
