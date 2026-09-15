import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadCaptureModal from '../components/LeadCaptureModal';
import ServiceInquiryModal from '../components/ServiceInquiryModal';
import { SERVICES } from '../data/services';
import { useSEO, localBusinessSchema } from '../hooks/useSEO';

// ─── Hero Slides ───────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  { url: '/images/hero/hero-1.jpg', label: 'Varanasi Ghats at Sunrise' },
  { url: '/images/hero/hero-2.jpg', label: 'Ganga Aarti Ceremony' },
  { url: '/images/hero/hero-3.jpg', label: 'Sacred Heritage of Kashi' },
];

// ─── Service Icon map ──────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, string> = {
  'travel': 'directions_car',
  'stay': 'hotel',
  'pooja-booking': 'temple_hindu',
  'event': 'celebration',
  'city-tour': 'tour',
};

// ─── Blog type ─────────────────────────────────────────────────────────────────
interface BlogPreview {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  bannerImage: string;
  createdAt: string;
}

// ─── Founder ─────────────────────────────────────────────────────────────────
const FOUNDER = {
  name: 'Anchal Pandey',
  role: 'Founder, Soil n Soul Travels',
  img: '/images/founder.jpg',
  story: [
    'I am a resident of Banaras, a city known for its ancient traditions, spiritual energy, and timeless culture.',
    'While growing up here, I often observed the challenges many tourists face when visiting Kashi. Many travelers come with deep faith, curiosity, and excitement — but unfortunately, they sometimes end up paying a lot without receiving genuine services or authentic experiences.',
    'Seeing this repeatedly made me realize that visitors to this sacred city deserve honesty, guidance, and care. That is why I decided to start Soil n Soul Travels.',
    'My vision is simple: to ensure that every traveler who chooses our services feels satisfied with every rupee they spend, and leaves Kashi with beautiful memories, meaningful experiences, and a sense of connection to this incredible city.',
    'At Soil n Soul Travels, we focus on authenticity, transparency, and heartfelt hospitality — so that every journey becomes truly memorable.',
  ],
};

// ─── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is Varanasi safe for solo travelers?',
    a: 'Yes. Varanasi is one of India\'s most visited pilgrimage cities and is generally safe. We provide all clients with local emergency contacts, verified accommodation, and a 24/7 support line for your stay.',
  },
  {
    q: 'How early should I book?',
    a: 'We recommend booking at least 2–4 weeks in advance for standard trips, and 4–8 weeks for larger groups, multi-city itineraries, or trips coinciding with major festivals like Diwali or Dev Deepawali.',
  },
  {
    q: 'Do you arrange customized itineraries?',
    a: 'Absolutely. Every itinerary we create is fully bespoke. Share your interests, dates, and group size and we will craft a journey tailored entirely to you — no off-the-shelf packages.',
  },
  {
    q: 'Can you arrange airport pickup and local transport?',
    a: 'Yes. We handle all airport, railway station, and intercity transport. Our drivers are vetted, professional, and available around the clock.',
  },
  {
    q: 'Are your accommodation recommendations verified?',
    a: 'Every property we recommend is personally inspected by our team for safety, cleanliness, and service quality. We do not list any property we would not stay in ourselves.',
  },
  {
    q: 'How do I make a booking?',
    a: 'Simply fill in the contact form below or reach us directly on WhatsApp. We respond within the hour during business hours and will guide you through the booking process step by step.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const Home = () => {
  const [heroIdx, setHeroIdx] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [inquiryModal, setInquiryModal] = useState<{ open: boolean; service: string; sub?: string }>({ open: false, service: '' });
  const openInquiry = (serviceName: string, sub?: string) => setInquiryModal({ open: true, service: serviceName, sub });

  useSEO({
    title: 'Varanasi Tour Packages & Local Travel Operator',
    description: 'Experience Varanasi authentically with Soil n Soul Travels. Verified stays, Ganga Aarti, cultural tours and more — led by Anchal Pandey, a native of Banaras.',
    url: '/',
    canonical: '/',
    structuredData: localBusinessSchema,
    keywords: 'Varanasi Tour Packages, Varanasi Travel Operator, Kashi Tours, SoilnSoul',
  });

  // Fetch latest 3 blogs from backend
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API}/blogs`)
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs.slice(0, 3));
        }
      })
      .catch(() => { })
      .finally(() => setBlogsLoading(false));
  }, []);

  // Auto-rotate hero
  React.useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Soil n Soul!\n\n*Name:* ${contactForm.name}\n*Phone:* ${contactForm.phone}\n*Service:* ${contactForm.service || 'General Inquiry'}\n*Message:* ${contactForm.message}`;
    window.open(`https://wa.me/919580417547?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      <Navbar />
      {showModal && <LeadCaptureModal onClose={() => setShowModal(false)} />}

      {/* ═══════════════════════════════════
          1. HERO
      ═══════════════════════════════════ */}
      <section className="relative min-h-[60svh] sm:min-h-[100svh] flex items-center pt-28 pb-16 overflow-hidden">
        {/* Slideshow layers */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${slide.url}')`,
              opacity: i === heroIdx ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: i === heroIdx ? 1 : 0,
            }}
            role="img"
            aria-label={slide.label}
          />
        ))}

        {/* Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/60 to-[#1A120B]/10 sm:bg-gradient-to-r sm:from-[#1A120B]/92 sm:via-[#1A120B]/55 sm:to-[#1A120B]/10" />

        {/* Dots */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === heroIdx ? 'w-7 h-2 bg-primary' : 'w-2 h-2 bg-white/35 hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="absolute bottom-6 sm:bottom-8 right-5 sm:right-10 z-20 hidden sm:flex items-center gap-2 text-white/40">
          <span className="material-symbols-outlined text-sm text-primary/60">photo_camera</span>
          <span className="text-xs font-medium">{HERO_SLIDES[heroIdx].label}</span>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full flex-1 flex sm:items-center">
          <div className="max-w-2xl w-full">
            <span className="inline-flex items-center gap-2 bg-[#1a0d00]/80 backdrop-blur-sm border border-primary text-primary text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-5 shadow-lg shadow-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
              Varanasi&apos;s Most Trusted Travel Partner
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Discover Kashi —{' '}
              <span className="text-primary italic font-light">Beyond Tourism</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
              Verified stays, authentic rituals, cultural tours, and cinematic photography. Everything you need for a real Varanasi experience — trusted, transparent, and unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/services"
                className="bg-primary hover:bg-primary/90 text-white px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl text-center active:scale-95"
              >
                Explore Services
              </Link>
              <Link
                to="/best-tours-and-travel-agency-in-varanasi"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl text-center active:scale-95 border border-white/20"
              >
                Varanasi Special Packages
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="border border-white/30 hover:border-white text-white px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all text-center active:scale-95"
              >
                Contact Us
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mt-10">
              {[
                { icon: 'verified', label: '500+ Journeys' },
                { icon: 'star', label: '4.9 Rating' },
                { icon: 'groups', label: 'Family Friendly' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-slate-300">
                  <span className="material-symbols-outlined text-primary text-lg">{b.icon}</span>
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. ABOUT US
      ═══════════════════════════════════ */}
      <section id="about" className="py-16 sm:py-20 md:py-24 bg-[#23160f]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="space-y-5 md:space-y-8">
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase">Our Story</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Founded in the Lanes of{' '}
                <span className="text-primary italic font-light">Kashi</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                In 2018, Kavita Shastri began leading small, intimate groups through the sacred sites of Varanasi that most tourists never discover. Word spread. The demand grew. And in 2020, Soil n Soul was formally born.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Our name tells you our mission. &ldquo;Soil&rdquo; is the earth beneath your feet — the particular, dusty, riverbank soil of the Gangetic plains. &ldquo;Soul&rdquo; is what you carry home.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-2">
                {[
                  { number: '500+', label: 'Journeys Curated' },
                  { number: '38', label: 'Countries' },
                  { number: '97%', label: 'Satisfaction' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white/5 rounded-xl border border-white/8">
                    <p className="text-2xl md:text-3xl font-black text-primary mb-1">{stat.number}</p>
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-[520px] order-first lg:order-last">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('/images/lordshiv.jpg')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/60 to-transparent" />
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16 md:mt-24">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">What We Stand For</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                { icon: 'psychology_alt', label: 'Authenticity', desc: 'Every journey is rooted in genuine cultural and spiritual tradition — never compromised for spectacle.' },
                { icon: 'eco', label: 'Sustainability', desc: 'Supporting local artisans, heritage hotels, and community-led initiatives is our business model.' },
                { icon: 'verified_user', label: 'Safety & Trust', desc: 'Meticulous planning and lived local knowledge ensure every traveler feels completely secure.' },
                { icon: 'diamond', label: 'Conscious Luxury', desc: 'Comfort delivered through locally-crafted excellence, not global chain anonymity.' },
              ].map((v) => (
                <div key={v.label} className="p-6 border border-white/10 rounded-2xl hover:border-primary/40 transition-all space-y-3">
                  <span className="material-symbols-outlined text-4xl text-primary block">{v.icon}</span>
                  <h3 className="text-white font-bold text-lg">{v.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. SERVICES
      ═══════════════════════════════════ */}
      <section id="services" className="py-16 sm:py-20 md:py-24 bg-[#1A120B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              From accommodation and rituals to cultural tours and photography — we handle every aspect of your Varanasi journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.slug}
                className="group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer"
              >
                {/* Image — links to detail page */}
                <Link to={`/services/${service.slug}`} className="block">
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1561095531-7e41797d6712?auto=format&fit=crop&w=800&q=70`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/70 via-transparent to-transparent" />
                  </div>
                </Link>
                {/* Info + buttons */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-xl text-primary">{SERVICE_ICONS[service.slug] || 'travel_explore'}</span>
                    <h3 className="text-white font-bold text-base sm:text-lg group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{service.shortDesc}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openInquiry(service.title)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/60 text-primary py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Inquire
                    </button>
                    <Link
                      to={`/services/${service.slug}`}
                      className="flex-1 flex items-center justify-center gap-1 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 py-2 rounded-lg text-xs font-semibold transition-all"
                    >
                      Details
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-primary/40 hover:border-primary text-primary hover:text-white hover:bg-primary px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
            >
              View All Services
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. BLOG PREVIEW
      ═══════════════════════════════════ */}
      <section id="blog" className="py-16 sm:py-20 md:py-24 bg-[#23160f]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">From Our Journal</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Latest Stories</h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:underline shrink-0"
            >
              All Posts
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Loading skeleton */}
          {blogsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-white/8" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-white/8 rounded w-1/3" />
                    <div className="h-4 bg-white/8 rounded" />
                    <div className="h-4 bg-white/8 rounded w-4/5" />
                    <div className="h-3 bg-white/8 rounded w-3/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No blogs yet */}
          {!blogsLoading && blogs.length === 0 && (
            <div className="text-center py-16 bg-white/5 border border-white/8 rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-primary/40 mb-4 block">article</span>
              <p className="text-slate-400 text-sm">Stories coming soon — check back shortly.</p>
              <Link to="/blog" className="inline-flex items-center gap-1 text-primary text-sm font-bold mt-4 hover:underline">
                Visit Blog
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          )}

          {/* Dynamic blog cards */}
          {!blogsLoading && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {blogs.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white/5 border border-white/8 hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 active:scale-[0.98]"
                >
                  {/* Banner image */}
                  <div className="relative h-44 overflow-hidden bg-white/5">
                    {post.bannerImage ? (
                      <img
                        src={post.bannerImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl text-white/10">image</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-slate-500 text-xs mb-2">
                      {new Date(post.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-bold mt-4">
                      Read More
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. FOUNDER
      ═══════════════════════════════════ */}
      <section id="team" className="py-16 sm:py-20 md:py-24 bg-[#1A120B] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* Section label */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">The Person Behind It All</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Meet Our Founder</h2>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Photo column */}
            <div className="relative">
              {/* Decorative orange ring */}
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full border-2 border-primary/20 z-0" />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 rounded-full border border-primary/10 z-0" />

              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                <img
                  src={FOUNDER.img}
                  alt={FOUNDER.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'; }}
                />
                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/80 to-transparent pt-16 pb-6 px-6">
                  <p className="text-white font-bold text-xl">{FOUNDER.name}</p>
                  <p className="text-primary text-sm font-medium mt-0.5">{FOUNDER.role}</p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-slate-400 text-xs">Native of Banaras</span>
                  </div>
                </div>
              </div>

              {/* Quote card */}
              <div className="mt-4 bg-primary/10 border border-primary/25 rounded-xl p-5 relative z-10 max-w-sm mx-auto lg:mx-0">
                <span className="text-primary text-4xl font-serif leading-none">&ldquo;</span>
                <p className="text-slate-200 text-sm italic leading-relaxed -mt-2">
                  To ensure that every traveler who chooses our services feels satisfied with every rupee they spend and leaves Kashi with beautiful memories.
                </p>
                <p className="text-primary text-xs font-bold mt-3 tracking-wider">— Anchal Pandey</p>
              </div>
            </div>

            {/* Story column */}
            <div className="space-y-5">
              {/* Greeting badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                <span className="text-slate-300 text-xs font-semibold tracking-wider">Banaras, Uttar Pradesh</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                A Story Born from
                <span className="text-primary italic font-light"> the Ghats of Ganga</span>
              </h3>

              {/* Story paragraphs */}
              <div className="space-y-4">
                {FOUNDER.story.map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key values as pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {['Authenticity', 'Transparency', 'Heartfelt Hospitality', 'Local Expertise', 'Honest Pricing'].map(v => (
                  <span key={v} className="bg-primary/12 border border-primary/25 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {v}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-3">
                <a
                  href="https://wa.me/919580417547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 active:scale-95 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  Chat with Anchal Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          6. FAQ
      ═══════════════════════════════════ */}
      <section id="faq" className="py-16 sm:py-20 md:py-24 bg-[#23160f]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">Got Questions?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Everything you need to know before planning your Varanasi journey with us.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30"
              >
                <button
                  className="w-full text-left flex justify-between items-center px-6 py-5 gap-4"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-white font-semibold text-base">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-5' : 'max-h-0'}`}
                >
                  <p className="px-6 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          7. CONTACT FORM
      ═══════════════════════════════════ */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 bg-[#1A120B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="space-y-6">
              <div>
                <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">Get In Touch</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Plan Your Journey With Us</h2>
                <p className="text-slate-400 leading-relaxed">
                  Tell us what you&apos;re looking for — we&apos;ll respond within the hour and help you plan every detail of your Varanasi experience.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: 'phone', label: 'Call / WhatsApp', value: '+91 95804 17547', href: 'tel:+919580417547' },
                  { icon: 'mail', label: 'Email', value: 'hello@soilnsoul.in', href: 'mailto:hello@soilnsoul.in' },
                  { icon: 'location_on', label: 'Based In', value: 'Varanasi, Uttar Pradesh, India', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/8">
                    <span className="material-symbols-outlined text-2xl text-primary mt-0.5 shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-semibold hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/919580417547"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 w-full sm:w-auto"
              >
                <span className="material-symbols-outlined">chat</span>
                Chat on WhatsApp — We Reply Fast
              </a>
            </div>

            {/* Right: Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-xl mb-6">Send an Inquiry</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-medium block mb-1.5">Full Name *</label>
                    <input
                      name="name" required value={contactForm.name} onChange={handleContactChange}
                      placeholder="Your full name"
                      className="w-full bg-[#1A120B] border border-white/10 hover:border-white/20 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-medium block mb-1.5">WhatsApp Number *</label>
                    <input
                      name="phone" required value={contactForm.phone} onChange={handleContactChange} type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-[#1A120B] border border-white/10 hover:border-white/20 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Service Interested In</label>
                  <select
                    name="service" value={contactForm.service} onChange={handleContactChange}
                    className="w-full bg-[#1A120B] border border-white/10 hover:border-white/20 focus:border-primary rounded-lg px-4 py-3 text-white text-sm outline-none transition-colors"
                  >
                    <option value="" className="bg-[#1A120B]">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.slug} value={s.title} className="bg-[#1A120B]">{s.title}</option>
                    ))}
                    <option value="General Inquiry" className="bg-[#1A120B]">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Message</label>
                  <textarea
                    name="message" value={contactForm.message} onChange={handleContactChange} rows={4}
                    placeholder="Tell us about your travel dates, group size, and what you're looking for..."
                    className="w-full bg-[#1A120B] border border-white/10 hover:border-white/20 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Service Inquiry Modal ── */}
      <ServiceInquiryModal
        isOpen={inquiryModal.open}
        onClose={() => setInquiryModal({ open: false, service: '' })}
        serviceName={inquiryModal.service}
        subServiceName={inquiryModal.sub}
      />
    </div>
  );
};

export default Home;
