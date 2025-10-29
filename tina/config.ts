import { defineConfig } from "tinacms";

// TinaCMS config for ILH
export default defineConfig({
  branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
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
              description: "BHMS-certified reviewer who approved this content (e.g., Dr. [Name])",
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
              description: "BHMS-certified reviewer who approved this content (e.g., Dr. [Name])",
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

