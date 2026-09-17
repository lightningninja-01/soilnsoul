"use client";
import Image from "next/image";
import JourneyCard from "./JourneyCard";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { experiences, journeys, founderStory, values } from "@/data/journeys";

function useAutoAdvance() {
  const railRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const interact = () => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      const rail = railRef.current;
      if (!rail || document.hidden) return;
      
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) return;

      let nextScroll = rail.scrollLeft + (rail.clientWidth * 0.8);
      if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 10) {
        nextScroll = 0;
      }
      rail.scrollTo({
        left: nextScroll,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  return { railRef, interact };
}

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
  const { railRef, interact } = useAutoAdvance();
  return (
    <div 
      className="sn-experiences" 
      ref={railRef}
      onPointerDown={interact}
      onScrollCapture={interact}
    >
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
            <span className="sn-text-link">Explore this experience →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function JourneyGrid() {
  const featured = journeys.filter((j) => j.category === "Signature Journey");
  const local = journeys.filter((j) => j.category === "Explore Kashi");
  
  const { railRef: featuredRef, interact: featuredInteract } = useAutoAdvance();
  const { railRef: localRef, interact: localInteract } = useAutoAdvance();

  return (
    <>
      <div className="sn-browse-heading">
        <h3>Featured Journeys</h3>
        <Link href="/journeys" className="sn-text-link">
          View all journeys  
        </Link>
      </div>
      <div 
        className="sn-journey-rail" 
        aria-label="Featured Journeys"
        ref={featuredRef}
        onPointerDown={featuredInteract}
        onScrollCapture={featuredInteract}
      >
        {featured.map((j) => (
          <JourneyCard key={j.slug} journey={j} />
        ))}
      </div>
      <div className="sn-browse-heading sn-browse-local">
        <h3>Explore Kashi</h3>
        <p>Find your own way into the city.</p>
      </div>
      <div 
        className="sn-journey-rail" 
        aria-label="Explore Kashi"
        ref={localRef}
        onPointerDown={localInteract}
        onScrollCapture={localInteract}
      >
        {local.map((j) => (
          <JourneyCard key={j.slug} journey={j} />
        ))}
      </div>
    </>
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
            Meet the heart behind the journeys →
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
        <div className="sn-way-header-split">
          <SectionHeading
            label="The Soil n Soul Way"
            title="Rooted here. Thoughtfully shared."
            text="Our connection to Kashi shapes every choice we make — and every journey we create."
          />
          <div className="sn-way-image">
            <Image
              src="/SnS/rooted-in-kashi.webp"
              alt="Rooted in Kashi — authentic philosophy of Soil n Soul"
              width={300}
              height={195}
              className="object-cover"
            />
          </div>
        </div>
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
