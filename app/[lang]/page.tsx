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
    title: "Learn Homeopathy Responsibly",
    description: "I ❤️ Homeopathy - Educational homeopathic resource with BHMS-reviewed content. Learn homeopathy fundamentals, remedy information, evidence-based practices, and when to consult healthcare professionals.",
    url: `/${lang}`,
    lang,
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params;
  const lang = isSupportedLang(langParam) ? langParam : "en";
  
  // Get sample remedies for preview
  const remedies = listDocs(lang, "remedies").slice(0, 3);

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I ❤️ Homeopathy",
    description: "Educational homeopathic resource with BHMS-reviewed content",
    url: `/${lang}`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-ivory to-transparent via-sage/5 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <div>
            <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Homeopathy — the art and science of natural healing
            </h1>

            <p className="font-georgia text-charcoal text-lg leading-relaxed mb-8">
              Gentle, individualised, and deeply respectful of the body's own intelligence.
              Explore how this system of medicine has helped people for over 200 years.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`/${lang}/articles/understanding-homeopathy`}
                className="bg-teal text-navy font-helvetica text-sm font-semibold px-5 py-3 rounded-xl shadow hover:bg-sage hover:text-ivory transition text-center"
              >
                How It Works
              </a>

              <a
                href={`/${lang}/articles/evidence-based-practice`}
                className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition text-center"
              >
                Is it safe?
              </a>
            </div>
          </div>

          {/* Visual / Illustration */}
          <div className="relative">
            <div className="w-full h-64 md:h-80 rounded-2xl bg-white/60 border border-mist shadow-[0_12px_32px_rgba(0,0,0,0.06)] flex items-center justify-center">
              {/* Placeholder: replace with Image component later */}
              <span className="font-cormorant text-sage text-xl italic text-center px-6 leading-relaxed">
                &quot;Healing begins when we listen to the whole person — not just the symptom.&quot;
              </span>
            </div>
            <div className="absolute -z-10 -top-6 -right-6 w-24 h-24 rounded-2xl bg-sage/10 blur-xl" />
          </div>
        </div>
      </section>

      {/* Why Homeopathy Section */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-playfair text-navy text-3xl md:text-4xl font-semibold mb-4">
            Why choose homeopathy?
          </h2>
          <p className="font-georgia text-charcoal/80 text-lg leading-relaxed max-w-3xl mx-auto mb-12">
            A medical system built on individualisation, observation, and respect
            for the body's natural intelligence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Holistic", desc: "Treats the person, not just the disease." },
              { title: "Gentle", desc: "Safe and suitable for all ages." },
              { title: "Informed", desc: "Guided by clinical experience and ongoing research." },
              { title: "Sustainable", desc: "Rooted in nature, minimally wasteful." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-mist p-6 text-left shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
              >
                <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center font-helvetica font-semibold text-sm mb-4">
                  {i + 1}
                </div>
                <div className="font-helvetica text-navy font-semibold text-lg mb-2">
                  {item.title}
                </div>
                <div className="font-helvetica text-charcoal text-sm leading-relaxed">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remedies Library Preview */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="font-playfair text-navy text-3xl md:text-4xl font-semibold mb-4">
                Explore the world of remedies
              </h2>
              <p className="font-georgia text-charcoal/80 text-lg leading-relaxed">
                Every remedy tells a story — of nature, human emotion, and healing.
              </p>
            </div>
            <a
              href={`/${lang}/remedies`}
              className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
            >
              Browse all remedies →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {remedies.length > 0 ? (
              remedies.map((r, i) => (
                <div
                  key={r.slug}
                  className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
                >
                  <div className="font-helvetica text-navy font-semibold text-lg mb-2">
                    {r.title}
                  </div>
                  <div className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
                    {r.summary || "Discover the unique characteristics and healing potential of this remedy."}
                  </div>
                  <a
                    href={getRemedyHref(lang, r.slug)}
                    className="text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4"
                  >
                    Read more →
                  </a>
                </div>
              ))
            ) : (
              // Fallback content
              [
                {
                  name: "Arsenicum Album",
                  desc: "Restlessness, anxiety, the need for order and safety.",
                },
                {
                  name: "Belladonna",
                  desc: "Sudden intensity: heat, throbbing sensations, vivid expression.",
                },
                {
                  name: "Nux Vomica",
                  desc: "Stress, overwork, irritability, mental overload.",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
                >
                  <div className="font-helvetica text-navy font-semibold text-lg mb-2">
                    {r.name}
                  </div>
                  <div className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
                    {r.desc}
                  </div>
                  <a
                    href={`/${lang}/remedies/${r.name.toLowerCase().replace(/ /g, "-")}`}
                    className="text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4"
                  >
                    Read more →
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Doctors' Corner */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-playfair text-navy text-3xl md:text-4xl font-semibold mb-4 max-w-3xl">
            Hear what the world's leading homeopaths have to say
          </h2>
          <p className="font-georgia text-charcoal/80 text-lg leading-relaxed max-w-3xl mb-10">
            Conversations with clinicians, researchers, and teachers shaping the practice of modern homeopathy.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Dr. Rajan Sankaran",
                loc: "India",
                quote: "\"Every remedy is a reflection of human nature.\"",
              },
              {
                name: "Dr. Martien Brands",
                loc: "Netherlands",
                quote: "\"Integrating evidence with empathy is the medicine of tomorrow.\"",
              },
              {
                name: "Dr. Nancy Herrick",
                loc: "USA",
                quote: "\"Each remedy tells a story, if we listen deeply.\"",
              },
            ].map((doc, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-sage/20 flex items-center justify-center text-sage font-helvetica text-sm font-semibold">
                    {/* Replace with Image component of doctor */}
                    Dr
                  </div>
                  <div>
                    <div className="font-helvetica text-navy font-semibold text-base">
                      {doc.name}
                    </div>
                    <div className="font-helvetica text-charcoal/70 text-xs">{doc.loc}</div>
                  </div>
                </div>

                <blockquote className="font-cormorant text-sage text-lg italic leading-relaxed flex-grow">
                  {doc.quote}
                </blockquote>

                <a
                  href={`/${lang}/doctors-corner`}
                  className="mt-4 text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
                >
                  Read interview →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories of Healing */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h2 className="font-playfair text-navy text-3xl md:text-4xl font-semibold mb-4">
                Stories of healing and transformation
              </h2>
              <p className="font-georgia text-charcoal/80 text-lg leading-relaxed">
                Real experiences from people who found balance with homeopathy.
                Personal journeys, not promises.
              </p>
            </div>

            <a
              href={`/${lang}/remedy-resonance`}
              className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
            >
              Read stories →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "\"I finally felt listened to.\"",
                body: "After months of feeling dismissed, I met a homeopath who asked about my sleep, fears, stress, even childhood patterns — not just my pain.",
              },
              {
                title: "\"It wasn't instant. It was steady.\"",
                body: "For me it wasn't a miracle overnight. It was gradual, and it felt like my system was settling back into itself.",
              },
            ].map((story, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]"
              >
                <div className="font-cormorant text-sage text-xl italic leading-relaxed mb-3">
                  {story.title}
                </div>
                <div className="font-helvetica text-charcoal text-sm leading-relaxed">
                  {story.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
