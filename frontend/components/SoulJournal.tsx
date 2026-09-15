"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/api";
const categories = [
  "All stories",
  "Travel Guide",
  "Spirituality",
  "Crafts & Culture",
  "Wellness",
  "Music",
  "Solo Women Travel",
];
export default function SoulJournal({
  blogs,
  listing = false,
}: {
  blogs: Pick<
    BlogPost,
    "_id" | "slug" | "title" | "excerpt" | "category" | "bannerImage"
  >[];
  listing?: boolean;
}) {
  const [category, setCategory] = useState("All stories");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const filtered = blogs
    .filter(
      (b) =>
        category === "All stories" ||
        b.category.toLowerCase() === category.toLowerCase(),
    )
    .slice(0, listing ? undefined : 3);
  return (
    <section id="blog" className="sn-section sn-wrap sn-journal">
      <div className="sn-section-heading">
        <div>
          <p className="sn-eyebrow">The Soul Journal</p>
          <h2>
            Stories from the
            <br />
            <em>Heart of India.</em>
          </h2>
        </div>
        <Link href="/blog" className="sn-text-link">
          Read the journal ↗
        </Link>
      </div>
      <div className="sn-categories" aria-label="Journal categories">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="sn-journal-grid">
          {filtered.map((b) => (
            <article key={b._id}>
              <Link href={`/blog/${b.slug}`}>
                <div className="sn-journal-image">
                  <Image
                    src={imgErrors[b._id] ? "/images/hero/hero-3.jpg" : (b.bannerImage || "/images/hero/hero-3.jpg")}
                    alt={b.title}
                    fill
                    sizes="(max-width:700px) 90vw, 45vw"
                    onError={() => setImgErrors(prev => ({ ...prev, [b._id]: true }))}
                  />
                </div>
                <p className="sn-eyebrow">{b.category}</p>
                <h3>{b.title}</h3>
                <p>{b.excerpt}</p>
                <span className="sn-text-link">Read story ↗</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="sn-journal-empty">
          <div className="sn-journal-image">
            <Image
              src="/images/hero/hero-3.jpg"
              alt="The riverfront of Banaras"
              fill
              sizes="(max-width:700px) 90vw, 50vw"
            />
          </div>
          <div>
            <p className="sn-eyebrow">Notes from Banaras</p>
            <h3>
              There is always
              <br />
              another story.
            </h3>
            <p>
              {blogs.length
                ? "Explore more stories in the journal, or choose another category."
                : "Explore our journal for local perspectives on culture, spirituality, and life in Kashi."}
            </p>
            <Link href="/blog" className="sn-text-link">
              Explore the journal ↗
            </Link>
          </div>
        </div>
      )}
      <div className="sn-newsletter">
        <div>
          <h3>A little Kashi, in your inbox.</h3>
          <p>Request The Soul Journal newsletter by email.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = new FormData(e.currentTarget).get("email");
            window.location.href = `mailto:hello@soilnsoul.in?subject=${encodeURIComponent("The Soul Journal — newsletter request")}&body=${encodeURIComponent(`Please subscribe ${email} to The Soul Journal. I would like to receive cultural stories and updates by email.`)}`;
          }}
        >
          <label className="sn-sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            required
          />
          <button type="submit" aria-label="Request newsletter signup by email">
            Sign up ↗
          </button>
          <small>Opens your email app to send your subscription request.</small>
        </form>
      </div>
    </section>
  );
}
