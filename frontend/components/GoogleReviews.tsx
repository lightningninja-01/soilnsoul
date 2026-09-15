"use client";

import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sample Guest",
    rating: 5,
    text: "Every detail felt considered without ever feeling over-planned. Kashi felt completely different when experienced through people who genuinely know the city.",
    source: "DEMO"
  },
  {
    id: 2,
    name: "Sample Traveller",
    rating: 5,
    text: "The morning on the Ganga, the old-city walk and the artisan experience made the journey feel deeply personal rather than like a standard tour.",
    source: "DEMO"
  },
  {
    id: 3,
    name: "Sample Explorer",
    rating: 5,
    text: "From the quiet dawn boat ride to the vibrant evening Aarti, everything was handled with such care and authenticity. A truly unforgettable time.",
    source: "DEMO"
  }
];

export default function GoogleReviews() {
  return (
    <section className="sn-section sn-reviews sn-wrap">
      <div className="sn-reviews-header">
        <div>
          <p className="sn-eyebrow">Kashi, Through Their Eyes</p>
          <h2>
            4.9 <span className="sn-star">★</span>
          </h2>
          <p className="sn-reviews-subtitle">Guest Stories — Demo</p>
        </div>
        <a href="#contact" className="sn-text-link">
          Read All Google Reviews ↗
        </a>
      </div>

      <div className="sn-reviews-grid">
        {reviews.map((review) => (
          <article key={review.id} className="sn-review-card">
            <div className="sn-review-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? "active" : ""}>★</span>
              ))}
            </div>
            <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            <div className="sn-review-author">
              <strong>{review.name}</strong>
              <span>— {review.source} REVIEW</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
