import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/journeys";
export const metadata: Metadata = {
  title: "Signature Experiences in Kashi",
  description:
    "Six verticals. One city’s infinite depth. Sacred Kashi, Living Banaras, Taste of Kashi, Hidden Banaras, Celebrations and photography journeys.",
  alternates: { canonical: "/experiences" },
};
const stories = [
  "Begin with the river. Follow the rhythms of devotion through dawn rituals, temple trails, and the evening Ganga aarti, guided by local knowledge and respect for living traditions.",
  "Spend time with the people who give Banaras its character. Discover artisan traditions, the world of silk weavers, and everyday life in the lanes of the old city.",
  "Get to know a city through its table. Explore neighbourhood flavours, family kitchen traditions, and the conversations that gather around Banarasi chaat.",
  "Leave room for the unexpected. Walk quieter ghats, follow unmarked lanes, and discover the stories held by lesser-known temples with a local storyteller.",
  "Make a meaningful occasion part of Kashi’s story. From pre-wedding photography to private spiritual ceremonies, shape a celebration around the people who matter to you.",
  "Slow down and look a little closer. Follow the changing light, the river’s reflections, and the small human moments that make Kashi unforgettable.",
];
export default function ExperiencesPage() {
  return (
    <div className="sn-site">
      <header className="sn-wrap sn-page-intro">
        <p className="sn-eyebrow">Signature Experiences</p>
        <h1>
          Six verticals.
          <br />
          <em>One city’s infinite depth.</em>
        </h1>
        <p>
          Different ways into the same extraordinary city. Choose what draws you
          in, and we’ll weave it into your private journey.
        </p>
      </header>
      <div className="sn-wrap">
        {experiences.map((e, i) => (
          <section id={e.slug} className="sn-experience-detail" key={e.slug}>
            <div>
              <Image
                src={e.image}
                alt={e.alt}
                fill
                sizes="(max-width:700px) 90vw, 45vw"
              />
            </div>
            <div>
              <p className="sn-eyebrow">Experience 0{i + 1}</p>
              <h2>{e.name.replace(/^\d+\s/, "")}</h2>
              <p>{e.description}</p>
              <p>{stories[i]}</p>
              {e.supportingImage && (
                <div className="sn-experience-supporting-image">
                  <Image
                    src={e.supportingImage}
                    alt={e.supportingAlt || e.name}
                    fill
                    sizes="(max-width:700px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              )}
              <Link href="/#contact" className="sn-text-link">
                Design My Journey →
              </Link>
            </div>
          </section>
        ))}
      </div>
      <div className="sn-wrap sn-section">
        <Link className="sn-button" href="/journeys">
          Explore Personalised Journeys →
        </Link>
      </div>
    </div>
  );
}
