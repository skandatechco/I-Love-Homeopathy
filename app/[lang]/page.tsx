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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
      {children}
    </p>
  );
}

function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string;
  title: string;
  intro: string;
}) {
  return (
    <div id={id} className="border-b-4 border-forest pb-4">
      <h2 className="font-playfair text-3xl font-semibold text-forest md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl font-georgia text-lg leading-8 text-muted">
        {intro}
      </p>
    </div>
  );
}

function StoryList({
  contentLang,
  stories,
}: {
  contentLang: string;
  stories: ArticleDoc[];
}) {
  return (
    <Card className="h-full overflow-hidden border-rule bg-white p-0 shadow-card">
      {stories.map((story, index) => (
        <a
          key={story.slug}
          href={storyHref(contentLang, story)}
          className={`group block px-6 py-5 transition hover:bg-creamWarm/50 ${
            index < stories.length - 1 ? "border-b border-rule" : ""
          }`}
        >
          <Kicker>{SECTION_LABELS[story.section] || "Feature"}</Kicker>
          <h3 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-forest transition group-hover:text-midGreen">
            {displayTitle(story)}
          </h3>
          <p className="mt-3 font-helvetica text-sm leading-6 text-muted">
            {displayExcerpt(story, "Read the full feature from the ILH editorial archive.")}
          </p>
          <p className="mt-4 font-helvetica text-xs uppercase tracking-[0.2em] text-muted/80">
            {storyDate(story) || "Archive"}
          </p>
        </a>
      ))}
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
  const tickerItems = articles.slice(0, 8);
  const loopingTickerItems = [...tickerItems, ...tickerItems];

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

      <div className="space-y-12 bg-cream pb-12 pt-8 md:space-y-16">
        <section className="border-y border-rule bg-creamWarm py-2">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="shrink-0 bg-gold px-3 py-1 font-helvetica text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Latest
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="ticker-track-scroll flex items-center gap-8 whitespace-nowrap font-helvetica text-sm text-ink">
                {loopingTickerItems.map((article, index) => (
                  <a
                    key={`${article.slug}-${index}`}
                    href={storyHref(contentLang, article)}
                    className="transition hover:text-midGreen"
                  >
                    {displayTitle(article)}
                    <span className="ml-8 text-rule">·</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {contentLang !== lang && (
          <section className="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 font-helvetica text-sm leading-6 text-ink">
            Showing the English editorial archive while translated homepage content
            is prepared for this edition.
          </section>
        )}

        {featuredStory && (
          <section className="grid gap-8 xl:grid-cols-[minmax(0,1.8fr)_340px]">
            <div className="space-y-6">
              <div className="border-b-4 border-forest pb-5">
                <Kicker>{SECTION_LABELS[featuredStory.section] || "Lead Story"}</Kicker>
                <h1 className="mt-4 max-w-5xl font-playfair text-4xl font-semibold leading-tight text-forest md:text-6xl">
                  {displayTitle(featuredStory)}
                </h1>
                <p className="mt-5 max-w-3xl font-georgia text-xl leading-8 text-muted">
                  {displayExcerpt(
                    featuredStory,
                    "Read the lead feature from the ILH editorial archive."
                  )}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-helvetica text-xs uppercase tracking-[0.18em] text-muted">
                  <span>{storyDate(featuredStory) || "Editorial Archive"}</span>
                  {featuredStory.readTime ? (
                    <span>{featuredStory.readTime} min read</span>
                  ) : null}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={storyHref(contentLang, featuredStory)}
                    className="inline-flex items-center justify-center bg-forest px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-midGreen"
                  >
                    Read the lead story
                  </a>
                  <a
                    href={`/${contentLang}/articles`}
                    className="inline-flex items-center justify-center border border-forest px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-forest transition hover:bg-forest hover:text-white"
                  >
                    Browse the archive
                  </a>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {heroCompanions.map((story) => (
                  <Card key={story.slug} className="border-rule bg-white">
                    <Kicker>{SECTION_LABELS[story.section] || "Feature"}</Kicker>
                    <h2 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-forest">
                      {displayTitle(story)}
                    </h2>
                    <p className="mt-3 font-helvetica text-sm leading-6 text-muted">
                      {displayExcerpt(
                        story,
                        "Open this companion feature from the editorial front page."
                      )}
                    </p>
                    <a
                      href={storyHref(contentLang, story)}
                      className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-goldLight"
                    >
                      Continue reading
                    </a>
                  </Card>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              {remedyOfDay ? (
                <div id="remedy-of-the-day">
                  <Card className="border-forest bg-forest text-white shadow-card">
                    <Kicker>Remedy of the Day</Kicker>
                    <h2 className="mt-3 font-playfair text-3xl font-semibold leading-tight text-white">
                      {displayTitle(remedyOfDay)}
                    </h2>
                    <p className="mt-3 font-helvetica text-sm leading-6 text-white/80">
                      {displayExcerpt(
                        remedyOfDay,
                        "Read today's remedy feature from the ILH archive."
                      )}
                    </p>
                    <a
                      href={storyHref(contentLang, remedyOfDay)}
                      className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-goldLight transition hover:text-white"
                    >
                      Open remedy feature
                    </a>
                  </Card>
                </div>
              ) : null}

              <Card className="overflow-hidden border-rule bg-white p-0">
                <div className="border-b border-rule px-6 py-4">
                  <Kicker>From the archive</Kicker>
                </div>
                <div className="divide-y divide-rule">
                  {editorialDigest.map((story) => (
                    <a
                      key={story.slug}
                      href={storyHref(contentLang, story)}
                      className="group block px-6 py-4 transition hover:bg-creamWarm/50"
                    >
                      <Kicker>{SECTION_LABELS[story.section] || "Feature"}</Kicker>
                      <h3 className="mt-2 font-playfair text-xl font-semibold leading-tight text-forest transition group-hover:text-midGreen">
                        {displayTitle(story)}
                      </h3>
                    </a>
                  ))}
                </div>
              </Card>

              {quizFeature ? (
                <div id="remedy-quiz">
                  <Card className="border-rule bg-white">
                    <Kicker>Test your materia medica</Kicker>
                    <h2 className="mt-3 font-playfair text-2xl font-semibold text-forest">
                      {displayTitle(quizFeature)}
                    </h2>
                    <p className="mt-3 font-helvetica text-sm leading-6 text-muted">
                      {displayExcerpt(
                        quizFeature,
                        "Challenge yourself with a remedy quiz from the editorial archive."
                      )}
                    </p>
                    <a
                      href={storyHref(contentLang, quizFeature)}
                      className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-goldLight"
                    >
                      Take the challenge
                    </a>
                  </Card>
                </div>
              ) : null}

              <div id="newsletter">
                <EmailSignup />
              </div>
            </aside>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-2">
          <div id="clinical-cases" className="space-y-6">
            <SectionHeading
              id="clinical-cases-heading"
              title="Clinical Cases"
              intro="Practice stories, observations, and case-led learning from the ILH archive."
            />
            <StoryList contentLang={contentLang} stories={clinicalCases} />
          </div>

          <div id="philosophy" className="space-y-6">
            <SectionHeading
              id="philosophy-heading"
              title="Philosophy of Homeopathy"
              intro="Core principles, Organon thinking, and modern interpretive essays."
            />
            <StoryList contentLang={contentLang} stories={philosophyStories} />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
          <div id="history" className="space-y-6">
            <SectionHeading
              id="history-heading"
              title="History of Homeopathy"
              intro="People, institutions, and moments that shaped the tradition and practice of classical medicine."
            />
            <Card className="border-rule bg-white shadow-card">
              {historyFeature ? (
                <>
                  <Kicker>Archive focus</Kicker>
                  <h3 className="mt-3 font-playfair text-3xl font-semibold leading-tight text-forest">
                    {displayTitle(historyFeature)}
                  </h3>
                  <p className="mt-3 font-georgia text-base leading-7 text-muted">
                    {displayExcerpt(
                      historyFeature,
                      "Discover one of the defining stories in the history of homeopathy."
                    )}
                  </p>
                  <a
                    href={storyHref(contentLang, historyFeature)}
                    className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-goldLight"
                  >
                    Read the history feature
                  </a>
                </>
              ) : (
                <p className="font-helvetica text-sm leading-6 text-muted">
                  History features will appear here as the archive is curated.
                </p>
              )}
            </Card>
          </div>

          <div id="remedy-resonance" className="space-y-6">
            <SectionHeading
              id="remedy-resonance-heading"
              title="Remedy Resonance"
              intro="Practical remedy stories, keynote differentials, and field notes from the archive."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {resonanceStories.map((story) => (
                <Card key={story.slug} className="border-rule bg-white shadow-card">
                  <Kicker>{SECTION_LABELS[story.section] || "Feature"}</Kicker>
                  <h3 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-forest">
                    {displayTitle(story)}
                  </h3>
                  <p className="mt-3 font-helvetica text-sm leading-6 text-muted">
                    {displayExcerpt(
                      story,
                      "Explore a remedy resonance feature from the archive."
                    )}
                  </p>
                  <a
                    href={storyHref(contentLang, story)}
                    className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-goldLight"
                  >
                    Explore the guide
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="wellness" className="space-y-6">
          <SectionHeading
            id="wellness-heading"
            title="Living Well"
            intro="Wellness writing, lifestyle insights, and supportive reading from the ILH archive."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {wellnessStories.map((story) => (
              <Card key={story.slug} className="flex h-full flex-col border-rule bg-white shadow-card">
                <Kicker>{SECTION_LABELS[story.section] || "Feature"}</Kicker>
                <h3 className="mt-3 font-playfair text-2xl font-semibold leading-tight text-forest">
                  {displayTitle(story)}
                </h3>
                <p className="mt-3 flex-1 font-helvetica text-sm leading-6 text-muted">
                  {displayExcerpt(
                    story,
                    "Read a wellness feature from the ILH editorial archive."
                  )}
                </p>
                <a
                  href={storyHref(contentLang, story)}
                  className="mt-4 inline-flex font-helvetica text-sm font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-goldLight"
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
