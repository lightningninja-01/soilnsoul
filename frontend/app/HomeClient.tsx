import { useState, useEffect, useRef } from "react";
import type { BlogPost } from "@/lib/api";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import Image from "next/image";
import Link from "next/link";
import {
  JourneyGrid,
  Founder,
  Values,
  SectionHeading,
} from "@/components/Editorial";
import CinematicCarousel from "@/components/CinematicCarousel";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import SoulJournal from "@/components/SoulJournal";
import GoogleReviews from "@/components/GoogleReviews";
import ExperienceSelector from "@/components/ExperienceSelector";
import HeroVideo from "@/components/HeroVideo";

const rare = [
  [
    "Private Cultural Performances",
    "Thumri, Dhrupad & classical arts in intimate settings",
  ],
  ["Local Storytellers", "Living historians who carry Kashi’s oral tradition"],
  ["Heritage Homes", "Private havelis rarely opened to visitors"],
  ["Traditional Craftsmen", "Brasswork, zardozi and Banarasi brocade"],
  ["Private Artisan Visits", "Master weavers & craftsmen, by appointment only"],
  ["Family-run Kitchens", "Recipes unchanged across five generations"],
  ["Hidden Temples", "Unmarked shrines beyond every guidebook"],
  [
    "Private Ganga Experiences",
    "Exclusive dawn boat, solo ghat rituals, private aarti",
  ],
];

const components = [
  ["Travel", "Car · Bike · Traditional Boat", "travel"],
  ["Stays", "Budget Homestays · Heritage Havelis · Comfort Hotels", "stay"],
  [
    "Rituals",
    "Ganga Aarti Arrangements · Pind Daan · Kashi Vishwanath Puja",
    "pooja-booking",
  ],
  [
    "Cultural Experiences",
    "Sunrise Ghat Walk · Old City Heritage Walk · Temple Circuit Tour · Cultural Evenings",
    "city-tour",
  ],
  [
    "Celebrations",
    "Pre-Wedding Photography · Private Spiritual Ceremonies · Special Occasions",
    "event",
  ],
  [
    "Other Support",
    "Airport Pickup · Silk Shopping · Verified Stays · Local Mobility",
    "travel",
  ],
];

const faqs = [
  [
    "Is Kashi suitable for solo travellers?",
    "We help solo travellers plan with local guidance, verified stays, and support throughout the journey. Tell us what would make you feel comfortable so we can shape the right experience.",
  ],
  [
    "How far in advance should I plan?",
    "We recommend 2–4 weeks for most journeys and 4–8 weeks for larger groups or festivals such as Dev Deepawali. Contact us to discuss availability for your dates.",
  ],
  [
    "Can you design a journey around my interests?",
    "Yes. Share your interests, dates, and group size. We will craft a journey around the experiences that matter to you.",
  ],
  [
    "Can you arrange arrival and local mobility?",
    "Yes. We coordinate airport and railway station pickups, local cars, bikes, and traditional boat experiences.",
  ],
  [
    "How do you select stays and local partners?",
    "Our team personally checks recommended properties and works with local partners with attention to safety, cleanliness, and hospitality.",
  ],
  [
    "How does the journey-design process work?",
    "Share your preferences through the enquiry form or WhatsApp. We discuss your interests, suggest a journey, and refine the details together before confirming arrangements.",
  ],
];

export default function HomeClient({ blogs }: { blogs: BlogPost[] }) {
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only run on the client
    if (typeof window === 'undefined') return;

    const hasShown = sessionStorage.getItem("soilnsoul_contact_popup_shown");
    if (!hasShown) {
      timerRef.current = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("soilnsoul_contact_popup_shown", "true");
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleManualTrigger = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    sessionStorage.setItem("soilnsoul_contact_popup_shown", "true");
    setShowPopup(true);
  };

  return (
    <div className="sn-site">
      <section className="sn-hero">
        <HeroVideo />
        <div className="sn-hero-shade" />
        <div className="sn-wrap sn-hero-content">
          <p className="sn-eyebrow">THE SOUL OF KASHI</p>
          <h1>
            Experience Varanasi
            <br />
            <em>beyond the ordinary.</em>
          </h1>
          <p>
            Discover the stories, rituals, people and traditions that make Kashi
            unlike anywhere else.
          </p>
          <div className="sn-hero-actions">
            <Link href="#contact" className="sn-button">
              Design My Journey →
            </Link>
            <Link href="#experiences" className="sn-hero-link">
              Explore Experiences <span>→</span>
            </Link>
          </div>
        </div>
        <div className="sn-hero-bottom sn-wrap">
          <span>FROM THE SOIL OF KASHI TO THE SOUL OF EVERY TRAVELER.</span>
          <span>A slower way to discover. A deeper way to connect.</span>
          <a href="#experiences" aria-label="Scroll to Signature Experiences">
            Scroll to discover ↓
          </a>
        </div>
        <button
          type="button"
          onClick={handleManualTrigger}
          className="sn-concierge"
          aria-label="Let's Talk"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e65000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>LET'S TALK</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: 0.5 }}>
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </section>



      <section id="experiences" className="sn-section sn-wrap">
        <SectionHeading
          label="Signature Experiences"
          title="Six verticals. One city’s infinite depth."
          text="Follow what moves you. The sacred, the everyday, the unexpected — each opens a different door to Kashi."
        />
        <ExperienceSelector />
      </section>
      <CinematicCarousel />
      <section className="sn-section sn-wrap sn-rare">
        <div className="sn-rare-intro">
          <p className="sn-eyebrow">Rare Access</p>
          <h2>
            Some doors open
            <br />
            only through
            <br />
            <em>connection.</em>
          </h2>
          <p>
            Go beyond the familiar. Meet the people, enter the spaces, and hear
            the stories that bring the real Banaras closer.
          </p>
          <div className="sn-rare-image">
            <Image
              src="/images/hero/hero-1.jpg"
              alt="Everyday life beside the ghats of Banaras"
              fill
              sizes="(max-width:700px) 90vw, 35vw"
            />
          </div>
        </div>
        <div className="sn-rare-grid">
          {rare.map(([n, d], i) => (
            <article key={n}>
              <span className="sn-eyebrow">0{i + 1}</span>
              <h3>{n}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="journeys" className="sn-section sn-journey-section">
        <div className="sn-wrap">
          <SectionHeading
            label="Premium Personalised Journeys"
            title="A deeper connection, at your pace."
            text="Thoughtfully designed experiences for discovering the many sides of Kashi."
          />
          <JourneyGrid />
          <div style={{ textAlign: "center", marginTop: "80px" }}>
             <p style={{ marginBottom: "20px", color: "#6a665c", fontSize: "14px" }}>Can't find exactly what you're looking for?</p>
             <a href="https://wa.me/919580417547?text=Hello%20Soil%20N%20Soul,%20I%20would%20like%20a%20custom%20quote." target="_blank" rel="noreferrer" className="sn-button" style={{ display: "inline-flex" }}>
               GET A CUSTOM QUOTE
             </a>
          </div>
        </div>
      </section>
      <section id="services" className="sn-section sn-wrap">
        <SectionHeading
          label="Private Journey Components"
          title="The details make it yours."
          text="Thoughtful ingredients, brought together into one seamless journey. Choose what you need; we’ll connect the rest."
        />
        <div className="sn-components">
          {components.map(([n, d, h], i) => (
            <Link href={`/services/${h}`} key={n}>
              <span className="sn-eyebrow">0{i + 1}</span>
              <h3>
                {n}
                <span>↗</span>
              </h3>
              <p>{d}</p>
            </Link>
          ))}
        </div>
      </section>
      <Values />
      <section className="sn-stats sn-wrap" aria-label="Soil n Soul in numbers">
        {[
          ["500+", "Journeys Curated"],
          ["38", "Countries"],
          ["97%", "Satisfaction"],
          ["4.9", "Rating"],
        ].map(([n, l]) => (
          <div key={l}>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>
      <GoogleReviews />
      <Founder />
      <section id="faq" className="sn-section sn-faq">
        <div className="sn-wrap sn-faq-grid">
          <div>
            <p className="sn-eyebrow">Before Your Journey</p>
            <h2>
              A few things
              <br />
              <em>you may wonder.</em>
            </h2>
            <p>Something else on your mind?</p>
            <Link className="sn-text-link" href="#contact">
              Design My Journey ↗
            </Link>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q} name="journey-faq">
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SoulJournal blogs={blogs} />
      <JourneyEnquiry />
      {showPopup && <LeadCaptureModal onClose={() => setShowPopup(false)} />}
    </div>
  );
}
