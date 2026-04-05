import { auth } from "@clerk/nextjs/server";
import { getArticles } from "@/lib/content";
import { listArticleFiles } from "@/lib/github-api";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = await listArticleFiles();
  const articles = await getArticles("en");
  const articleMap = new Map(articles.map((article) => [article.slug, article]));

  return Response.json(
    files.map((file) => {
      const article = articleMap.get(file.slug || "");
      return {
        ...file,
        title: article?.title || file.slug,
        date: article?.updated || article?.date || null,
        featured: article?.featured || false,
        reviewStatus: article?.reviewStatus || "draft",
      };
    })
  );
}
