import { isSupportedLang } from "@/lib/i18n";
import { listDocs } from "@/lib/mdx";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";

  return generateSEO({
    title: "Blog",
    description: "News, explainers, interviews, and event recaps from the world of homeopathy. Stay updated with the latest insights and developments.",
    url: `/${lang}/blog`,
    lang,
  });
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";
  
  // Try to get blog posts - will return empty if blog directory doesn't exist yet
  const blogPosts = listDocs(lang, "blog");

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Blog",
    description: "News and insights about homeopathy",
    url: `/${lang}/blog`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto pt-24 pb-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Blog
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            News, explainers, interviews, and event recaps from the world of homeopathy.
            Stay updated with the latest insights, research developments, and educational content.
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all hover:border-navy group"
              >
                <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
                    {post.summary}
                  </p>
                )}
                {post.date && (
                  <p className="font-helvetica text-sage text-xs mb-2">
                    {post.date}
                  </p>
                )}
                <span className="text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4">
                  Read more →
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-mist p-8 text-center">
            <p className="font-helvetica text-charcoal leading-relaxed">
              Blog content coming soon. Check back later for news, explainers, interviews, and event recaps.
            </p>
          </div>
        )}
      </article>
    </>
  );
}

