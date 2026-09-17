"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { whatsapp } from "@/data/journeys";
export default function JourneyEnquiry({
  journey = "",
  duration = "",
}: {
  journey?: string;
  duration?: string;
}) {
  const [ready, setReady] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(duration);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const receive = (event: Event) => {
      const preference = (
        event as CustomEvent<{ duration: string; guests: string; date: string }>
      ).detail;
      setSelectedDuration(preference.duration);
      setReady("");
      const form = formRef.current;
      if (!form) return;
      (form.elements.namedItem("dates") as HTMLInputElement).value =
        preference.date;
      (form.elements.namedItem("guests") as HTMLInputElement).value =
        preference.guests.replace(" Guests", "");
    };
    window.addEventListener("journey-preferences", receive);
    return () => window.removeEventListener("journey-preferences", receive);
  }, []);
  return (
    <section id="contact" className="sn-section sn-contact">
      <div className="sn-wrap">
        <p className="sn-eyebrow">Design My Journey</p>
        <h2>
          Every meaningful journey
          <br />
          begins with <em>a conversation.</em>
        </h2>
        <div className="sn-contact-grid">
          <div>
            <p>
              Tell us what draws you to Kashi. We’ll take care of the details
              that make it yours.
            </p>
            <div className="sn-contact-details">
              <a href="tel:+919580417547">+91 95804 17547</a>
              <a href="mailto:info@soilnsoultravels.com">info@soilnsoultravels.com</a>
              <span>Varanasi, Uttar Pradesh, India</span>
            </div>
            <form
              className="sn-form"
              ref={formRef}
              onChange={() => setReady("")}
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const message = `Hi Soil n Soul,\n${journey ? `I'm interested in ${journey}.` : "I would love to design my journey to Kashi."}\nName: ${data.get("name")}\nWhatsApp: ${data.get("contact")}\nEmail: ${data.get("email") || "Not provided"}\nDate: ${data.get("dates") || "Flexible"}\nGuests: ${data.get("guests")}${selectedDuration ? `\nDuration: ${selectedDuration}` : ""}\nInterests: ${data.getAll("interests").join(", ") || "Open to suggestions"}\nMessage: ${data.get("message") || "I would love to know more."}`;
                setReady(whatsapp(message));
              }}
            >
              <label>
                Full Name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                WhatsApp Number
                <input
                  name="contact"
                  autoComplete="tel"
                  type="tel"
                  required
                  maxLength={150}
                />
              </label>
              <label>
                Preferred Dates
                <input
                  name="dates"
                  placeholder="e.g. 12–14 October, or flexible"
                  maxLength={100}
                />
              </label>
              <label>
                Number of Guests
                <input
                  name="guests"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]+([–-][0-9]+|\+)?"
                  maxLength={12}
                  defaultValue="2"
                  required
                />
              </label>
              <label className="sn-full">
                Email (optional)
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={150}
                />
              </label>
              <fieldset>
                <legend>Interests</legend>
                <div className="sn-interest-options">
                  {[
                    "Sacred Kashi",
                    "Living Banaras",
                    "Food",
                    "Photography",
                    "Celebrations",
                    "Slow travel",
                  ].map((i) => (
                    <label key={i}>
                      <input type="checkbox" name="interests" value={i} />
                      {i}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="sn-full">
                Message
                <textarea
                  name="message"
                  rows={3}
                  placeholder="A place you dream of. A moment you want to feel."
                  maxLength={2000}
                />
              </label>
              <button className="sn-button" type="submit">
                Design My Journey →
              </button>
              <p className="sn-form-note">
                We’ll prepare your enquiry for WhatsApp. You review and send it.
              </p>
              {ready && (
                <div className="sn-form-ready" role="status">
                  <p>Your enquiry is ready.</p>
                  <a
                    className="sn-button"
                    href={ready}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Continue on WhatsApp ↗
                  </a>
                </div>
              )}
            </form>
            <a
              className="sn-text-link"
              href={whatsapp(
                `Hi Soil n Soul, ${journey ? `I'm interested in ${journey}. Duration: ${duration}. Dates and guests to be discussed.` : "I would love to plan a journey to Kashi."}`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp ↗
            </a>
          </div>
          <div className="sn-contact-aside">
            <div className="sn-enquiry-editorial-image">
              <Image
                src="/SnS/design-my-journey.webp"
                alt="Designing your personalized journey to Kashi"
                width={270}
                height={175}
                className="object-cover"
              />
            </div>
            <div className="sn-map">
              <iframe
                title="Map of Varanasi, Uttar Pradesh, India"
                src="https://maps.google.com/maps?q=Varanasi%2C%20Uttar%20Pradesh%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div>
                <p className="sn-eyebrow">Our home. Your beginning.</p>
                <h3>Varanasi, India</h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Varanasi%2C+Uttar+Pradesh%2C+India"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the map ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
