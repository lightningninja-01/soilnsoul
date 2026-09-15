import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SEO_PAGES } from '@/lib/seo-pages';
import { SITE_URL } from '@/lib/constants';
import { normalizeSeoPage } from '@/lib/seo-normalize';
import SeoLandingClient from '@/app/[slug]/SeoLandingClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const rawPage = SEO_PAGES[slug];
  const page = rawPage ? normalizeSeoPage(rawPage) : null;
  if (!page) return { title: 'Not Found' };

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/travel/${page.slug}`,
      type: 'website',
      siteName: 'Soil n Soul Travels',
    },
    alternates: { canonical: `${SITE_URL}/travel/${page.slug}` },
  };
}

export default async function SeoLandingTravelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawPage = SEO_PAGES[slug];
  const page = rawPage ? normalizeSeoPage(rawPage) : null;
  if (!page) notFound();

  if (page.slug !== slug) {
    redirect(`/travel/${page.slug}`);
  }

  const schemaGraph: any[] = [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/travel/${page.slug}#webpage`,
      name: page.title,
      description: page.metaDescription,
      url: `${SITE_URL}/travel/${page.slug}`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: page.breadcrumb.map((item: any, idx: number) => {
          let itemUrl = item.url;
          if (!itemUrl.startsWith('http')) {
            const cleanPath = itemUrl.startsWith('/') ? itemUrl : `/${itemUrl}`;
            itemUrl = `${SITE_URL}${cleanPath}`;
          }
          return {
            '@type': 'ListItem',
            position: idx + 1,
            name: item.name,
            item: itemUrl,
          };
        }),
      },
    }
  ];

  if (page.faqs && page.faqs.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/travel/${page.slug}#faq`,
      'mainEntity': page.faqs.map((faq: any) => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a
        }
      }))
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLandingClient page={page} />
    </>
  );
}
