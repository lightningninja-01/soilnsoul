"use client";
import { useState, useEffect, useRef } from "react";
import { Sailboat, DoorOpen, Flame, Landmark, Sparkles, HeartHandshake } from "lucide-react";
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
  {
    number: "01",
    title: "Private Cultural Performances",
    desc: "Thumri, Dhrupad & classical arts in intimate settings",
    image: "/SnS/private-cultural-performance.webp",
    alt: "Intimate classical music performance in a heritage home in Kashi",
  },
  {
    number: "02",
    title: "Local Storytellers",
    desc: "Living historians who carry Kashi’s oral tradition",
    image: "/SnS/local-storyteller.webp",
    alt: "Local Banarasi storyteller sharing stories in an old Kashi setting",
  },
  {
    number: "03",
    title: "Heritage Homes",
    desc: "Private havelis rarely opened to visitors",
    image: "/SnS/rare-access-heritage-home.webp",
    alt: "Historic Banarasi heritage haveli courtyard",
  },
  {
    number: "04",
    title: "Traditional Craftsmen",
    desc: "Brasswork, zardozi and Banarasi brocade",
    image: "/SnS/brass-craftsman.webp",
    alt: "Banarasi craftsman working with traditional brassware",
  },
  {
    number: "05",
    title: "Private Artisan Visits",
    desc: "Master weavers & craftsmen, by appointment only",
    image: "/SnS/private-artisan-visit.webp",
    alt: "Master Banarasi weaver demonstrating traditional handloom craft",
  },
  {
    number: "06",
    title: "Family-run Kitchens",
    desc: "Recipes unchanged across five generations",
    image: "/SnS/family-run-kitchen.webp",
    alt: "Traditional family kitchen preparing food in Kashi",
  },
  {
    number: "07",
    title: "Hidden Temples",
    desc: "Unmarked shrines beyond every guidebook",
    image: "/SnS/rare-access-hidden-temple.webp",
    alt: "Small hidden shrine tucked inside an old Kashi lane",
  },
  {
    number: "08",
    title: "Private Ganga Experiences",
    desc: "Exclusive dawn boat, solo ghat rituals, private aarti",
    image: "/SnS/private-ganga-experience.webp",
    alt: "Traditional wooden boat experience on the Ganges in Kashi",
  },
];

const components = [
  {
    title: "Travel",
    desc: "Car · Bike · Traditional Boat",
    icon: Sailboat,
    image: "/SnS/private-journey-travel.webp",
    alt: "Traditional boat and travel in Varanasi",
  },
  {
    title: "Stays",
    desc: "Budget Homestays · Heritage Havelis · Comfort Hotels",
    icon: DoorOpen,
    image: "/SnS/private-journey-stays.webp",
    alt: "Heritage haveli stay in Varanasi",
  },
  {
    title: "Rituals",
    desc: "Ganga Aarti Arrangements · Pind Daan · Kashi Vishwanath Puja",
    icon: Flame,
    image: "/SnS/private-journey-rituals.webp",
    alt: "Sacred rituals and Ganga Aarti in Kashi",
  },
  {
    title: "Cultural Experiences",
    desc: "Sunrise Ghat Walk · Old City Heritage Walk · Temple Circuit Tour · Cultural Evenings",
    icon: Landmark,
    image: "/SnS/private-journey-cultural-experiences.webp",
    alt: "Cultural experiences and heritage walks in Kashi",
  },
  {
    title: "Celebrations",
    desc: "Pre-Wedding Photography · Private Spiritual Ceremonies · Special Occasions",
    icon: Sparkles,
    image: "/SnS/private-journey-celebrations.webp",
    alt: "Spiritual celebrations and photography in Varanasi",
  },
  {
    title: "Other Support",
    desc: "Airport Pickup · Silk Shopping · Verified Stays · Local Mobility",
    icon: HeartHandshake,
    image: "/SnS/private-journey-other-support.webp",
    alt: "Local support and hospitality in Varanasi",
  }
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
        </div>
        <div className="sn-rare-grid">
          {rare.map((item) => (
            <article key={item.title}>
              <div className="sn-rare-item-image">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <span className="sn-eyebrow">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
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
               Get a Custom Quote
             </a>
          </div>
        </div>
      </section>
      <section id="services" className="sn-section sn-wrap">
        <div className="sn-components-header-split">
          <SectionHeading
            label="Private Journey Components"
            title="The details make it yours."
            text="Thoughtful ingredients, brought together into one seamless journey. Choose what you need; we’ll connect the rest."
          />
          <div className="sn-components-intro-image">
            <Image
              src="/SnS/journey-components-kashi.webp"
              alt="Curated details of personalized Kashi journeys"
              width={320}
              height={210}
              className="object-cover"
            />
          </div>
        </div>
        <div className="sn-components-list">
          {components.map((c, i) => {
            const Icon = c.icon;
            return (
              <div 
                key={c.title}
                className="sn-component-row group"
              >
                <div className="sn-component-main">
                  <div className="sn-component-lead">
                    <span className="sn-component-number">0{i + 1}</span>
                    <div className="sn-component-title-wrap">
                      <Icon className="sn-component-icon" strokeWidth={1.5} />
                      <h3 className="sn-component-title">{c.title}</h3>
                    </div>
                  </div>
                  <p className="sn-component-desc">{c.desc}</p>
                </div>
                <div className="sn-component-thumb-wrap">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    width={170}
                    height={110}
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
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
              Design My Journey →
            </Link>
            <div className="sn-faq-image">
              <Image
                src="/SnS/before-your-journey.webp"
                alt="Quiet morning overlooking the sacred riverfront of Kashi"
                width={290}
                height={195}
                className="object-cover"
              />
            </div>
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
      {showPopup && <LeadCaptureModal onClose={() => setShowPopup(false)} />}
    </div>
  );
}
