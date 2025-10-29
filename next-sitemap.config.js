/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/[lang]/api/*'],
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com'}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com'}/hi`,
      hreflang: 'hi',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com'}/ta`,
      hreflang: 'ta',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};

