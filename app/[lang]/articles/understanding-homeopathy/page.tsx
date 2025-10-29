import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Understanding Homeopathy",
    description: "Learn about the fundamentals of homeopathy - a gentle, individualized system of natural healing that has helped people for over 200 years.",
    url: `/${lang}/articles/understanding-homeopathy`,
    type: "article",
    lang,
  });
}

export default async function UnderstandingHomeopathyPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "Article",
    title: "Understanding Homeopathy",
    description: "Learn about the fundamentals of homeopathy",
    url: `/${lang}/articles/understanding-homeopathy`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-6">
        <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
          Understanding Homeopathy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="font-georgia text-charcoal text-lg leading-relaxed">
            Homeopathy is a system of natural medicine founded in the late 18th century by Samuel Hahnemann,
            a German physician. It is based on the principle of "like cures like" (similia similibus curentur)
            and the concept that highly diluted substances can stimulate the body's natural healing processes.
          </p>

          <h2 className="font-playfair text-navy text-3xl font-semibold mt-8 mb-4">
            Fundamental Principles
          </h2>

          <p className="font-helvetica text-charcoal leading-relaxed">
            Content coming soon. This page will cover the core principles of homeopathic medicine,
            including the law of similars, individualization, and the minimum dose.
          </p>

          <h2 className="font-playfair text-navy text-3xl font-semibold mt-8 mb-4">
            How Homeopathy Works
          </h2>

          <p className="font-helvetica text-charcoal leading-relaxed">
            Content coming soon. This section will explain the homeopathic approach to treatment
            and how remedies are selected based on individual symptoms.
          </p>
        </div>
      </article>
    </>
  );
}

