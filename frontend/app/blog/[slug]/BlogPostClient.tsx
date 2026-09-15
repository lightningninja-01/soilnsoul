'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { API_URL } from '@/lib/constants';

export default function BlogPostClient({ post, recentBlogs }: { post: any, recentBlogs: any[] }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const API_BASE = API_URL.replace('/api', '');

  useEffect(() => {
    // Reading progress
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bannerSrc = post.bannerImage?.startsWith('http')
    ? post.bannerImage
    : post.bannerImage ? `${API_BASE}${post.bannerImage}` : '';

  // Fix any relative /uploads image paths in content
  const fixedContent = (post.content || '').replace(
    /src="\/uploads\//g,
    `src="${API_BASE}/uploads/`
  );

  const wordCount = post.content?.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-primary z-[9999] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[520px] sm:min-h-[620px] overflow-hidden flex flex-col">
        {bannerSrc ? (
          <Image
            src={bannerSrc}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#0a0604]" />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/40 via-[#1A120B]/55 to-[#1A120B]" />

        {/* Meta — pt-24 on mobile / pt-28 on desktop clears the fixed navbar */}
        <div className="relative mt-auto max-w-4xl mx-auto w-full px-5 sm:px-8 pt-24 sm:pt-28 pb-12 sm:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest mb-6">
            <Link className="hover:text-primary transition-colors" href="/">Home</Link>
            <span>/</span>
            <Link className="hover:text-primary transition-colors" href="/blog">Journal</Link>
            <span>/</span>
            <span className="text-slate-300 line-clamp-1">{post.title}</span>
          </nav>

          {/* Category badge */}
          {post.category && (
            <span className="inline-block bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            {post.title}
          </h1>

          {/* Date + read time + tags */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {new Date(post.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {readTime} min read
            </span>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="bg-white/10 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Article Body ───────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-16 overflow-hidden">

        {/* SEO excerpt / description as a styled intro */}
        {post.seoDescription && (
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed border-l-4 border-primary pl-5 mb-10 italic">
            {post.seoDescription}
          </p>
        )}

        {/* Blog HTML content */}
        <article
          className="blog-body"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(fixedContent, {
              ADD_TAGS: ['iframe'],
              ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
            }),
          }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-white/8 text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share row */}
        <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
          <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">Share</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-base text-slate-400">public</span>
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
            title="Share via Email"
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-base text-slate-400">alternate_email</span>
          </a>
          <button
            onClick={handleCopy}
            title="Copy link"
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-base text-slate-400">{copied ? 'check' : 'link'}</span>
          </button>
          {copied && <span className="text-green-400 text-xs font-medium">Copied!</span>}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-10 bg-primary/10 border border-primary/25 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-bold mb-1">Planning a trip to Varanasi?</p>
            <p className="text-slate-400 text-sm">Talk to Anchal directly — honest advice, no sales pressure.</p>
          </div>
          <a
            href="https://wa.me/919580417547"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Related Posts ──────────────────────────────────────────────────── */}
      {recentBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 sm:px-8 pb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentBlogs.map((r) => {
              const rBanner = r.bannerImage?.startsWith('http')
                ? r.bannerImage
                : r.bannerImage ? `${API_BASE}${r.bannerImage}` : '';
              return (
                <Link key={r._id} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-white/5">
                    {rBanner
                      ? <Image
                          src={rBanner}
                          alt={r.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-white/10">image</span></div>
                    }
                  </div>
                  {r.category && (
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{r.category}</p>
                  )}
                  <h4 className="text-white font-bold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
