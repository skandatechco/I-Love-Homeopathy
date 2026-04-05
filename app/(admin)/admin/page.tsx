import { getArticles } from "@/lib/content";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const articles = await getArticles("en");
  const today = new Date().toISOString().slice(0, 10);

  const stats = {
    totalArticles: articles.length,
    needsReview: articles.filter(
      (article) => article.reviewStatus === "needs-medical-review"
    ).length,
    featuredCount: articles.filter((article) => article.featured).length,
    publishedToday: articles.filter((article) => {
      const value = (article.updated || article.date || "").slice(0, 10);
      return value === today;
    }).length,
  };

  const recentArticles = articles.slice(0, 10).map((article) => ({
    slug: article.slug,
    title: article.title,
    section: article.section,
    date: article.date,
    updated: article.updated,
    excerpt: article.excerpt,
    reviewStatus: article.reviewStatus,
  }));

  const sectionOrder = [
    "remedy-quiz",
    "remedy-of-the-day",
    "philosophy",
    "clinical-cases",
    "history",
    "remedy-resonance",
    "wellness",
    "book-reviews",
  ];

  const sectionBreakdown = sectionOrder.map((section) => ({
    section,
    count: articles.filter((article) => article.section === section).length,
  }));

  return (
    <AdminDashboardClient
      stats={stats}
      recentArticles={recentArticles}
      sectionBreakdown={sectionBreakdown}
    />
  );
}
