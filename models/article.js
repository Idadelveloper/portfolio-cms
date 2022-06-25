const mongoose = require('mongoose');
const { marked } = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
    }

    if (this.date) {
        const date = new Date(this.date)
        this.createdAt = date.toDateString()
    }

    next()
})

articleSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    next();
});

module.exports = mongoose.model('Article', articleSchema)