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

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 20, 18, 0.65)',
        backdropFilter: 'blur(3px)',
        padding: '16px'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#1b1a18',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}
      >
        <div style={{ position: 'relative', padding: '24px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', padding: '4px' }}
            aria-label="Close popup"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e65000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <div>
              <p style={{ color: '#e65000', fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Soil N Soul Travel</p>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 600, margin: '2px 0 0', fontFamily: 'var(--font-playfair), serif' }}>Plan Your Varanasi Journey</h3>
            </div>
          </div>
          <p style={{ color: '#aaa', fontSize: '13px', margin: '12px 0 0', lineHeight: 1.5 }}>Send us a quick message and we'll respond within the hour.</p>
        </div>

        <form onSubmit={handleWhatsApp} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="lead-name" style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '6px' }}>Your Name *</label>
              <input id="lead-name" name="name" required value={form.name} onChange={handleChange} placeholder="Rahul Sharma"
                style={{ width: '100%', background: '#242321', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="lead-phone" style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '6px' }}>Phone / WhatsApp *</label>
              <input id="lead-phone" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 9876543210" type="tel"
                style={{ width: '100%', background: '#242321', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }} 
              />
            </div>
          </div>

          <div>
            <label htmlFor="lead-service" style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '6px' }}>Service Interested In</label>
            <select id="lead-service" name="service" value={form.service} onChange={handleChange}
              style={{ width: '100%', background: '#242321', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}>
              <option value="">Select a service...</option>
              {SERVICES_LIST.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-message" style={{ fontSize: '11px', color: '#999', display: 'block', marginBottom: '6px' }}>Your Message</label>
            <textarea id="lead-message" name="message" value={form.message} onChange={handleChange} placeholder="e.g. I'm planning to visit Varanasi in March with my family..." rows={3}
              style={{ width: '100%', background: '#242321', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'none' }} />
          </div>

          <button type="submit"
            style={{ width: '100%', background: '#e65000', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}
          >
            CONTINUE TO WHATSAPP →
          </button>
          
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#888', margin: '8px 0 0' }}>
            Or call us: <a href="tel:+919580417547" style={{ color: '#e65000', textDecoration: 'none' }}>+91 95804 17547</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
