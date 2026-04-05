import StructuredData from "@/components/seo/StructuredData";
import {
  type ArticleDoc,
  getArticleHref,
  getArticles,
} from "@/lib/content";
import { isSupportedLang } from "@/lib/i18n";
import { generateSEO, generateStructuredData } from "@/lib/seo";

function cleanText(value?: string | null, fallback = "") {
  if (!value) return fallback;
  return value.replace(/\s+/g, " ").trim() || fallback;
}

function displayTitle(article?: ArticleDoc | null, fallback = "Untitled feature") {
  if (!article) return fallback;
  const title = cleanText(article.title);
  if (title) return title;
  const excerpt = cleanText(article.excerpt);
  if (!excerpt) return fallback;
  return excerpt.length > 72 ? `${excerpt.slice(0, 69)}...` : excerpt;
}

function displayExcerpt(article?: ArticleDoc | null, fallback = "Read more from the ILH editorial archive.") {
  if (!article) return fallback;
  const excerpt = cleanText(article.excerpt);
  if (!excerpt) return fallback;
  return excerpt.length > 220 ? `${excerpt.slice(0, 217)}...` : excerpt;
}

function storyHref(lang: string, article?: ArticleDoc | null) {
  if (!article) return `/${lang}/articles`;
  return getArticleHref(lang, article.slug, article.section);
}

function storyDate(article?: ArticleDoc | null) {
  if (!article?.date) return "Archive";
  const date = new Date(article.updated || article.date);
  if (Number.isNaN(date.valueOf())) return article.updated || article.date;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
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
    selected.push(article);
    excluded.add(article.slug);
  }
  return selected;
}

function PlaceholderGraphic({
  background,
  title,
  subtitle,
}: {
  background: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ background }}
    >
      <div className="px-6 text-center text-white/80">
        <div className="font-playfair text-3xl font-semibold tracking-wide text-goldLight/70">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-2 font-georgia text-xs uppercase tracking-[0.28em] text-white/40">
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
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
      "Magazine-style editorial front page for remedy studies, clinical cases, philosophy, history, and wellness.",
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
  const articles = localizedArticles.length > 0 ? localizedArticles : await getArticles("en");

  const used = new Set<string>();
  const featured =
    articles.find((article) => article.slug === "dynamic-medicine-the-world-according-to-homeopathy") ||
    articles.find((article) => cleanText(article.title)) ||
    null;
  if (featured) used.add(featured.slug);

  const remedyOfDay = pickStories(articles, 1, (article) => article.section === "remedy-of-the-day", used)[0] || null;
  const sidebarStories = pickStories(articles, 3, () => true, used);
  const clinicalCases = pickStories(articles, 4, (article) => article.section === "clinical-cases");
  const quizFeature = pickStories(articles, 1, (article) => article.section === "remedy-quiz")[0] || null;
  const philosophy = pickStories(articles, 3, (article) => article.section === "philosophy");
  const history = pickStories(articles, 4, (article) => article.section === "history");
  const resonance = pickStories(articles, 4, (article) => article.section === "remedy-resonance");
  const wellness = pickStories(articles, 3, (article) => article.section === "wellness");
  const tickerItems = [...articles.slice(0, 5), ...articles.slice(0, 5)];

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I Love Homeopathy",
    description: "Magazine-style homepage for ILH's editorial archive.",
    url: `/${lang}`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="homepage-reference">
        <div className="ticker">
          <div className="mx-auto max-w-[1200px] px-5">
            <div className="ticker-inner">
              <span className="ticker-label">Latest</span>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div className="ticker-track ticker-track-scroll">
                  {tickerItems.map((article, index) => (
                    <span key={`${article.slug}-${index}`} className="ticker-item">
                      <a href={storyHref(contentLang, article)}>{displayTitle(article)}</a>{" "}
                      <span className="ticker-sep">·</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-primary">
            <div className="hero-img-wrap">
              <PlaceholderGraphic background="#0d3d4f" title="Lachesis" subtitle="Materia Medica" />
              <div className="hero-overlay">
                <span className="hero-kicker">{featured?.section?.replace(/-/g, " ")} · Materia Medica</span>
                <h1 className="hero-title">{displayTitle(featured, "Dynamic Medicine: Why Homeopathy Changes the Very Nature of Healing Itself")}</h1>
                <p className="hero-deck">{displayExcerpt(featured, "A body, heart, mind, and soul approach to medicine — how homeopathy's energetic paradigm is rewriting what it means to cure a patient, not merely suppress symptoms.")}</p>
              </div>
            </div>
            <div className="hero-byline">
              <span>By {cleanText(featured?.author, "ILH Editorial")}</span>
              <span className="dot">·</span>
              <span>{storyDate(featured)}</span>
              <span className="dot">·</span>
              <span>{featured?.section?.replace(/-/g, " ") || "Philosophy"}</span>
              <span className="dot">·</span>
              <span style={{ color: "#1a5c6e", fontWeight: 600 }}>
                <a href={storyHref(contentLang, featured)}>Read more ?</a>
              </span>
            </div>
          </div>

          <div className="hero-sidebar">
            <div className="sidebar-section-head">
              <h3>Remedy of the Day</h3>
            </div>
            <div className="remedy-day-card" id="remedy-of-the-day">
              <span className="remedy-badge">{storyDate(remedyOfDay)}</span>
              <div className="remedy-name">{displayTitle(remedyOfDay, "Causticum")}</div>
              <div className="remedy-latin">{cleanText(remedyOfDay?.author, "Causticum Hahnemanni")}</div>
              <div className="remedy-keynote">{displayExcerpt(remedyOfDay, '"The remedy for chronic ailments that come on slowly, with progressive weakness and paralysis."')}</div>
              <a className="remedy-link" href={storyHref(contentLang, remedyOfDay)}>Explore full materia medica ?</a>
            </div>

            <div className="sidebar-section-head" style={{ marginTop: 8 }}>
              <h3>Most Read This Week</h3>
            </div>
            <div className="sidebar-list">
              {sidebarStories.map((story, index) => (
                <a className="sidebar-article" key={story.slug} href={storyHref(contentLang, story)}>
                  <div className="sidebar-article-img">
                    <PlaceholderGraphic
                      background={index % 3 === 0 ? "#2d5a3d" : index % 3 === 1 ? "#1a3520" : "#4a7c5f"}
                      title={index === 0 ? "Rx" : index === 1 ? "?" : '"'}
                    />
                  </div>
                  <div>
                    <h4>{displayTitle(story)}</h4>
                    <p>{story.section.replace(/-/g, " ")} · archive feature</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <section className="section-module" id="clinical-cases">
          <div className="section-header">
            <h2>Clinical Cases</h2>
            <a className="see-all" href={`/${contentLang}/articles`}>All Cases ?</a>
          </div>
          <div className="grid-feature">
            <a className="feature-card" href={storyHref(contentLang, clinicalCases[0])}>
              <div className="feature-card-img">
                <PlaceholderGraphic background="#e0d8c4" title="?" subtitle="Clinical Showcase" />
              </div>
              <span className="kicker">Showcase · {displayTitle(clinicalCases[0]).split(":")[0]}</span>
              <h3>{displayTitle(clinicalCases[0])}</h3>
              <p>{displayExcerpt(clinicalCases[0])}</p>
              <div className="article-meta">
                <span>{cleanText(clinicalCases[0]?.author, "Editorial")}</span>
                <span className="dot">·</span>
                <span>{storyDate(clinicalCases[0])}</span>
              </div>
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {clinicalCases.slice(1, 4).map((story) => (
                <a className="stack-article" key={story.slug} href={storyHref(contentLang, story)}>
                  <span className="kicker">{story.section.replace(/-/g, " ")}</span>
                  <h4>{displayTitle(story)}</h4>
                  <p>{displayExcerpt(story)}</p>
                </a>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {quizFeature ? (
                <a className="article-card" href={storyHref(contentLang, quizFeature)}>
                  <div className="article-card-img" style={{ height: 140 }}>
                    <PlaceholderGraphic background="#2d5a3d" title="KNOW YOUR" subtitle="KEYNOTES" />
                  </div>
                  <span className="kicker" style={{ marginTop: 10, display: "block" }}>Know Your Keynotes</span>
                  <h3 style={{ fontSize: 15, marginBottom: 6 }}>{displayTitle(quizFeature)}</h3>
                  <p style={{ fontSize: 13 }}>{displayExcerpt(quizFeature)}</p>
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <div className="quiz-module" id="quiz-module">
          <div className="quiz-inner">
            <div className="quiz-left">
              <span className="section-label">Remedy Quiz · What&apos;s the Remedy?</span>
              <h2 className="quiz-title">Test Your Materia Medica</h2>
              <div className="quiz-question">
                A 6-month-old baby girl. Fair, plump, and pleasant. Gets fever after a head bath. Worse from warmth, better in open air. Thirstless despite the fever. No two stools alike. What is the remedy?
              </div>
              <div className="quiz-options">
                {['Arsenicum Album','Pulsatilla Pratensis','Belladonna','Chamomilla'].map((option, index) => (
                  <div className="quiz-option" key={option}>
                    <span className="quiz-letter">{String.fromCharCode(65 + index)}</span>
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="quiz-right">
              <span className="quiz-stat">4,200+</span>
              <span className="quiz-stat-label">Quiz Answers Submitted</span>
              <p>
                Our daily quiz sharpens the prescribing instinct. From classic keynotes to full case studies — tested by homeopaths worldwide.
              </p>
              <button className="quiz-submit">Submit Answer</button>
            </div>
          </div>
        </div>

        <section className="section-module" id="philosophy">
          <div className="section-header">
            <h2>Philosophy of Homeopathy</h2>
            <a className="see-all" href={`/${contentLang}/articles`}>All Articles ?</a>
          </div>
          <div className="grid-3">
            {philosophy.map((story, index) => (
              <a className="article-card" key={story.slug} href={storyHref(contentLang, story)}>
                <div className="article-card-img">
                  <PlaceholderGraphic
                    background={index === 0 ? "#1a3520" : index === 1 ? "#2d5a3d" : "#0a1f2e"}
                    title={index === 0 ? "§63" : index === 1 ? "?" : "Research"}
                    subtitle={index === 0 ? "ORGANON OF MEDICINE" : index === 2 ? "Evidence & Epistemology" : undefined}
                  />
                </div>
                <span className="kicker">{story.section === "philosophy" ? (index === 0 ? "Organon" : "Ponderings") : "Research"}</span>
                <h3>{displayTitle(story)}</h3>
                <p>{displayExcerpt(story)}</p>
              </a>
            ))}
          </div>
        </section>

        <div className="philosophy-band">
          <div className="pull-quote-wrap">
            <p className="pull-quote">
              Homeopathy is revolutionary because it changes the very nature and purpose of medicine itself. The goal is not just to relieve pain — it is to restore health, and balance, and the full expression of the vital force.
            </p>
            <span className="pull-attr">Dr. Larry Malerba, MD — Dynamic Medicine</span>
          </div>
        </div>

        <section className="section-module" id="history">
          <div className="section-header">
            <h2>History of Homeopathy</h2>
            <a className="see-all" href={`/${contentLang}/articles`}>Archives ?</a>
          </div>
          <div className="history-grid">
            <div className="history-portrait">
              <div className="history-portrait-img">
                <PlaceholderGraphic background="#e0d8c4" title="1895" subtitle="Portrait" />
              </div>
              <p className="history-portrait-cap">Dr. Sidney Robinson (1895, Australia) — Owner of the Homeopathic Dispensary, Myer&apos;s Place, Melbourne</p>
            </div>
            <div className="history-content">
              <span className="kicker">Ambassadors of Homeopathy</span>
              <h3>{displayTitle(history[0], "The Forgotten Pioneers: Homeopathy's Great Hospitals and the Physicians Who Built Them")}</h3>
              <p>{displayExcerpt(history[0], "Before antibiotics and before the pharmaceutical industry, homeopathic hospitals dotted the cities of the English-speaking world.")}</p>
              <p>{displayExcerpt(history[1], "From the Hahnemann College of Pennsylvania to the Rochester School of Nursing, these institutions trained generations of physicians.")}</p>
              <a className="see-all" style={{ color: "var(--gold)", fontSize: 12 }} href={storyHref(contentLang, history[0])}>Read the full feature ?</a>
              <div className="history-profiles">
                {history.slice(1, 4).map((story, index) => (
                  <a className="profile-mini" key={story.slug} href={storyHref(contentLang, story)}>
                    <div className="profile-mini-img">
                      <PlaceholderGraphic background={index === 0 ? "#2d5a3d" : index === 1 ? "#1a3520" : "#4a7c5f"} title={index === 0 ? "P.S.O" : index === 1 ? "EF" : "SC"} />
                    </div>
                    <h5>{displayTitle(story)}</h5>
                    <p>{storyDate(story)}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-module" id="remedy-resonance">
          <div className="section-header">
            <h2>Remedy Resonance</h2>
            <a className="see-all" href={`/${contentLang}/articles`}>All Guides ?</a>
          </div>
          <div className="grid-4">
            {resonance.map((story, index) => (
              <a className="article-card" key={story.slug} href={storyHref(contentLang, story)}>
                <div className="article-card-img" style={{ height: 150 }}>
                  <PlaceholderGraphic background={index === 0 ? "#1a3520" : index === 1 ? "#2d5a3d" : index === 2 ? "#0a1f2e" : "#4a7c5f"} title={index === 0 ? "+" : index === 1 ? "?" : index === 2 ? "?" : "¦"} />
                </div>
                <span className="kicker">Conditions · Study</span>
                <h3 style={{ fontSize: 16 }}>{displayTitle(story)}</h3>
                <p style={{ fontSize: 13 }}>{displayExcerpt(story)}</p>
              </a>
            ))}
          </div>
        </section>

        <div className="wellness-strip" id="wellness">
          <div className="wellness-icon-wrap">
            <div className="wellness-icon">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="wellness-icon-label">Wellness</span>
          </div>
          <div>
            <div className="section-header" style={{ marginBottom: 16, borderBottom: "2px solid var(--sage)" }}>
              <h2 style={{ color: "var(--mid-green)" }}>Living Well</h2>
              <a className="see-all" href={`/${contentLang}/articles`}>All Wellness ?</a>
            </div>
            <div className="wellness-articles">
              {wellness.map((story) => (
                <a className="wellness-item" key={story.slug} href={storyHref(contentLang, story)}>
                  <h5>{displayTitle(story)}</h5>
                  <p>{displayExcerpt(story)}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="newsletter" id="newsletter">
          <h3>The Daily Remedy</h3>
          <p>One remedy, one case, one insight — delivered to your inbox every morning. Free forever.</p>
          <div className="nl-form">
            <input className="nl-input" type="email" placeholder="Your email address" />
            <button className="nl-btn">Subscribe</button>
          </div>
          <p className="nl-fine">Join 28,000 practitioners and students worldwide. Unsubscribe anytime.</p>
        </div>
      </div>
    </>
  );
}

