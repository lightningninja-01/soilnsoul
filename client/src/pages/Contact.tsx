import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

const faqs = [
  { q: 'What should I wear when visiting sacred sites?', a: 'Modest dress is greatly appreciated and often required at temples. We recommend loose, breathable, light-colored clothing that covers shoulders and knees. We will always advise you ahead of each visit.' },
  { q: 'Are your experiences pregnancy friendly?', a: "Many of our experiences can be adapted for pregnancy. Flat-terrain walks, cultural experiences, and boat rides are generally very suitable. We ask that you discuss your requirements with your guide during planning." },
  { q: 'What is your cancellation policy?', a: "We understand that plans change. We offer a full refund for cancellations made 14+ days before your scheduled experience, and store credit for cancellations made 7-14 days prior. Within 7 days, cancellations are non-refundable but can be rescheduled." },
  { q: 'Can you accommodate dietary requirements?', a: "Absolutely. We work with restaurants and private chefs who can accommodate all dietary needs, from vegan and gluten-free to severe allergies. Simply inform us at booking, and we will handle the rest." },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', size: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'Contact Us — Plan Your Varanasi Journey',
    description: 'Get in touch with Soil n Soul Travels to plan your perfect Varanasi experience. WhatsApp, email, or fill our inquiry form. We reply within the hour.',
    url: '/contact',
    canonical: '/contact',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our specialists will be in touch within 12 hours.');
  };

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 font-display">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">Let's Connect</p>
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Begin Your <br /><span className="text-gold italic font-light">Sacred Journey</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Our destination specialists are ready to craft your bespoke pilgrimage through the ancient heart of Varanasi. Limited seasonal placements available.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-8">Send an Inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Full Name *</label>
                  <input
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-slate-600"
                    name="name"
                    onChange={handleChange}
                    placeholder="Arjun Mehta"
                    required
                    type="text"
                    value={form.name}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Email Address *</label>
                  <input
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-slate-600"
                    name="email"
                    onChange={handleChange}
                    placeholder="arjun@example.com"
                    required
                    type="email"
                    value={form.email}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Phone</label>
                  <input
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors placeholder:text-slate-600"
                    name="phone"
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    type="tel"
                    value={form.phone}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Service of Interest</label>
                  <select
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    name="service"
                    onChange={handleChange}
                    value={form.service}
                  >
                    <option value="" className="bg-[#1A120B]">Select a Service...</option>
                    <option className="bg-[#1A120B]">Ganga Aarti Experience</option>
                    <option className="bg-[#1A120B]">Sunrise Boat Ride</option>
                    <option className="bg-[#1A120B]">Silk Heritage Walk</option>
                    <option className="bg-[#1A120B]">Women-Only Circle</option>
                    <option className="bg-[#1A120B]">Vedic Meditation Retreat</option>
                    <option className="bg-[#1A120B]">Bespoke Custom Journey</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Preferred Date</label>
                  <input
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    name="date"
                    onChange={handleChange}
                    type="date"
                    value={form.date}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Group Size</label>
                  <select
                    className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                    name="size"
                    onChange={handleChange}
                    value={form.size}
                  >
                    <option className="bg-[#1A120B]">Solo Traveler</option>
                    <option className="bg-[#1A120B]">2-3 Persons</option>
                    <option className="bg-[#1A120B]">4-6 Persons</option>
                    <option className="bg-[#1A120B]">7-12 Persons</option>
                    <option className="bg-[#1A120B]">Group 12+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">Your Vision</label>
                <textarea
                  className="w-full bg-[#1A120B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-32 resize-none placeholder:text-slate-600"
                  name="message"
                  onChange={handleChange}
                  placeholder="Tell us about your travel vision, spiritual interests, or any specific requirements..."
                  value={form.message}
                />
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                type="submit"
              >
                <span className="material-symbols-outlined">send</span>
                Send Your Inquiry
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              {[
                { icon: 'location_on', label: 'Our Base', value: '14, Ravindrapuri Colony,\nVaranasi, Uttar Pradesh 221005, India' },
                { icon: 'call', label: 'Phone & WhatsApp', value: '+91 98765 43210' },
                { icon: 'mail', label: 'Email Inquiries', value: 'journeys@soilnsoul.in' },
                { icon: 'schedule', label: 'Office Hours', value: 'Mon – Saturday: 9 AM to 7 PM IST\nSunday: Closed (we pray too)' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="h-56 bg-gradient-to-br from-[#2a1a0f] to-[#1A120B] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Varanasi_map.png/640px-Varanasi_map.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="relative z-10 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">location_on</span>
                  <p className="text-white font-bold text-sm">Varanasi, Uttar Pradesh</p>
                  <p className="text-slate-400 text-xs">The Holy City of India</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-bold text-sm mb-5">Follow Our Journey</h4>
              <div className="grid grid-cols-2 gap-4">
                {['Instagram', 'Pinterest'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="flex items-center gap-3 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/30 px-4 py-3 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-primary text-sm">
                      {platform === 'Instagram' ? 'camera_alt' : 'interests'}
                    </span>
                    <span className="text-white text-sm font-medium">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white/5 border rounded-xl overflow-hidden transition-all ${openFaq === i ? 'border-primary/50' : 'border-white/10'}`}
            >
              <button
                className="w-full text-left px-8 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <h4 className="text-white font-semibold">{faq.q}</h4>
                <span
                  className={`material-symbols-outlined text-primary shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                >
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <div className="px-8 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
