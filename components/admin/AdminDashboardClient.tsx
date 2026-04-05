"use client";

import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { SECTION_COLOURS, getSectionColour } from "@/lib/section-colours";

type DashboardArticle = {
  slug: string;
  title: string;
  section: string;
  date?: string | null;
  updated?: string | null;
  excerpt?: string | null;
  reviewStatus: string;
};

type DashboardStats = {
  totalArticles: number;
  needsReview: number;
  featuredCount: number;
  publishedToday: number;
};

type DashboardSectionStat = {
  section: string;
  count: number;
};

const analyticsCards = [
  {
    title: "Content Overview",
    href: "/admin/analytics",
    description: "Articles, sections, review status",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7" />
      </svg>
    ),
  },
  {
    title: "SEO Performance",
    href: "/admin/analytics/seo",
    description: "Search rankings, impressions, clicks",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" strokeWidth={2} />
        <path strokeLinecap="round" strokeWidth={2} d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Remedy Analytics",
    href: "/admin/analytics/remedies",
    description: "Most viewed remedies and guides",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8Z" />
      </svg>
    ),
  },
  {
    title: "Conditions",
    href: "/admin/analytics/conditions",
    description: "Top condition pages and traffic",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    title: "Site Performance",
    href: "/admin/analytics/performance",
    description: "Core web vitals, load times",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
  {
    title: "Doctors Corner",
    href: "/admin/analytics/doctors",
    description: "Practitioner engagement metrics",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3" strokeWidth={2} />
        <path strokeLinecap="round" strokeWidth={2} d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      </svg>
    ),
  },
];

function formatDate(value?: string | null) {
  if (!value) return "Undated";
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function reviewBadge(reviewStatus: string) {
  if (reviewStatus === "needs-medical-review") {
    return "bg-amber-100 text-amber-800";
  }
  if (reviewStatus === "approved") {
    return "bg-emerald-100 text-emerald-800";
  }
  return "bg-slate-100 text-slate-700";
}

export default function AdminDashboardClient({
  stats,
  recentArticles,
  sectionBreakdown,
}: {
  stats: DashboardStats;
  recentArticles: DashboardArticle[];
  sectionBreakdown: DashboardSectionStat[];
}) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const maxSectionCount = Math.max(...sectionBreakdown.map((item) => item.count), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-forest px-6 py-4 text-white shadow-sm md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold">
              I <span className="italic text-gold">Love</span> Homeopathy
            </h1>
            <p className="mt-1 font-helvetica text-sm uppercase tracking-[0.18em] text-white/70">
              Admin Dashboard
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-white/60">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
            <Link
              href="/admin/editor"
              className="rounded-md bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-forest transition hover:bg-cream"
            >
              Open Editor
            </Link>
            <button
              onClick={() => signOut({ redirectUrl: "/admin/login" })}
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-10 px-6 py-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
            <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Total Articles
            </p>
            <p className="mt-3 font-playfair text-4xl text-forest">
              {stats.totalArticles.toLocaleString("en-US")}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 shadow-sm">
            <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
              Needs Review
            </p>
            <p className="mt-3 font-playfair text-4xl text-amber-800">
              {stats.needsReview.toLocaleString("en-US")}
            </p>
          </div>
          <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
            <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Featured Articles
            </p>
            <p className="mt-3 font-playfair text-4xl text-forest">
              {stats.featuredCount.toLocaleString("en-US")}
            </p>
          </div>
          <div className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
            <p className="font-helvetica text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">
              Published Today
            </p>
            <p className="mt-3 font-playfair text-4xl text-forest">
              {stats.publishedToday.toLocaleString("en-US")}
            </p>
          </div>
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
            className="inline-flex items-center rounded-xl bg-gold px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-forest transition hover:bg-goldLight"
          >
            Review Queue
          </Link>
          <Link
            href="/admin/editor/new"
            className="inline-flex items-center rounded-xl border border-forest bg-white px-5 py-3 font-helvetica text-sm font-semibold uppercase tracking-[0.12em] text-forest transition hover:bg-creamWarm"
          >
            New Article
          </Link>
        </div>

        <section className="space-y-5">
          <div>
            <h2 className="font-playfair text-3xl font-semibold text-forest">
              Analytics
            </h2>
            <p className="mt-2 font-helvetica text-sm text-charcoal/70">
              Jump directly into the editorial analytics dashboards.
            </p>
          </div>

          <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
            {analyticsCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-xl border border-rule bg-white p-5 transition hover:border-forest hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-forest">{card.icon}</div>
                  <span className="text-muted transition group-hover:text-forest">→</span>
                </div>
                <h3 className="mt-4 font-playfair text-xl font-semibold text-forest">
                  {card.title}
                </h3>
                <p className="mt-2 font-helvetica text-sm text-muted">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-rule pb-4">
              <div>
                <h2 className="font-playfair text-3xl font-semibold text-forest">
                  Recent Articles
                </h2>
                <p className="mt-2 font-helvetica text-sm text-charcoal/70">
                  Last 10 article entries by editorial date.
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-rule">
                <thead>
                  <tr className="text-left font-helvetica text-xs uppercase tracking-[0.12em] text-muted">
                    <th className="pb-3 pr-4">Title</th>
                    <th className="pb-3 pr-4">Section</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Review Status</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {recentArticles.map((article) => {
                    const colour = getSectionColour(article.section);
                    return (
                      <tr key={article.slug}>
                        <td className="py-4 pr-4">
                          <div className="max-w-sm font-playfair text-lg font-semibold text-forest">
                            {article.title || "Untitled article"}
                          </div>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2 font-helvetica text-sm text-muted">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: colour.border }}
                            />
                            {colour.label}
                          </div>
                        </td>
                        <td className="py-4 pr-4 font-helvetica text-sm text-muted">
                          {formatDate(article.updated || article.date)}
                        </td>
                        <td className="py-4 pr-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 font-helvetica text-xs uppercase tracking-[0.12em] ${reviewBadge(article.reviewStatus)}`}
                          >
                            {article.reviewStatus}
                          </span>
                        </td>
                        <td className="py-4">
                          <Link
                            href={`/admin/editor?slug=${article.slug}`}
                            className="font-helvetica text-sm font-semibold text-forest hover:text-midGreen"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-rule bg-white p-6 shadow-sm">
            <div className="border-b border-rule pb-4">
              <h2 className="font-playfair text-3xl font-semibold text-forest">
                Section Breakdown
              </h2>
              <p className="mt-2 font-helvetica text-sm text-charcoal/70">
                Article counts by section using the jewel-tone editorial palette.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              {sectionBreakdown.map((item) => {
                const colour = getSectionColour(item.section);
                const width = `${Math.max(8, (item.count / maxSectionCount) * 100)}%`;
                return (
                  <div key={item.section} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 font-helvetica text-sm">
                      <span style={{ color: colour.text }}>
                        {colour.label}: {item.count.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-creamWarm">
                      <div
                        className="h-3 rounded-full"
                        style={{ width, background: colour.border }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
