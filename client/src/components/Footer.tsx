import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#0f0a06] border-t border-white/8 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-2xl text-primary">flare</span>
                            <span className="text-lg font-bold text-white uppercase italic tracking-tight">
                                Soil <span className="text-primary font-light">n</span> Soul
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-5">
                            Varanasi&apos;s trusted travel partner for authentic cultural experiences, verified stays, and meaningful journeys.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: 'chat', href: 'https://wa.me/919580417547', label: 'WhatsApp' },
                                { icon: 'photo_camera', href: '#', label: 'Instagram' },
                                { icon: 'subscriptions', href: '#', label: 'YouTube' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg bg-white/8 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">{s.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Verified Stays', href: '/services/verified-stays' },
                                { label: 'Ritual Arrangements', href: '/services/ritual-arrangements' },
                                { label: 'Cultural Tours', href: '/services/cultural-tours' },
                                { label: 'Airport Pickup', href: '/services/airport-pickup' },
                                { label: 'Silk Shopping', href: '/services/silk-shopping' },
                                { label: 'Pre-Wedding Photos', href: '/services/prewedding-photography' },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link to={l.href} className="text-sm hover:text-primary transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'All Services', href: '/services' },
                                { label: 'Blog & Guides', href: '/blog' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Contact', href: '/contact' },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link to={l.href} className="text-sm hover:text-primary transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-sm">
                                <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">location_on</span>
                                Varanasi, Uttar Pradesh, India
                            </li>
                            <li>
                                <a href="tel:+919580417547" className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-primary text-base shrink-0">phone</span>
                                    +91 95804 17547
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@soilnsoul.in" className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-primary text-base shrink-0">mail</span>
                                    hello@soilnsoul.in
                                </a>
                            </li>
                            <li className="pt-2">
                                <a
                                    href="https://wa.me/919580417547"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-700/30 hover:bg-green-600/40 text-green-400 border border-green-700/40 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                                >
                                    <span className="material-symbols-outlined text-sm">chat</span>
                                    WhatsApp Now
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* ── Varanasi Travel Guides — High-Intent SEO Links (footer only, not in navbar) ── */}
                <div className="mt-12 pt-10 border-t border-white/6">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>travel_explore</span>
                        Varanasi Travel Guides
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                        {[
                            { label: 'Best Travel Agency in Varanasi', href: '/travel/best-travel-agency-varanasi' },
                            { label: 'Varanasi Tour Packages', href: '/travel/varanasi-tour-packages' },
                            { label: 'Ganga Aarti Varanasi', href: '/travel/ganga-aarti-varanasi' },
                            { label: 'Varanasi Pooja Booking', href: '/travel/varanasi-pooja-booking' },
                            { label: 'Best Hotels in Varanasi', href: '/travel/varanasi-hotels' },
                            { label: 'Varanasi Sightseeing', href: '/travel/varanasi-sightseeing' },
                            { label: 'Varanasi Honeymoon Package', href: '/travel/varanasi-honeymoon' },
                            { label: 'Varanasi Multi-City Tours', href: '/travel/varanasi-multi-city-tours' },
                            { label: 'How to Choose a Travel Agency', href: '/travel/how-to-choose-travel-agency-varanasi' },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                to={l.href}
                                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-primary/15 border border-white/8 hover:border-primary/40 text-slate-400 hover:text-primary px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>arrow_forward</span>
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                    <p>&copy; {year} Soil n Soul Travel. All rights reserved.</p>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                        <p>
                            Made with <a href="https://synor.in/" target="_blank" rel="noopener noreferrer" aria-label="Synor" className="hover:text-primary transition-colors cursor-auto">❤️</a> in Varanasi, India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
