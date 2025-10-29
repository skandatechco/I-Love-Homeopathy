# Contentlayer Configuration Note

## Status

⚠️ **Contentlayer is not compatible with Next.js 15** (only supports Next.js 12-13)

However, we've created `contentlayer.config.ts` as:
1. **Documentation** of our content structure
2. **Type reference** for validation
3. **Future compatibility** if Contentlayer adds Next.js 15 support

## Current Solution

We use a **custom MDX system** (`lib/mdx.ts`) that:
- ✅ Works with Next.js 15
- ✅ Supports multilingual content (en, hi, ta)
- ✅ Uses `gray-matter` for frontmatter parsing
- ✅ Uses `next-mdx-remote` for MDX rendering
- ✅ Matches Contentlayer-style patterns

## Content Structure

```
content/
├── en/
│   ├── guides/        → Articles
│   ├── remedies/      → Remedies
│   ├── quizzes/       → Quizzes (future)
│   └── blog/          → Blog posts (future)
├── hi/
│   └── [same structure]
└── ta/
    └── [same structure]
```

## Field Mapping

Our `DocMeta` type matches the Contentlayer schema:

| Contentlayer Field | Our Field | Status |
|-------------------|-----------|--------|
| `title` | `title` | ✅ |
| `slug` | `slug` | ✅ |
| `date` | `date` | ✅ |
| `author` | `author` | ✅ (default: "ILH Editorial Team") |
| `excerpt` | `summary` | ✅ (renamed for clarity) |
| `tags` | `tags` | ✅ |
| `featured` | `featured` | ✅ (available) |
| `image` | `image` | ✅ (available) |
| `readTime` | `readTime` | ✅ (available) |
| `reviewer` | `reviewer` | ✅ (ILH-specific) |
| `researchable` | `researchable` | ✅ (ILH-specific) |
| `lang` | `lang` | ✅ (extracted from path) |

## Usage

Current content loading:
```typescript
import { getDocBySlug, listDocs } from '@/lib/mdx';

// Get a document
const { meta, content } = getDocBySlug('en', 'guides', 'headache');

// List documents
const guides = listDocs('en', 'guides');
```

## Future Migration

If Contentlayer adds Next.js 15 support:
1. Install `contentlayer` and `next-contentlayer`
2. Use the existing `contentlayer.config.ts`
3. Update `next.config.js` to include Contentlayer plugin
4. Replace `lib/mdx.ts` with Contentlayer queries

## Alternatives for Next.js 15

- ✅ **Current custom system** (working)
- ✅ **MDX Bundler** (lightweight alternative)
- ✅ **Content Collections** (Astro-style, can be adapted)
- ⏳ **Contentlayer** (waiting for Next.js 15 support)

