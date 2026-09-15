import React from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/seo-page-data';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-[#1A120B] relative overflow-hidden" id="services">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Complete Travel Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Tour & Travel Services in Varanasi - Everything You Need, One Agency
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            Soil N Soul Travels provides comprehensive, end-to-end travel services across Varanasi and the entire UP
            pilgrimage belt. From your first airport pickup to your final ghat darshan, from pooja samagri arrangement
            to heritage hotel booking - one trusted local agency handles it all with transparent pricing and 24/7 support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="bg-[#23160f] p-8 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl text-primary group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">{service.text}</p>
                <Link
                  href={service.link}
                  className="text-primary font-semibold text-sm uppercase tracking-wider hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:gap-2"
                >
                  Learn More
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <p className="text-slate-400 text-center leading-relaxed">
            As the most trusted <strong className="text-white">travel agent in Varanasi</strong>, Soil N Soul Travels
            also arranges corporate travel packages for companies hosting retreats or team outings in Kashi, wedding
            travel planning for destination weddings near the ghats, and specialized{' '}
            <em>Varanasi travel packages for families</em> with senior citizens, children, or differently-abled members.
            Whether you need a{' '}
            <Link href="/services/city-tour" className="text-primary hover:underline">Varanasi guided tour with English-speaking guides</Link>,
            a <Link href="/services/stay" className="text-primary hover:underline">hotel booking near Assi Ghat or Dashashwamedh</Link>,
            or a complete <Link href="/services/travel" className="text-primary hover:underline">Varanasi to Ayodhya tour package</Link>{' '}
            - we design, execute, and support your journey from inquiry to checkout.
          </p>
        </div>
      </div>
    </section>
  );
}
