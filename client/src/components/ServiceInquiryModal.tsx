import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/constants';

interface ServiceInquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;      // e.g. "Travel"
    subServiceName?: string;  // e.g. "Boat Ride"
    whatsappNumber?: string;
}

const ServiceInquiryModal = ({
    isOpen,
    onClose,
    serviceName,
    subServiceName,
    whatsappNumber = WHATSAPP_NUMBER,
}: ServiceInquiryModalProps) => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        date: '',
        people: '1',
        message: '',
    });
    const [sent, setSent] = useState(false);

    // Reset form whenever modal opens fresh
    useEffect(() => {
        if (isOpen) { setForm({ name: '', phone: '', date: '', people: '1', message: '' }); setSent(false); }
    }, [isOpen, serviceName, subServiceName]);

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
    }, [isOpen, onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const subject = subServiceName ? `${serviceName} › ${subServiceName}` : serviceName;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const lines = [
            `🙏 *New Inquiry — ${subject}*`,
            ``,
            `*Name:* ${form.name}`,
            `*WhatsApp:* ${form.phone}`,
            `*Preferred Date:* ${form.date || 'Flexible'}`,
            `*No. of People:* ${form.people}`,
            form.message ? `*Message:* ${form.message}` : '',
        ].filter(Boolean).join('\n');

        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines)}`, '_blank');
        setSent(true);
        setTimeout(() => { onClose(); }, 1800);
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md bg-[#1c1208] border border-white/12 rounded-2xl shadow-2xl overflow-hidden animate-in">

                {/* Header */}
                <div className="bg-primary/10 border-b border-white/8 px-6 py-4 flex items-start justify-between gap-3">
                    <div>
                        <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">Instant Inquiry</p>
                        <h3 className="text-white font-bold text-lg leading-tight">{serviceName}</h3>
                        {subServiceName && (
                            <p className="text-slate-300 text-sm mt-0.5 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-base text-primary">subdirectory_arrow_right</span>
                                {subServiceName}
                            </p>
                        )}
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors shrink-0 mt-0.5">
                        <X size={20} />
                    </button>
                </div>

                {/* Success state */}
                {sent ? (
                    <div className="px-6 py-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-green-400">check_circle</span>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-1">Opening WhatsApp…</h4>
                        <p className="text-slate-400 text-sm">We'll respond within the hour.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-3">

                        {/* Name */}
                        <div>
                            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                                Your Name <span className="text-primary">*</span>
                            </label>
                            <input
                                required
                                name="name"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Rahul Sharma"
                                className="w-full bg-black/30 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                            />
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                                WhatsApp Number <span className="text-primary">*</span>
                            </label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                                placeholder="+91 98765 43210"
                                className="w-full bg-black/30 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors"
                            />
                        </div>

                        {/* Date + People — side by side */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full bg-black/30 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors [color-scheme:dark]"
                                />
                            </div>
                            <div>
                                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                                    No. of People
                                </label>
                                <select
                                    name="people"
                                    value={form.people}
                                    onChange={e => setForm(f => ({ ...f, people: e.target.value }))}
                                    className="w-full bg-black/30 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                                >
                                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(n => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                                Additional Requirements
                            </label>
                            <textarea
                                name="message"
                                rows={3}
                                value={form.message}
                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                placeholder="Tell us more about what you need…"
                                className="w-full bg-black/30 border border-white/10 focus:border-primary rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all tracking-wide text-sm shadow-lg mt-1"
                        >
                            <span className="material-symbols-outlined text-lg">chat</span>
                            Send via WhatsApp
                        </button>

                        <p className="text-slate-600 text-xs text-center pt-1">
                            We respond within 1 hour · No booking fee
                        </p>
                    </form>
                )}
            </div>

            <style>{`
        @keyframes animate-in { from { opacity:0; transform: scale(0.93) translateY(12px); } to { opacity:1; transform: scale(1) translateY(0); } }
        .animate-in { animation: animate-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
        </div>
    );
};

export default ServiceInquiryModal;
