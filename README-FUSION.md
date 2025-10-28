# ILH Site Build Rules (READ THIS BEFORE GENERATING CODE)

## Tech stack
- Next.js 15 (App Router) with TypeScript
- Tailwind CSS for styling
- MDX files in /content/{lang}/...
- Static + dynamic routes under /app/[lang]/...
- i18n languages: en, hi, ta
- SEO via Next metadata + pre-rendered HTML
- Analytics via tracking helpers (see lib/tracking.ts)

## DO NOT
- ❌ Do NOT create a separate Vite app.
- ❌ Do NOT move pages out of /app/[lang]/.
- ❌ Do NOT duplicate header/footer in pages. Global chrome is in /app/layout.tsx.

## Adding new content (articles, remedies, guides)
1. Add an `.mdx` file under `content/en/guides/` or `content/en/remedies/`.
   - Include frontmatter: `title`, `summary`, `date`, `tags`, `reviewer`, `researchable`.
2. The route will be available at `/en/guides/[slug]` or `/en/remedies/[slug]`.

To localize:
- Create the same slug under `content/hi/...` or `content/ta/...`.
- If localized file is missing, English is fallback.

## Compliance components
Use:
- `<UrgentCareWarning />` for red flags
- `<MedicalDisclaimer />` on every condition/remedy page
- `<SupportiveCareNote />` where we talk about traditional usage
- `<ReviewerAttribution reviewer="Dr. Name" />` to show BHMS/MD(Hom) review

## Marketing CTAs
- `<BuyFromBaholaButton productSlug="arsenicum-album" />`
- `<ConsultBaholaCTA />`
- `<CoursePromo />`
- `<RemedyForCTA />`
- `<ResearchCTA />`
- `<EmailSignup />`

These CTAs connect ILH to Bahola.co, Bahola Clinic, Skolapro/HomeopathyMasters, RemedyFor, and Bahola PBR.

## Quiz
Use `<Quiz />` to route the user:
- Red flag → Consult Bahola
- Mild → RemedyFor / self-care guidance
- Learner → CoursePromo / Skolapro

## Legal / Regulatory
This project must comply with:
- Drugs & Magic Remedies (Objectionable Advertisements) Act, 1954 (IN)
- ASCI Health Advertising Code
- IT Rules 2021
- Consumer Protection E-Commerce Rules
- PDP Bill / GDPR for email capture
- WCAG 2.1 AA accessibility

Never claim guaranteed cures. Always encourage professional consultation for serious / persistent symptoms.
