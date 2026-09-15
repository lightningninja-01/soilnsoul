import type { Metadata } from "next";
import JourneyFilterGrid from "@/components/JourneyFilterGrid";
import JourneyEnquiry from "@/components/JourneyEnquiry";

export const metadata: Metadata = {
  title: "Premium Personalised Journeys",
  description:
    "Explore private journey concepts through the culture, flavours and sacred rhythms of Kashi. Each journey is shaped around you.",
  alternates: { canonical: "/journeys" },
};

export default function JourneysPage() {
  return (
    <div className="sn-site">
      <header className="sn-wrap sn-page-intro">
        <p className="sn-eyebrow">Premium Personalised Journeys</p>
        <h1>
          A little inspiration.
          <br />
          <em>A journey entirely yours.</em>
        </h1>
        <p>
          Follow a rhythm that feels like you. These journey concepts are
          starting points, ready to be personalised around your dates,
          interests, and companions.
        </p>
      </header>
      <section
        className="sn-wrap sn-section"
        style={{ paddingTop: 0 }}
        aria-label="Journey concepts"
      >
        <JourneyFilterGrid />
      </section>
      <JourneyEnquiry />
    </div>
  );
}
