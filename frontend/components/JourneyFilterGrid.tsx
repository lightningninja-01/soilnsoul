"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { journeys } from "@/data/journeys";

const DURATION_FILTERS = ["All", "1 Day", "2–3 Days", "4–5 Days", "6+ Days"];
const GROUP_FILTERS = ["All", "1–2", "3–4", "5–6", "7–10", "10+"];
const INTEREST_FILTERS = ["All", "Spiritual", "Heritage", "Culture", "Food", "Photography", "Family", "Beyond Kashi"];

export default function JourneyFilterGrid() {
  const [duration, setDuration] = useState("All");
  const [group, setGroup] = useState("All");
  const [interest, setInterest] = useState("All");

  const filteredJourneys = journeys.filter(j => {
    // Basic filter logic that can be expanded if journeys data structure adds specific duration/group/interest fields
    // Right now, we match loosely on category or name/description as placeholders
    
    // In a real scenario we would map the exact duration strings. For the demo, we do simple matching if needed.
    // For now, if "All" is selected, we include it.
    let matchesDuration = true;
    if (duration !== "All") {
      if (duration === "1 Day" && !j.duration.includes("1 Day")) matchesDuration = false;
      if (duration === "2–3 Days" && !(j.duration.includes("2 Day") || j.duration.includes("3 Day"))) matchesDuration = false;
      if (duration === "4–5 Days" && !(j.duration.includes("4 Day") || j.duration.includes("5 Day"))) matchesDuration = false;
      if (duration === "6+ Days" && !j.duration.includes("6 Day")) matchesDuration = false;
    }

    let matchesInterest = true;
    if (interest !== "All") {
      const search = (j.name + j.description + j.story + j.category).toLowerCase();
      if (!search.includes(interest.toLowerCase())) matchesInterest = false;
    }

    return matchesDuration && matchesInterest;
  });

  return (
    <div>
      <div className="sn-filters">
        <div className="sn-filter-group">
          <label>Duration</label>
          <div className="sn-filter-options">
            {DURATION_FILTERS.map(f => (
              <button key={f} onClick={() => setDuration(f)} className={duration === f ? "active" : ""}>{f}</button>
            ))}
          </div>
        </div>
        
        <div className="sn-filter-group">
          <label>Group Size</label>
          <div className="sn-filter-options">
            {GROUP_FILTERS.map(f => (
              <button key={f} onClick={() => setGroup(f)} className={group === f ? "active" : ""}>{f}</button>
            ))}
          </div>
        </div>

        <div className="sn-filter-group">
          <label>Interest</label>
          <div className="sn-filter-options">
            {INTEREST_FILTERS.map(f => (
              <button key={f} onClick={() => setInterest(f)} className={interest === f ? "active" : ""}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="sn-journeys" style={{ marginTop: 60 }}>
        {filteredJourneys.map((j, i) => (
          <article key={j.slug} className="sn-journey">
            <Link href={`/journeys/${j.slug}`} className="sn-journey-image">
              <Image
                src={j.image}
                alt={j.name}
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
        
        {filteredJourneys.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#68675f" }}>No journeys match your current filters. Please try adjusting your selections.</p>
          </div>
        )}
      </div>
    </div>
  );
}
