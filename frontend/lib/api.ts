import { API_URL } from './constants';

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  bannerImage: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  createdAt: string;
  updatedAt?: string;
}

/** Fetch all blogs (server-side, cached with ISR) */
export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      next: { revalidate: 3600, tags: ['blogs'] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success && Array.isArray(data.blogs) ? data.blogs : [];
  } catch {
    return [];
  }
}

/** Fetch single blog by slug (server-side, cached with ISR) */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/blogs/${slug}`, {
      next: { revalidate: 3600, tags: ['blogs', `blog:${slug}`] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch {
    return null;
  }
}

/** Fetch all blog slugs for static generation */
export async function fetchAllBlogSlugs(): Promise<string[]> {
  try {
    const blogs = await fetchBlogs();
    return blogs.map((b) => b.slug).filter(Boolean);
  } catch {
    return [];
  }
}
