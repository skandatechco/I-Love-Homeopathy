import { defineCollection, defineConfig, s } from 'velite'

// Shared fields schema (matches Contentlayer structure)
const sharedFields = {
  title: s.string(), // Required
  slug: s.string().optional(), // Auto-generated from filename if not provided
  date: s.string().optional(), // Date as string
  author: s.string().default('ILH Editorial Team'),
  summary: s.string().optional(), // Also used as 'excerpt'
  tags: s.array(s.string()).optional(),
  featured: s.boolean().default(false),
  image: s.string().optional(),
  readTime: s.number().optional(),
  reviewer: s.string().optional(), // BHMS reviewer (ILH-specific)
  researchable: s.boolean().default(false), // Show PBR CTA (ILH-specific)
}

// Article / Guide collection
const articles = defineCollection({
  name: 'Article',
  pattern: '**/guides/**/*.mdx',
  schema: s.object({
    ...sharedFields,
    // Article-specific fields can be added here
  }),
})

// Remedy collection
const remedies = defineCollection({
  name: 'Remedy',
  pattern: '**/remedies/**/*.mdx',
  schema: s.object({
    ...sharedFields,
    researchable: s.boolean().default(false),
  }),
})

// Quiz collection
const quizzes = defineCollection({
  name: 'Quiz',
  pattern: '**/quizzes/**/*.mdx',
  schema: s.object({
    ...sharedFields,
    questions: s.array(s.string()).optional(),
  }),
})

// Blog post collection
const blogPosts = defineCollection({
  name: 'BlogPost',
  pattern: '**/blog/**/*.mdx',
  schema: s.object({
    ...sharedFields,
  }),
})

export default defineConfig({
  collections: { articles, remedies, quizzes, blogPosts },
})

