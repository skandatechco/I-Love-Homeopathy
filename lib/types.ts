// Content metadata types aligned with Contentlayer schema
export type DocMeta = {
  title: string;
  slug: string;
  date?: string;
  author?: string;
  summary?: string; // Also used as 'excerpt' in some contexts
  tags?: string[];
  featured?: boolean;
  image?: string;
  readTime?: number;
  reviewer?: string; // BHMS reviewer (ILH-specific)
  researchable?: boolean; // Show PBR CTA (ILH-specific)
  lang: string;
};

// Content type discriminators
export type ContentType = 'article' | 'remedy' | 'quiz' | 'blog';

export type ArticleMeta = DocMeta & {
  type?: 'article';
};

export type RemedyMeta = DocMeta & {
  type?: 'remedy';
  researchable?: boolean;
};

export type QuizMeta = DocMeta & {
  type?: 'quiz';
  questions?: string[];
};
