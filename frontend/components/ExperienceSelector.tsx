"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Hand,
  Utensils,
  Footprints,
  Sparkles,
  Camera,
} from "lucide-react";
import { experiences } from "@/data/journeys";
const icons = [Flame, Hand, Utensils, Footprints, Sparkles, Camera];
const introductions = [
  "Begin with the river. Follow the rhythms of devotion through dawn rituals, temple trails, and the evening Ganga aarti.",
  "Spend time with the people who give Banaras its character. Discover artisan traditions and everyday life in the old city.",
  "Get to know a city through its table. Explore neighbourhood flavours, family kitchen traditions, and Banarasi chaat.",
  "Leave room for the unexpected. Walk quieter ghats and discover the stories held by lesser-known temples.",
  "Make a meaningful occasion part of Kashi’s story, from pre-wedding photography to private spiritual ceremonies.",
  "Slow down and look a little closer. Follow the changing light and the human moments that make Kashi unforgettable.",
];
export default function ExperienceSelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = experiences[active];
  
  const [paused, setPaused] = useState(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const interact = () => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
  };

  const select = (index: number) => {
    setActive(index);
    tabs.current[index]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  };


  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (!document.hidden) {
        select((active + 1) % experiences.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, active]);

  return (
    <div 
      className="sn-discovery"
      onPointerDown={interact}
      onKeyDown={interact}
    >
      <div
        className="sn-experience-tabs"
        role="tablist"
        aria-label="Signature Experiences"
        onKeyDown={(e) => {
          let next = active;
          if (e.key === "ArrowRight") next = (active + 1) % experiences.length;
          else if (e.key === "ArrowLeft")
            next = (active + experiences.length - 1) % experiences.length;
          else if (e.key === "Home") next = 0;
          else if (e.key === "End") next = experiences.length - 1;
          else return;
          e.preventDefault();
          select(next);
          tabs.current[next]?.focus({ preventScroll: true });
        }}
      >
        {experiences.map((experience, i) => {
          const Icon = icons[i];
          return (
            <button
              key={experience.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`experience-tab-${i}`}
              aria-selected={active === i}
              aria-controls="experience-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
            >
              <Icon size={25} strokeWidth={1.2} aria-hidden="true" />
              <span>{experience.name.replace(/^\d+\s/, "")}</span>
            </button>
          );
        })}
      </div>
      <div
        id="experience-panel"
        role="tabpanel"
        aria-labelledby={`experience-tab-${active}`}
        tabIndex={0}
        className="sn-experience-feature"
      >
        <div className="sn-experience-feature-copy">
          <p className="sn-eyebrow">Signature Experience / 0{active + 1}</p>
          <h3>{current.name.replace(/^\d+\s/, "")}</h3>
          <p className="sn-feature-subtitle">{current.description}</p>
          <p>{introductions[active]}</p>
          <Link href={`/experiences#${current.slug}`} className="sn-text-link">
            Explore Experience <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="sn-feature-photo">
          <Image
            key={current.image}
            src={current.image}
            alt={current.alt}
            fill
            sizes="(max-width:700px) 90vw, 55vw"
          />
          <span>Kashi / Varanasi, India</span>
        </div>
      </div>
    </div>
  );
}
