import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Research & Evidence",
    description: "Explore research on homeopathy, evidence-based practice, and connect with Bahola's Practice-Based Research initiatives.",
    url: `/${lang}/research`,
    lang,
  });
}

export default async function ResearchPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Research & Evidence",
    description: "Research on homeopathy and evidence-based practice",
    url: `/${lang}/research`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Research & Evidence
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Explore the scientific evidence, understand research methods, and learn to critically
            evaluate claims about homeopathy. Connect with Bahola's Practice-Based Research initiatives
            to contribute to the growing body of homeopathic knowledge.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h2 className="font-playfair text-navy text-2xl font-semibold mb-4">
              Study Summaries
            </h2>
            <p className="font-helvetica text-charcoal leading-relaxed mb-4">
              Research summaries with question → methods → results → limitations → bottom line format.
            </p>
            <a
              href={`/${lang}/evidence/study-summaries`}
              className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
            >
              Browse studies →
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h2 className="font-playfair text-navy text-2xl font-semibold mb-4">
              Methods 101
            </h2>
            <p className="font-helvetica text-charcoal leading-relaxed mb-4">
              Understanding placebo controls, RCTs, meta-analyses, confounding, and publication bias.
            </p>
            <a
              href={`/${lang}/evidence/methods-101`}
              className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
            >
              Learn methods →
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h2 className="font-playfair text-navy text-2xl font-semibold mb-4">
              Claims Checker
            </h2>
            <p className="font-helvetica text-charcoal leading-relaxed mb-4">
              Myth vs evidence with citations, debunking common misconceptions.
            </p>
            <a
              href={`/${lang}/evidence/claims-checker`}
              className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
            >
              Check claims →
            </a>
          </div>

          <div className="bg-navy rounded-2xl border border-navy p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] text-cream">
            <h2 className="font-playfair text-cream text-2xl font-semibold mb-4">
              Practice-Based Research
            </h2>
            <p className="font-helvetica text-cream/90 leading-relaxed mb-4">
              Contribute to Bahola's Practice-Based Research initiatives. Help build the evidence base
              by sharing your clinical experiences (anonymized) and participating in research studies.
            </p>
            <a
              href={`/${lang}/research/pbr`}
              className="inline-block border-2 border-cream text-cream font-helvetica text-sm font-semibold px-5 py-3 rounded-xl hover:bg-cream hover:text-navy transition"
            >
              Learn More →
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

