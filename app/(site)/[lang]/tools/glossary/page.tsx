import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Glossary - Homeopathic Terms",
    description: "Definitions of homeopathic terms, concepts, and terminology. A comprehensive reference for understanding homeopathic language.",
    url: `/${lang}/tools/glossary`,
    lang,
  });
}

export default async function GlossaryPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Glossary",
    description: "Homeopathic terms and definitions",
    url: `/${lang}/tools/glossary`,
  });

  const glossaryTerms = [
    { term: "Materia Medica", definition: "A reference book or database containing detailed information about remedies, their sources, provings, and clinical applications." },
    { term: "Proving", definition: "The controlled testing of a homeopathic remedy on healthy individuals to document its effects and symptom picture." },
    { term: "Potency", definition: "The strength of a homeopathic remedy, indicated by numbers and letters (e.g., 6C, 30C, 200C), representing the level of dilution and succussion." },
    { term: "Succussion", definition: "The vigorous shaking or striking of a homeopathic preparation during the dilution process, believed to activate the remedy's therapeutic properties." },
    { term: "Constitutional Remedy", definition: "A remedy selected based on a person's overall physical, mental, and emotional characteristics rather than just specific symptoms." },
    { term: "Acute", definition: "A condition with sudden onset and relatively short duration, as opposed to chronic (long-term) conditions." },
    { term: "Chronic", definition: "A long-standing condition that persists or recurs over time, requiring deeper constitutional treatment." },
    { term: "Keynote", definition: "A characteristic, distinctive symptom or feature that strongly points to a particular remedy." },
    { term: "Modalities", definition: "Factors that make symptoms better or worse, such as time of day, weather, movement, rest, or position." },
    { term: "Repertory", definition: "A reference work that lists symptoms and the remedies associated with them, used to aid remedy selection." },
    { term: "Repertorization", definition: "The process of analyzing symptoms using a repertory to identify the most likely remedy." },
    { term: "Similimum", definition: "The most similar remedy that matches the complete symptom picture of the patient." },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Glossary
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Definitions of homeopathic terms, concepts, and terminology to help you
            better understand homeopathic language and practice.
          </p>
        </div>

        <div className="space-y-4">
          {glossaryTerms.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
            >
              <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
                {item.term}
              </h3>
              <p className="font-helvetica text-charcoal text-sm leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

