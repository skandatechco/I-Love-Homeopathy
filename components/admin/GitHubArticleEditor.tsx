"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SECTION_COLOURS, type ArticleSection, getSectionColour } from "@/lib/section-colours";

type ReviewStatus =
  | "needs-medical-review"
  | "approved"
  | "needs-translation-review"
  | "draft";

type ArticleListItem = {
  path: string;
  slug: string;
  section: string;
  title: string;
  date: string | null;
  featured: boolean;
  reviewStatus: ReviewStatus;
};

type EditorState = {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  categories: string[];
  tags: string[];
  image: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  reviewStatus: ReviewStatus;
  reviewer: string;
  disclaimer: string;
  body: string;
  wpPostId: string;
  originalUrl: string;
};

const SECTION_OPTIONS = Object.keys(SECTION_COLOURS) as ArticleSection[];
const CATEGORY_LABELS: Record<ArticleSection, string> = Object.fromEntries(
  SECTION_OPTIONS.map((section) => [section, SECTION_COLOURS[section].label])
) as Record<ArticleSection, string>;

const EMPTY_STATE: EditorState = {
  title: "",
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  author: "ILH Editorial",
  excerpt: "",
  seoTitle: "",
  seoDescription: "",
  categories: [CATEGORY_LABELS["philosophy"]],
  tags: [],
  image: "",
  readTime: "",
  featured: false,
  published: false,
  reviewStatus: "draft",
  reviewer: "",
  disclaimer: "",
  body: "",
  wpPostId: "",
  originalUrl: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function estimateReadTime(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

function buildContent(state: EditorState) {
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(state.title)}`,
    `slug: ${JSON.stringify(state.slug)}`,
    `date: ${JSON.stringify(state.date)}`,
    `author: ${JSON.stringify(state.author)}`,
    `excerpt: ${JSON.stringify(state.excerpt)}`,
    `seoTitle: ${JSON.stringify(state.seoTitle || state.title)}`,
    `seoDescription: ${JSON.stringify(state.seoDescription || state.excerpt)}`,
    `categories: [${state.categories.map((value) => JSON.stringify(value)).join(", ")}]`,
    `tags: [${state.tags.map((value) => JSON.stringify(value)).join(", ")}]`,
    `image: ${JSON.stringify(state.image)}`,
    `readTime: ${Number.parseInt(state.readTime || `${estimateReadTime(state.body)}`, 10) || estimateReadTime(state.body)}`,
    `featured: ${state.featured}`,
    `published: ${state.published}`,
    `reviewStatus: ${JSON.stringify(state.reviewStatus)}`,
    `reviewer: ${JSON.stringify(state.reviewer)}`,
    `disclaimer: ${JSON.stringify(state.disclaimer)}`,
  ];

  if (state.wpPostId) frontmatter.push(`wpPostId: ${JSON.stringify(state.wpPostId)}`);
  if (state.originalUrl) frontmatter.push(`originalUrl: ${JSON.stringify(state.originalUrl)}`);

  frontmatter.push("---", "", state.body || "");
  return frontmatter.join("\n");
}

function parseFrontmatterToState(frontmatter: Record<string, any>, body: string): EditorState {
  const categoryValue = Array.isArray(frontmatter.categories) && frontmatter.categories.length > 0
    ? frontmatter.categories
    : [CATEGORY_LABELS["philosophy"]];

  return {
    title: frontmatter.title || "",
    slug: frontmatter.slug || "",
    date: String(frontmatter.date || "").slice(0, 10),
    author: frontmatter.author || "",
    excerpt: frontmatter.excerpt || "",
    seoTitle: frontmatter.seoTitle || "",
    seoDescription: frontmatter.seoDescription || "",
    categories: categoryValue,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    image: frontmatter.image || "",
    readTime: frontmatter.readTime ? String(frontmatter.readTime) : "",
    featured: Boolean(frontmatter.featured),
    published: frontmatter.published ?? false,
    reviewStatus: (frontmatter.reviewStatus || "draft") as ReviewStatus,
    reviewer: frontmatter.reviewer || "",
    disclaimer: frontmatter.disclaimer || "",
    body,
    wpPostId: frontmatter.wpPostId ? String(frontmatter.wpPostId) : "",
    originalUrl: frontmatter.originalUrl || "",
  };
}

export default function GitHubArticleEditor({ mode }: { mode: "edit" | "new" }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const slugParam = searchParams.get("slug") || "";
  const initialTab = searchParams.get("tab") === "review" ? "needs-review" : "all";

  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "needs-review" | "featured">(initialTab as any);
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [state, setState] = useState<EditorState>(EMPTY_STATE);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [sha, setSha] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/articles")
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]));
  }, []);

  useEffect(() => {
    if (mode === "new") {
      setState(EMPTY_STATE);
      setActivePath(null);
      setSha("");
      return;
    }

    if (!slugParam || articles.length === 0) return;
    const match = articles.find((article) => article.slug === slugParam);
    if (!match) return;
    setActivePath(match.path);

    void fetch(`/api/admin/articles/${match.slug}?path=${encodeURIComponent(match.path)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.frontmatter) {
          setState(parseFrontmatterToState(data.frontmatter, data.body || ""));
          setSha(data.sha || "");
        }
      });
  }, [slugParam, articles, mode]);

  useEffect(() => {
    if (mode === "new" && state.title && !state.slug) {
      setState((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [state.title, state.slug, mode]);

  const reviewCount = useMemo(
    () => articles.filter((article) => article.reviewStatus === "needs-medical-review").length,
    [articles]
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (tab === "needs-review" && article.reviewStatus !== "needs-medical-review") return false;
      if (tab === "featured" && !article.featured) return false;
      if (sectionFilter !== "all" && article.section !== sectionFilter) return false;
      if (!query.trim()) return true;
      return article.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [articles, tab, sectionFilter, query]);

  const wordCount = state.body.trim() ? state.body.trim().split(/\s+/).length : 0;
  const readTime = estimateReadTime(state.body);
  const currentSection = SECTION_OPTIONS.find((section) => CATEGORY_LABELS[section] === state.categories[0]) || "philosophy";
  const currentColour = getSectionColour(currentSection);

  function setField<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function wrapSelection(prefix: string, suffix = prefix) {
    const target = bodyRef.current;
    if (!target) return;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const selected = state.body.slice(start, end);
    const nextBody = `${state.body.slice(0, start)}${prefix}${selected}${suffix}${state.body.slice(end)}`;
    setField("body", nextBody);
    requestAnimationFrame(() => {
      target.focus();
      target.selectionStart = start + prefix.length;
      target.selectionEnd = start + prefix.length + selected.length;
    });
  }

  function insertAtCursor(text: string) {
    const target = bodyRef.current;
    if (!target) return;
    const start = target.selectionStart;
    const nextBody = `${state.body.slice(0, start)}${text}${state.body.slice(start)}`;
    setField("body", nextBody);
  }

  async function handleSave() {
    setSaveState("saving");
    setMessage("");

    const effectiveSlug = slugify(state.slug || state.title);
    const effectiveState = { ...state, slug: effectiveSlug, readTime: String(readTime) };
    const content = buildContent(effectiveState);
    const section = SECTION_OPTIONS.find((option) => CATEGORY_LABELS[option] === effectiveState.categories[0]) || "philosophy";
    const path = activePath || `content/en/articles/${section}/${effectiveSlug}.mdx`;
    const editorEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "unknown@editor";

    const endpoint = mode === "new" && !sha ? "/api/admin/articles/new" : `/api/admin/articles/${effectiveSlug}`;
    const method = mode === "new" && !sha ? "POST" : "PUT";
    const payload = method === "POST"
      ? { path, content, editorEmail }
      : { path, content, sha, editorEmail };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setSaveState("saved");
      setMessage("Saved!");
      if (mode === "new") {
        router.push(`/admin/editor?slug=${effectiveSlug}`);
      } else {
        setActivePath(path);
      }
      if (data?.content?.sha) setSha(data.content.sha);
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (error) {
      setSaveState("error");
      setMessage(error instanceof Error ? error.message : "Error saving");
    }
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      setField("image", data.url);
      insertAtCursor(`\n![${file.name}](${data.url})\n`);
    } finally {
      setUploading(false);
    }
  }

  const previewHref = state.slug ? `/en/articles/${currentSection}/${state.slug}` : "#";

  return (
    <div className="min-h-[calc(100vh-8rem)] rounded-2xl border border-rule bg-white shadow-sm">
      <div className="grid min-h-[calc(100vh-8rem)] lg:grid-cols-[224px_minmax(0,1fr)_288px]">
        <aside className="flex min-h-0 flex-col border-r border-rule bg-cream/40">
          <div className="border-b border-rule p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-playfair text-2xl text-forest">Articles</h2>
              <span className="rounded-full bg-forest px-3 py-1 font-helvetica text-xs text-white">
                {articles.length}
              </span>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="mt-4 w-full rounded-lg border border-rule bg-white px-3 py-2 font-helvetica text-sm"
            />
            <div className="mt-4 flex gap-2 text-xs font-helvetica uppercase tracking-[0.12em]">
              {[
                { key: "all", label: "All" },
                { key: "needs-review", label: "Needs Review", count: reviewCount },
                { key: "featured", label: "Featured" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setTab(option.key as any)}
                  className={`rounded-full px-3 py-1 ${tab === option.key ? "bg-forest text-white" : "border border-rule bg-white text-muted"}`}
                >
                  {option.label}
                  {"count" in option && option.count ? (
                    <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[10px] text-white">
                      {option.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSectionFilter("all")}
                className={`rounded-full border px-3 py-1 text-xs font-helvetica ${sectionFilter === "all" ? "border-forest bg-forest text-white" : "border-rule bg-white text-muted"}`}
              >
                All
              </button>
              {SECTION_OPTIONS.map((section) => {
                const colour = getSectionColour(section);
                return (
                  <button
                    key={section}
                    onClick={() => setSectionFilter(section)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-helvetica ${sectionFilter === section ? "text-white" : "bg-white text-muted"}`}
                    style={sectionFilter === section ? { background: colour.border, borderColor: colour.border } : { borderColor: colour.border }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: colour.border }} />
                    {colour.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <div className="space-y-2">
              {filteredArticles.map((article) => {
                const colour = getSectionColour(article.section);
                const active = activePath === article.path;
                return (
                  <button
                    key={article.path}
                    onClick={() => router.push(`/admin/editor?slug=${article.slug}`)}
                    className="w-full rounded-xl border border-rule p-3 text-left"
                    style={active ? { background: colour.bg, borderLeft: `3px solid ${colour.border}` } : undefined}
                  >
                    <div className="line-clamp-2 font-helvetica text-sm font-semibold text-forest">
                      {article.title || article.slug}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                      <span className="h-2 w-2 rounded-full" style={{ background: colour.border }} />
                      <span>{colour.label}</span>
                    </div>
                    <div className="mt-1 text-xs text-muted">{article.date || "Undated"}</div>
                    {article.reviewStatus === "needs-medical-review" ? (
                      <span className="mt-2 inline-flex rounded-full bg-gold/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-gold">
                        Needs Review
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-rule p-4">
            <a href="/admin/editor/new" className="block rounded-xl bg-forest px-4 py-3 text-center font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-white">
              + New Article
            </a>
          </div>
        </aside>

        <section className="flex min-h-0 flex-col border-r border-rule">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule bg-forest px-5 py-4 text-white">
            <div className="flex items-center gap-3 text-sm font-helvetica text-white/80">
              <a href="/admin" className="hover:text-goldLight">Admin</a>
              <span>›</span>
              <span className="max-w-[280px] truncate text-white">{state.title || "New Article"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/60">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
              <a
                href={previewHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/20 px-4 py-2 font-helvetica text-sm text-white/80"
              >
                Preview
              </a>
              <button
                onClick={handleSave}
                className="rounded-lg bg-gold px-4 py-2 font-helvetica text-sm text-white"
              >
                Save
              </button>
              <button
                onClick={() => signOut({ redirectUrl: "/admin/login" })}
                className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <input
              value={state.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Article title"
              className="w-full border-0 bg-transparent font-playfair text-3xl text-forest focus:outline-none"
            />
            <textarea
              rows={3}
              value={state.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
              placeholder="Article excerpt..."
              className="mt-4 w-full rounded-lg border border-rule px-4 py-3 font-helvetica text-sm text-muted"
            />

            <div className="mt-4 flex flex-wrap gap-2 border-y border-rule py-3">
              {([
                ["Bold", () => wrapSelection("**")],
                ["Italic", () => wrapSelection("_")],
                ["H2", () => insertAtCursor("\n## Heading\n")],
                ["H3", () => insertAtCursor("\n### Heading\n")],
                ["Link", () => wrapSelection("[", "](https://example.com)")],
                ["Image", () => imageInputRef.current?.click()],
                ["Bullet", () => insertAtCursor("\n- Item")],
                ["Numbered", () => insertAtCursor("\n1. Item")],
                ["Quote", () => insertAtCursor("\n> Quote")],
                ["HR", () => insertAtCursor("\n---\n")],
              ] as Array<[string, () => void]>).map(([label, handler]) => (
                <button
                  key={String(label)}
                  onClick={handler as () => void}
                  className="rounded border border-rule px-3 py-1 font-helvetica text-xs text-muted"
                >
                  {label}
                </button>
              ))}
            </div>

            <textarea
              ref={bodyRef}
              value={state.body}
              onChange={(e) => setField("body", e.target.value)}
              placeholder="Write your article in markdown..."
              className="mt-4 min-h-64 flex-1 resize-none rounded-lg border border-rule p-4 font-mono text-sm"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-helvetica text-xs text-muted">
              <div>
                {wordCount.toLocaleString("en-US")} words · {readTime} min read
              </div>
              <div>
                {saveState === "saving"
                  ? "Saving..."
                  : message ||
                    (saveState === "saved"
                      ? "Saved"
                      : saveState === "error"
                        ? "Error"
                        : "Idle")}
              </div>
            </div>
          </div>
        </section>

        <aside className="min-h-0 overflow-y-auto border-l border-rule bg-cream/30 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-gold">Publish</h3>
              <div className="mt-3 space-y-3">
                <label className="flex items-center justify-between text-sm font-helvetica text-forest">
                  Published
                  <input type="checkbox" checked={state.published} onChange={(e) => setField("published", e.target.checked)} />
                </label>
                <label className="flex items-center justify-between text-sm font-helvetica text-forest">
                  Featured
                  <input type="checkbox" checked={state.featured} onChange={(e) => setField("featured", e.target.checked)} />
                </label>
                <select className="w-full rounded-lg border border-rule px-3 py-2 text-sm" value={state.reviewStatus} onChange={(e) => setField("reviewStatus", e.target.value as ReviewStatus)}>
                  <option value="needs-medical-review">needs-medical-review</option>
                  <option value="approved">approved</option>
                  <option value="needs-translation-review">needs-translation-review</option>
                  <option value="draft">draft</option>
                </select>
                <input className="w-full rounded-lg border border-rule px-3 py-2 text-sm" value={state.reviewer} onChange={(e) => setField("reviewer", e.target.value)} placeholder="Reviewer" />
                <input className="w-full rounded-lg border border-rule px-3 py-2 text-sm" value={state.author} onChange={(e) => setField("author", e.target.value)} placeholder="Author" />
                <input className="w-full rounded-lg border border-rule px-3 py-2 text-sm" type="date" value={state.date} onChange={(e) => setField("date", e.target.value)} />
              </div>
            </div>

            <div>
              <h3 className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-gold">Section</h3>
              <div className="mt-3 space-y-3">
                <select
                  className="w-full rounded-lg border border-rule px-3 py-2 text-sm"
                  value={currentSection}
                  onChange={(e) => setField("categories", [CATEGORY_LABELS[e.target.value as ArticleSection]])}
                >
                  {SECTION_OPTIONS.map((section) => (
                    <option key={section} value={section}>{CATEGORY_LABELS[section]}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-3 w-3 rounded-full" style={{ background: currentColour.border }} />
                  <span>{currentColour.label}</span>
                </div>
                <input
                  className="w-full rounded-lg border border-rule px-3 py-2 text-sm"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      setField("tags", [...state.tags, tagInput.trim()]);
                      setTagInput("");
                    }
                  }}
                  placeholder="Add tag and press Enter"
                />
                <div className="flex flex-wrap gap-2">
                  {state.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setField("tags", state.tags.filter((item) => item !== tag))}
                      className="rounded-full bg-creamWarm px-3 py-1 text-xs text-muted"
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-gold">Image</h3>
              <div className="mt-3 space-y-3">
                {state.image ? (
                  <img src={state.image} alt="Preview" className="h-24 w-full rounded-lg object-cover" />
                ) : (
                  <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-rule text-sm text-muted">
                    No image yet
                  </div>
                )}
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleImageUpload(file);
                }} />
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full rounded-lg border border-rule px-3 py-2 text-sm font-helvetica text-forest"
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-gold">SEO</h3>
              <div className="mt-3 space-y-3">
                <div>
                  <input className="w-full rounded-lg border border-rule px-3 py-2 text-sm" value={state.seoTitle} onChange={(e) => setField("seoTitle", e.target.value)} placeholder="SEO Title" />
                  <div className={`mt-1 text-right text-xs ${state.seoTitle.length > 60 ? "text-red-600" : state.seoTitle.length > 50 ? "text-amber-600" : "text-muted"}`}>{state.seoTitle.length}/60</div>
                </div>
                <div>
                  <textarea className="w-full rounded-lg border border-rule px-3 py-2 text-sm" rows={3} value={state.seoDescription} onChange={(e) => setField("seoDescription", e.target.value)} placeholder="Meta description" />
                  <div className={`mt-1 text-right text-xs ${state.seoDescription.length > 155 ? "text-red-600" : state.seoDescription.length > 130 ? "text-amber-600" : "text-muted"}`}>{state.seoDescription.length}/155</div>
                </div>
              </div>
            </div>

            <details>
              <summary className="font-helvetica text-xs font-semibold uppercase tracking-[0.18em] text-gold">WP Reference</summary>
              <div className="mt-3 space-y-3 text-sm text-muted">
                <input className="w-full rounded-lg border border-rule px-3 py-2 text-sm" value={state.wpPostId} readOnly placeholder="WP Post ID" />
                <a href={state.originalUrl || "#"} className="block truncate rounded-lg border border-rule px-3 py-2 text-sm" target="_blank" rel="noreferrer">
                  {state.originalUrl || "Original URL"}
                </a>
              </div>
            </details>

            <div className="sticky bottom-0 bg-cream/95 pt-4">
              <button
                onClick={handleSave}
                className="w-full rounded-xl bg-forest py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-white"
              >
                {saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved!" : "Save & Publish"}
              </button>
              {message ? <p className="mt-2 text-center text-xs text-muted">{message}</p> : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}


