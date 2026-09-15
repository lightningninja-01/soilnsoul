import React from 'react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#23160f]/80 relative overflow-hidden" id="about">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Who We Are - Varanasi's Most Trusted Tour & Travel Agency
            </h2>

            <div className="text-slate-300 leading-relaxed text-[17px] space-y-6">
              <p>
                <strong className="text-white">Soil N Soul Travels</strong> was born from a simple frustration: watching
                visitors to our beloved Kashi get overcharged by outsiders, under-served by generic agencies, and leave
                without ever experiencing the real Varanasi. As born-and-raised Varanasi locals, we knew every winding
                lane of Godaulia, every secret pre-dawn boat route on the Ganga, every pandit who could conduct a
                Rudrabhishek in English, and every shortcut through the Kashi Vishwanath Corridor that saves an hour
                during peak darshan season. We decided to build the <em>tour and travel agency in Varanasi</em> that we
                wished existed when our own families had guests visiting from out of town.
              </p>

              <p>
                Today, Soil N Soul Travels is recognized as one of the <strong className="text-white">best travel
                companies in Varanasi</strong> - a GSTIN-registered business with transparent pricing, zero hidden charges,
                and a founding team that collectively knows all 84 ghats of the Ganga by name, by history, and by the best
                time of day to visit each one. We are not a call-center agency operating from Delhi or Jaipur. We are a
                <em> local tour operator in Varanasi</em>, physically present in the city, available on a local phone
                number, and reachable on WhatsApp around the clock. Our guides have accompanied over 500 families to Kashi
                Vishwanath darshan since 2020, and every single one has rated us 4.5 stars or above.
              </p>

              <p>
                Our service breadth covers everything a traveler to Varanasi (also known as Kashi or Banaras) could need:
                spiritual tours with pandit coordination, city sightseeing packages covering Sarnath and Ramnagar Fort,
                Prayagraj day trips to the Triveni Sangam, Ayodhya pilgrimage packages including Ram Mandir darshan,
                Vindhyachal Devi excursions, car rental with verified drivers, pooja booking with certified pandits, and
                curated hotel stays near every major ghat - from budget dharamshalas to luxury heritage properties overlooking
                the Ganga. Whether you are a family with elderly pilgrims needing wheelchair-accessible darshan, a solo
                backpacker exploring the silk-weaving lanes of Banaras, a foreign tourist seeking an English-speaking guide
                for Sarnath's Buddhist heritage, a honeymooner wanting a private sunset boat ride, or a corporate group
                planning a spiritual retreat - Soil N Soul Travels designs a journey that fits you, not the other way around.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 my-8 py-2">
                <p className="text-white font-semibold text-xl italic font-serif">
                  "When you travel with Soil N Soul, you don't just visit Varanasi - you belong to it."
                </p>
              </blockquote>

              <p className="text-sm text-slate-500">
                Soil N Soul Travels is a GSTIN-registered travel business operating from Varanasi, Uttar Pradesh - 221001.
                All pricing is published transparently. No commission from hotel or vendor partnerships is passed to travelers.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1A120B] rounded-2xl border border-white/10 p-6 saffron-glow">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">verified</span>
                Quick Facts
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Founded:</strong> 2020 in Varanasi by local Kashi natives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Services:</strong> Tours, Pooja, Car Rental, Hotels, Events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Coverage:</strong> Varanasi, Prayagraj, Ayodhya, Vindhyachal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Guides:</strong> English, Hindi, and regional languages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Pricing:</strong> Transparent, fixed-rate, no hidden fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0 mt-0.5">check_circle</span>
                  <span className="text-slate-300"><strong className="text-white">Rating:</strong> 4.9-star on Google with 500+ verified reviews</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1A120B] rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">link</span>
                Explore Our Services
              </h3>
              <nav className="space-y-3 text-sm">
                <Link href="/services/city-tour" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Varanasi city tour packages
                </Link>
                <Link href="/services/pooja-booking" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Pooja booking in Varanasi
                </Link>
                <Link href="/services/travel" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Travel packages
                </Link>
                <Link href="/services/stay" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Hotel stay near ghats
                </Link>
                <Link href="/services/event" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Event planning Varanasi
                </Link>
                <Link href="/blog" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors group">
                  <span className="material-symbols-outlined text-base text-primary/50 group-hover:text-primary">arrow_forward</span>
                  Read our Varanasi travel guide
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
