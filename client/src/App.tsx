import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import SeoLanding from './pages/SeoLanding';
import BestToursVaranasi from './pages/BestToursVaranasi';
import LeadCaptureModal from './components/LeadCaptureModal';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Auto popup lead capture modal – shows after 6s, once per session
const AutoPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('popup_shown')) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem('popup_shown', '1');
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;
  return <LeadCaptureModal onClose={() => setShow(false)} />;
};

// Floating WhatsApp button
const WhatsAppButton = () => (
  <a
    href="https://wa.me/919580417547"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 w-13 h-13 sm:w-14 sm:h-14 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-transform hover:scale-110 active:scale-95"
    aria-label="Chat on WhatsApp"
    style={{ width: '52px', height: '52px' }}
  >
    <MessageCircle size={24} />
  </a>
);

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';
import AdminHotels from './pages/admin/AdminHotels';

// Admin protection wrapper
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/hakunamata" replace />;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AutoPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/travel/:slug" element={<SeoLanding />} />
        <Route path="/best-tours-and-travel-agency-in-varanasi" element={<BestToursVaranasi />} />

        {/* Admin Routes */}
        <Route path="/hakunamata" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/hotels" element={<AdminRoute><AdminHotels /></AdminRoute>} />
        <Route path="/admin/blog/new" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
        <Route path="/admin/blog/edit/:slug" element={<AdminRoute><AdminBlogEditor /></AdminRoute>} />
      </Routes>

      {!window.location.pathname.startsWith('/admin') && !window.location.pathname.startsWith('/hakunamata') && (
        <WhatsAppButton />
      )}
    </Router>
  );
}
