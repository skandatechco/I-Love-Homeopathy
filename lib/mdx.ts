import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DocMeta } from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function getDocBySlug(lang: string, section: string, slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, "");
  const fullPath = path.join(CONTENT_ROOT, lang, section, `${realSlug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(file);

  return {
    meta: {
      ...(data || {}),
      slug: realSlug,
      lang
    } as DocMeta,
    content
  };
}

export function listDocs(lang: string, section: string): DocMeta[] {
  const dir = path.join(CONTENT_ROOT, lang, section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const fullPath = path.join(dir, filename);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(file);

    return {
      ...(data || {}),
      slug: filename.replace(/\.mdx?$/, ""),
      lang
    } as DocMeta;
  });
}
