import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Conditions",
    description: "Educational guides on common health conditions from a homeopathic perspective. Learn about supportive care, when to seek medical attention, and homeopathic approaches.",
    url: `/${lang}/conditions`,
    lang,
  });
}

export default async function ConditionsPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "Conditions",
    description: "Educational guides on common health conditions",
    url: `/${lang}/conditions`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-7xl mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
            Conditions
          </h1>
          <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
            Educational guides on common health conditions from a homeopathic perspective.
            These guides emphasize supportive care, when to seek medical attention,
            and how homeopathy may play a role alongside conventional care.
          </p>
        </div>

        <div className="bg-teal/10 border border-teal/30 rounded-2xl p-6 mb-8">
          <p className="font-helvetica text-charcoal text-sm leading-relaxed">
            <strong className="text-navy">Important:</strong> These guides are for educational
            purposes only. They do not provide diagnoses, cure guarantees, or replace professional
            medical advice. Always consult qualified healthcare providers for medical concerns.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Respiratory Conditions
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Cold, cough, bronchitis, allergies
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Digestive Conditions
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Indigestion, diarrhea, constipation
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Skin Conditions
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Eczema, acne, rashes, wounds
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Mental & Emotional
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Anxiety, stress, mood disorders
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Women's Health
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Menstrual issues, menopause, pregnancy support
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
            <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">
              Children's Health
            </h3>
            <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
              Common childhood conditions and support
            </p>
            <p className="font-helvetica text-charcoal/60 text-xs">
              Content coming soon
            </p>
          </div>
        </div>
      </article>
    </>
  );
}

