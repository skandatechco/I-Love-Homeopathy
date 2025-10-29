import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com';
const siteName = 'I ❤️ Homeopathy';
const defaultDescription = 'Learn Responsibly. Consult Confidently. Contribute to Research.';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  lang?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateSEO({
  title,
  description = defaultDescription,
  image = `${siteUrl}/og-image.jpg`,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'ILH Editorial Team',
  tags = [],
  lang = 'en',
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonical = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: {
        'en': `${siteUrl}/en`,
        'hi': `${siteUrl}/hi`,
        'ta': `${siteUrl}/ta`,
        'x-default': `${siteUrl}/en`,
      },
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: lang,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(tags.length && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@bahola',
    },
    // AI crawler support
    other: {
      'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      'gptbot': 'index, follow',
      'ChatGPT-User': 'index, follow',
      'anthropic-ai': 'index, follow',
      'CCBot': 'index, follow',
      'PerplexityBot': 'index, follow',
      'Applebot-Extended': 'index, follow',
    },
  };
}

// Generate JSON-LD structured data
export function generateStructuredData({
  type = 'WebSite',
  title,
  description,
  url,
  image,
  author,
  publishedTime,
  modifiedTime,
  tags,
}: {
  type?: 'WebSite' | 'Article' | 'Organization';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://i-love-homeopathy.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.jpg`;

  const base = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Bahola Labs',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
        sameAs: [
          'https://bahola.co',
          'https://www.linkedin.com/company/bahola',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'I ❤️ Homeopathy',
        description: description || defaultDescription,
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        inLanguage: ['en', 'hi', 'ta'],
      },
    ],
  };

  if (type === 'Article' && title) {
    const article: any = {
      '@type': 'Article',
      '@id': `${fullUrl}#article`,
      headline: title,
      description,
      url: fullUrl,
      image: imageUrl,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Person',
        name: author || 'ILH Editorial Team',
      },
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      inLanguage: ['en'],
    };
    
    if (tags && tags.length) {
      article.keywords = tags.join(', ');
    }
    
    base['@graph'].push(article);
  }

  return base;
}

