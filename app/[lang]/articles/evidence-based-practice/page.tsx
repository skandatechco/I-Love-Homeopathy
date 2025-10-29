import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Is Homeopathy Safe?",
    description: "Learn about the safety profile of homeopathy and evidence-based practices in homeopathic medicine.",
    url: `/${lang}/articles/evidence-based-practice`,
    type: "article",
    lang,
  });
}

export default async function EvidenceBasedPracticePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "Article",
    title: "Is Homeopathy Safe?",
    description: "Evidence-based practice in homeopathy",
    url: `/${lang}/articles/evidence-based-practice`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-6">
        <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
          Is Homeopathy Safe?
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="font-georgia text-charcoal text-lg leading-relaxed">
            Homeopathy has a long-established safety record. Because remedies are highly diluted,
            they are generally considered safe when used appropriately.
          </p>

          <h2 className="font-playfair text-navy text-3xl font-semibold mt-8 mb-4">
            Safety Profile
          </h2>

          <p className="font-helvetica text-charcoal leading-relaxed">
            Content coming soon. This section will cover the safety considerations, contraindications,
            and best practices for using homeopathic remedies.
          </p>

          <h2 className="font-playfair text-navy text-3xl font-semibold mt-8 mb-4">
            Evidence and Research
          </h2>

          <p className="font-helvetica text-charcoal leading-relaxed">
            Content coming soon. This section will discuss the research landscape and what studies
            tell us about homeopathic practice.
          </p>
        </div>
      </article>
    </>
  );
}

