"use client";
import { useRef, useState, useEffect, UIEvent } from "react";
import Image from "next/image";

const films = [
  {
    title: "Kashi at Dawn",
    image: "/images/hero/hero-3.jpg",
    alt: "Historic ghats reflected in the Ganga",
    caption: "The river holds a thousand beginnings.",
  },
  {
    title: "When the City Glows",
    image: "/images/hero/hero-1.jpg",
    alt: "Two saffron-clad men walking past the ghat steps",
    caption: "Everyday moments. Extraordinary stories.",
  },
  {
    title: "The Hands of Banaras",
    image: "/images/hero/hero-2.jpg",
    alt: "A priest raising the ceremonial flame during Ganga aarti",
    caption: "A city illuminated by devotion and craft.",
  },
  {
    title: "A Deeper Connection",
    image: "/images/services/service-event.jpg",
    alt: "Rows of lamps lighting the steps of a ghat",
    caption: "A little light, carried a long way.",
  },
];

export default function CinematicCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
    if (itemWidth > 0) {
      const newActive = Math.round(scrollLeft / itemWidth);
      if (newActive !== active) setActive(newActive);
    }
  };

  const move = (delta: number) => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
    const newIndex = Math.max(0, Math.min(films.length - 1, active + delta));
    scrollRef.current.scrollTo({
      left: newIndex * itemWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="sn-section sn-cinema"
      aria-roledescription="carousel"
      aria-label="Cinematic Storytelling"
    >
      <div className="sn-wrap sn-section-heading">
        <div>
          <p className="sn-eyebrow">Cinematic Storytelling</p>
          <h2>
            A city you don’t just see.
            <br />
            <em>A city you feel.</em>
          </h2>
        </div>
        <div className="sn-cinema-nav">
          <button onClick={() => move(-1)} aria-label="Previous story" disabled={active === 0}>
            ←
          </button>
          <span aria-live="polite">
            0{active + 1} / 0{films.length}
          </span>
          <button onClick={() => move(1)} aria-label="Next story" disabled={active === films.length - 1}>
            →
          </button>
        </div>
      </div>

      <div className="sn-film-container">
        <div
          ref={scrollRef}
          className="sn-film-scroll"
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="Swipe to explore photo stories"
        >
          {films.map((f, i) => (
            <article
              key={f.title}
              className={`sn-film ${i === active ? "is-active" : ""}`}
              aria-hidden={i !== active}
            >
              <div className="sn-film-image-wrapper">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(max-width:700px) 85vw, 60vw"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
      
      <div className="sn-film-info">
        {films.map((f, i) => (
           <div 
             key={f.title} 
             className={`sn-film-text ${i === active ? 'is-active' : ''}`}
             aria-hidden={i !== active}
           >
             <p className="sn-eyebrow">A Kashi photo story / 0{i + 1}</p>
             <h3>{f.title}</h3>
             <p>{f.caption}</p>
           </div>
        ))}
      </div>
    </section>
  );
}
