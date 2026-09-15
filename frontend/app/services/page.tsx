import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SERVICES } from '@/data/services';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Services — Varanasi Travel, Stays & Rituals',
  description:
    'Trusted, verified Varanasi travel services: airport pickups, heritage stays, Ganga Aarti pooja bookings, city tours and custom itineraries. Book with Soil n Soul Travels.',
  alternates: { canonical: '/services' },
};

const SERVICE_ICONS: Record<string, string> = {
  travel: 'directions_car',
  stay: 'hotel',
  'pooja-booking': 'temple_hindu',
  event: 'celebration',
  'city-tour': 'tour',
};

export default function ServicesPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.soilnsoultravels.com/services#webpage',
    'url': 'https://www.soilnsoultravels.com/services',
    'name': 'Our Varanasi Travel Services — Soil n Soul Travels',
    'description': 'Handpicked, locally-managed travel services in Varanasi including heritage stays, Ganga Aarti bookings, local tours, car rental and custom itineraries.',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.soilnsoultravels.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': 'https://www.soilnsoultravels.com/services' }
      ]
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': SERVICES.length,
      'itemListElement': SERVICES.map((service, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'Service',
          'name': service.title,
          'description': service.shortDesc,
          'url': `https://www.soilnsoultravels.com/services/${service.slug}`
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Hero */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1561095531-7e41797d6712?auto=format&fit=crop&w=1920&q=85"
          alt="Varanasi Riverfront"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B]/95 via-[#1A120B]/70 to-[#1A120B]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-8 pt-28 w-full">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">
              Everything You Need
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Our Services
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg">
              Trusted, verified, and locally-rooted services for every aspect of your Varanasi
              journey — from the moment you land to the moment you leave.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {SERVICES.map((service, i) => (
            <div
              key={service.slug}
              className="group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/80 to-transparent" />
                <div className="absolute top-3 right-3 bg-[#1A120B]/80 backdrop-blur-sm p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-xl text-primary">
                    {SERVICE_ICONS[service.slug] || 'travel_explore'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col">
                <h2 className="text-white font-bold text-lg sm:text-xl mb-2 group-hover:text-primary transition-colors leading-snug">
                  {service.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {service.shortDesc}
                </p>

                {/* Sub-services preview */}
                <ul className="space-y-1.5 mb-5">
                  {service.subServices.slice(0, 3).map((sub) => (
                    <li key={sub.title} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">
                        check_circle
                      </span>
                      {sub.title}
                    </li>
                  ))}
                  {service.subServices.length > 3 && (
                    <li className="text-xs text-slate-500 pl-6">
                      +{service.subServices.length - 3} more...
                    </li>
                  )}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all text-center active:scale-95"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke CTA */}
        <div className="mt-8 sm:mt-10 bg-primary/10 border border-primary/20 rounded-2xl p-8 sm:p-10 text-center">
          <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary mb-4 block">
            edit_note
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Can&apos;t Find What You Need?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            We create fully custom Varanasi itineraries tailored to your group, budget, and
            interests. Just tell us what you&apos;re looking for.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95"
          >
            Request Custom Plan
          </Link>
        </div>
      </section>
    </div>
  );
}
