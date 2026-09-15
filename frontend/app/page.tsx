import type { Metadata } from "next";
import { fetchBlogs } from "@/lib/api";
import HomeClient from "./HomeClient";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: { absolute: "Discover Kashi, Beyond Tourism | Soil n Soul Travels" },
  description:
    "Signature Experiences and Premium Personalised Journeys in Kashi. Discover the culture, people and soul of Banaras with local hosts.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const blogs = await fetchBlogs();
  const latestBlogs = [...blogs].sort(
    (a, b) =>
      Number(/price|package|booking|best travel agency/i.test(a.title)) -
      Number(/price|package|booking|best travel agency/i.test(b.title)),
  );

  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://www.soilnsoultravels.com/#agency",
        name: "Soil n Soul Travels",
        url: "https://www.soilnsoultravels.com",
        logo: "https://www.soilnsoultravels.com/images/hero/hero-1.jpg",
        image: "https://www.soilnsoultravels.com/images/hero/hero-1.jpg",
        description:
          "Trusted, locally-owned Varanasi travel agency. We provide verified heritage stays, airport pickups, guided Ganga Aarti boat tours, and Kashi Vishwanath Pooja arrangements.",
        telephone: "+919580417547",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Assi Ghat Road",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          postalCode: "221005",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "25.2899",
          longitude: "83.0076",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        sameAs: [
          "https://www.instagram.com/soilnsoultravels",
          "https://wa.me/919580417547",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.soilnsoultravels.com/#website",
        url: "https://www.soilnsoultravels.com",
        name: "Soil n Soul Travels",
        description: "Plan your Varanasi journey with Soil n Soul Travels.",
        publisher: {
          "@id": "https://www.soilnsoultravels.com/#agency",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <HomeClient blogs={latestBlogs} />
    </>
  );
}
