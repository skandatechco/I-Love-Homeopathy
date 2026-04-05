import { notFound } from "next/navigation";
import { getArticleHref, getArticles, type ArticleSection } from "@/lib/content";
import { isSupportedLang } from "@/lib/i18n";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import { getSectionColour } from "@/lib/section-colours";

const SECTION_LABELS: Record<ArticleSection, string> = {
  "remedy-quiz": "Remedy Quiz",
  "remedy-of-the-day": "Remedy of the Day",
  "clinical-cases": "Clinical Cases",
  philosophy: "Philosophy",
  history: "History",
  "remedy-resonance": "Remedy Resonance",
  wellness: "Wellness",
  "book-reviews": "Book Reviews",
};

function isArticleSection(value: string): value is ArticleSection {
  return value in SECTION_LABELS;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function articleImage(image?: string | null) {
  return image?.trim() || "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang: langParam, section } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  if (!isArticleSection(section)) {
    return generateSEO({
      title: "Articles",
      description: "Browse editorial sections from I Love Homeopathy.",
      url: `/${lang}/articles`,
      lang,
    });
  }

  return generateSEO({
    title: SECTION_LABELS[section],
    description: `Browse ${SECTION_LABELS[section]} articles from the ILH archive.`,
    url: `/${lang}/articles/${section}`,
    lang,
  });
}

export default async function ArticleSectionPage({
  params,
}: {
  params: Promise<{ lang: string; section: string }>;
}) {
  const { lang: langParam, section } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  if (!isArticleSection(section)) notFound();

  const articles = (await getArticles(lang)).filter(
    (article) => article.section === section
  );

  if (articles.length === 0) notFound();

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: SECTION_LABELS[section],
    description: `${SECTION_LABELS[section]} article collection`,
    url: `/${lang}/articles/${section}`,
  });
  const colour = getSectionColour(section);

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="mx-auto max-w-7xl space-y-8 pt-24 pb-8">
        <div className="font-helvetica text-sm text-muted">
          <a href={`/${lang}`} className="hover:text-forest">
            Home
          </a>{" "}
          &gt;{" "}
          <a href={`/${lang}/articles`} className="hover:text-forest">
            Articles
          </a>{" "}
          &gt; <span className="text-ink">{SECTION_LABELS[section]}</span>
        </div>

        <div
          className="space-y-3 rounded-2xl px-6 py-6"
          style={{
            background: colour.bg,
            borderBottom: `3px solid ${colour.border}`,
          }}
        >
          <h1
            className="font-playfair text-4xl font-semibold leading-tight md:text-5xl"
            style={{ color: colour.text }}
          >
            {SECTION_LABELS[section]}
          </h1>
          <p className="font-georgia text-lg leading-relaxed text-charcoal max-w-3xl">
            Browse curated archive entries from the {SECTION_LABELS[section]} section.
          </p>
          <p
            className="inline-flex w-fit rounded-full px-3 py-1 font-helvetica text-sm uppercase tracking-wide"
            style={{ background: colour.border, color: "#ffffff" }}
          >
            {articles.length.toLocaleString("en-US")} articles
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={getArticleHref(lang, article.slug, article.section)}
              className="group overflow-hidden rounded-2xl border border-mist bg-white shadow-[0_12px_24px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
              style={{ borderLeft: `3px solid ${getSectionColour(article.section).border}` }}
            >
              {articleImage(article.image) ? (
                <img
                  src={articleImage(article.image)}
                  alt={article.title}
                  className="h-44 w-full bg-creamWarm object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-creamWarm font-playfair text-2xl text-muted">
                  ILH
                </div>
              )}

              <div className="space-y-3 p-5">
                <p
                  className="inline-flex w-fit rounded-full px-2 py-1 font-helvetica text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{
                    background: getSectionColour(article.section).bg,
                    color: getSectionColour(article.section).text,
                  }}
                >
                  {SECTION_LABELS[section]}
                </p>
                <h2 className="font-playfair text-2xl font-semibold leading-tight text-navy transition group-hover:text-teal">
                  {article.title || "Untitled article"}
                </h2>
                {article.excerpt ? (
                  <p className="font-helvetica text-sm leading-relaxed text-charcoal">
                    {article.excerpt}
                  </p>
                ) : null}
                <p className="font-helvetica text-xs text-sage">
                  {formatDate(article.updated || article.date)}
                  {article.readTime ? ` · ${article.readTime} min read` : ""}
                </p>
              </div>
            </a>
          ))}
        </div>
      </article>
    </>
  );
}
