import { defineCollection, defineConfig, s } from "velite";

const ARTICLE_SECTIONS = [
  "remedy-quiz",
  "remedy-of-the-day",
  "philosophy",
  "clinical-cases",
  "history",
  "remedy-resonance",
  "wellness",
  "book-reviews",
] as const;

type ArticleSection = (typeof ARTICLE_SECTIONS)[number];

const meta = {
  title: s.string(),
  slug: s.string(),
  date: s.isodate(),
  updated: s.isodate().optional(),
  excerpt: s.string().optional(),
  author: s.string().optional(),
  reviewer: s.string().optional(),
  tags: s.array(s.string()).default([]),
  categories: s.array(s.string()).default([]),
  image: s.string().optional(),
  featured: s.boolean().default(false),
  published: s.boolean().default(true),
  readTime: s.number().optional(),
  autoTranslated: s.boolean().default(false),
  reviewStatus: s
    .enum([
      "approved",
      "needs-medical-review",
      "needs-translation-review",
      "draft",
    ])
    .default("draft"),
  disclaimer: s.string().optional(),
  body: s.raw(),
};

function getArticleSection(sourcePath: string, categories: string[]): ArticleSection {
  const normalized = sourcePath.replace(/\\/g, "/");
  const relative = normalized.replace(/^en\/articles\//, "");
  const segments = relative.split("/").filter(Boolean);
  const nestedSection = segments.length > 1 ? segments[0] : undefined;

  if (nestedSection && ARTICLE_SECTIONS.includes(nestedSection as ArticleSection)) {
    return nestedSection as ArticleSection;
  }

  const categorySection = categories.find((category) =>
    ARTICLE_SECTIONS.includes(category as ArticleSection)
  );

  if (categorySection) {
    return categorySection as ArticleSection;
  }

  return "philosophy";
}

function withReviewGuard<T extends Record<string, unknown>>(schema: any) {
  return schema.superRefine((data: T & { reviewStatus: string; reviewer?: string }, ctx: any) => {
    if (data.reviewStatus === "approved" && !data.reviewer) {
      ctx.addIssue({
        code: "custom",
        path: ["reviewer"],
        message: "reviewer is required when reviewStatus is approved",
      });
    }
  });
}

const articles = defineCollection({
  name: "Article",
  pattern: "en/articles/**/*.mdx",
  schema: withReviewGuard(
    s.object({
      ...meta,
      sourcePath: s.path(),
    })
  ).transform((data: any) => ({
    ...(() => {
      const section = getArticleSection(data.sourcePath, data.categories);
      return {
        section,
        permalink: `/en/articles/${section}/${data.slug}`,
      };
    })(),
    ...data,
  })),
});

const remedies = defineCollection({
  name: "Remedy",
  pattern: "en/remedies/**/*.mdx",
  schema: withReviewGuard(
    s.object({
      ...meta,
      latinName: s.string().optional(),
      kingdom: s
        .enum(["plant", "mineral", "animal", "nosode", "other"])
        .optional(),
      keynotes: s.array(s.string()).default([]),
      researchable: s.boolean().default(false),
      potencies: s.array(s.string()).default([]),
      shopUrl: s.string().optional(),
    })
  ).transform((data: any) => ({
    ...data,
    permalink: `/en/remedies/${data.slug}`,
  })),
});

const guides = defineCollection({
  name: "Guide",
  pattern: "en/guides/**/*.mdx",
  schema: withReviewGuard(
    s.object({
      ...meta,
      condition: s.string().optional(),
      remediesDiscussed: s.array(s.string()).default([]),
    })
  ).transform((data: any) => ({
    ...data,
    permalink: `/en/guides/${data.slug}`,
  })),
});

const quizzes = defineCollection({
  name: "Quiz",
  pattern: "en/quizzes/**/*.mdx",
  schema: withReviewGuard(
    s.object({
      ...meta,
      difficulty: s
        .enum(["beginner", "intermediate", "advanced"])
        .default("beginner"),
    })
  ).transform((data: any) => ({
    ...data,
    permalink: `/en/quizzes/${data.slug}`,
  })),
});

const siteCopy = defineCollection({
  name: "SiteCopy",
  pattern: "en/site-copy/**/*.mdx",
  schema: withReviewGuard(
    s.object({
      ...meta,
    })
  ).transform((data: any) => ({
    ...data,
    permalink: `/en/${data.slug}`,
  })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    articles,
    remedies,
    guides,
    quizzes,
    siteCopy,
  },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
