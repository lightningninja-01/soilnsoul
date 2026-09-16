import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Design My Journey",
  description:
    "Get in touch with Soil n Soul Travels for authentic Varanasi experiences. Reach us via WhatsApp, email, or drop by our office.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://www.soilnsoultravels.com/contact#webpage",
    url: "https://www.soilnsoultravels.com/contact",
    name: "Contact Soil n Soul Travels",
    description:
      "Contact page of Soil n Soul Travels. Design a personalised journey through the culture, stays, and sacred traditions of Kashi.",
    mainEntity: {
      "@type": "TravelAgency",
      name: "Soil n Soul Travels",
      telephone: "+919580417547",
      email: "info@soilnsoultravels",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Assi Ghat Road",
        addressLocality: "Varanasi",
        addressRegion: "Uttar Pradesh",
        postalCode: "221005",
        addressCountry: "IN",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.soilnsoultravels.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://www.soilnsoultravels.com/contact",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
