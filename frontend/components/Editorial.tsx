import Image from "next/image";
import Link from "next/link";
import { experiences, journeys, founderStory, values } from "@/data/journeys";
export function SectionHeading({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="sn-section-heading">
      <div>
        <p className="sn-eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}
export function ExperienceGrid() {
  return (
    <div className="sn-experiences">
      {experiences.map((e, i) => (
        <Link
          className="sn-experience"
          href={`/experiences#${e.slug}`}
          key={e.slug}
        >
          <Image
            src={e.image}
            alt={e.alt}
            fill
            sizes="(max-width: 700px) 82vw, 33vw"
          />
          <div className="sn-image-shade" />
          <span className="sn-card-number">0{i + 1}</span>
          <div className="sn-experience-copy">
            <h3>{e.name}</h3>
            <p>{e.description}</p>
            <span className="sn-text-link">Explore this experience ↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function JourneyGrid() {
  return (
    <div className="sn-journeys">
      {journeys.map((j, i) => (
        <article key={j.slug} className="sn-journey">
          <Link href={`/journeys/${j.slug}`} className="sn-journey-image">
            <Image
              src={j.image}
              alt={
                j.name === "The Banarasi Table"
                  ? "Evening rituals in Banaras"
                  : j.name
              }
              fill
              sizes="(max-width: 700px) 88vw, 45vw"
            />
            <span>
              0{i + 1} / {j.mood}
            </span>
          </Link>
          <div className="sn-journey-meta">
            {j.duration}
            <span>{j.guests}</span>
          </div>
          <h3>
            <Link href={`/journeys/${j.slug}`}>{j.name}</Link>
          </h3>
          <p>{j.description}</p>
          <Link className="sn-text-link" href={`/journeys/${j.slug}`}>
            Discover Journey <span>↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Founder({ full = false }: { full?: boolean }) {
  return (
    <section id="team" className="sn-section sn-wrap sn-founder">
      <div className="sn-founder-image">
        <Image
          src="/images/founder.jpg"
          alt="Anchal Pandey, founder of Soil n Soul Travels"
          fill
          sizes="(max-width: 700px) 90vw, 40vw"
        />
        <span>
          Anchal Pandey <small>Founder · Native of Banaras</small>
        </span>
      </div>
      <div>
        <p className="sn-eyebrow">Our Story</p>
        <h2>
          Born from the
          <br />
          <em>Heart of Kashi.</em>
        </h2>
        <p className="sn-intro">
          “Visitors to this sacred city deserve honesty, guidance, and care.”
        </p>
        {(full
          ? founderStory
          : [founderStory[0], founderStory[2], founderStory[4]]
        ).map((p) => (
          <p key={p}>{p}</p>
        ))}
        {!full && (
          <Link href="/about" className="sn-text-link">
            Meet the heart behind the journeys ↗
          </Link>
        )}
      </div>
    </section>
  );
}
export function Values() {
  return (
    <section id="about" className="sn-section sn-way">
      <div className="sn-wrap">
        <SectionHeading
          label="The Soil n Soul Way"
          title="Rooted here. Thoughtfully shared."
          text="Our connection to Kashi shapes every choice we make — and every journey we create."
        />
        <div className="sn-values">
          {values.map(([name, text], i) => (
            <article key={name}>
              <span className="sn-eyebrow">0{i + 1}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
