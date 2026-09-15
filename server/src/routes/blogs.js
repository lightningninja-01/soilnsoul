import express from 'express';
import Blog from '../models/Blog.js';
import jwt from 'jsonwebtoken';
import { cacheGet, cacheSet, cacheClear } from '../cache.js';

const router = express.Router();

const CACHE_KEY_ALL = 'blogs:all';
const blogSlugKey = (slug) => `blogs:slug:${slug}`;

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// ── GET all blogs (cached) ───────────────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const cached = cacheGet(CACHE_KEY_ALL);
        if (cached) {
            return res.setHeader('X-Cache', 'HIT').json({ success: true, blogs: cached });
        }

        const blogs = await Blog.find().sort({ createdAt: -1 });
        cacheSet(CACHE_KEY_ALL, blogs);
        res.setHeader('X-Cache', 'MISS').json({ success: true, blogs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── GET blog by slug (cached) ────────────────────────────────────────────────
router.get('/:slug', async (req, res) => {
    try {
        const key = blogSlugKey(req.params.slug);
        const cached = cacheGet(key);
        if (cached) {
            return res.setHeader('X-Cache', 'HIT').json({ success: true, blog: cached });
        }

        const blog = await Blog.findOne({ slug: req.params.slug });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        cacheSet(key, blog);
        res.setHeader('X-Cache', 'MISS').json({ success: true, blog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ── POST create blog → bust cache ────────────────────────────────────────────
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const data = { ...req.body };
        if (typeof data.seoKeywords === 'string') {
            data.seoKeywords = data.seoKeywords.split(',').map(s => s.trim()).filter(Boolean);
        }
        const blog = new Blog(data);
        await blog.save();

        // Invalidate all-blogs cache so next request rebuilds it
        cacheClear();

        res.status(201).json({ success: true, blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ── PUT update blog → bust cache ─────────────────────────────────────────────
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const data = { ...req.body };
        if (typeof data.seoKeywords === 'string') {
            data.seoKeywords = data.seoKeywords.split(',').map(s => s.trim()).filter(Boolean);
        }
        if (data.title && !data.slug) {
            data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // Invalidate both caches
        cacheClear();

        res.json({ success: true, blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ── DELETE blog → bust cache ─────────────────────────────────────────────────
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        cacheClear();

        res.json({ success: true, message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
