import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Bach Flower Remedies",
    description: "Explore the 38 Bach Flower Remedies, a gentle system of flower essences developed by Dr. Edward Bach for emotional well-being.",
    url: `/${lang}/bach-remedies`,
    lang,
  });
}

export default async function BachRemediesPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Bach Flower Remedies",
    description: "Explore Bach Flower Remedies for emotional well-being",
    url: `/${lang}/bach-remedies`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto pt-24 pb-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Bach Flower Remedies
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Discover the gentle healing power of Bach Flower Remedies. Developed by Dr. Edward Bach
            in the 1930s, these 38 flower essences are designed to support emotional balance and well-being.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-8 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-playfair text-navy text-2xl font-semibold mb-4">
            About Bach Flower Remedies
          </h2>
          <p className="font-helvetica text-charcoal leading-relaxed mb-6">
            Bach Flower Remedies work on an emotional level, helping to restore balance when we experience
            negative emotions such as fear, worry, indecision, or despondency. Each of the 38 remedies
            corresponds to a specific emotional state.
          </p>

          <h3 className="font-georgia text-navy text-xl font-medium mb-3">
            The 38 Remedies
          </h3>
          <p className="font-helvetica text-charcoal leading-relaxed mb-6">
            Content coming soon. This section will include all 38 Bach Flower Remedies with their
            emotional indications and traditional uses.
          </p>

          <div className="bg-teal/10 border border-teal/30 rounded-2xl p-6">
            <p className="font-helvetica text-charcoal text-sm leading-relaxed">
              <strong className="text-navy">Note:</strong> Bach Flower Remedies complement but do not replace
              professional medical or psychological care. For serious emotional concerns, please consult
              with a qualified healthcare provider.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

