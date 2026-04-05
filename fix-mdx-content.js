const fs = require("fs");
const path = require("path");

const ARTICLES_ROOT = path.join(
  __dirname,
  "content",
  "en",
  "articles"
);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function splitFrontmatter(source) {
  if (!source.startsWith("---")) {
    return { frontmatter: "", body: source };
  }

  const lines = source.split(/\r?\n/);
  let delimiterCount = 0;
  let splitIndex = -1;

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() === "---") {
      delimiterCount += 1;
      if (delimiterCount === 2) {
        splitIndex = i;
        break;
      }
    }
  }

  if (splitIndex === -1) {
    return { frontmatter: "", body: source };
  }

  return {
    frontmatter: `${lines.slice(0, splitIndex + 1).join("\n")}\n`,
    body: lines.slice(splitIndex + 1).join("\n"),
  };
}

function stripInlineToPlainText(text) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBody(body) {
  let output = body;

  // Remove script blocks entirely.
  output = output.replace(/<script[\s\S]*?<\/script>/gim, "");

  // Remove whole lines containing Amazon affiliate/tracking domains.
  output = output
    .split(/\r?\n/)
    .filter(
      (line) =>
        !/amazon-adsystem\.com|ir-na\.amazon|ws-na\.amazon|ir-in\.amazon|ws-in\.amazon/i.test(
          line
        )
    )
    .join("\n");

  // Remove Amazon affiliate widget blocks / tracking pixels / iframes completely.
  output = output
    .replace(/^.*(?:ws-(?:na|in)\.amazon-adsystem\.com|ir-(?:na|in)\.amazon-adsystem\.com).*$\n?/gim, "")
    .replace(/<iframe[\s\S]*?(?:amazon-adsystem\.com|amazon\.com)[\s\S]*?<\/iframe>/gim, "")
    .replace(/<img[^>]*?(?:amazon-adsystem\.com|amazon\.com)[^>]*\/?>/gim, "")
    .replace(/<a[^>]*?(?:amazon\.com|amzn\.to)[^>]*>[\s\S]*?<\/a>/gim, "");

  // Remove tags that contain another HTML tag in their attribute values.
  output = output.replace(/<([a-z0-9-]+)\b[^>]*(?:<[^>]+>)[^>]*>/gim, "");

  // Convert malformed markdown links whose href accidentally contains nested HTML into plain text.
  output = output.replace(
    /\[([\s\S]*?)\]\(\s*https?:\/\/<a\s+href=["'][^"']+["'][\s\S]*?\)/gim,
    (_, label) => stripInlineToPlainText(label)
  );

  // Strip double-nested anchors from broken WordPress exports to plain text.
  output = output.replace(
    /<a\s+href=["']https?:\/\/<a\s+href=["'][^"']+["'][\s\S]*?<\/a>/gim,
    ""
  );

  // Convert bare <br> tags to self-closing tags for MDX.
  output = output.replace(/<br(\s*)>/gim, "<br />");

  // Self-close any remaining raw img tags.
  output = output.replace(/<img\b((?:(?!\/?>).)*)>/gim, (match, attrs) => {
    const trimmed = match.trim();
    if (trimmed.endsWith("/>")) return match;
    return `<img${attrs} />`;
  });

  // Remove now-empty markdown link/image wrappers left behind by broken HTML.
  output = output.replace(/\[\s*\]\([^)]*\)/g, "");

  // Collapse excessive blank lines introduced by removals.
  output = output.replace(/\n{3,}/g, "\n\n");

  return output.trimStart();
}

function main() {
  const files = walk(ARTICLES_ROOT);
  let fixedCount = 0;
  const changedFiles = [];

  for (const file of files) {
    const original = fs.readFileSync(file, "utf8");
    const { frontmatter, body } = splitFrontmatter(original);
    const cleanedBody = cleanBody(body);
    const next = `${frontmatter}${cleanedBody}`;

    if (next !== original) {
      fs.writeFileSync(file, next, "utf8");
      fixedCount += 1;
      changedFiles.push(path.relative(__dirname, file));
    }
  }

  console.log(`Scanned ${files.length} article files.`);
  console.log(`Fixed ${fixedCount} files.`);
  if (changedFiles.length > 0) {
    console.log("Updated files:");
    for (const file of changedFiles) {
      console.log(`- ${file}`);
    }
  }
}

main();
