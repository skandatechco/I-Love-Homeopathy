const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://i-love-homeopathy.com";

const locales = ["en", "hi", "ta"];
const articleSections = require("./.velite/articles.json");

function buildAlternateRefs(path) {
  const match = path.match(/^\/(en|hi|ta)(\/.*)?$/);
  const suffix = match ? match[2] || "" : path;

  return locales.map((lang) => ({
    hreflang: lang,
    href: new URL(`/${lang}${suffix}`, siteUrl).toString(),
    hrefIsAbsolute: true,
  }));
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/[lang]/api/*", "/admin", "/admin/*", "/admin/**"],
  transform: async (config, path) => {
    if (
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.includes("/admin/")
    ) {
      return null;
    }

    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/en/articles" ? 0.8 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: buildAlternateRefs(path),
    };
  },
  additionalPaths: async (config) => {
    const paths = locales.map((lang) => ({
      loc: `/${lang}/articles`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
      alternateRefs: buildAlternateRefs(`/${lang}/articles`),
    }));

    articleSections.forEach((article) => {
      const path = article.permalink;
      paths.push({
        loc: path,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: article.updated || article.date || new Date().toISOString(),
        alternateRefs: buildAlternateRefs(path),
      });
    });

    return paths;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
    ],
  },
};
