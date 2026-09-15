'use client';

import { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  subServiceName?: string;
}

export default function ServiceInquiryModal({ isOpen, onClose, serviceName, subServiceName }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = subServiceName
      ? `${serviceName} -- ${subServiceName}`
      : serviceName;

    const text = `Hi! I'm interested in *${subject}*.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'Not provided'}\n*Message:* ${form.message || 'No additional details'}`;

    window.open(`https://wa.me/919580417547?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#1A120B] border border-white/15 rounded-2xl w-full max-w-md p-6 sm:p-7 animate-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="mb-5">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Inquiry</p>
          <h3 className="text-white text-xl font-bold">
            {subServiceName || serviceName}
          </h3>
          {subServiceName && (
            <p className="text-slate-500 text-xs mt-1">Under: {serviceName}</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="inquiry-name" className="sr-only">Your Name *</label>
          <input
            id="inquiry-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name *"
            className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
          />
          <label htmlFor="inquiry-phone" className="sr-only">Phone / WhatsApp *</label>
          <input
            id="inquiry-phone"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone / WhatsApp *"
            className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
          />
          <label htmlFor="inquiry-email" className="sr-only">Email (optional)</label>
          <input
            id="inquiry-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email (optional)"
            className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
          />
          <label htmlFor="inquiry-message" className="sr-only">Any specific requirements</label>
          <textarea
            id="inquiry-message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Any specific requirements..."
            className="w-full bg-white/5 border border-white/10 focus:border-primary rounded-lg px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none"
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
            Send via WhatsApp
          </button>
        </form>

        <p className="text-slate-600 text-center text-xs mt-4">
          We respond within 30 minutes during business hours.
        </p>
      </div>
    </div>
  );
}
