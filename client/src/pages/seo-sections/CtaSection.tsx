import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <>
      {/* ═══ SECTION 11 — FINAL CTA SECTION ═══ */}
      <section className="py-20 bg-gradient-to-b from-[#23160f] to-[#1A120B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Book Your Varanasi Tour Today — Trusted, Local, Unforgettable
          </h2>

          <p className="text-xl text-slate-300 mb-4 italic font-serif">
            "Kashi doesn't wait. Neither should your plans."
          </p>

          <p className="text-slate-400 leading-relaxed mb-6 text-lg max-w-3xl mx-auto">
            Every year, millions seek the blessings of Kashi Vishwanath, the fire of Ganga Aarti, and the silence of
            a pre-dawn boat ride on the holiest river in the world. But peak season (October–March) fills up fast —
            ghat-view hotels sell out weeks in advance, and VIP darshan slots are limited. Don't leave your spiritual
            journey to chance. Contact Soil N Soul Travels now and get a custom itinerary with transparent pricing
            delivered to your WhatsApp within 30 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="tel:+919580417547"
              className="bg-white text-[#1A120B] hover:bg-slate-200 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Call Now
            </a>
            <a
              href="https://wa.me/919580417547?text=Hi%2C%20I%20want%20a%20custom%20Varanasi%20tour%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">edit_note</span>
              Request Custom Package
            </Link>
          </div>

          <p className="text-2xl font-bold text-primary italic font-serif mb-8">
            "Soil N Soul Travels — Where Every Journey Becomes a Story Worth Telling."
          </p>

          {/* Physical Address + Business Hours */}
          <div className="bg-[#1A120B] border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <address className="not-italic text-slate-300 space-y-3">
              <div className="text-xl font-bold text-white">Soil N Soul Travels</div>
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                Varanasi, Uttar Pradesh — 221001, India
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">phone</span>
                <a href="tel:+919580417547" className="text-white hover:text-primary transition-colors font-semibold">
                  +91-9580417547
                </a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                <span>Business Hours: 6:00 AM – 10:00 PM | 7 Days a Week</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">language</span>
                <a href="https://www.soilnsoultravels.com" className="text-white hover:text-primary transition-colors">
                  www.soilnsoultravels.com
                </a>
              </div>
            </address>
          </div>
        </div>
      </section>

      {/* ═══ GOOGLE MAP EMBED ═══ */}
      <section className="bg-[#1A120B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: '400px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.0979970965!2d82.9087063!3d25.3207397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68131710853ff0b5!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715200000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Soil N Soul Travels Location in Varanasi, Uttar Pradesh"
            />
          </div>
        </div>
      </section>
    </>
  );
}
