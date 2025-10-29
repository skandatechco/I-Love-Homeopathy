# Velite Configuration

## Status

✅ **Velite configured and working with Next.js 15**

Velite is a modern content management solution that:
- ✅ Works with Next.js 15 (unlike Contentlayer)
- ✅ Type-safe with Zod schema validation
- ✅ Generates TypeScript types automatically
- ✅ Same schema structure as Contentlayer (easy migration)

## Current Setup

**Hybrid Approach**: 
- ✅ Velite config defined (`velite.config.ts`)
- ✅ Custom MDX loader still in use (`lib/mdx.ts`)
- ✅ Can migrate to full Velite later if needed

This gives us:
- Working site immediately (no breaking changes)
- Type-safe schema definition
- Future migration path to full Velite integration

## Schema Structure

Our Velite config matches the Contentlayer schema:

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Content title |
| `slug` | string | ❌ | auto | URL slug (auto from filename) |
| `date` | string | ❌ | - | Publication date |
| `author` | string | ❌ | "ILH Editorial Team" | Author name |
| `summary` | string | ❌ | - | Short description |
| `tags` | string[] | ❌ | - | Content tags |
| `featured` | boolean | ❌ | false | Featured content flag |
| `image` | string | ❌ | - | Featured image URL |
| `readTime` | number | ❌ | - | Estimated read time |
| `reviewer` | string | ❌ | - | BHMS reviewer (ILH-specific) |
| `researchable` | boolean | ❌ | false | Show PBR CTA (ILH-specific) |

## Collections

1. **Articles** (`**/guides/**/*.mdx`)
   - Guides, educational articles
   - Route: `/{lang}/guides/[slug]`

2. **Remedies** (`**/remedies/**/*.mdx`)
   - Remedy information
   - Route: `/{lang}/remedies/[slug]`
   - Has `researchable` field

3. **Quizzes** (`**/quizzes/**/*.mdx`)
   - Interactive quizzes
   - Route: `/{lang}/quizzes/[slug]`
   - Has `questions` field

4. **Blog Posts** (`**/blog/**/*.mdx`)
   - Blog content
   - Route: `/{lang}/blog/[slug]`

## Multilingual Support

Velite automatically processes files in:
- `content/en/**`
- `content/hi/**`
- `content/ta/**`

Language is extracted from the file path.

## Usage

### Current (Custom MDX)
```typescript
import { getDocBySlug, listDocs } from '@/lib/mdx';

const { meta, content } = getDocBySlug('en', 'guides', 'headache');
const guides = listDocs('en', 'guides');
```

### Future (Full Velite - Optional)
```typescript
import { articles, remedies } from '@/content';

const guides = articles.filter(a => a.lang === 'en');
const remedy = remedies.find(r => r.slug === 'arsenicum-album');
```

## Next Steps (Optional Migration)

To fully integrate Velite:
1. Run `npx velite` to generate types
2. Update `lib/mdx.ts` to use Velite queries
3. Update pages to use Velite-generated types
4. Remove custom MDX loader

For now, the hybrid approach works perfectly!

## Resources

- Velite Docs: https://velite.js.org
- Zod Schema: https://zod.dev
- Next.js Integration: https://velite.js.org/guide/with-nextjs

