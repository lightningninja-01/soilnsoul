import { useEffect } from 'react';

const SITE_NAME = 'Soil N Soul Travels';
const SITE_URL = (import.meta.env.VITE_SITE_URL as string) || (typeof window !== 'undefined' ? window.location.origin : 'https://www.soilnsoultravels.com');
const DEFAULT_IMAGE = '/images/hero/hero-1.jpg';
const DEFAULT_DESC =
    'Book trusted tours & travel packages in Varanasi with Soil N Soul Travels. Ganga Aarti, pooja booking, city tours, car rental & spiritual packages from ₹999.';

interface SEOOptions {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    noIndex?: boolean;
    structuredData?: Record<string, unknown> | null;
    canonical?: string;
    keywords?: string;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.content = content;
}

function setLink(rel: string, href: string) {
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
    }
    el.href = href;
}

function upsertStructuredData(data: Record<string, unknown>) {
    let el = document.querySelector('script[data-seo="structured"]') as HTMLScriptElement | null;
    if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.setAttribute('data-seo', 'structured');
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}

function removeStructuredData() {
    const el = document.querySelector('script[data-seo="structured"]');
    if (el) el.remove();
}

/**
 * useSEO — zero-dependency hook to manage all head SEO tags.
 * Usage: call at top of any page component.
 */
export function useSEO({
    title,
    description = DEFAULT_DESC,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    noIndex = false,
    structuredData = null,
    canonical,
    keywords,
}: SEOOptions = {}) {
    useEffect(() => {
        // If title already contains branding (pipe or site name), use it as-is
        const fullTitle = title
            ? (title.includes('|') || title.toLowerCase().includes('soil') ? title : `${title} | ${SITE_NAME}`)
            : SITE_NAME;
        const fullUrl = url ? `${SITE_URL}${url}` : window.location.href;
        const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
        const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : fullUrl;

        // ── Title ───────────────────────────────────────
        document.title = fullTitle;

        // ── Meta description ────────────────────────────
        setMeta('description', description);

        // ── Keywords ────────────────────────────────────
        if (keywords) {
            setMeta('keywords', keywords);
        } else {
            const el = document.querySelector('meta[name="keywords"]');
            if (el) el.remove();
        }

        // ── Robots ──────────────────────────────────────
        setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow');

        // ── Canonical ────────────────────────────────────
        setLink('canonical', canonicalUrl);

        // ── Open Graph ──────────────────────────────────
        setMeta('og:title', fullTitle, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:image', fullImage, 'property');
        setMeta('og:url', fullUrl, 'property');
        setMeta('og:type', type, 'property');
        setMeta('og:site_name', SITE_NAME, 'property');

        // ── Twitter Card ─────────────────────────────────
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', fullTitle);
        setMeta('twitter:description', description);
        setMeta('twitter:image', fullImage);

        // ── Structured Data (JSON-LD) ────────────────────
        if (structuredData) {
            upsertStructuredData(structuredData);
        } else {
            removeStructuredData();
        }
    }, [title, description, image, url, type, noIndex, structuredData, canonical, keywords]);
}

// ── Pre-built structured data helpers ───────────────────────────────────────

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Soil n Soul Travels',
    description: DEFAULT_DESC,
    url: SITE_URL,
    telephone: '+919580417547',
    email: 'hello@soilnsoul.in',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Varanasi',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.3176,
        longitude: 82.9739,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
    },
    sameAs: [
        'https://wa.me/919580417547',
    ],
    priceRange: '₹₹',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '500',
    },
};

export function blogPostSchema(blog: {
    title: string;
    slug: string;
    seoDescription?: string;
    excerpt?: string;
    bannerImage?: string;
    createdAt: string;
    updatedAt?: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.seoDescription || blog.excerpt || '',
        image: blog.bannerImage?.startsWith('http')
            ? blog.bannerImage
            : blog.bannerImage ? `${SITE_URL}${blog.bannerImage}` : `${SITE_URL}/images/hero/hero-1.jpg`,
        url: `${SITE_URL}/blog/${blog.slug}`,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: {
            '@type': 'Person',
            name: 'Anchal Pandey',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Soil n Soul Travels',
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${blog.slug}`,
        },
    };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        })),
    };
}
