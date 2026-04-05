const OWNER = process.env.GITHUB_REPO_OWNER!;
const REPO = process.env.GITHUB_REPO_NAME!;
const BRANCH = process.env.GITHUB_REPO_BRANCH!;
const TOKEN = process.env.GITHUB_ACCESS_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export type GitHubArticleFile = {
  path: string;
  slug?: string;
  section?: string;
};

export async function listArticleFiles(): Promise<GitHubArticleFile[]> {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`,
    { headers, next: { revalidate: 60 } }
  );
  const data = await res.json();
  return (data.tree || [])
    .filter(
      (f: any) =>
        f.path.startsWith("content/en/articles/") && f.path.endsWith(".mdx")
    )
    .map((f: any): GitHubArticleFile => ({
      path: f.path,
      slug: f.path.split("/").pop()?.replace(".mdx", ""),
      section: f.path.split("/")[3],
    }));
}

export async function getArticleFile(path: string) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    { headers, cache: "no-store" }
  );
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

export async function saveArticleFile(
  path: string,
  content: string,
  sha: string,
  message: string
) {
  const encoded = Buffer.from(content).toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message,
        content: encoded,
        sha,
        branch: BRANCH,
      }),
    }
  );
  return res.json();
}

export async function createArticleFile(
  path: string,
  content: string,
  message: string
) {
  const encoded = Buffer.from(content).toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message,
        content: encoded,
        branch: BRANCH,
      }),
    }
  );
  return res.json();
}

export async function uploadImageFile(filename: string, base64Content: string) {
  const path = `public/uploads/${filename}`;
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content: base64Content,
        branch: BRANCH,
      }),
    }
  );
  return res.json();
}
