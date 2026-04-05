import { auth } from "@clerk/nextjs/server";
import matter from "gray-matter";
import { createArticleFile } from "@/lib/github-api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path, content, editorEmail } = await request.json();
  const parsed = matter(content);
  const title = String(parsed.data.title || "Article");

  const data = await createArticleFile(
    path,
    content,
    `New article by ${editorEmail}: ${title}`
  );

  return Response.json(data);
}
