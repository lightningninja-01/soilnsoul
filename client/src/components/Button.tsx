import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-deep-brown disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
  
  const variants = {
    primary: "bg-brand-saffron text-white hover:bg-brand-saffron-light focus:ring-brand-saffron shadow-[0_0_15px_rgba(230,81,0,0.4)] hover:shadow-[0_0_25px_rgba(245,124,0,0.6)]",
    secondary: "bg-brand-glass border border-brand-saffron/30 text-brand-saffron-light hover:bg-brand-saffron/10 hover:border-brand-saffron focus:ring-brand-saffron backdrop-blur-sm shadow-[0_0_10px_rgba(230,81,0,0.1)] hover:shadow-[0_0_20px_rgba(230,81,0,0.2)]",
    outline: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-deep-brown focus:ring-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]",
    ghost: "text-brand-text-secondary hover:text-brand-saffron hover:bg-brand-saffron/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs tracking-wide",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-widest uppercase",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
    </motion.button>
  );
};

export default Button;
