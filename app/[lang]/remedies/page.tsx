import { isSupportedLang } from "@/lib/i18n";
import { listDocs } from "@/lib/mdx";
import { getRemedyHref } from "@/lib/content";
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
    title: "Remedy Library",
    description: "Browse our comprehensive library of homeopathic remedies. Learn about keynotes, traditional indications, and safety information for each remedy.",
    url: `/${lang}/remedies`,
    lang,
  });
}

export default async function RemediesPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";
  const remedies = listDocs(lang, "remedies");

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Remedy Library",
    description: "Comprehensive library of homeopathic remedies",
    url: `/${lang}/remedies`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Remedy Library
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Every remedy tells a story — of nature, human emotion, and healing.
            Browse our comprehensive collection of homeopathic remedies, each with keynotes,
            traditional indications, and safety information reviewed by BHMS-certified practitioners.
          </p>
        </div>

        {remedies.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remedies.map((remedy) => (
              <a
                key={remedy.slug}
                href={getRemedyHref(lang, remedy.slug)}
                className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all hover:border-navy group"
              >
                <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
                  {remedy.title}
                </h3>
                {remedy.summary && (
                  <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
                    {remedy.summary}
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
            <p className="font-helvetica text-charcoal">
              Remedy content coming soon. Check back later for our comprehensive remedy library.
            </p>
          </div>
        )}
      </article>
    </>
  );
}

