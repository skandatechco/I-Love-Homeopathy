import Link from "next/link";
import { getArticles } from "@/lib/content";

export default async function AdminDashboard() {
  const articles = await getArticles("en");
  const needsReview = articles.filter(
    (article) => article.reviewStatus === "needs-medical-review"
  ).length;
  const featuredCount = articles.filter((article) => article.featured).length;
  const recentArticles = articles.slice(0, 3);

  return (
    <div className="space-y-8 bg-cream">
      <div>
        <h1 className="mb-4 font-playfair text-4xl font-semibold text-forest">
          TinaCMS Admin
        </h1>
        <p className="font-helvetica text-lg text-charcoal">
          Manage articles, review queues, and editorial publishing from one
          clean dashboard.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/editor"
          className="inline-flex items-center rounded-xl bg-forest px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-midGreen"
        >
          Open Editor
        </Link>
        <Link
          href="/admin/editor?tab=review"
          className="inline-flex items-center rounded-xl bg-gold px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-goldLight"
        >
          Review Queue
          <span className="ml-3 rounded-full bg-white/20 px-2 py-0.5 text-xs">
            {needsReview}
          </span>
        </Link>
        <Link
          href="/admin/index.html"
          className="inline-flex items-center rounded-xl border border-rule bg-white px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-forest transition hover:bg-creamWarm"
        >
          Open CMS Editor
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
          <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Total Articles
          </p>
          <p className="mt-3 font-playfair text-4xl text-forest">
            {articles.length.toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm">
          <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
            Needs Review
          </p>
          <p className="mt-3 font-playfair text-4xl text-amber-800">
            {needsReview.toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
          <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            Featured
          </p>
          <p className="mt-3 font-playfair text-4xl text-forest">
            {featuredCount.toLocaleString("en-US")}
          </p>
        </div>
        <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
          <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
            CMS Status
          </p>
          <p className="mt-3 font-playfair text-2xl text-forest">Connected</p>
        </div>
      </div>

      <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
          <div>
            <h2 className="font-playfair text-3xl font-semibold text-forest">
              Most Recently Added
            </h2>
            <p className="mt-2 font-helvetica text-sm text-charcoal/70">
              Latest article entries based on editorial date.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {recentArticles.map((article) => (
            <div
              key={article.slug}
              className="rounded-2xl border border-mist bg-creamWarm/40 p-5"
            >
              <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
                {article.section.replace(/-/g, " ")}
              </p>
              <h3 className="mt-3 font-playfair text-2xl font-semibold text-forest">
                {article.title || "Untitled article"}
              </h3>
              <p className="mt-2 font-georgia text-sm leading-6 text-charcoal/75">
                {article.excerpt || "No excerpt provided yet."}
              </p>
              <p className="mt-3 font-helvetica text-xs uppercase tracking-[0.12em] text-charcoal/60">
                {article.updated || article.date || "Undated"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
