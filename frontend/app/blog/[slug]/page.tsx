import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchBlogBySlug, fetchAllBlogSlugs } from '@/lib/api';
import { SITE_URL } from '@/lib/constants';
import BlogPostClient from './BlogPostClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await fetchAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const image = post.bannerImage || `${SITE_URL}/images/og-default.jpg`;

  return {
    title: `${title} | Soil n Soul Travels Blog`,
    description,
    keywords: post.keywords || '',
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: 'Soil n Soul Travels',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);
  if (!post) notFound();

  // Fetch recent blogs
  const allSlugs = await fetchAllBlogSlugs();
  const recentSlugs = allSlugs.filter((s: string) => s !== slug).slice(0, 3);
  const recentBlogs = await Promise.all(recentSlugs.map((s: string) => fetchBlogBySlug(s)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.bannerImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: { '@type': 'Organization', name: 'Soil n Soul Travels' },
    publisher: {
      '@type': 'Organization',
      name: 'Soil n Soul Travels',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostClient post={post} recentBlogs={recentBlogs.filter(Boolean)} />
    </>
  );
}
