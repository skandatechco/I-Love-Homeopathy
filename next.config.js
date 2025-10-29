/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed i18n config - App Router uses [lang] dynamic segments instead
  // i18n is handled via middleware.ts
};

// @next/mdx is installed but currently using next-mdx-remote for dynamic content
// Keeping the MDX setup in case we want to add MDX pages in the app directory
// MDX files in /content are loaded as data, not as pages
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ["ts", "tsx"] // Removed md/mdx since we're using .tsx for pages
});
