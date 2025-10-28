/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true
  },
  // basic i18n routing: we'll do /en /hi /ta
  i18n: {
    locales: ["en", "hi", "ta"],
    defaultLocale: "en"
  }
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  ...nextConfig,
  pageExtensions: ["ts", "tsx", "md", "mdx"]
});
