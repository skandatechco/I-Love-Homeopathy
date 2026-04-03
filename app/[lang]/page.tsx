import EmailSignup from "@/components/marketing/EmailSignup";
import StructuredData from "@/components/seo/StructuredData";
import { Card } from "@/components/ui/Card";
import {
  type ArticleDoc,
  getArticleHref,
  getArticles,
} from "@/lib/content";
import { isSupportedLang } from "@/lib/i18n";
import { generateSEO, generateStructuredData } from "@/lib/seo";

const SECTION_LABELS: Record<string, string> = {
  "book-reviews": "Book Reviews",
  "clinical-cases": "Clinical Cases",
  history: "History of Homeopathy",
  philosophy: "Philosophy of Homeopathy",
  "remedy-of-the-day": "Remedy of the Day",
  "remedy-quiz": "Materia Medica Quiz",
  "remedy-resonance": "Remedy Resonance",
  wellness: "Living Well",
};

function cleanText(value?: string | null, fallback = "Explore the editorial archive.") {
  if (!value) return fallback;
  const compact = value.replace(/\s+/g, " ").trim();
  return compact || fallback;
}

function displayTitle(article: ArticleDoc) {
  const title = cleanText(article.title, "");
  if (title) return title;

  const excerpt = cleanText(article.excerpt, "");
  if (!excerpt) return "Untitled feature";

  return excerpt.length > 72 ? `${excerpt.slice(0, 69)}...` : excerpt;
}

function displayExcerpt(article: ArticleDoc, fallback: string) {
  const excerpt = cleanText(article.excerpt, "");
  if (excerpt) {
    return excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt;
  }

  return fallback;
}

function storyHref(lang: string, article: ArticleDoc) {
  return getArticleHref(lang, article.slug, article.section);
}

function storyDate(article: ArticleDoc) {
  const source = article.updated || article.date;
  if (!source) return null;

  const date = new Date(source);
  if (Number.isNaN(date.valueOf())) return source;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function pickStories(
  articles: ArticleDoc[],
  count: number,
  predicate: (article: ArticleDoc) => boolean,
  excluded = new Set<string>()
) {
  const selected: ArticleDoc[] = [];

  for (const article of articles) {
    if (selected.length >= count) break;
    if (excluded.has(article.slug)) continue;
    if (!predicate(article)) continue;
    if (!cleanText(article.title, "") && !cleanText(article.excerpt, "")) continue;

    selected.push(article);
    excluded.add(article.slug);
  }

  return selected;
}

function SectionList({
  contentLang,
  title,
  eyebrow,
  intro,
  stories,
}: {
  contentLang: string;
  title: string;
  eyebrow: string;
  intro: string;
  stories: ArticleDoc[];
}) {
  return (
    <Card className="h-full overflow-hidden p-0">
      <div className="border-b border-mist bg-ivory/70 px-6 py-4">
        <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-playfair text-2xl font-semibold text-navy md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl font-georgia text-base leading-relaxed text-charcoal/75">
          {intro}
        </p>
      </div>

      <div className="grid gap-0">
        {stories.map((story, index) => (
          <a
            key={story.slug}
            href={storyHref(contentLang, story)}
            className={`group block px-6 py-5 transition hover:bg-ivory/60 ${
              index < stories.length - 1 ? "border-b border-mist" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                  {SECTION_LABELS[story.section] || "Feature"}
                </p>
                <h3 className="mt-2 font-playfair text-xl font-semibold leading-tight text-navy transition group-hover:text-teal">
                  {displayTitle(story)}
                </h3>
                <p className="mt-2 font-helvetica text-sm leading-6 text-charcoal/80">
                  {displayExcerpt(
                    story,
                    "Read the full feature from the ILH editorial archive."
                  )}
                </p>
              </div>
              <span className="pt-1 font-helvetica text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {storyDate(story) || "Archive"}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  return generateSEO({
    title: "The World's Journal of Classical Medicine",
    description:
      "Browse ILH's editorial front page for homeopathy philosophy, clinical cases, remedy resonance, wellness writing, and BHMS-reviewed educational features.",
    url: `/${lang}`,
    lang,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  const localizedArticles = await getArticles(lang);
  const contentLang = localizedArticles.length > 0 ? lang : "en";
  const articles =
    localizedArticles.length > 0 ? localizedArticles : await getArticles("en");

  const usedSlugs = new Set<string>();
  const featuredStory =
    articles.find(
      (article) =>
        article.slug === "dynamic-medicine-the-world-according-to-homeopathy"
    ) ||
    articles.find((article) => article.slug === "understanding-homeopathy") ||
    articles.find((article) => cleanText(article.title, "") !== "") ||
    articles[0];

  if (featuredStory) {
    usedSlugs.add(featuredStory.slug);
  }

  const heroCompanions = pickStories(
    articles,
    3,
    (article) =>
      article.section === "philosophy" || article.section === "book-reviews",
    usedSlugs
  );

  const remedyOfDay = pickStories(
    articles,
    1,
    (article) => article.section === "remedy-of-the-day",
    usedSlugs
  )[0];

  const quizFeature = pickStories(
    articles,
    1,
    (article) => article.section === "remedy-quiz",
    usedSlugs
  )[0];

  const editorialDigest = pickStories(articles, 4, () => true, usedSlugs);

  const clinicalCases = pickStories(
    articles,
    3,
    (article) => article.section === "clinical-cases"
  );

  const philosophyStories = pickStories(
    articles,
    3,
    (article) => article.section === "philosophy"
  );

  const historyFeature = pickStories(
    articles,
    1,
    (article) => article.section === "history"
  )[0];

  const resonanceStories = pickStories(
    articles,
    4,
    (article) => article.section === "remedy-resonance"
  );

  const wellnessStories = pickStories(
    articles,
    3,
    (article) => article.section === "wellness"
  );

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I Love Homeopathy",
    description:
      "Magazine-style front page for ILH's philosophy, clinical cases, remedy resonance, and wellness archive.",
    url: `/${lang}`,
  });

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="space-y-12 pb-12 pt-24 md:space-y-16 md:pt-28">
        <section className="space-y-6">
          <div className="border-y border-mist bg-ivory/80 px-4 py-3 font-helvetica text-[11px] uppercase tracking-[0.3em] text-charcoal/70">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <span className="font-semibold text-gold">
                The World's Journal of Classical Medicine
              </span>
              <span>Editorial front page</span>
            </div>
          </div>

          {contentLang !== lang && (
            <div className="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 font-helvetica text-sm leading-6 text-charcoal">
              Showing the English editorial archive while translated homepage content
              is prepared for this edition.
            </div>
          )}

          {featuredStory && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_360px]">
              <Card className="overflow-hidden p-0">
                <div className="border-b border-mist bg-gradient-to-br from-ivory via-white to-ivory/70 px-6 py-8 md:px-8 md:py-10">
                  <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                    {SECTION_LABELS[featuredStory.section] || "Lead Story"}
                  </p>
                  <h1 className="mt-4 max-w-4xl font-playfair text-4xl font-semibold leading-tight text-navy md:text-6xl">
                    {displayTitle(featuredStory)}
                  </h1>
                  <p className="mt-5 max-w-3xl font-georgia text-lg leading-8 text-charcoal/85 md:text-[1.35rem]">
                    {displayExcerpt(
                      featuredStory,
                      "Read the lead feature from the ILH editorial archive."
                    )}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-helvetica text-xs uppercase tracking-[0.24em] text-charcoal/60">
                    <span>{storyDate(featuredStory) || "Editorial Archive"}</span>
                    {featuredStory.readTime ? (
                      <span>{featuredStory.readTime} min read</span>
                    ) : null}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={storyHref(contentLang, featuredStory)}
                      className="inline-flex items-center justify-center rounded-xl bg-navy px-5 py-3 font-helvetica text-sm font-semibold text-cream transition hover:bg-teal hover:text-navy"
                    >
                      Read the lead story
                    </a>
                    <a
                      href={`/${contentLang}/articles`}
                      className="inline-flex items-center justify-center rounded-xl border border-navy px-5 py-3 font-helvetica text-sm font-semibold text-navy transition hover:bg-navy hover:text-cream"
                    >
                      Browse the archive
                    </a>
                  </div>
                </div>

                <div className="grid gap-0 border-t border-mist md:grid-cols-3">
                  {heroCompanions.map((story, index) => (
                    <a
                      key={story.slug}
                      href={storyHref(contentLang, story)}
                      className={`group block px-6 py-5 transition hover:bg-ivory/60 ${
                        index < heroCompanions.length - 1
                          ? "border-b border-mist md:border-b-0 md:border-r"
                          : ""
                      }`}
                    >
                      <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                        {SECTION_LABELS[story.section] || "Feature"}
                      </p>
                      <h2 className="mt-2 font-playfair text-2xl font-semibold leading-tight text-navy transition group-hover:text-teal">
                        {displayTitle(story)}
                      </h2>
                      <p className="mt-2 font-helvetica text-sm leading-6 text-charcoal/80">
                        {displayExcerpt(
                          story,
                          "Open this companion feature from the editorial front page."
                        )}
                      </p>
                    </a>
                  ))}
                </div>
              </Card>

              <div className="space-y-6">
                {remedyOfDay ? (
                  <Card className="overflow-hidden p-0">
                    <div className="border-b border-mist bg-navy px-6 py-4 text-cream">
                      <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                        Remedy of the Day
                      </p>
                    </div>
                    <div className="space-y-4 px-6 py-6">
                      <h2 className="font-playfair text-2xl font-semibold text-navy">
                        {displayTitle(remedyOfDay)}
                      </h2>
                      <p className="font-helvetica text-sm leading-6 text-charcoal/80">
                        {displayExcerpt(
                          remedyOfDay,
                          "Read today's remedy feature from the ILH archive."
                        )}
                      </p>
                      <a
                        href={storyHref(contentLang, remedyOfDay)}
                        className="font-helvetica text-sm font-semibold text-teal underline-offset-4 transition hover:text-sage hover:underline"
                      >
                        Open remedy feature
                      </a>
                    </div>
                  </Card>
                ) : null}

                <Card className="overflow-hidden p-0">
                  <div className="border-b border-mist bg-ivory/70 px-6 py-4">
                    <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                      From the archive
                    </p>
                  </div>
                  <div className="divide-y divide-mist">
                    {editorialDigest.map((story) => (
                      <a
                        key={story.slug}
                        href={storyHref(contentLang, story)}
                        className="group block px-6 py-4 transition hover:bg-ivory/60"
                      >
                        <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                          {SECTION_LABELS[story.section] || "Feature"}
                        </p>
                        <h3 className="mt-2 font-playfair text-xl font-semibold leading-tight text-navy transition group-hover:text-teal">
                          {displayTitle(story)}
                        </h3>
                      </a>
                    ))}
                  </div>
                </Card>

                {quizFeature ? (
                  <Card className="bg-gradient-to-br from-teal/10 via-white to-gold/10">
                    <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                      Test your materia medica
                    </p>
                    <h2 className="mt-3 font-playfair text-2xl font-semibold text-navy">
                      {displayTitle(quizFeature)}
                    </h2>
                    <p className="mt-3 font-helvetica text-sm leading-6 text-charcoal/80">
                      {displayExcerpt(
                        quizFeature,
                        "Challenge yourself with a remedy quiz from the editorial archive."
                      )}
                    </p>
                    <a
                      href={storyHref(contentLang, quizFeature)}
                      className="mt-4 inline-flex font-helvetica text-sm font-semibold text-teal underline-offset-4 transition hover:text-sage hover:underline"
                    >
                      Take the challenge
                    </a>
                  </Card>
                ) : null}

                <EmailSignup />
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <SectionList
            contentLang={contentLang}
            eyebrow="Section module"
            title="Clinical Cases"
            intro="Practice stories, observations, and case-led learning from the ILH archive."
            stories={clinicalCases}
          />
          <SectionList
            contentLang={contentLang}
            eyebrow="Section module"
            title="Philosophy of Homeopathy"
            intro="Core principles, Organon thinking, and modern interpretive essays."
            stories={philosophyStories}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-mist bg-ivory/70 px-6 py-4">
              <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Archive focus
              </p>
              <h2 className="mt-2 font-playfair text-2xl font-semibold text-navy md:text-3xl">
                History of Homeopathy
              </h2>
            </div>

            {historyFeature ? (
              <div className="space-y-4 px-6 py-6">
                <h3 className="font-playfair text-3xl font-semibold leading-tight text-navy">
                  {displayTitle(historyFeature)}
                </h3>
                <p className="font-georgia text-base leading-7 text-charcoal/80">
                  {displayExcerpt(
                    historyFeature,
                    "Discover one of the defining stories in the history of homeopathy."
                  )}
                </p>
                <a
                  href={storyHref(contentLang, historyFeature)}
                  className="inline-flex font-helvetica text-sm font-semibold text-teal underline-offset-4 transition hover:text-sage hover:underline"
                >
                  Read the history feature
                </a>
              </div>
            ) : (
              <div className="px-6 py-6 font-helvetica text-sm text-charcoal/75">
                History features will appear here as the archive is curated.
              </div>
            )}
          </Card>

          <Card className="overflow-hidden p-0">
            <div className="border-b border-mist bg-ivory/70 px-6 py-4">
              <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Section module
              </p>
              <h2 className="mt-2 font-playfair text-2xl font-semibold text-navy md:text-3xl">
                Remedy Resonance
              </h2>
              <p className="mt-2 max-w-2xl font-georgia text-base leading-relaxed text-charcoal/75">
                Practical remedy stories, keynote differentials, and field notes from the archive.
              </p>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              {resonanceStories.map((story, index) => (
                <a
                  key={story.slug}
                  href={storyHref(contentLang, story)}
                  className={`group block px-6 py-5 transition hover:bg-ivory/60 ${
                    index % 2 === 0 ? "md:border-r md:border-mist" : ""
                  } ${index < resonanceStories.length - 2 ? "border-b border-mist" : ""}`}
                >
                  <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                    {SECTION_LABELS[story.section] || "Feature"}
                  </p>
                  <h3 className="mt-2 font-playfair text-xl font-semibold leading-tight text-navy transition group-hover:text-teal">
                    {displayTitle(story)}
                  </h3>
                  <p className="mt-2 font-helvetica text-sm leading-6 text-charcoal/80">
                    {displayExcerpt(
                      story,
                      "Explore a remedy resonance feature from the archive."
                    )}
                  </p>
                </a>
              ))}
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="border-b border-mist pb-4">
            <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Section module
            </p>
            <h2 className="mt-2 font-playfair text-3xl font-semibold text-navy md:text-4xl">
              Living Well
            </h2>
            <p className="mt-3 max-w-3xl font-georgia text-lg leading-8 text-charcoal/80">
              Wellness writing, lifestyle insights, and supportive reading from the ILH archive.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {wellnessStories.map((story) => (
              <Card key={story.slug} className="flex h-full flex-col">
                <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.24em] text-sage">
                  {SECTION_LABELS[story.section] || "Feature"}
                </p>
                <h3 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-navy">
                  {displayTitle(story)}
                </h3>
                <p className="mt-3 flex-1 font-helvetica text-sm leading-6 text-charcoal/80">
                  {displayExcerpt(
                    story,
                    "Read a wellness feature from the ILH editorial archive."
                  )}
                </p>
                <a
                  href={storyHref(contentLang, story)}
                  className="mt-4 inline-flex font-helvetica text-sm font-semibold text-teal underline-offset-4 transition hover:text-sage hover:underline"
                >
                  Read the story
                </a>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
