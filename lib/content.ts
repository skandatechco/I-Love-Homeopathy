import {
  articles,
  guides,
  quizzes,
  remedies,
  siteCopy,
} from "../.velite";

export type ArticleDoc = (typeof articles)[number];
export type RemedyDoc = (typeof remedies)[number];
export type GuideDoc = (typeof guides)[number];
export type QuizDoc = (typeof quizzes)[number];
export type SiteCopyDoc = (typeof siteCopy)[number];
export type ReviewStatus = ArticleDoc["reviewStatus"];

export interface ContentCollections {
  articles: ArticleDoc[];
  remedies: RemedyDoc[];
  guides: GuideDoc[];
  quizzes: QuizDoc[];
  siteCopy: SiteCopyDoc[];
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

function byTitleAsc<T extends { title: string }>(a: T, b: T) {
  return a.title.localeCompare(b.title);
}

function onlyEnglish<T>(lang: string, docs: T[]): T[] {
  return lang === "en" ? docs : [];
}

function bySlug<T extends { slug: string }>(docs: T[], slug: string): T | null {
  return docs.find((doc) => doc.slug === slug) ?? null;
}

function bySectionAndSlug<T extends { section: string; slug: string }>(
  docs: T[],
  section: string,
  slug: string
): T | null {
  return docs.find((doc) => doc.section === section && doc.slug === slug) ?? null;
}

export function getArticleHref(lang: string, slug: string, section?: string) {
  return section ? `/${lang}/articles/${section}/${slug}` : `/${lang}/articles/${slug}`;
}

export function getGuideHref(lang: string, slug: string) {
  return `/${lang}/guides/${slug}`;
}

export function getRemedyHref(lang: string, slug: string) {
  return `/${lang}/remedies/${slug}`;
}

export function getSiteCopyHref(lang: string, slug: string) {
  return `/${lang}/${slug}`;
}

export async function getArticles(lang: string) {
  return onlyEnglish(
    lang,
    [...articles].filter((article) => article.published).sort(byDateDesc)
  );
}

export async function getArticleBySlug(lang: string, slug: string) {
  const docs = await getArticles(lang);
  return bySlug(docs, slug);
}

export async function getArticleBySectionAndSlug(
  lang: string,
  section: string,
  slug: string
) {
  const docs = await getArticles(lang);
  return bySectionAndSlug(docs, section, slug);
}

export async function getGuides(lang: string) {
  return onlyEnglish(
    lang,
    [...guides].filter((guide) => guide.published).sort(byDateDesc)
  );
}

export async function getGuideBySlug(lang: string, slug: string) {
  const docs = await getGuides(lang);
  return bySlug(docs, slug);
}

export async function getRemedies(lang: string) {
  return onlyEnglish(
    lang,
    [...remedies].filter((remedy) => remedy.published).sort(byTitleAsc)
  );
}

export async function getRemedyBySlug(lang: string, slug: string) {
  const docs = await getRemedies(lang);
  return bySlug(docs, slug);
}

export async function getQuizzes(lang: string) {
  return onlyEnglish(
    lang,
    [...quizzes].filter((quiz) => quiz.published).sort(byDateDesc)
  );
}

export async function getSiteCopyEntries(lang: string) {
  return onlyEnglish(
    lang,
    [...siteCopy].filter((entry) => entry.published).sort(byTitleAsc)
  );
}

export async function getSiteCopyBySlug(lang: string, slug: string) {
  const docs = await getSiteCopyEntries(lang);
  return bySlug(docs, slug);
}
