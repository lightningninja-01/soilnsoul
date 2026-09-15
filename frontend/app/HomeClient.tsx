import type { BlogPost } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import {
  ExperienceGrid,
  JourneyGrid,
  Founder,
  Values,
  SectionHeading,
} from "@/components/Editorial";
import CinematicCarousel from "@/components/CinematicCarousel";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import SoulJournal from "@/components/SoulJournal";
import GoogleReviews from "@/components/GoogleReviews";
import { TESTIMONIALS } from "@/lib/seo-page-data";
const rare = [
  ["Private Artisan Visits", "Master weavers & craftsmen, by appointment only"],
  ["Family-run Kitchens", "Recipes unchanged across five generations"],
  ["Hidden Temples", "Unmarked shrines beyond every guidebook"],
  [
    "Private Cultural Performances",
    "Thumri, Dhrupad & classical arts in intimate settings",
  ],
  ["Local Storytellers", "Living historians who carry Kashi’s oral tradition"],
  ["Heritage Homes", "Private havelis rarely opened to visitors"],
  ["Traditional Craftsmen", "Lost arts: brasswork, zardozi, Banarasi brocade"],
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
  return (
    <div className="sn-site">
      <section className="sn-hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/hero-3.jpg"
          className="sn-hero-video"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/kashi-hero.mp4" type="video/mp4" />
        </video>
        <div className="sn-hero-shade" />
        <div className="sn-wrap sn-hero-content">
          <p className="sn-eyebrow">
            Varanasi, India · Curated by those who call it home
          </p>
          <h1>
            <span>Discover Kashi</span>Beyond
            <br />
            <em>Tourism.</em>
          </h1>
          <p>
            A river of stories. A city of souls.
            <br />
            Deeply local experiences, thoughtfully shaped around you.
          </p>
          <div className="sn-hero-actions">
            <Link href="#contact" className="sn-button">
              Design My Journey ↗
            </Link>
            <Link href="#experiences" className="sn-hero-link">
              Explore Experiences <span>↓</span>
            </Link>
          </div>
        </div>
        <div className="sn-hero-bottom sn-wrap">
          <span>25.3176° N &nbsp; 82.9739° E</span>
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
        <ExperienceGrid />
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
            title="Your time. Your rhythm. Your Kashi."
            text="Consider these a beginning. Each journey is shaped around your interests, your people, and your pace."
          />
          <JourneyGrid />
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
              Talk to someone who knows Kashi ↗
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
    </div>
  );
}
