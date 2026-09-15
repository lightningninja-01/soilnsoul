import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit3, Trash2, LogOut, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type RevalStatus = 'idle' | 'loading' | 'success' | 'error';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [revalStatus, setRevalStatus] = useState<RevalStatus>('idle');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`${API_URL}/blogs`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setBlogs(data.blogs);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const res = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setBlogs(blogs.filter(b => b._id !== id));
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/hakunamata');
    };

    /**
     * On-demand revalidation — flushes server cache so next
     * fetch to /api/blogs will pull fresh data from MongoDB.
     * Equivalent to Next.js ISR revalidation.
     */
    const handleRevalidate = async () => {
        setRevalStatus('loading');
        try {
            const res = await fetch(`${API_URL}/revalidate`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.success) {
                setRevalStatus('success');
                // Also refresh the blog list in UI
                const fresh = await fetch(`${API_URL}/blogs`).then(r => r.json());
                if (fresh.success) setBlogs(fresh.blogs);
            } else {
                setRevalStatus('error');
            }
        } catch {
            setRevalStatus('error');
        } finally {
            setTimeout(() => setRevalStatus('idle'), 3500);
        }
    };

    return (
        <div className="min-h-screen bg-[#1A120B] text-slate-100 p-8 pt-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10 relative">
                    <div>
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">CMS Dashboard</span>
                        <h1 className="text-4xl font-bold text-white">Manage Content</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* ── ISR Revalidation Banner ── */}
                <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                        <p className="text-white font-bold mb-1 flex items-center gap-2">
                            <RefreshCw size={16} className="text-primary" />
                            Cache Revalidation
                        </p>
                        <p className="text-slate-400 text-sm">
                            After publishing or editing a blog, click <strong className="text-white">Revalidate Cache</strong> to make it live instantly — without restarting the server. New visitors will get fresh data from the database.
                        </p>
                    </div>
                    <button
                        onClick={handleRevalidate}
                        disabled={revalStatus === 'loading'}
                        className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95 ${revalStatus === 'success'
                            ? 'bg-green-600 text-white'
                            : revalStatus === 'error'
                                ? 'bg-red-600/20 border border-red-500/40 text-red-400'
                                : 'bg-primary hover:bg-primary/90 text-white'
                            }`}
                    >
                        {revalStatus === 'loading' && <RefreshCw size={16} className="animate-spin" />}
                        {revalStatus === 'success' && <CheckCircle size={16} />}
                        {revalStatus === 'error' && <AlertCircle size={16} />}
                        {revalStatus === 'idle' && <RefreshCw size={16} />}
                        {revalStatus === 'loading' ? 'Clearing Cache...' : revalStatus === 'success' ? 'Cache Cleared ✓' : revalStatus === 'error' ? 'Failed — Retry' : 'Revalidate Cache'}
                    </button>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">All Blogs</h2>
                        <div className="flex items-center gap-3">
                            <Link
                                to="/admin/hotels"
                                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center gap-2"
                            >
                                Manage Hotels
                            </Link>
                            <Link
                                to="/admin/blog/new"
                                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase transition-all shadow-xl active:scale-95 flex items-center gap-2"
                            >
                                <PlusCircle size={18} /> New Blog
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="pb-3 px-4">Title</th>
                                    <th className="pb-3 px-4">Category</th>
                                    <th className="pb-3 px-4">Status</th>
                                    <th className="pb-3 px-4">Date</th>
                                    <th className="pb-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog => (
                                    <tr key={blog._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <p className="font-semibold text-white">{blog.title}</p>
                                            <p className="text-xs text-slate-400 mt-1">/blog/{blog.slug}</p>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-300">{blog.category}</td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${blog.status === 'published' ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'}`}>
                                                {blog.status || 'draft'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-slate-300">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/admin/blog/edit/${blog.slug}`}
                                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit3 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors border border-red-500/20"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {blogs.length === 0 && (
                            <div className="text-center py-12 text-slate-400 text-sm">
                                No blogs found. Click the button above to create one.
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Sitemap & SEO Quicklinks ── */}
                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    {[
                        { label: 'View Sitemap', href: `${API_URL.replace('/api', '')}/sitemap.xml`, icon: 'sitemap', desc: 'Check your dynamic XML sitemap' },
                        { label: 'View robots.txt', href: `${API_URL.replace('/api', '')}/robots.txt`, icon: 'robots', desc: 'Check crawl rules' },
                        { label: 'Google Search Console', href: 'https://search.google.com/search-console/', icon: 'search', desc: 'Submit sitemap & monitor SEO' },
                    ].map(item => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 rounded-xl p-4 transition-all group"
                        >
                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">open_in_new</span>
                            <div>
                                <p className="text-white font-semibold text-sm group-hover:text-primary transition-colors">{item.label}</p>
                                <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
