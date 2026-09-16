"use client";
import { useRef } from "react";

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
  const move = (direction: number) =>
    rail.current?.scrollBy({
      left: direction * (rail.current.clientWidth * 0.8),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  return (
    <section className="sn-section sn-review-section" id="reviews">
      <div className="sn-wrap">
        <div className="sn-section-heading">
          <div>
            <p className="sn-eyebrow">Guest Stories — Demo</p>
            <h2>Kashi, through their eyes.</h2>
            <p className="sn-review-disclosure">
              Illustrative guest stories. These are demo reviews, not verified
              Google reviews.
            </p>
          </div>
          <div className="sn-review-controls">
            <button
              aria-label="Previous guest stories"
              onClick={() => move(-1)}
            >
              ←
            </button>
            <button aria-label="Next guest stories" onClick={() => move(1)}>
              →
            </button>
          </div>
        </div>
        <div
          ref={rail}
          className="sn-review-rail"
          tabIndex={0}
          aria-label="Demo guest stories"
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
                <span
                  className="sn-review-rating"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <blockquote>“{review.text}”</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
