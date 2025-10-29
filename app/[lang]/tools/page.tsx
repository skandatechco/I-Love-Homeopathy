import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Tools",
    description: "Practical utilities and resources for your homeopathic journey. Glossary, remedy finder, and downloadable guides.",
    url: `/${lang}/tools`,
    lang,
  });
}

export default async function ToolsPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Tools",
    description: "Practical utilities for homeopathic practice",
    url: `/${lang}/tools`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Tools</h1>
        <p className="text-base leading-relaxed text-charcoal max-w-3xl">
          Practical utilities and resources for your homeopathic journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <a
          href={`/${lang}/tools/glossary`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-medium text-navy mb-2 group-hover:underline">
            Glossary
          </h3>
          <p className="text-sm text-charcoal/70">
            Definitions of homeopathic terms and concepts.
          </p>
        </a>

        <a
          href={`/${lang}/tools/remedy-finder`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-medium text-navy mb-2 group-hover:underline">
            Remedy Finder
          </h3>
          <p className="text-sm text-charcoal/70">
            Search and discover remedies by symptoms or name. High-level tool with links to Maya/Dr. Maya.
          </p>
        </a>

        <a
          href={`/${lang}/tools/downloadables`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-medium text-navy mb-2 group-hover:underline">
            Downloadables
          </h3>
          <p className="text-sm text-charcoal/70">
            Printable guides, checklists, and reference materials.
          </p>
        </a>
      </div>
    </article>
    </>
  );
}

