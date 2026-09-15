import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DOMPurify from 'dompurify';
import { useSEO, blogPostSchema, breadcrumbSchema } from '../hooks/useSEO';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE = API_URL.replace('/api', '');

const BlogPost = () => {
  const { slug } = useParams();
  const [progress, setProgress] = useState(0);
  const [blog, setBlog] = useState<any>(null);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setBlog(null);

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/${slug}`);
        const data = await res.json();
        if (data.success) setBlog(data.blog);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const data = await res.json();
        if (data.success)
          setRecentBlogs(data.blogs.filter((b: any) => b.slug !== slug).slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
    fetchRecent();

    // Reading progress
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  // ── Per-blog SEO ── (runs whenever blog loads) ──────────────────────────────
  const combinedSchema = blog
    ? [
        blogPostSchema(blog),
        breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Journal', url: '/blog' },
          { name: blog.title, url: `/blog/${blog.slug}` },
        ]),
      ]
    : null;

  useSEO(
    blog
      ? {
          title: blog.seoTitle || blog.title,
          description: blog.seoDescription || blog.excerpt || '',
          image: blog.bannerImage || undefined,
          url: `/blog/${blog.slug}`,
          type: 'article',
          canonical: `/blog/${blog.slug}`,
          structuredData: combinedSchema
            ? {
                '@context': 'https://schema.org',
                '@graph': combinedSchema,
              }
            : null,
        }
      : {}
  );

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#1A120B] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-slate-400 text-sm uppercase tracking-widest animate-pulse">Loading Story…</p>
      </div>
    </div>
  );

  // ── Not found ────────────────────────────────────────────────────────────────
  if (!blog) return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 flex flex-col items-center justify-center gap-6">
      <span className="material-symbols-outlined text-6xl text-primary/40">search_off</span>
      <h1 className="text-3xl font-bold">Post Not Found</h1>
      <Link to="/blog" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-widest transition-all">
        ← Back to Journal
      </Link>
    </div>
  );

  // ── Computed values ──────────────────────────────────────────────────────────
  const bannerSrc = blog.bannerImage?.startsWith('http')
    ? blog.bannerImage
    : blog.bannerImage ? `${API_BASE}${blog.bannerImage}` : '';

  // Fix any relative /uploads image paths in content
  const fixedContent = (blog.content || '').replace(
    /src="\/uploads\//g,
    `src="${API_BASE}/uploads/`
  );

  const wordCount = blog.content?.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length || 0;
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

      <Navbar />

      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[520px] sm:min-h-[620px] overflow-hidden flex flex-col">
        {bannerSrc ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bannerSrc}')` }}
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
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span>/</span>
            <Link className="hover:text-primary transition-colors" to="/blog">Journal</Link>
            <span>/</span>
            <span className="text-slate-300 line-clamp-1">{blog.title}</span>
          </nav>

          {/* Category badge */}
          {blog.category && (
            <span className="inline-block bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 w-fit">
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            {blog.title}
          </h1>

          {/* Date + read time + tags */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">calendar_today</span>
              {new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {readTime} min read
            </span>
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag: string) => (
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
        {blog.seoDescription && (
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed border-l-4 border-primary pl-5 mb-10 italic">
            {blog.seoDescription}
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
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
            {blog.tags.map((tag: string) => (
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
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter"
            className="w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-base text-slate-400">public</span>
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(window.location.href)}`}
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
                <Link key={r._id} to={`/blog/${r.slug}`} className="group block">
                  <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-white/5">
                    {rBanner
                      ? <img alt={r.title} src={rBanner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

      <Footer />
    </div>
  );
};

export default BlogPost;
