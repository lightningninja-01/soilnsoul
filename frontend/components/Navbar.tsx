"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navigation = [
  ["Home", "/"],
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
      <Link href="/" className="sn-brand" aria-label="Soil n Soul Travels home">
        <span className="sn-mark" aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="4.5" fill="#e65000"/>
            <rect x="14.5" y="1" width="3" height="8" fill="#e65000"/>
            <rect x="14.5" y="23" width="3" height="8" fill="#e65000"/>
            <rect x="1" y="14.5" width="8" height="3" fill="#e65000"/>
            <rect x="23" y="14.5" width="8" height="3" fill="#e65000"/>
            <rect x="7" y="7" width="3.5" height="3.5" fill="#e65000"/>
            <rect x="21.5" y="7" width="3.5" height="3.5" fill="#e65000"/>
            <rect x="7" y="21.5" width="3.5" height="3.5" fill="#e65000"/>
            <rect x="21.5" y="21.5" width="3.5" height="3.5" fill="#e65000"/>
          </svg>
        </span>
        <span>
          SOIL <i>N</i> SOUL
        </span>
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
      <Link className="sn-button sn-nav-cta" href="#contact">
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
