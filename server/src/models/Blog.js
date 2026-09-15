import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, maxLength: 500, required: true },
    content: { type: String, required: true },
    bannerImage: { type: String, default: '' },
    category: { type: String, default: 'General' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tags: { type: [String], default: [] },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: [String], default: [] },
    published: { type: Boolean, default: false },
}, { timestamps: true });

blogSchema.pre('validate', function (next) {
    if (this.title && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    // Sync published boolean with status string
    if (this.isModified('status')) {
        this.published = this.status === 'published';
    }
    next();
});

export default mongoose.model('Blog', blogSchema);
