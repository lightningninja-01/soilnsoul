import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'motion/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-text-primary bg-brand-deep-brown selection:bg-brand-saffron selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isMenuOpen
            ? 'bg-brand-deep-brown/95 backdrop-blur-xl border-b border-brand-glass-border py-4 shadow-lg'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 border border-brand-saffron/50 rounded-full flex items-center justify-center text-brand-saffron font-serif text-xl font-bold group-hover:bg-brand-saffron group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(230,81,0,0.2)]">
                S
              </div>
              <span className="font-serif text-2xl font-bold text-brand-text-primary tracking-wide group-hover:text-brand-saffron transition-colors duration-300">
                Soil n Soul
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-brand-saffron relative group ${isActive(link.path) ? 'text-brand-gold' : 'text-brand-text-primary/80'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-brand-saffron hover:bg-brand-glass rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-deep-brown fixed inset-0 top-[70px] z-40 overflow-y-auto border-t border-brand-glass-border"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-2xl font-serif font-bold tracking-wider transition-colors ${isActive(link.path)
                          ? 'text-brand-gold'
                          : 'text-brand-text-primary hover:text-brand-saffron'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919580417547"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-saffron text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(230,81,0,0.4)] z-50 hover:bg-brand-saffron-light transition-colors"
        animate={{
          boxShadow: ['0 0 0 0 rgba(230,81,0,0.4)', '0 0 0 15px rgba(230,81,0,0)'],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle size={28} />
      </motion.a>

      {/* Footer */}
      <footer className="bg-brand-warm-brown text-brand-text-secondary py-20 border-t border-brand-glass-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-saffron rounded-full flex items-center justify-center text-white font-serif text-lg font-bold">
                  S
                </div>
                <span className="font-serif text-xl font-bold text-brand-text-primary tracking-wide">
                  Soil n Soul
                </span>
              </div>
              <p className="text-brand-text-secondary/80 text-sm leading-relaxed max-w-xs font-light">
                Rooted in Culture. Guided by Soul. We curate meaningful travel experiences in the heart of Kashi, connecting you to the spiritual essence of India.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-brand-glass-border flex items-center justify-center text-brand-saffron hover:bg-brand-saffron hover:text-white hover:border-brand-saffron transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-glass-border flex items-center justify-center text-brand-saffron hover:bg-brand-saffron hover:text-white hover:border-brand-saffron transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-glass-border flex items-center justify-center text-brand-saffron hover:bg-brand-saffron hover:text-white hover:border-brand-saffron transition-all duration-300">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-brand-text-primary">Quick Links</h3>
              <ul className="space-y-3 text-sm font-light">
                <li><Link to="/" className="hover:text-brand-saffron transition-colors flex items-center"><span className="w-1 h-1 bg-brand-saffron rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity" />Home</Link></li>
                <li><Link to="/about" className="hover:text-brand-saffron transition-colors flex items-center"><span className="w-1 h-1 bg-brand-saffron rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity" />About Us</Link></li>
                <li><Link to="/services" className="hover:text-brand-saffron transition-colors flex items-center"><span className="w-1 h-1 bg-brand-saffron rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity" />Our Services</Link></li>
                <li><Link to="/blog" className="hover:text-brand-saffron transition-colors flex items-center"><span className="w-1 h-1 bg-brand-saffron rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity" />Travel Blog</Link></li>
                <li><Link to="/contact" className="hover:text-brand-saffron transition-colors flex items-center"><span className="w-1 h-1 bg-brand-saffron rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity" />Contact Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-brand-text-primary">Our Services</h3>
              <ul className="space-y-3 text-sm font-light">
                <li><Link to="/services/accommodation" className="hover:text-brand-saffron transition-colors">Stay & Accommodation</Link></li>
                <li><Link to="/services/rituals" className="hover:text-brand-saffron transition-colors">Rituals & Priests</Link></li>
                <li><Link to="/services/tours" className="hover:text-brand-saffron transition-colors">Guided Kashi Tours</Link></li>
                <li><Link to="/services/shopping" className="hover:text-brand-saffron transition-colors">Silk Shopping Guide</Link></li>
                <li><Link to="/services/photography" className="hover:text-brand-saffron transition-colors">Cinematic Shoots</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-6 text-brand-text-primary">Contact Us</h3>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-0.5 text-brand-saffron shrink-0" />
                  <span>Assi Ghat, Varanasi,<br />Uttar Pradesh, India 221005</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="text-brand-saffron shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="text-brand-saffron shrink-0" />
                  <span>namaste@soilnsoul.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-brand-glass-border flex flex-col md:flex-row justify-between items-center text-xs text-brand-text-secondary/60">
            <p>&copy; {new Date().getFullYear()} Soil n Soul. All rights reserved.</p>
            <p className="mt-2 md:mt-0 italic font-serif text-brand-gold/80 text-sm">"Kashi is older than history, older than tradition, older even than legend."</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
