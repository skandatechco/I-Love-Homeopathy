import { getArticleHref, getArticles } from "@/lib/content";
import { isSupportedLang } from "@/lib/i18n";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import { getSectionColour } from "@/lib/section-colours";

const ARTICLE_SECTIONS = [
  "remedy-quiz",
  "remedy-of-the-day",
  "philosophy",
  "clinical-cases",
  "history",
  "remedy-resonance",
  "wellness",
  "book-reviews",
] as const;

const SECTION_LABELS: Record<(typeof ARTICLE_SECTIONS)[number], string> = {
  "remedy-quiz": "Remedy Quiz",
  "remedy-of-the-day": "Remedy of the Day",
  philosophy: "Philosophy",
  "clinical-cases": "Clinical Cases",
  history: "History",
  "remedy-resonance": "Remedy Resonance",
  wellness: "Wellness",
  "book-reviews": "Book Reviews",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  return generateSEO({
    title: "Articles",
    description:
      "Browse all articles from I Love Homeopathy, organized by editorial section.",
    url: `/${lang}/articles`,
    lang,
  });
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";
  const articles = await getArticles(lang);

  const grouped = ARTICLE_SECTIONS.map((section) => ({
    section,
    title: SECTION_LABELS[section],
    articles: articles.filter((article) => article.section === section),
  }));

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Articles",
    description: "All articles grouped by editorial section",
    url: `/${lang}/articles`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto pt-24 pb-8 space-y-10">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Articles
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Explore educational content from our WordPress migration archive and
            editorial library, organized by section for easier discovery.
          </p>
        </div>

        <div className="space-y-10">
          {grouped.map((group) => (
            <section key={group.section} className="space-y-5">
              <div
                className="space-y-2 rounded-2xl px-4 py-4"
                style={{ background: getSectionColour(group.section).bg }}
              >
                <h2
                  className="font-playfair text-3xl font-semibold"
                  style={{ color: getSectionColour(group.section).text }}
                >
                  {group.title}
                </h2>
                <p className="text-sm font-helvetica text-charcoal/70 uppercase tracking-wide">
                  {group.articles.length} article{group.articles.length === 1 ? "" : "s"}
                </p>
              </div>

              {group.articles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.articles.map((article) => (
                    <a
                      key={`${group.section}-${article.slug}`}
                      href={getArticleHref(lang, article.slug, article.section)}
                      className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all hover:border-navy group"
                      style={{ borderLeft: `3px solid ${getSectionColour(article.section).border}` }}
                    >
                      <p
                        className="mb-3 inline-flex w-fit rounded-full px-2 py-1 font-helvetica text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{
                          background: getSectionColour(article.section).bg,
                          color: getSectionColour(article.section).text,
                        }}
                      >
                        {getSectionColour(article.section).label}
                      </p>
                      <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
                          {article.excerpt}
                        </p>
                      )}
                      <p className="font-helvetica text-sage text-xs mb-3">
                        {article.updated || article.date}
                        {article.readTime ? ` · ${article.readTime} min read` : ""}
                      </p>
                      <span className="text-teal font-helvetica text-sm font-medium underline underline-offset-4">
                        Read article →
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-mist p-6">
                  <p className="font-helvetica text-charcoal text-sm leading-relaxed">
                    No articles in this section yet.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
