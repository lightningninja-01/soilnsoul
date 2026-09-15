import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceInquiryModal from '../components/ServiceInquiryModal';
import { getServiceBySlug, SERVICES } from '../data/services';
import { useSEO, breadcrumbSchema } from '../hooks/useSEO';

const SERVICE_ICONS: Record<string, string> = {
  'travel': 'directions_car',
  'stay': 'hotel',
  'pooja-booking': 'temple_hindu',
  'event': 'celebration',
  'city-tour': 'tour',
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' });
  const [hotels, setHotels] = useState<any[]>([]);

  useEffect(() => {
    if (slug === 'stay') {
      fetch(`${import.meta.env.VITE_API_URL}/hotels`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setHotels(data.hotels);
          }
        })
        .catch(err => console.error(err));
    }
  }, [slug]);

  // ── Inquiry modal state ────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<string | undefined>(undefined);

  const openModal = (subName?: string) => {
    setSelectedSub(subName);
    setModalOpen(true);
  };

  if (!service) return <Navigate to="/services" replace />;

  // ── Per-service SEO ─────────────────────────────────────────────────────────
  // (Rules of Hooks: must be after early returns are guarded, but since
  //  we redirect instead of returning null, we call useSEO unconditionally
  //  and it's safe. The Navigate above will prevent render.)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.shortDesc,
        provider: { '@type': 'TravelAgency', name: 'Soil n Soul Travels' },
        areaServed: 'Varanasi',
      },
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: service.title, url: `/services/${service.slug}` },
      ]),
    ],
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSEO({
    title: `${service.title} in Varanasi`,
    description: service.shortDesc,
    url: `/services/${service.slug}`,
    canonical: `/services/${service.slug}`,
    image: service.image,
    structuredData: serviceSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi! I'm interested in *${service.title}*.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Preferred Date:* ${form.date || 'Flexible'}\n*Message:* ${form.message}`;
    window.open(`https://wa.me/919580417547?text=${encodeURIComponent(text)}`, '_blank');
  };

  const related = SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      <Navbar />

      {/* ── Header with service image as background ── */}
      <section className="relative pt-28 pb-12 overflow-hidden border-b border-white/8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${service.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B]/97 via-[#1A120B]/85 to-[#1A120B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-[#1A120B]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary">{service.title}</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 backdrop-blur-sm">
              <span className="material-symbols-outlined text-3xl text-primary">
                {SERVICE_ICONS[service.slug] || 'travel_explore'}
              </span>
            </div>
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-1">Our Services</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-10">

            {/* Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">About This Service</h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{service.fullDesc}</p>
            </div>

            {/* Sub-services — each is now a clickable button that opens the modal */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-white">What's Included</h2>
                <span className="text-slate-500 text-xs bg-white/5 border border-white/8 rounded-full px-3 py-1">
                  Tap to inquire
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.subServices.map((sub) => (
                  <button
                    key={sub.title}
                    onClick={() => openModal(sub.title)}
                    className="flex gap-4 p-4 bg-white/5 border border-white/8 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer text-left group w-full active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5 shrink-0">check_circle</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-white font-semibold text-sm group-hover:text-primary transition-colors">{sub.title}</p>
                        <span className="material-symbols-outlined text-slate-600 text-sm shrink-0 group-hover:text-primary transition-colors">open_in_new</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{sub.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* "Inquire about full service" button */}
              <button
                onClick={() => openModal()}
                className="mt-4 w-full flex items-center justify-center gap-2 border border-primary/30 hover:border-primary hover:bg-primary/10 text-primary py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
                Inquire About {service.title}
              </button>
            </div>

            {/* ── Hotels Section (Only for Stay) ── */}
            {service.slug === 'stay' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">Our Featured Stays</h2>
                {hotels.length > 0 ? (
                  <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 hotel-slider" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {hotels.map((hotel) => (
                      <div key={hotel._id} className="min-w-[85%] sm:min-w-[48%] snap-start shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col">
                        <div className="h-40 overflow-hidden">
                          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-white mb-2">{hotel.name}</h3>
                          <p className="text-slate-400 text-xs leading-relaxed mb-5 flex-1">
                            {hotel.description}
                          </p>
                          <a
                            href={`https://wa.me/919580417547?text=${encodeURIComponent(hotel.whatsappMessage || `Hi! I am interested in booking ${hotel.name}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white/10 hover:bg-green-600 border border-white/10 hover:border-green-600 text-white py-2.5 rounded-xl font-bold text-xs text-center transition-all flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-base">chat</span>
                            Inquire on WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                    <style>{`.hotel-slider::-webkit-scrollbar { display: none; }`}</style>
                  </div>
                ) : (
                    <p className="text-slate-400 text-sm">Loading stays...</p>
                )}
              </div>
            )}

            {/* FAQ */}
            {service.faqs.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                      >
                        <span className="text-white font-semibold text-sm pr-4">{faq.q}</span>
                        <span
                          className="material-symbols-outlined text-primary shrink-0 transition-transform duration-300"
                          style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          expand_more
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 border-t border-white/8">
                          <p className="text-slate-400 text-sm leading-relaxed pt-3">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <h3 className="text-white font-bold text-lg mb-1">Book / Inquire</h3>
              <p className="text-slate-400 text-xs mb-5">We respond within 1 hour via WhatsApp.</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  required name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name *"
                  className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                />
                <input
                  required name="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="WhatsApp Number *"
                  className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                />
                <input
                  name="date" type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="Preferred Date (optional)"
                  className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                />
                <textarea
                  name="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us your requirements..."
                  className="w-full bg-[#1A120B] border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                  Send via WhatsApp
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-white/10 space-y-3">
                <a href="tel:+919580417547" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors text-sm">
                  <span className="material-symbols-outlined text-primary text-lg">phone</span>
                  +91 95804 17547
                </a>
                <a href="https://wa.me/919580417547" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors text-sm">
                  <span className="material-symbols-outlined text-green-400 text-lg">chat</span>
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Other Services ── */}
      <section className="py-14 bg-[#23160f]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-2xl font-bold text-white mb-8">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex items-center gap-3 bg-white/5 border border-white/8 hover:border-primary/40 hover:bg-white/8 rounded-xl p-4 transition-all"
              >
                <span className="material-symbols-outlined text-2xl text-primary shrink-0">
                  {SERVICE_ICONS[s.slug] || 'travel_explore'}
                </span>
                <span className="text-white font-semibold text-sm group-hover:text-primary transition-colors">
                  {s.title}
                </span>
                <span className="material-symbols-outlined text-slate-600 text-sm ml-auto group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Inquiry Modal ── */}
      <ServiceInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={service.title}
        subServiceName={selectedSub}
      />
    </div>
  );
};

export default ServiceDetail;
