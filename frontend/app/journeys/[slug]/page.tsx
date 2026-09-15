import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journeys } from "@/data/journeys";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import JourneySelectors from "@/components/JourneySelectors";

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const j = journeys.find((j) => j.slug === slug);
  return j
    ? {
        title: j.name,
        description: j.story,
        alternates: { canonical: `/journeys/${j.slug}` },
        openGraph: { images: [{ url: j.image }] },
      }
    : { title: "Journey not found", robots: { index: false } };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const j = journeys.find((j) => j.slug === slug);
  if (!j) notFound();

  return (
    <div className="sn-site">
      <header className="sn-wrap sn-page-intro">
        <Link className="sn-eyebrow" href="/journeys">
          ← Premium Personalised Journeys
        </Link>
        <h1 style={{ marginTop: 25 }}>{j.name}</h1>
        <p>
          {j.duration} &nbsp; / &nbsp; {j.guests} &nbsp; / &nbsp; Your preferred
          dates
        </p>
      </header>
      <div className="sn-detail-hero">
        <Image
          src={j.image}
          alt={`A glimpse of Kashi for ${j.name}`}
          fill
          sizes="100vw"
          priority
        />
      </div>
      <section className="sn-wrap sn-section sn-detail-grid">
        <div>
          <p className="sn-eyebrow">The Story</p>
          <h2>{j.mood}.</h2>
          <p>{j.story}</p>
          
          {j.highlights && (
            <>
              <p className="sn-eyebrow" style={{ marginTop: 45 }}>Journey Highlights</p>
              <ul>
                {j.highlights.map((h) => (
                  <li key={h} className="sn-timeline-item">
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}

          {j.components && (
            <>
              <p className="sn-eyebrow" style={{ marginTop: 45 }}>Private Journey Components</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {j.components.map((c) => (
                  <span key={c} style={{ padding: '8px 16px', background: 'rgba(230,80,0,0.1)', color: '#b5440a', borderRadius: '4px', fontSize: '12px' }}>
                    {c}
                  </span>
                ))}
              </div>
            </>
          )}

          {j.description && (
            <>
              <p className="sn-eyebrow" style={{ marginTop: 45 }}>What You’ll Experience</p>
              <ul>
                {j.description.split(" · ").map((item) => (
                  <li key={item} className="sn-timeline-item">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          <p className="sn-eyebrow">Journey Overview</p>
          <h3>{j.duration}, at your pace.</h3>
          <p>
            A private journey concept. We’ll confirm dates, local access, stays,
            and the final itinerary with you before arrangements are made.
          </p>
          
          {j.timeline && (
            <>
              <p className="sn-eyebrow" style={{ marginTop: 45 }}>Suggested Journey Timeline</p>
              <ol className="sn-timeline">
                {j.timeline.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </>
          )}

          <div style={{ marginTop: 50 }}>
            <JourneySelectors 
              journeyName={j.name}
              durationOptions={j.durationOptions}
              groupSizeOptions={j.groupSizeOptions}
            />
          </div>
        </div>
      </section>
      <JourneyEnquiry journey={j.name} duration={j.duration} />
    </div>
  );
}
