"use client";

import { useState } from "react";
import { whatsapp } from "@/data/journeys";

export default function JourneySelectors({ 
  journeyName, 
  durationOptions, 
  groupSizeOptions 
}: { 
  journeyName: string;
  durationOptions?: string[];
  groupSizeOptions?: string[];
}) {
  const [duration, setDuration] = useState(durationOptions?.[0] || "Flexible");
  const [guests, setGuests] = useState(groupSizeOptions?.[0] || "2 Guests");
  const [date, setDate] = useState("");

  const message = `Hi Soil n Soul,\n\nI'm interested in the ${journeyName} journey.\n\nDuration: ${duration}\nGuests: ${guests}\nPreferred Date: ${date || "Flexible"}\n\nI'd love to know more and design the journey.`;
  const link = whatsapp(message);

  return (
    <div className="sn-journey-selectors">
      {durationOptions && durationOptions.length > 0 && (
        <label>
          Duration
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            {durationOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      )}

      {groupSizeOptions && groupSizeOptions.length > 0 && (
        <label>
          Group Size
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            {groupSizeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      )}

      <label>
        Preferred Date (Optional)
        <input 
          type="text" 
          placeholder="e.g. 18 October" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </label>

      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 15 }}>
        <a href="#contact" className="sn-button">
          Design My Journey ↗
        </a>
        <a
          className="sn-text-link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire on WhatsApp ↗
        </a>
      </div>
    </div>
  );
}
