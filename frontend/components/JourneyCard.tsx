import Image from "next/image";
import Link from "next/link";
import { journeys } from "@/data/journeys";
export default function JourneyCard({
  journey: j,
}: {
  journey: (typeof journeys)[number];
}) {
  return (
    <article className="sn-journey sn-compact-journey">
      <Link href={`/journeys/${j.slug}`} className="sn-journey-image">
        <Image
          src={j.image}
          alt={`From our Kashi collection: ${j.mood}`}
          fill
          sizes="(max-width:700px) 80vw, (max-width:1000px) 44vw, 23vw"
        />
      </Link>
      <div className="sn-journey-copy">
        <p className="sn-eyebrow">{j.category}</p>
        <h3>
          <Link href={`/journeys/${j.slug}`}>{j.name}</Link>
        </h3>
        <p className="sn-journey-description">{j.description}</p>
        <div className="sn-journey-meta">
          <span>{j.duration}</span>
          <span>
            {j.slug === "varanasi-ayodhya"
              ? "Varanasi · Ayodhya"
              : j.slug === "varanasi-sarnath"
                ? "Varanasi · Sarnath"
                : "Varanasi"}
          </span>
        </div>
        <Link className="sn-text-link" href={`/journeys/${j.slug}`}>
          Explore Journey <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
