import React from 'react';

const Section = ({ 
  children, 
  className = "", 
  id = "",
  background = "deep-brown" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
  background?: "deep-brown" | "warm-brown" | "cream" | "saffron-gradient" | "transparent";
}) => {
  const bgColors = {
    "deep-brown": "bg-brand-deep-brown text-brand-text-primary",
    "warm-brown": "bg-brand-warm-brown text-brand-text-primary",
    "cream": "bg-brand-cream text-brand-text-dark",
    "saffron-gradient": "bg-gradient-to-r from-brand-saffron to-brand-saffron-light text-white",
    "transparent": "bg-transparent text-brand-text-primary",
  };

  return (
    <section id={id} className={`py-24 md:py-32 relative overflow-hidden ${bgColors[background]} ${className}`}>
      {/* Subtle texture overlay for dark sections */}
      {(background === 'deep-brown' || background === 'warm-brown') && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      )}
      {/* Gold Divider Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;
