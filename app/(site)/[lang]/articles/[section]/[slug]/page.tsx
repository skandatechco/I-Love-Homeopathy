import { notFound } from "next/navigation";
import GoogleAdUnit from "@/components/ads/GoogleAdUnit";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";
import ConsultBaholaCTA from "@/components/marketing/ConsultBaholaCTA";
import BuyRemediesCTA from "@/components/marketing/BuyRemediesCTA";
import EmailSignup from "@/components/marketing/EmailSignup";
import StructuredData from "@/components/seo/StructuredData";
import {
  getArticleBySlug,
  getArticleHref,
  getArticles,
  type ArticleDoc,
} from "@/lib/content";
import { markdownToHtml } from "@/lib/mdx-render";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import { getSectionColour } from "@/lib/section-colours";

const SECTION_LABELS: Record<string, string> = {
  "book-reviews": "Book Reviews",
  "clinical-cases": "Clinical Cases",
  history: "History",
  philosophy: "Philosophy",
  "remedy-of-the-day": "Remedy of the Day",
  "remedy-quiz": "Remedy Quiz",
  "remedy-resonance": "Remedy Resonance",
  wellness: "Wellness",
};

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function truncateTitle(title?: string, max = 40) {
  if (!title) return "Article";
  return title.length > max ? `${title.slice(0, max - 3)}...` : title;
}

function cleanText(value?: string | null, fallback = "") {
  if (!value) return fallback;
  return value.replace(/\s+/g, " ").trim() || fallback;
}

function articleImage(article: ArticleDoc) {
  return cleanText(article.image, "");
}

function relatedArticles(
  articles: ArticleDoc[],
  currentSection: string,
  currentSlug: string,
  count = 4
) {
  return articles
    .filter(
      (article) =>
        article.section === currentSection && article.slug !== currentSlug
    )
    .slice(0, count);
}

function tagsRow(tags: string[]) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-rule bg-creamWarm px-3 py-1 font-helvetica text-xs text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function RelatedArticleCard({
  lang,
  article,
}: {
  lang: string;
  article: ArticleDoc;
}) {
  const href = getArticleHref(lang, article.slug, article.section);
  const colour = getSectionColour(article.section);
  return (
    <a
      href={href}
      className="overflow-hidden rounded-2xl border border-rule bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderLeft: `3px solid ${colour.border}` }}
    >
      {articleImage(article) ? (
        <img
          src={articleImage(article)}
          alt={article.title}
          className="h-40 w-full bg-creamWarm object-cover"
        />
      ) : (
        <div className="flex h-40 items-center justify-center bg-creamWarm font-playfair text-2xl text-muted">
          ILH
        </div>
      )}
      <div className="space-y-3 p-5">
        <p
          className="inline-flex w-fit rounded-full px-2 py-1 font-helvetica text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ background: colour.bg, color: colour.text }}
        >
          {SECTION_LABELS[article.section] || "Article"}
        </p>
        <h3 className="font-playfair text-xl font-semibold leading-tight text-ink">
          {article.title}
        </h3>
        <p className="font-georgia text-sm leading-6 text-muted">
          {cleanText(article.excerpt, "Read more from the archive.")}
        </p>
      </div>
    </a>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = await getArticleBySlug(lang, slug);
  if (!article) notFound();

  const url = getArticleHref(lang, slug, article.section);

  return generateSEO({
    title: article.title,
    description: article.excerpt,
    url,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated,
    author: article.reviewer || article.author,
    tags: article.tags,
    lang,
  });
}

export default async function SectionArticlePage({
  params,
}: {
  params: Promise<{ lang: string; section: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = await getArticleBySlug(lang, slug);
  if (!article) notFound();

  const html = await markdownToHtml(article.body ?? "");
  const allArticles = await getArticles(lang);
  const sameSectionArticles = relatedArticles(
    allArticles,
    article.section,
    article.slug
  );
  const remedyOfTheDay =
    allArticles.find((item) => item.section === "remedy-of-the-day") ?? null;
  const breadcrumbSection = SECTION_LABELS[article.section] || article.section;
  const url = getArticleHref(lang, slug, article.section);
  const displayDate = formatDate(article.updated || article.date);
  const colour = getSectionColour(article.section);

  const structuredData = generateStructuredData({
    type: "Article",
    title: article.title,
    description: article.excerpt,
    url,
    author: article.reviewer || article.author,
    publishedTime: article.date,
    modifiedTime: article.updated,
    tags: article.tags,
  });

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="space-y-10 pb-10 pt-10">
        <div className="font-helvetica text-sm text-muted">
          <a href={`/${lang}`} className="hover:text-forest">
            Home
          </a>{" "}
          &gt;{" "}
          <a
            href={`/${lang}/articles/${article.section}`}
            className="hover:text-forest"
            style={{ color: colour.text }}
          >
            {breadcrumbSection}
          </a>{" "}
          &gt; <span className="text-ink">{truncateTitle(article.title)}</span>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.9fr)_320px]">
          <article
            className="rounded-2xl bg-white px-6 py-8 shadow-sm md:px-10 md:py-10"
            style={{ borderTop: `3px solid ${colour.border}` }}
          >
            <div className="mx-auto max-w-2xl space-y-6">
              <header className="space-y-4">
                <div
                  className="inline-flex rounded-r-full px-3 py-1 font-helvetica text-xs font-semibold uppercase tracking-[0.12em]"
                  style={{
                    background: colour.bg,
                    color: colour.text,
                    borderLeft: `3px solid ${colour.border}`,
                  }}
                >
                  {colour.label}
                </div>
                <h1 className="font-playfair text-4xl font-semibold leading-tight text-ink md:text-5xl">
                  {article.title}
                </h1>

                <div className="space-y-3 border-b border-rule pb-4 font-helvetica text-sm text-muted">
                  <div>
                    By {cleanText(article.author, "ILH Editorial")}
                    {article.reviewer ? (
                      <>
                        {" "}
                        | Medically Reviewed by {article.reviewer}
                      </>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {displayDate ? <span>{displayDate}</span> : null}
                    {article.readTime ? <span>· {article.readTime} min read</span> : null}
                  </div>
                  {article.reviewer ? (
                    <div className="inline-flex rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                      BHMS Reviewed
                    </div>
                  ) : null}
                </div>
              </header>

              {articleImage(article) ? (
                <img
                  src={articleImage(article)}
                  alt={article.title}
                  className="w-full rounded-2xl bg-creamWarm object-cover shadow-sm"
                />
              ) : null}

              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5">
                <MedicalDisclaimer />
              </div>

              {article.excerpt ? (
                <p className="font-georgia text-lg leading-relaxed text-ink">
                  {article.excerpt}
                </p>
              ) : null}

              <div className="hidden md:block">
                <GoogleAdUnit
                  slot={process.env.NEXT_PUBLIC_AD_SLOT_INCONTENT || ""}
                  format="leaderboard"
                  className="mx-auto max-w-[728px]"
                />
              </div>
              <div className="md:hidden">
                <GoogleAdUnit
                  slot={process.env.NEXT_PUBLIC_AD_SLOT_INCONTENT || ""}
                  format="responsive"
                />
              </div>

              <section className="prose prose-lg max-w-none font-georgia text-base leading-relaxed text-ink">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </section>

              <UrgentCareWarning
                redFlags={[
                  "Severe symptoms should be assessed by a qualified clinician",
                  "Breathing difficulty, chest pain, or neurological symptoms need urgent care",
                  "Do not delay emergency treatment while reading educational content",
                ]}
              />

              <ReviewerAttribution reviewer={article.reviewer} />
              <MedicalDisclaimer />

              {tagsRow(article.tags)}

              <div className="grid gap-4 md:grid-cols-2">
                <ConsultBaholaCTA />
                <BuyRemediesCTA />
              </div>
            </div>
          </article>

          <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
            <GoogleAdUnit
              slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || ""}
              format="rectangle"
              className="hidden xl:flex"
            />
            <GoogleAdUnit
              slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || ""}
              format="responsive"
              className="xl:hidden"
            />

            {remedyOfTheDay ? (
              <div className="rounded-2xl bg-forest p-6 text-white shadow-sm">
                <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.18em] text-goldLight">
                  Remedy of the Day
                </p>
                <h2 className="mt-3 font-playfair text-3xl font-semibold leading-tight text-white">
                  {remedyOfTheDay.title}
                </h2>
                <p className="mt-3 font-georgia text-sm leading-6 text-white/80">
                  {cleanText(remedyOfTheDay.excerpt, "Read today&apos;s featured remedy.")}
                </p>
                <a
                  href={getArticleHref(
                    lang,
                    remedyOfTheDay.slug,
                    remedyOfTheDay.section
                  )}
                  className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-goldLight"
                >
                  Read more →
                </a>
              </div>
            ) : null}

            <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
              <h3 className="font-playfair text-2xl font-semibold text-ink">
                Related Articles
              </h3>
              <div className="mt-5 space-y-4">
                {sameSectionArticles.map((related) => (
                  <a
                    key={related.slug}
                    href={getArticleHref(lang, related.slug, related.section)}
                    className="block border-b border-rule pb-4 last:border-b-0 last:pb-0"
                    style={{
                      borderLeft: `3px solid ${getSectionColour(related.section).border}`,
                      paddingLeft: "10px",
                    }}
                  >
                    <p
                      className="inline-flex w-fit rounded-full px-2 py-1 font-helvetica text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{
                        background: getSectionColour(related.section).bg,
                        color: getSectionColour(related.section).text,
                      }}
                    >
                      {SECTION_LABELS[related.section] || "Article"}
                    </p>
                    <h4 className="mt-2 font-playfair text-lg font-semibold leading-tight text-ink">
                      {related.title}
                    </h4>
                    <p className="mt-2 font-georgia text-sm leading-6 text-muted">
                      {cleanText(related.excerpt, "Read the full article.")}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div className="xl:sticky xl:top-[420px]">
              <EmailSignup />
            </div>
          </aside>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-rule pb-3">
            <h2 className="font-playfair text-3xl font-semibold text-ink">
              Related Articles
            </h2>
            <a
              href={`/${lang}/articles/${article.section}`}
              className="font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-gold"
            >
              View all →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
            {sameSectionArticles.map((related) => (
              <RelatedArticleCard key={`grid-${related.slug}`} lang={lang} article={related} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
