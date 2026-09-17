"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const films = [
  {
    title: "Kashi at Dawn",
    image: "/SnS/kashi-at-dawn.png",
    alt: "Historic ghats reflected in the Ganga",
    caption: "The river holds a thousand beginnings.",
  },
  {
    title: "When the City Glows",
    image: "/SnS/when-the-city-glows.png",
    alt: "Two saffron-clad men walking past the ghat steps",
    caption: "Everyday moments. Extraordinary stories.",
  },
  {
    title: "The Hands of Banaras",
    image: "/SnS/the-hands-of-banaras.png",
    alt: "A priest raising the ceremonial flame during Ganga aarti",
    caption: "A city illuminated by devotion and craft.",
  },
  {
    title: "A Deeper Connection",
    image: "/SnS/a-deeper-connection.png",
    alt: "Rows of lamps lighting the steps of a ghat",
    caption: "A little light, carried a long way.",
  },
];

const count = films.length;
const slides = [...films, ...films, ...films]; // Infinite loop trick

export default function CinematicCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const position = useRef(count); // start in middle block
  const settling = useRef<NodeJS.Timeout | null>(null);
  const dragging = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  
  const scrollTo = useCallback((index: number, smooth = true) => {
    const el = scroller.current;
    if (!el) return;
    const slide = el.children[index] as HTMLElement;
    if (!slide) return;
    
    position.current = index;
    el.scrollTo({
      left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  const move = useCallback(
    (delta: number) => {
      scrollTo(position.current + delta);
    },
    [scrollTo]
  );

  useEffect(() => {
    // Initial center
    scrollTo(count, false);
    
    const resize = new ResizeObserver(() => {
      scrollTo(count + (position.current % count), false);
    });
    if (scroller.current) resize.observe(scroller.current);
    
    return () => resize.disconnect();
  }, [scrollTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (!document.hidden && !dragging.current) {
        move(1);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, move]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    
    Array.from(el.children).forEach((child, i) => {
      const slide = child as HTMLElement;
      const d = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center);
      if (d < distance) {
        distance = d;
        nearest = i;
      }
    });
    
    position.current = nearest;
    setActive(nearest % count);
    
    if (settling.current) clearTimeout(settling.current);
    settling.current = setTimeout(() => {
      if (!dragging.current && (position.current < count || position.current >= count * 2)) {
        scrollTo(count + (position.current % count), false);
      }
    }, 150);
  };

  return (
    <section className="sn-section sn-cinema" aria-label="Cinematic Storytelling">
      <div className="sn-wrap sn-section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <p className="sn-eyebrow">THE KASHI STORIES</p>
          <h2>
            Kashi, through a<br />
            different lens.
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            aria-label="Previous story" 
            onClick={() => { setPaused(true); move(-1); setTimeout(() => setPaused(false), 4000); }}
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              background: 'transparent', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#f5f1e9',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e65000';
              e.currentTarget.style.color = '#e65000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.color = '#f5f1e9';
            }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>
          <button 
            aria-label="Next story" 
            onClick={() => { setPaused(true); move(1); setTimeout(() => setPaused(false), 4000); }}
            style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              background: 'transparent', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#f5f1e9',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e65000';
              e.currentTarget.style.color = '#e65000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.color = '#f5f1e9';
            }}
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="sn-film-container">
        <div
          ref={scroller}
          className="sn-film-scroll"
          onScroll={onScroll}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            dragging.current = { x: e.clientX, left: e.currentTarget.scrollLeft };
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.style.scrollSnapType = "none";
            setPaused(true);
          }}
          onPointerMove={(e) => {
            if (dragging.current) {
              e.currentTarget.scrollLeft = dragging.current.left + dragging.current.x - e.clientX;
            }
          }}
          onPointerUp={(e) => {
            if (!dragging.current) return;
            dragging.current = null;
            e.currentTarget.style.scrollSnapType = "";
            scrollTo(position.current);
            setTimeout(() => setPaused(false), 4000);
          }}
          onPointerCancel={(e) => {
            dragging.current = null;
            e.currentTarget.style.scrollSnapType = "";
            setPaused(false);
          }}
        >
          {slides.map((film, i) => (
            <article
              key={i}
              className={`sn-film ${i % count === active ? "is-active" : ""}`}
              onClick={() => {
                setPaused(true);
                scrollTo(i);
                setTimeout(() => setPaused(false), 4000);
              }}
              style={{ cursor: i % count === active ? 'default' : 'pointer' }}
            >
              <div className="sn-film-image-wrapper">
                <Image
                  draggable={false}
                  src={film.image}
                  alt={film.alt}
                  fill
                  sizes="(max-width:700px) 85vw, 60vw"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="sn-film-info sn-wrap">
          {films.map((film, i) => (
            <div key={i} className={`sn-film-text ${i === active ? "is-active" : ""}`}>
              <p className="sn-eyebrow">Kashi photo story / 0{i + 1}</p>
              <h3>{film.title}</h3>
              <p>{film.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
