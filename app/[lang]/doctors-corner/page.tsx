import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Doctors' Corner",
    description: "Hear from leading homeopaths, clinicians, and researchers about homeopathic practice, case studies, and modern applications.",
    url: `/${lang}/doctors-corner`,
    lang,
  });
}

export default async function DoctorsCornerPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Doctors' Corner",
    description: "Interviews and insights from leading homeopaths",
    url: `/${lang}/doctors-corner`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Doctors' Corner
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Conversations with clinicians, researchers, and teachers shaping the practice of modern homeopathy.
            Learn from the experiences and insights of leading practitioners from around the world.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Dr. Rajan Sankaran",
              location: "India",
              specialty: "Sensations Method",
              quote: '"Every remedy is a reflection of human nature."',
            },
            {
              name: "Dr. Martien Brands",
              location: "Netherlands",
              specialty: "Evidence Integration",
              quote: '"Integrating evidence with empathy is the medicine of tomorrow."',
            },
            {
              name: "Dr. Nancy Herrick",
              location: "USA",
              specialty: "Clinical Practice",
              quote: '"Each remedy tells a story, if we listen deeply."',
            },
          ].map((doctor, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-sage/20 flex items-center justify-center text-sage font-helvetica text-sm font-semibold">
                  Dr
                </div>
                <div>
                  <div className="font-helvetica text-navy font-semibold text-base">
                    {doctor.name}
                  </div>
                  <div className="font-helvetica text-charcoal/70 text-xs">
                    {doctor.location}
                  </div>
                  <div className="font-helvetica text-sage text-xs mt-1">
                    {doctor.specialty}
                  </div>
                </div>
              </div>

              <blockquote className="font-cormorant text-sage text-lg italic leading-relaxed flex-grow mb-4">
                {doctor.quote}
              </blockquote>

              <a
                href={`/${lang}/doctors-corner/${doctor.name.toLowerCase().replace(/ /g, "-").replace(/\./g, "")}`}
                className="text-teal font-helvetica text-sm font-medium underline underline-offset-4 hover:text-sage transition"
              >
                Read interview →
              </a>
            </div>
          ))}
        </div>

        <div className="bg-ivory rounded-2xl border border-mist p-8">
          <p className="font-helvetica text-charcoal leading-relaxed">
            More interviews coming soon. This section will feature in-depth conversations with homeopaths
            about their clinical experiences, research insights, and perspectives on the future of homeopathic practice.
          </p>
        </div>
      </article>
    </>
  );
}

