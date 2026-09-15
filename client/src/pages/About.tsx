import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
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

  const values = [
    { icon: 'psychology_alt', label: 'Authenticity', desc: 'We never compromise the soul of an experience for spectacle. Every journey is rooted in genuine cultural and spiritual tradition.' },
    { icon: 'eco', label: 'Sustainability', desc: 'Supporting local artisans, heritage hotels, and community-led initiatives is not a CSR initiative for us—it is our business model.' },
    { icon: 'verified_user', label: 'Safety & Trust', desc: 'Meticulous planning and lived local knowledge ensure every traveler, especially solo female travelers, feels completely secure.' },
    { icon: 'diamond', label: 'Conscious Luxury', desc: 'Comfort is non-negotiable, but it is delivered through locally-crafted excellence, not global chain anonymity.' },
  ];

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 font-display">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] md:h-[80vh] overflow-hidden flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(to right, rgba(26,18,11,0.95), rgba(26,18,11,0.4)), url('https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=85')` }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-5 md:px-10 pb-12 md:pb-24 pt-28 md:pt-0">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3 md:mb-4">Our Story</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6">
              Born from the{' '}
              <span className="text-primary italic font-light">Heart of Kashi</span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 leading-relaxed">
              Soil n Soul Travels was founded with one belief — every visitor to Varanasi deserves honest, authentic, and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 md:py-24 max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-5 md:space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Founded in the lanes of <span className="text-primary italic">Kashi</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              Anchal Pandey, a native of Banaras, witnessed firsthand how tourists were often misled and overcharged. She believed the sacred city deserved better custodians.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Our name tells you our mission. &ldquo;Soil&rdquo; is the earth beneath your feet — the particular, dusty, riverbank soil of the Gangetic plains. &ldquo;Soul&rdquo; is what you carry home.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-2 md:pt-4">
              {[
                { number: '500+', label: 'Journeys Curated' },
                { number: '38', label: 'Countries' },
                { number: '97%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 md:p-0 bg-white/5 md:bg-transparent rounded-xl md:rounded-none">
                  <p className="text-2xl md:text-4xl font-black text-primary mb-1">{stat.number}</p>
                  <p className="text-slate-400 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 rounded-2xl overflow-hidden h-64 sm:h-80 md:h-[500px]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80')` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-24 bg-[#23160f]/50">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {values.map((v) => (
              <div key={v.label} className="p-5 md:p-8 border border-white/10 rounded-2xl hover:border-primary/40 transition-all space-y-3 group">
                <span className="material-symbols-outlined text-3xl md:text-4xl text-primary block">{v.icon}</span>
                <h3 className="text-white font-bold text-lg md:text-xl">{v.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-14 md:py-24 max-w-7xl mx-auto px-5 md:px-10 overflow-hidden">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">The Person Behind It All</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Founder</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full border-2 border-primary/20 z-0" />
            <div className="absolute -bottom-4 -right-4 w-48 h-48 rounded-full border border-primary/10 z-0" />

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <img
                src={FOUNDER.img}
                alt={FOUNDER.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'; }}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/80 to-transparent pt-16 pb-6 px-6">
                <p className="text-white font-bold text-xl">{FOUNDER.name}</p>
                <p className="text-primary text-sm font-medium mt-0.5">{FOUNDER.role}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-slate-400 text-xs">Native of Banaras</span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-primary/10 border border-primary/25 rounded-xl p-5 relative z-10 max-w-sm mx-auto lg:mx-0">
              <span className="text-primary text-4xl font-serif leading-none">&ldquo;</span>
              <p className="text-slate-200 text-sm italic leading-relaxed -mt-2">
                To ensure that every traveler who chooses our services feels satisfied with every rupee they spend and leaves Kashi with beautiful memories.
              </p>
              <p className="text-primary text-xs font-bold mt-3 tracking-wider">— Anchal Pandey</p>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-primary text-sm">location_on</span>
              <span className="text-slate-300 text-xs font-semibold tracking-wider">Banaras, Uttar Pradesh</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              A Story Born from
              <span className="text-primary italic font-light"> the Ghats of Ganga</span>
            </h3>

            <div className="space-y-4">
              {FOUNDER.story.map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-sm md:text-base">{para}</p>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {['Authenticity', 'Transparency', 'Heartfelt Hospitality', 'Local Expertise', 'Honest Pricing'].map(v => (
                <span key={v} className="bg-primary/12 border border-primary/25 text-primary text-xs font-semibold px-3 py-1 rounded-full">{v}</span>
              ))}
            </div>

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
      </section>

      {/* CTA */}
      <section className="py-14 md:py-24 max-w-7xl mx-auto px-5 md:px-10 text-center">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl md:rounded-3xl p-8 md:p-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Join Our Lineage of Travelers</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
            Every great journey begins with a single inquiry. Let us be the bridge between who you are and who you&apos;ll become in Varanasi.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xl text-sm md:text-base"
          >
            Plan My Journey
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
