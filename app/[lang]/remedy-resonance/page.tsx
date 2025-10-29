import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Stories of Healing and Transformation",
    description: "Real experiences from people who found balance with homeopathy. Personal journeys of healing, not medical claims.",
    url: `/${lang}/remedy-resonance`,
    lang,
  });
}

export default async function RemedyResonancePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Stories of Healing",
    description: "Personal healing journeys with homeopathy",
    url: `/${lang}/remedy-resonance`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto pt-24 pb-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Stories of Healing and Transformation
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Real experiences from people who found balance with homeopathy.
            These are personal journeys, not promises — shared with the hope that others
            may find resonance in their own path to wellness.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "\"I finally felt listened to.\"",
              body: "After months of feeling dismissed, I met a homeopath who asked about my sleep, fears, stress, even childhood patterns — not just my pain.",
              author: "Anonymous",
            },
            {
              title: "\"It wasn't instant. It was steady.\"",
              body: "For me it wasn't a miracle overnight. It was gradual, and it felt like my system was settling back into itself.",
              author: "Anonymous",
            },
            {
              title: "\"Understanding the whole picture helped.\"",
              body: "What I appreciated most was how my homeopath looked at everything together — my physical symptoms, my energy, my emotional state. It felt holistic in a way I hadn't experienced before.",
              author: "Anonymous",
            },
            {
              title: "\"Gentle and respectful.\"",
              body: "The approach was so gentle. No harsh treatments, no pushing. Just working with my body's natural capacity to heal, and I appreciated the respect for that process.",
              author: "Anonymous",
            },
          ].map((story, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
            >
              <div className="font-cormorant text-sage text-xl italic leading-relaxed mb-3">
                {story.title}
              </div>
              <div className="font-helvetica text-charcoal text-sm leading-relaxed mb-3">
                {story.body}
              </div>
              <div className="font-helvetica text-charcoal/60 text-xs">
                — {story.author}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-teal/10 border border-teal/30 rounded-2xl p-6">
          <p className="font-helvetica text-charcoal text-sm leading-relaxed">
            <strong className="text-navy">Important:</strong> These are individual experiences and do not
            constitute medical advice. Results vary, and homeopathy is not a substitute for professional
            medical care. Always consult with qualified healthcare providers for serious health concerns.
          </p>
        </div>
      </article>
    </>
  );
}

