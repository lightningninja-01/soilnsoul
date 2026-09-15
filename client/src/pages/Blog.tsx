import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DOMPurify from 'dompurify';
import { useSEO } from '../hooks/useSEO';

const filters = ['All Stories', 'Spirituality', 'Crafts & Culture', 'Wellness', 'Music', 'Solo Women Travel'];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('All Stories');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Travel Journal — Stories from Varanasi',
    description: 'Curated essays, cultural dispatches, and inner reflections from the ancient streets of Varanasi by Soil n Soul Travels.',
    url: '/blog',
    canonical: '/blog',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.blogs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = posts.length > 0 ? posts[0] : null;
  const regular = activeFilter === 'All Stories' ? posts.slice(1) : posts.filter(p => p.category === activeFilter && p._id !== featured?._id);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A120B] text-slate-100 flex items-center justify-center">
        <div className="text-primary font-bold tracking-widest uppercase animate-pulse">Loading Journal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100 font-display flex flex-col">
      <Navbar />

      {/* Silk texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/silk.png)' }} />

      {/* Header */}
      <div className="pt-32 pb-16 max-w-7xl mx-auto px-6 text-center">
        <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">The Soul Journal</p>
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Stories from the <span className="text-gold italic">Heart of India</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          Curated essays, cultural dispatches, and inner reflections from the ancient streets of Varanasi.
        </p>
      </div>

      {/* Featured post */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 mb-20 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group h-[560px]">
              <img
                alt={featured.title}
                src={featured.bannerImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${featured.slug}/800/600`; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] to-transparent" />
              <div className="absolute bottom-0 p-8">
                <span className="text-primary text-xs font-bold uppercase tracking-widest">{featured.category}</span>
                <h2 className="text-3xl font-bold text-white mt-3 mb-4">{featured.title}</h2>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-widest">
                ✦ Featured Story
              </span>
              <h2 className="text-3xl font-bold text-white leading-tight">{featured.title}</h2>
              <p className="text-slate-400 leading-relaxed font-body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(featured.excerpt) }}></p>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white font-bold text-sm">Admin</p>
                  <p className="text-slate-500 text-xs">{new Date(featured.createdAt).toLocaleDateString()} · 5 min read</p>
                </div>
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-all"
              >
                Read the Full Story
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="border-y border-white/10 bg-[#23160f]/80 backdrop-blur-md sticky top-20 z-30 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-10 overflow-x-auto no-scrollbar py-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm whitespace-nowrap font-medium transition-colors pb-4 ${activeFilter === f
                  ? 'text-primary font-bold border-b-2 border-primary -mb-[18px]'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regular.map((post) => (
            <Link key={post._id} to={`/blog/${post.slug}`} className="group">
              <div className="relative h-60 rounded-xl overflow-hidden mb-5">
                <img
                  alt={post.title}
                  src={post.bannerImage}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${post.slug}/600/400`; }}
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">{post.category}</span>
                  <span className="text-slate-600 text-xs">·</span>
                  <span className="text-slate-500 text-xs">5 min read</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.excerpt) }}></p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                  <p className="text-slate-500 text-xs font-medium">Admin</p>
                  <span className="text-slate-700">·</span>
                  <p className="text-slate-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${p === 1 ? 'bg-primary text-white' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                }`}
            >
              {p}
            </button>
          ))}
          <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#23160f]">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">Never Miss a Dispatch</h2>
          <p className="text-slate-400 leading-relaxed">
            Subscribe to The Soul Journal and receive hand-curated stories from Varanasi, seasonal travel guides, and exclusive insider wisdom directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-slate-500"
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all whitespace-nowrap">
              Subscribe Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
