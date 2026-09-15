import type { Metadata } from "next";
import { Founder, Values } from "@/components/Editorial";
import JourneyEnquiry from "@/components/JourneyEnquiry";
export const revalidate = 3600;
export const metadata: Metadata = {
  title: "About Soil n Soul Travels",
  description:
    "Meet Anchal Pandey, founder and native of Banaras, and discover the values behind our private journeys in Kashi.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="sn-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://www.soilnsoultravels.com/about",
            name: "About Soil n Soul Travels",
            mainEntity: {
              "@type": "Person",
              name: "Anchal Pandey",
              jobTitle: "Founder",
              image: "https://www.soilnsoultravels.com/images/founder.jpg",
              worksFor: {
                "@type": "TravelAgency",
                name: "Soil n Soul Travels",
              },
            },
          }),
        }}
      />
      <header className="sn-wrap sn-page-intro">
        <p className="sn-eyebrow">Our Story</p>
        <h1>
          Kashi is our home.
          <br />
          <em>Sharing it is our calling.</em>
        </h1>
        <p>
          Authenticity, transparency, and heartfelt hospitality. A local
          connection that makes every journey more meaningful.
        </p>
      </header>
      <Founder full />
      <Values />
      <JourneyEnquiry />
    </div>
  );
}
