import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="sn-footer">
      <div className="sn-wrap sn-footer-grid">
        <div>
          <Link href="/" className="sn-brand" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/soil-n-soul-logo.svg" 
              alt="Soil n Soul Travels" 
              className="sn-logo-img"
            />
          </Link>
          <p style={{ marginTop: '20px', lineHeight: '1.8', color: '#c6c3ba' }}>
            FROM THE SOIL OF KASHI<br />
            TO THE SOUL OF EVERY TRAVELER.
          </p>
        </div>
        <div>
          <p className="sn-eyebrow">Explore</p>
          {[
            ["Experiences", "/experiences"],
            ["Journeys", "/journeys"],
            ["About", "/about"],
            ["Journal", "/blog"],
            ["Contact", "/contact"],
          ].map(([n, h]) => (
            <Link key={h} href={h}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <p className="sn-eyebrow">Your journey, considered</p>
          {[
            ["Verified Stays", "stay"],
            ["Ritual Arrangements", "pooja-booking"],
            ["Cultural Experiences", "city-tour"],
            ["Airport Pickup", "travel"],
            ["Silk Shopping", "city-tour"],
            ["Pre-Wedding Experiences", "event"],
          ].map(([n, h]) => (
            <Link key={n} href={`/services/${h}`}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <p className="sn-eyebrow">Let’s begin a conversation</p>
          <a href="tel:+919580417547">+91 95804 17547</a>
          <a href="mailto:hello@soilnsoul.in">hello@soilnsoul.in</a>
          <p>Varanasi, Uttar Pradesh, India</p>
          <a
            href="https://www.instagram.com/soilnsoultravels"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
        </div>
      </div>
      <div className="sn-wrap sn-footer-bottom">
        <span>© {new Date().getFullYear()} Soil n Soul Travels</span>
        <span>Come experience Kashi differently.</span>
      </div>
    </footer>
  );
}
