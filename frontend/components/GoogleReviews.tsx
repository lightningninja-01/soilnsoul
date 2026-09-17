"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const DEMO_REVIEWS = [
  {
    author: "Elena R.",
    text: "The evening aarti experience was breathtaking. Their local guide took us to a quiet spot away from the crowds, allowing us to truly feel the spiritual weight of Kashi. Highly recommended for anyone seeking an authentic connection.",
    rating: 5,
  },
  {
    author: "David M.",
    text: "Exploring the hidden alleys of Varanasi with Soil n Soul was the highlight of our India trip. We saw temples and tasted street food that we would never have found on our own. A perfectly curated experience.",
    rating: 5,
  },
  {
    author: "Anita S.",
    text: "Our multi-day spiritual journey was planned flawlessly. The deep knowledge of the heritage guides and the comfort of the heritage stays made exploring Kashi entirely stress-free.",
    rating: 5,
  },
  {
    author: "James H.",
    text: "I wanted to photograph the real Banaras, and they designed a custom early morning trail for me. Incredible light, incredible access, and genuinely kind people.",
    rating: 5,
  },
];

export default function GoogleReviews() {
  const rail = useRef<HTMLDivElement>(null);
  
  const [paused, setPaused] = useState(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const interact = () => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
  };

  const move = (direction: number) => {
    interact();
    rail.current?.scrollBy({
      left: direction * (rail.current.clientWidth * 0.8),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      const railEl = rail.current;
      if (!railEl || document.hidden) return;
      
      const maxScroll = railEl.scrollWidth - railEl.clientWidth;
      if (maxScroll <= 0) return;

      let nextScroll = railEl.scrollLeft + (railEl.clientWidth * 0.8);
      if (railEl.scrollLeft + railEl.clientWidth >= railEl.scrollWidth - 10) {
        nextScroll = 0;
      }
      railEl.scrollTo({
        left: nextScroll,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section className="sn-section sn-review-section" id="reviews">
      <div className="sn-wrap">
        <div className="sn-section-heading">
          <div>
            <p className="sn-eyebrow">Guest Stories - Demo</p>
            <h2>Kashi, through their eyes.</h2>
            <p className="sn-review-disclosure">
              Illustrative guest stories. These are demo reviews, not verified
              Google reviews.
            </p>
          </div>
          <div className="sn-review-controls" style={{ display: 'flex', gap: '12px' }}>
            <button
              aria-label="Previous guest stories"
              onClick={() => move(-1)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.18)',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#242521',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#e65000';
                e.currentTarget.style.color = '#e65000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)';
                e.currentTarget.style.color = '#242521';
              }}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button 
              aria-label="Next guest stories" 
              onClick={() => move(1)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.18)',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#242521',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#e65000';
                e.currentTarget.style.color = '#e65000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)';
                e.currentTarget.style.color = '#242521';
              }}
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="sn-reviews-container">
          <div className="sn-review-editorial-image">
            <Image
              src="/SnS/through-their-eyes.webp"
              alt="Ghats of Varanasi observed in evening atmosphere"
              width={270}
              height={190}
              className="object-cover"
            />
          </div>
          <div
            ref={rail}
            className="sn-review-rail"
            tabIndex={0}
            aria-label="Demo guest stories"
            onPointerDown={interact}
            onScrollCapture={interact}
          >
            {DEMO_REVIEWS.map((review) => (
              <article key={review.author} className="sn-review">
                <div className="sn-review-person">
                  <span className="sn-avatar" aria-hidden="true">
                    {review.author.charAt(0)}
                  </span>
                  <div>
                    <h3>{review.author}</h3>
                    <span>Demo review</span>
                  </div>
                  <div
                    className="sn-review-rating"
                    aria-label={`${review.rating} out of 5 stars`}
                    style={{ display: 'flex', gap: '3px', alignItems: 'center' }}
                  >
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={13} fill="#e65000" stroke="#e65000" strokeWidth={1} />
                    ))}
                  </div>
                </div>
                <blockquote>"{review.text}"</blockquote>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
