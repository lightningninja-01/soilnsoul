import SoulJournal from "@/components/SoulJournal";
import type { BlogPost } from "@/lib/api";
type Preview = Pick<
  BlogPost,
  | "_id"
  | "title"
  | "slug"
  | "excerpt"
  | "bannerImage"
  | "category"
  | "createdAt"
>;
export default function BlogClient({ posts }: { posts: Preview[] }) {
  const editorial = [...posts].sort(
    (a, b) =>
      Number(/price|package|booking|best travel agency/i.test(a.title)) -
      Number(/price|package|booking|best travel agency/i.test(b.title)),
  );
  return (
    <div className="sn-site">
      <header className="sn-wrap sn-page-intro">
        <p className="sn-eyebrow">The Soul Journal</p>
        <h1>
          There’s a story
          <br />
          <em>around every corner.</em>
        </h1>
        <p>
          Cultural dispatches, local perspectives, and thoughtful guides from
          the heart of Kashi.
        </p>
      </header>
      <SoulJournal blogs={editorial} listing />
    </div>
  );
}
