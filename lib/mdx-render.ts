import { remark } from "remark";
import remarkHtml from "remark-html";

export async function markdownToHtml(markdown: string) {
  if (!markdown?.trim()) return "";

  const result = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return result.toString();
}
