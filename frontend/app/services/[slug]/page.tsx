import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SERVICES } from '@/data/services';
import { SITE_URL } from '@/lib/constants';
import ServiceDetailClient from './ServiceDetailClient';

export const revalidate = 3600;

const SERVICE_ALIASES: Record<string, string> = {
  'verified-stays': 'stay',
  'ritual-arrangements': 'pooja-booking',
  'cultural-tours': 'city-tour',
  'airport-pickup': 'travel',
  'silk-shopping': 'travel',
  'prewedding-photography': 'event',
};

export function generateStaticParams() {
  const base = SERVICES.map((s) => ({ slug: s.slug }));
  const aliases = Object.keys(SERVICE_ALIASES).map((slug) => ({ slug }));
  return [...base, ...aliases];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonicalSlug = SERVICE_ALIASES[slug] || slug;
  const service = SERVICES.find((s) => s.slug === canonicalSlug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} -- Varanasi Travel Services`,
    description: service.shortDesc,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: `${service.title} -- Soil n Soul Travels`,
      description: service.shortDesc,
      url: `${SITE_URL}/services/${service.slug}`,
      images: [{ url: service.image, alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const canonicalSlug = SERVICE_ALIASES[slug] || slug;
  if (slug !== canonicalSlug) {
    redirect(`/services/${canonicalSlug}`);
  }
  const service = SERVICES.find((s) => s.slug === canonicalSlug);
  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.shortDesc,
        provider: {
          '@type': 'TravelAgency',
          'name': 'Soil n Soul Travels',
          'url': SITE_URL
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          'name': 'Varanasi'
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE_URL}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Services', 'item': `${SITE_URL}/services` },
          { '@type': 'ListItem', 'position': 3, 'name': service.title, 'item': `${SITE_URL}/services/${service.slug}` }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
