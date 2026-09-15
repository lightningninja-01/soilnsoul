import { notFound, permanentRedirect } from 'next/navigation';
import { SEO_PAGES } from '@/lib/seo-pages';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawPage = SEO_PAGES[slug];
  if (rawPage) {
    permanentRedirect(`/travel/${slug}`);
  }
  notFound();
}
