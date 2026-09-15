import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ArrowLeft, Save, Upload, X, Eye } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
    'General', 'Spirituality', 'Crafts & Culture', 'Wellness', 'Music',
    'Solo Women Travel', 'Travel Guide', 'Rituals', 'Shopping', 'Food',
    'Photography', 'Heritage',
];

export default function AdminBlogEditor() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const quillRef = useRef<ReactQuill>(null);
    const isEditing = Boolean(slug);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [blogId, setBlogId] = useState<string | null>(null);
    const [preview, setPreview] = useState(false);
    const [content, setContent] = useState('');

    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        category: 'General',
        status: 'draft' as 'draft' | 'published',
        tags: '',
        bannerImage: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });

    // ── Image upload handler for Quill inline images ──────────────────────────
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            const fd = new FormData();
            fd.append('image', file);
            try {
                const res = await fetch(`${API_URL}/media/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: fd,
                });
                const data = await res.json();
                if (data.success && data.url) {
                    const imageUrl = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;
                    const editor = quillRef.current?.getEditor();
                    if (editor) {
                        const range = editor.getSelection(true);
                        editor.insertEmbed(range.index, 'image', imageUrl);
                        editor.setSelection(range.index + 1, 0);
                    }
                }
            } catch {
                alert('Image upload failed. Check backend connection.');
            }
        };
    };

    // ── Quill toolbar modules ─────────────────────────────────────────────────
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                [{ font: [] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: { image: imageHandler },
        },
        clipboard: { matchVisual: false },
    }), []);

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'align',
        'list', 'bullet', 'indent',
        'blockquote', 'code-block',
        'link', 'image',
    ];

    // ── Load blog when editing ────────────────────────────────────────────────
    useEffect(() => {
        if (!isEditing) return;
        setLoading(true);
        fetch(`${API_URL}/blogs/${slug}`)
            .then(r => r.json())
            .then(data => {
                if (data.success && data.blog) {
                    const b = data.blog;
                    setBlogId(b._id);
                    setContent(b.content || '');
                    setForm({
                        title: b.title || '',
                        excerpt: b.excerpt || '',
                        category: b.category || 'General',
                        status: b.status || (b.published ? 'published' : 'draft'),
                        tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
                        bannerImage: b.bannerImage || '',
                        seoTitle: b.seoTitle || '',
                        seoDescription: b.seoDescription || '',
                        seoKeywords: Array.isArray(b.seoKeywords) ? b.seoKeywords.join(', ') : '',
                    });
                }
            })
            .catch(() => setError('Failed to load blog.'))
            .finally(() => setLoading(false));
    }, [slug, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingBanner(true);
        setError('');
        const fd = new FormData();
        fd.append('image', file);
        try {
            const res = await fetch(`${API_URL}/media/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
            const data = await res.json();
            if (data.success && data.url) {
                const url = data.url.startsWith('http') ? data.url : `${API_URL.replace('/api', '')}${data.url}`;
                setForm(f => ({ ...f, bannerImage: url }));
            } else {
                setError(data.message || 'Upload failed.');
            }
        } catch {
            setError('Upload failed. Make sure the backend is running.');
        } finally {
            setUploadingBanner(false);
            e.target.value = '';
        }
    };

    const handleSave = async (forcedStatus?: 'draft' | 'published') => {
        const trimmedContent = content.replace(/<(.|\n)*?>/g, '').trim();
        if (!form.title.trim()) { setError('Title is required.'); return; }
        if (!form.excerpt.trim()) { setError('Excerpt is required.'); return; }
        if (!trimmedContent) { setError('Content cannot be empty.'); return; }

        setSaving(true);
        setError('');
        setSuccess('');

        const status = forcedStatus || form.status;
        const payload = {
            title: form.title,
            excerpt: form.excerpt,
            content,
            category: form.category,
            status,
            published: status === 'published',
            bannerImage: form.bannerImage,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
            seoTitle: form.seoTitle || form.title,
            seoDescription: form.seoDescription,
            seoKeywords: form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean),
        };

        try {
            const url = isEditing && blogId ? `${API_URL}/blogs/${blogId}` : `${API_URL}/blogs`;
            const method = isEditing && blogId ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(status === 'published' ? '✅ Published!' : '📝 Draft saved!');
                setTimeout(() => navigate('/admin'), 1500);
            } else {
                setError(data.message || 'Save failed.');
            }
        } catch {
            setError('Server error. Is the backend running?');
        } finally {
            setSaving(false);
        }
    };

    const slugPreview = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (loading) return (
        <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center">
            <div className="text-indigo-400 font-bold tracking-widest uppercase animate-pulse">Loading Editor…</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f0f13] text-slate-100">
            {/* ── Quill dark-mode overrides ── */}
            <style>{`
        .ql-toolbar { background: #1a1a24 !important; border-color: rgba(255,255,255,0.1) !important; border-radius: 12px 12px 0 0; flex-wrap: wrap; }
        .ql-container { background: #0f0f13 !important; border-color: rgba(255,255,255,0.1) !important; border-radius: 0 0 12px 12px; min-height: 320px; font-family: inherit; }
        .ql-editor { color: #cbd5e1; font-size: 15px; line-height: 1.8; min-height: 320px; padding: 20px 24px; }
        .ql-editor.ql-blank::before { color: #475569; font-style: normal; }
        .ql-editor h1 { font-size: 2em; font-weight: 700; color: #fff; margin-bottom: 0.5em; }
        .ql-editor h2 { font-size: 1.5em; font-weight: 700; color: #fff; margin-bottom: 0.4em; }
        .ql-editor h3 { font-size: 1.2em; font-weight: 600; color: #fff; margin-bottom: 0.3em; }
        .ql-editor h4 { font-size: 1em; font-weight: 600; color: #e2e8f0; margin-bottom: 0.3em; }
        .ql-editor p { margin-bottom: 1em; }
        .ql-editor blockquote { border-left: 4px solid #6366f1; padding-left: 16px; color: #94a3b8; font-style: italic; margin: 1em 0; }
        .ql-editor pre.ql-syntax { background: #1e1e2e; border-radius: 8px; padding: 16px; font-size: 13px; color: #a5f3fc; font-family: monospace; overflow-x: auto; }
        .ql-editor a { color: #818cf8; text-decoration: underline; }
        .ql-editor img { max-width: 100%; border-radius: 10px; margin: 16px auto; display: block; box-shadow: 0 4px 24px rgba(0,0,0,0.4); }
        .ql-editor ul, .ql-editor ol { padding-left: 1.5em; margin-bottom: 1em; }
        .ql-editor li { margin-bottom: 0.3em; }
        .ql-toolbar .ql-stroke { stroke: #94a3b8; }
        .ql-toolbar .ql-fill { fill: #94a3b8; }
        .ql-toolbar .ql-picker { color: #94a3b8; }
        .ql-toolbar button:hover .ql-stroke,
        .ql-toolbar button.ql-active .ql-stroke { stroke: #818cf8 !important; }
        .ql-toolbar button:hover .ql-fill,
        .ql-toolbar button.ql-active .ql-fill { fill: #818cf8 !important; }
        .ql-toolbar .ql-picker-label:hover,
        .ql-toolbar .ql-picker-item:hover { color: #818cf8 !important; }
        .ql-toolbar .ql-picker-options { background: #1a1a24; border-color: rgba(255,255,255,0.1); border-radius: 8px; }
        .ql-toolbar .ql-picker-item { color: #94a3b8; }
        .ql-picker-label { border-color: transparent !important; }
        .ql-snow.ql-toolbar button { border-radius: 4px; }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow.ql-toolbar button.ql-active { background: rgba(255,255,255,0.08); }
        /* Blog post view styling */
        .blog-body h1 { font-size: 2rem; font-weight: 700; color: #fff; margin: 1.5rem 0 0.75rem; line-height: 1.25; }
        .blog-body h2 { font-size: 1.5rem; font-weight: 700; color: #fff; margin: 1.4rem 0 0.6rem; line-height: 1.3; }
        .blog-body h3 { font-size: 1.2rem; font-weight: 600; color: #e2e8f0; margin: 1.2rem 0 0.5rem; }
        .blog-body h4 { font-size: 1rem; font-weight: 600; color: #e2e8f0; margin: 1rem 0 0.4rem; }
        .blog-body p { margin-bottom: 1.25rem; line-height: 1.85; color: #cbd5e1; }
        .blog-body a { color: #818cf8; text-decoration: underline; }
        .blog-body img { max-width: 100%; border-radius: 12px; margin: 1.5rem auto; display: block; box-shadow: 0 4px 32px rgba(0,0,0,0.5); }
        .blog-body blockquote { border-left: 4px solid #6366f1; background: rgba(99,102,241,0.07); padding: 14px 20px; border-radius: 0 8px 8px 0; margin: 1.5rem 0; color: #94a3b8; font-style: italic; }
        .blog-body pre { background: #1e1e2e; border-radius: 10px; padding: 1.25rem; overflow-x: auto; margin: 1.25rem 0; }
        .blog-body code { font-family: 'Courier New', monospace; font-size: 13px; color: #a5f3fc; }
        .blog-body ul { list-style: disc; padding-left: 1.75rem; margin-bottom: 1.25rem; }
        .blog-body ol { list-style: decimal; padding-left: 1.75rem; margin-bottom: 1.25rem; }
        .blog-body li { margin-bottom: 0.4rem; line-height: 1.7; color: #cbd5e1; }
        .blog-body strong { color: #fff; font-weight: 700; }
        .blog-body em { color: #e2e8f0; }
      `}</style>

            {/* ── Top Bar ───────────────────────────────────────────────────────── */}
            <div className="sticky top-0 z-30 bg-[#0f0f13]/95 backdrop-blur border-b border-white/8 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <Link to="/admin" className="text-slate-400 hover:text-white transition-colors shrink-0"><ArrowLeft size={18} /></Link>
                    <span className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase truncate">
                        {isEditing ? `Edit: ${form.title || slug}` : 'New Post'}
                    </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => setPreview(p => !p)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                        <Eye size={13} />{preview ? 'Edit' : 'Preview'}
                    </button>
                    <button onClick={() => handleSave('draft')} disabled={saving}
                        className="flex items-center gap-1.5 text-slate-300 bg-white/8 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors hover:bg-white/12">
                        <Save size={13} />Draft
                    </button>
                    <button onClick={() => handleSave('published')} disabled={saving}
                        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        {saving ? '…' : '🚀 Publish'}
                    </button>
                </div>
            </div>

            {/* Alerts */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8">
                {error && (
                    <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 flex items-center gap-2 text-sm">
                        <X size={14} />{error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-3 text-sm">{success}</div>
                )}
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 space-y-5">

                {/* ── CONTENT ─────────────────────────────────────────────────────── */}
                <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-white/8">
                        <h2 className="text-indigo-400 font-bold text-xs tracking-[0.15em] uppercase">Content</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Title */}
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Title <span className="text-red-400">*</span></label>
                            <input name="title" required value={form.title} onChange={handleChange}
                                placeholder="Blog post title"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-base placeholder:text-slate-600 outline-none transition-colors" />
                            {form.title && (
                                <p className="text-slate-600 text-xs mt-1.5">
                                    URL: <span className="text-indigo-400">/blog/{slugPreview}</span>
                                </p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Excerpt <span className="text-red-400">*</span></label>
                            <textarea name="excerpt" rows={2} value={form.excerpt} onChange={handleChange}
                                placeholder="Short description shown on listing cards"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none" />
                            <p className="text-slate-600 text-xs mt-1">{form.excerpt.length} / 500</p>
                        </div>

                        {/* Editor or Preview */}
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Content <span className="text-red-400">*</span></label>
                            {preview ? (
                                <div
                                    className="min-h-[300px] border border-white/10 rounded-xl p-6 blog-body text-slate-200"
                                    dangerouslySetInnerHTML={{ __html: content || '<p class="text-slate-500">Nothing to preview yet.</p>' }}
                                />
                            ) : (
                                <ReactQuill
                                    ref={quillRef}
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    formats={formats}
                                    placeholder="Write your blog content here..."
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* ── FEATURED IMAGE ────────────────────────────────────────────── */}
                <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-white/8">
                        <h2 className="text-indigo-400 font-bold text-xs tracking-[0.15em] uppercase">Featured Image</h2>
                    </div>
                    <div className="p-6 flex items-start gap-5">
                        {/* Upload box */}
                        <label className="cursor-pointer shrink-0">
                            <div className={`w-28 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition-colors overflow-hidden ${form.bannerImage ? 'border-indigo-500/50' : 'border-white/15 hover:border-white/30'}`}>
                                {form.bannerImage ? (
                                    <img src={form.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload size={20} className="text-slate-500" />
                                        <span className="text-slate-500 text-xs text-center leading-tight px-1">Upload Image</span>
                                    </>
                                )}
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} disabled={uploadingBanner} />
                        </label>

                        <div className="flex-1 space-y-2">
                            <p className="text-slate-500 text-xs">Recommended: <strong className="text-slate-300">1200×630px</strong> · Max 5MB · JPG/PNG/WebP</p>
                            {uploadingBanner && <p className="text-indigo-400 text-xs animate-pulse">Uploading…</p>}
                            <input
                                type="url" name="bannerImage" value={form.bannerImage} onChange={handleChange}
                                placeholder="Or paste image URL…"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-lg px-3 py-2 text-white text-xs placeholder:text-slate-600 outline-none transition-colors"
                            />
                            {form.bannerImage && (
                                <button type="button" onClick={() => setForm(f => ({ ...f, bannerImage: '' }))}
                                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 transition-colors">
                                    <X size={11} /> Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── METADATA ──────────────────────────────────────────────────── */}
                <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-white/8">
                        <h2 className="text-indigo-400 font-bold text-xs tracking-[0.15em] uppercase">Metadata</h2>
                    </div>
                    <div className="p-6 grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Category</label>
                            <div className="relative">
                                <select name="category" value={form.category} onChange={handleChange}
                                    className="w-full appearance-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm outline-none pr-8">
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Status</label>
                            <div className="relative">
                                <select name="status" value={form.status} onChange={handleChange}
                                    className="w-full appearance-none bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm outline-none pr-8">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">Tags <span className="text-slate-600 font-normal">(comma-separated)</span></label>
                            <input name="tags" value={form.tags} onChange={handleChange}
                                placeholder="varanasi, travel, spiritual"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors" />
                        </div>
                    </div>
                </div>

                {/* ── SEO ──────────────────────────────────────────────────────── */}
                <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="px-6 py-3.5 border-b border-white/8">
                        <h2 className="text-indigo-400 font-bold text-xs tracking-[0.15em] uppercase">SEO Settings</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">SEO Title</label>
                            <input name="seoTitle" value={form.seoTitle} onChange={handleChange}
                                placeholder="Custom title for search engines"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors" />
                            <p className={`text-xs mt-1 ${form.seoTitle.length > 60 ? 'text-yellow-400' : 'text-slate-600'}`}>{form.seoTitle.length} / 60 chars</p>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">SEO Description</label>
                            <textarea name="seoDescription" rows={2} value={form.seoDescription} onChange={handleChange}
                                placeholder="Meta description for search engines (150–160 chars)"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors resize-none" />
                            <p className={`text-xs mt-1 ${form.seoDescription.length > 160 ? 'text-red-400' : 'text-slate-600'}`}>{form.seoDescription.length} / 160</p>
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 font-semibold mb-1.5 block">SEO Keywords <span className="text-slate-600 font-normal">(comma-separated)</span></label>
                            <input name="seoKeywords" value={form.seoKeywords} onChange={handleChange}
                                placeholder="keyword1, keyword2, keyword3"
                                className="w-full bg-[#0f0f13] border border-white/10 focus:border-indigo-500 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 outline-none transition-colors" />
                        </div>
                    </div>
                </div>

                {/* ── Bottom buttons ──────────────────────────────────────────── */}
                <div className="flex items-center justify-end gap-3 pb-8">
                    <Link to="/admin" className="text-slate-400 hover:text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                        Cancel
                    </Link>
                    <button onClick={() => handleSave('draft')} disabled={saving}
                        className="flex items-center gap-2 text-slate-300 bg-white/8 border border-white/15 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors hover:bg-white/12">
                        <Save size={15} />Save Draft
                    </button>
                    <button onClick={() => handleSave('published')} disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg">
                        {saving ? 'Saving…' : '🚀 Publish Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}
