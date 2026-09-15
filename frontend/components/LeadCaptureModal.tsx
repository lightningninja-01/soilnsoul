'use client';

import { useState, useEffect } from 'react';

const SERVICES_LIST = [
  'Verified & Safe Stays',
  'Ritual & Priest Arrangements',
  'Local Cultural Tours',
  'Airport / Railway Pickup',
  'Banarasi Silk Shopping',
  'Pre-Wedding Photography',
  'General Inquiry',
];

interface LeadCaptureModalProps {
  onClose: () => void;
}

const LeadCaptureModal = ({ onClose }: LeadCaptureModalProps) => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! I'm interested in *${form.service || 'your services'}*.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Message:* ${form.message}`;
    window.open(`https://wa.me/919580417547?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#1A120B] border border-white/10 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl overflow-hidden">
        <div className="relative bg-primary/10 border-b border-white/8 px-6 pt-6 pb-5">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors" aria-label="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-3xl text-primary">flare</span>
            <div>
              <p className="text-primary text-xs font-bold tracking-widest uppercase">Soil n Soul Travel</p>
              <h3 className="text-white font-bold text-lg leading-tight">Plan Your Varanasi Journey</h3>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Send us a quick message and we&apos;ll respond within the hour.</p>
        </div>

        <form onSubmit={handleWhatsApp} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-name" className="text-xs text-slate-400 font-medium block mb-1">Your Name *</label>
              <input id="lead-name" name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label htmlFor="lead-phone" className="text-xs text-slate-400 font-medium block mb-1">Phone / WhatsApp *</label>
              <input id="lead-phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 9876543210" type="tel"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label htmlFor="lead-service" className="text-xs text-slate-400 font-medium block mb-1">Service Interested In</label>
            <select id="lead-service" name="service" value={form.service} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-primary transition-colors">
              <option value="" className="bg-[#1A120B]">Select a service...</option>
              {SERVICES_LIST.map((s) => (
                <option key={s} value={s} className="bg-[#1A120B]">{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-message" className="text-xs text-slate-400 font-medium block mb-1">Your Message</label>
            <textarea id="lead-message" name="message" value={form.message} onChange={handleChange} placeholder="e.g. I'm planning to visit Varanasi in March with my family..." rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>

          <button type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95">
            <span className="material-symbols-outlined text-lg">chat</span>
            Send via WhatsApp
          </button>
          <p className="text-center text-xs text-slate-500">
            Or call us: <a href="tel:+919580417547" className="text-primary font-medium">+91 95804 17547</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
