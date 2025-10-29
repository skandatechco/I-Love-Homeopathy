/**
 * Contentlayer Configuration
 * 
 * ⚠️ IMPORTANT: Contentlayer doesn't support Next.js 15 (only Next.js 12-13)
 * 
 * This file defines our content structure but is NOT currently active.
 * We use a custom MDX system (lib/mdx.ts) that implements similar patterns.
 * 
 * This config serves as:
 * 1. Documentation of our content structure
 * 2. Type reference for validation
 * 3. Future migration path if Contentlayer adds Next.js 15 support
 * 
 * See CONTENTLAYER-NOTE.md for details.
 */

// Type-only imports - these will error if contentlayer is not installed
// That's expected! This file is documentation only.
// 
// To use this file:
// 1. Wait for Contentlayer Next.js 15 support, OR
// 2. Install contentlayer: npm install contentlayer next-contentlayer --legacy-peer-deps
//
// @ts-nocheck - This file is for reference only, not active code

// Shared fields for all content types
const SharedFields = {
  title: { type: 'string', required: true },
  slug: { type: 'string', required: true },
  date: { type: 'date', required: false },
  author: { type: 'string', default: 'ILH Editorial Team' },
  summary: { type: 'string', required: false }, // Renamed from 'excerpt' to match current usage
  tags: { type: 'list', of: { type: 'string' }, required: false },
  featured: { type: 'boolean', default: false },
  image: { type: 'string', required: false },
  readTime: { type: 'number', required: false },
  reviewer: { type: 'string', required: false }, // BHMS reviewer (specific to ILH)
  researchable: { type: 'boolean', default: false }, // Show PBR CTA (specific to ILH)
  lang: { type: 'string', required: true }, // Language: en, hi, ta
}

// Article / Guide content type
const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/guides/**/*.mdx`, // Matches content/en/guides, content/hi/guides, etc.
  fields: {
    ...SharedFields,
    // Article-specific fields can be added here
  },
  computedFields: {
    url: { 
      type: 'string', 
      resolve: (doc) => {
        const lang = doc._raw.flattenedPath.split('/')[0]; // Extract lang from path
        return `/${lang}/guides/${doc.slug}`;
      }
    },
    lang: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.flattenedPath.split('/')[0]; // Extract lang from path
      }
    },
  },
}))

// Remedy content type
const Remedy = defineDocumentType(() => ({
  name: 'Remedy',
  filePathPattern: `**/remedies/**/*.mdx`, // Matches content/en/remedies, content/hi/remedies, etc.
  fields: {
    ...SharedFields,
    // Remedy-specific fields
    researchable: { type: 'boolean', default: false }, // Show research CTA
  },
  computedFields: {
    url: { 
      type: 'string', 
      resolve: (doc) => {
        const lang = doc._raw.flattenedPath.split('/')[0];
        return `/${lang}/remedies/${doc.slug}`;
      }
    },
    lang: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.flattenedPath.split('/')[0];
      }
    },
  },
}))

// Quiz content type (for future use)
const Quiz = defineDocumentType(() => ({
  name: 'Quiz',
  filePathPattern: `**/quizzes/**/*.mdx`,
  fields: {
    ...SharedFields,
    // Quiz-specific fields can be added here
    questions: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    url: { 
      type: 'string', 
      resolve: (doc) => {
        const lang = doc._raw.flattenedPath.split('/')[0];
        return `/${lang}/quizzes/${doc.slug}`;
      }
    },
    lang: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.flattenedPath.split('/')[0];
      }
    },
  },
}))

// Blog post content type (for blog section)
const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/blog/**/*.mdx`,
  fields: {
    ...SharedFields,
  },
  computedFields: {
    url: { 
      type: 'string', 
      resolve: (doc) => {
        const lang = doc._raw.flattenedPath.split('/')[0];
        return `/${lang}/blog/${doc.slug}`;
      }
    },
    lang: {
      type: 'string',
      resolve: (doc) => {
        return doc._raw.flattenedPath.split('/')[0];
      }
    },
  },
}))

// Export configuration
// NOTE: This currently won't work with Next.js 15
// We use lib/mdx.ts for actual content loading
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, Remedy, Quiz, BlogPost],
})

