"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const navigation = [
  ["Explore Kashi", "/"],
  ["Experiences", "/experiences"],
  ["Journeys", "/journeys"],
  ["About", "/about"],
  ["Journal", "/blog"],
  ["Contact", "/contact"],
];
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className={`sn-nav ${scrolled || pathname !== "/" || open ? "sn-nav-solid" : ""}`}
    >
      <Link href="/" className="sn-brand" aria-label="Soil n Soul Travels home" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/soil-n-soul-logo.svg" 
          alt="Soil n Soul Travels" 
          className="sn-logo-img"
        />
      </Link>
      <nav aria-label="Main navigation" className="sn-desktop-nav">
        {navigation.map(([n, h]) => (
          <Link
            key={h}
            href={h}
            aria-current={pathname === h ? "page" : undefined}
          >
            {n}
          </Link>
        ))}
      </nav>
      <Link className="sn-button sn-nav-cta" href="/#contact">
        Design My Journey
      </Link>
      <button
        className="sn-menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close ×" : "Menu ☰"}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="sn-mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([n, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {n}
              <span>↗</span>
            </Link>
          ))}
          <Link
            href="/#contact"
            className="sn-button"
            onClick={() => setOpen(false)}
          >
            Design My Journey
          </Link>
        </nav>
      )}
    </header>
  );
}
