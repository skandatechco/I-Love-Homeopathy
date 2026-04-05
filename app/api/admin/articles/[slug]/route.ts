import { auth } from "@clerk/nextjs/server";
import matter from "gray-matter";
import { getArticleFile, listArticleFiles, saveArticleFile } from "@/lib/github-api";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const url = new URL(request.url);
  const requestedPath = url.searchParams.get("path");

  let path = requestedPath || "";
  if (!path) {
    const files = await listArticleFiles();
    path = files.find((file: { slug?: string; path: string }) => file.slug === slug)?.path || "";
  }

  if (!path) {
    return Response.json({ error: "Article not found" }, { status: 404 });
  }

  const { content, sha } = await getArticleFile(path);
  const parsed = matter(content);

  return Response.json({
    frontmatter: parsed.data,
    body: parsed.content,
    sha,
    path,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { content, sha, path, editorEmail } = await request.json();
  const parsed = matter(content);
  const title = String(parsed.data.title || slug || "Article");

  const data = await saveArticleFile(
    path,
    content,
    sha,
    `Edit by ${editorEmail}: ${title}`
  );

  return Response.json(data);
}
