import { defineConfig } from "tinacms";

const articleCategoryOptions = [
  { label: "Remedy of the Day", value: "Remedy of the Day" },
  { label: "Remedy Quiz", value: "Remedy Quiz" },
  { label: "Philosophy", value: "Philosophy" },
  { label: "Clinical Cases", value: "Clinical Cases" },
  { label: "History", value: "History" },
  { label: "Remedy Resonance", value: "Remedy Resonance" },
  { label: "Wellness", value: "Wellness" },
  { label: "Book Reviews", value: "Book Reviews" },
];

const reviewStatusOptions = [
  { label: "needs-medical-review", value: "needs-medical-review" },
  { label: "approved", value: "approved" },
  { label: "needs-translation-review", value: "needs-translation-review" },
  { label: "draft", value: "draft" },
];

export default defineConfig({
  branch:
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ??
    process.env.VERCEL_GIT_COMMIT_REF ??
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "article",
        label: "Articles",
        path: "content/en/articles",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) =>
              String(values?.title || values?.slug || "article")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            options: articleCategoryOptions,
            ui: {
              component: "select",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
          },
          {
            type: "number",
            name: "readTime",
            label: "Read Time",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "string",
            name: "reviewStatus",
            label: "Review Status",
            options: reviewStatusOptions,
            ui: {
              component: "select",
            },
          },
          {
            type: "string",
            name: "reviewer",
            label: "Reviewer",
          },
          {
            type: "string",
            name: "disclaimer",
            label: "Disclaimer",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "remedy",
        label: "Remedies",
        path: "content/en/remedies",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "date",
            label: "Last Updated Date (YYYY-MM-DD)",
            ui: {
              description: "Format: 2025-10-28",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags (comma-separated)",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "reviewer",
            label: "BHMS Reviewer",
            ui: {
              description:
                "BHMS-certified reviewer who approved this content (e.g., Dr. [Name])",
            },
          },
          {
            type: "boolean",
            name: "researchable",
            label: "Researchable",
            description: "Show PBR (Practice-Based Research) CTA",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
      {
        name: "guide",
        label: "Guides / Articles",
        path: "content/en/guides",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "date",
            label: "Last Updated Date (YYYY-MM-DD)",
            ui: {
              description: "Format: 2025-10-28",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags (comma-separated)",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "reviewer",
            label: "BHMS Reviewer",
            ui: {
              description:
                "BHMS-certified reviewer who approved this content (e.g., Dr. [Name])",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});
