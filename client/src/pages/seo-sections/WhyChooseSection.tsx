import React from 'react';

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-[#23160f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Soil N Soul Travels Is the Best Tour & Travel Agency in Varanasi
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            Hundreds of travelers trust us every month. Here's what makes us different from every other agency in the city.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {/* Differentiator 1 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">explore</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Local Knowledge — We're Not Tourists Here</h3>
              <p className="text-slate-400 leading-relaxed">
                We are Varanasi natives who grew up navigating the narrow lanes of Kashi long before Google Maps could
                chart them. We know which boats give you the best sunrise angle over Manikarnika Ghat, which pandit at
                Kashi Vishwanath speaks fluent English, which chai stall near Godaulia serves the best malaiyo in winter,
                and which ghat becomes impassable during Sawan. This is not knowledge you can Google — it comes from
                living and breathing Banaras every single day for decades.
              </p>
            </div>
          </div>

          {/* Differentiator 2 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Transparent Pricing — No Hidden Charges, Ever</h3>
              <p className="text-slate-400 leading-relaxed">
                Every Soil N Soul package comes with a fixed-rate quotation delivered via WhatsApp within 30 minutes of
                inquiry. No surprise surcharges at checkout, no inflated hotel commissions passed to you, no "festival
                season premium" invented on the spot. The price we quote is the price you pay — and it includes
                everything we promise. We believe transparent pricing is the foundation of trust, and trust is why 500+
                travelers have given us a 4.9★ rating.
              </p>
            </div>
          </div>

          {/* Differentiator 3 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">tune</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Customized Itineraries for Every Traveler Type</h3>
              <p className="text-slate-400 leading-relaxed">
                A family with elderly pilgrims needs a completely different itinerary than a solo backpacker or a group of
                foreign tourists. Soil N Soul Travels builds tailored plans for every type: families with senior citizens
                get slower-paced schedules with wheelchair-accessible temples; solo female travelers get verified female
                guides and safe ghat-side accommodation; honeymooners get private heritage boat rides; and corporate
                groups get structured team itineraries with group transport coordination.
              </p>
            </div>
          </div>

          {/* Differentiator 4 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">24/7 On-Ground Support in Varanasi</h3>
              <p className="text-slate-400 leading-relaxed">
                When you call Soil N Soul at 2 AM because your flight landed late and you need a pickup from Lal Bahadur
                Shastri Airport — a real person in Varanasi answers. Not a call center in Delhi, not an automated chatbot,
                not a "we'll get back to you during business hours" email. Our local team is physically present in the city,
                reachable on WhatsApp and local phone numbers, and ready to solve any problem — from a last-minute Kashi
                Vishwanath darshan slot to an emergency hotel change.
              </p>
            </div>
          </div>

          {/* Differentiator 5 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">translate</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">English + Hindi + Regional Language Guides</h3>
              <p className="text-slate-400 leading-relaxed">
                Varanasi attracts travelers from London to Lucknow, Melbourne to Madurai. Soil N Soul Travels maintains a
                roster of certified multilingual guides who can narrate the history of Sarnath's Dhamek Stupa in fluent
                English, explain the significance of Pind Daan rituals in Hindi, or coordinate a pooja ceremony in Tamil
                or Bengali for South Indian and East Indian pilgrims. Language should never be a barrier to spiritual
                experience.
              </p>
            </div>
          </div>

          {/* Differentiator 6 */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-2xl">star</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">4.9★ Rating Across Google, TripAdvisor & Travel Portals</h3>
              <p className="text-slate-400 leading-relaxed">
                Numbers don't lie. With a 4.9-star rating across Google Reviews and 500+ verified traveler testimonials,
                Soil N Soul Travels has earned its reputation as the best tours and travel agency in Varanasi through
                consistent delivery, not marketing promises. Every review is from a real traveler who experienced our
                services firsthand — from the airport pickup to the final ghat goodbye.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
