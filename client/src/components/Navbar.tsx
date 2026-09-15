import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Homepage sections (with IDs matching the Home.tsx sections) ───────────────
const HOME_SECTIONS = [
  { name: 'Home', href: '/', sectionId: null },
  { name: 'About', href: '/#about', sectionId: 'about' },
  { name: 'Services', href: '/#services', sectionId: 'services' },
  { name: 'Blog', href: '/#blog', sectionId: 'blog' },
  { name: 'Founder', href: '/#team', sectionId: 'team' },
  { name: 'FAQ', href: '/#faq', sectionId: 'faq' },
  { name: 'Contact', href: '/#contact', sectionId: 'contact' },
];

// ─── Links for non-homepage pages ─────────────────────────────────────────────
const PAGE_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // ── Scroll detection for glass effect ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close mobile menu on route change ──────────────────────────────────────
  useEffect(() => { setMenuOpen(false); setActiveSection(null); }, [location]);

  // ── Prevent body scroll when mobile menu is open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── IntersectionObserver for scroll-based active section ───────────────────
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = HOME_SECTIONS
      .filter(s => s.sectionId)
      .map(s => s.sectionId as string);

    const observers: IntersectionObserver[] = [];

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // Trigger when section is roughly in the top 40% of the viewport
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(callback, observerOptions);
        obs.observe(el);
        observers.push(obs);
      }
    });

    // When scrolled to very top, reset to "home"
    const onScrollTop = () => {
      if (window.scrollY < 100) setActiveSection(null);
    };
    window.addEventListener('scroll', onScrollTop, { passive: true });

    return () => {
      observers.forEach(obs => obs.disconnect());
      window.removeEventListener('scroll', onScrollTop);
    };
  }, [isHome]);

  // ── Smooth-scroll to section (for anchor links within homepage) ─────────────
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string | null, href: string) => {
    if (isHome && sectionId) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 80; // navbar height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setMenuOpen(false);
    }
  };

  // ── Determine if a nav item is active ──────────────────────────────────────
  const isNavActive = (sectionId: string | null, path?: string): boolean => {
    if (isHome) {
      // On homepage use scroll tracking
      if (!sectionId && !activeSection) return true; // "Home" active when at top
      return activeSection === sectionId;
    } else {
      // On other pages, use path matching
      if (!path) return false;
      return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    }
  };

  // ── Desktop nav items: trim to 5 for space, show all in mobile ─────────────
  const desktopLinks = isHome
    ? HOME_SECTIONS.filter(s => ['Home', 'About', 'Services', 'Blog', 'Contact'].includes(s.name))
    : PAGE_LINKS;
  const mobileLinks = isHome ? HOME_SECTIONS : PAGE_LINKS;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || menuOpen
          ? 'bg-[#1A120B]/95 backdrop-blur-lg border-b border-white/10 py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary">flare</span>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase italic">
              Soil <span className="text-primary font-light">n</span> Soul
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8">
            {desktopLinks.map((link) => {
              const href = 'href' in link ? link.href : link.path;
              const secId = 'sectionId' in link ? link.sectionId : null;
              const active = isNavActive(secId ?? null, 'path' in link ? link.path : undefined);

              return (
                <a
                  key={link.name}
                  href={href}
                  onClick={(e) => handleSectionClick(e, secId ?? null, href)}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors relative group ${active ? 'text-primary' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {link.name}
                  {/* Animated underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href="/#contact"
              onClick={(e) => handleSectionClick(e, 'contact', '/#contact')}
              className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg active:scale-95"
            >
              Plan Your Journey
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-white rounded-lg bg-white/10 active:bg-white/20 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined text-xl">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-screen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A120B]/97 backdrop-blur-xl flex flex-col pt-20 px-6 pb-10 overflow-y-auto">
          <nav className="flex flex-col gap-1 mt-6">
            {mobileLinks.map((link) => {
              const href = 'href' in link ? link.href : link.path;
              const secId = 'sectionId' in link ? link.sectionId : null;
              const active = isNavActive(secId ?? null, 'path' in link ? link.path : undefined);

              const iconMap: Record<string, string> = {
                Home: 'home', About: 'info', Services: 'travel_explore',
                Blog: 'article', Team: 'groups', FAQ: 'quiz', Contact: 'mail',
              };

              return (
                <a
                  key={link.name}
                  href={href}
                  onClick={(e) => handleSectionClick(e, secId ?? null, href)}
                  className={`flex items-center gap-3 text-xl font-bold uppercase tracking-wider py-4 border-b border-white/8 transition-colors ${active ? 'text-primary' : 'text-white'
                    }`}
                >
                  <span className="material-symbols-outlined text-xl text-primary/60">
                    {iconMap[link.name] || 'arrow_forward'}
                  </span>
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-8">
            <a
              href="/#contact"
              onClick={(e) => handleSectionClick(e, 'contact', '/#contact')}
              className="block bg-primary text-white px-6 py-4 rounded-xl font-bold uppercase text-center text-base tracking-widest"
            >
              Plan Your Journey
            </a>
            <a
              href="https://wa.me/919580417547"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-xl font-bold text-sm"
            >
              <span className="material-symbols-outlined text-xl text-green-400">chat</span>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
