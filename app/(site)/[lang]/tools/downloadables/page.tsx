import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Downloadables",
    description: "Printable guides, checklists, and reference materials for homeopathic practice. Download PDFs and resources for offline use.",
    url: `/${lang}/tools/downloadables`,
    lang,
  });
}

export default async function DownloadablesPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Downloadables",
    description: "Printable guides and reference materials",
    url: `/${lang}/tools/downloadables`,
  });

  const downloadables = [
    {
      title: "Home Kit Checklist",
      description: "Essential remedies to keep at home and when to use them.",
      format: "PDF",
      size: "Coming soon",
    },
    {
      title: "Case-Taking Guide",
      description: "A printable checklist for recording symptoms and observations.",
      format: "PDF",
      size: "Coming soon",
    },
    {
      title: "Potency Guide Reference",
      description: "Quick reference for understanding potencies and dosing principles.",
      format: "PDF",
      size: "Coming soon",
    },
    {
      title: "Red Flags Checklist",
      description: "When to seek immediate medical care - printable reference.",
      format: "PDF",
      size: "Coming soon",
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Downloadables
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Printable guides, checklists, and reference materials for your homeopathic journey.
            Download PDFs and resources for offline use and reference.
          </p>
        </div>

        <div className="space-y-4">
          {downloadables.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-2">
                  {item.description}
                </p>
                <div className="flex gap-4 text-xs text-charcoal/60">
                  <span>{item.format}</span>
                  <span>{item.size}</span>
                </div>
              </div>
              <button
                disabled
                className="ml-6 px-4 py-2 bg-mist text-charcoal/60 rounded-xl font-helvetica text-sm font-medium cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

