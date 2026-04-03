import { isSupportedLang } from "@/lib/i18n";
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

        <div className="bg-white rounded-2xl border border-mist p-8 text-center">
          <p className="font-helvetica text-charcoal leading-relaxed">
            Blog content coming soon. Check back later for news, explainers, interviews, and event recaps.
          </p>
        </div>
      </article>
    </>
  );
}
