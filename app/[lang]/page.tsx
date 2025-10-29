import { isSupportedLang } from "@/lib/i18n";
import { listDocs } from "@/lib/mdx";
import { getRemedyHref, getGuideHref } from "@/lib/content";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import Card from "@/components/ui/Card";
import ConsultBaholaCTA from "@/components/marketing/ConsultBaholaCTA";
import CoursePromo from "@/components/marketing/CoursePromo";
import RemedyForCTA from "@/components/marketing/RemedyForCTA";
import EmailSignup from "@/components/marketing/EmailSignup";

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
  const remedies = listDocs(lang, "remedies").slice(0, 3);
  const guides = listDocs(lang, "guides").slice(0, 3);

  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I ❤️ Homeopathy",
    description: "Educational homeopathic resource with BHMS-reviewed content",
    url: `/${lang}`,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <section className="space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="section-headline">
            I ❤️ Homeopathy
          </h1>
          <p className="text-base leading-relaxed max-w-prose text-charcoal">
            Gentle, responsible guidance on traditional homeopathic practice.
            Learn when self-care is reasonable, when to consult a doctor, and
            how Bahola supports education, clinical care, and research.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-2">
            <div className="text-sm font-semibold text-navy font-georgia">
              Common Conditions
            </div>
            <div className="text-xs text-charcoal/70">
              When you should seek urgent care, and when you can monitor.
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {guides.map((g) => (
                <li key={g.slug}>
                  <a
                    className="text-teal hover:text-gold hover:underline"
                    href={getGuideHref(lang, g.slug)}
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-2">
            <div className="text-sm font-semibold text-navy font-georgia">
              Remedy Library
            </div>
            <div className="text-xs text-charcoal/70">
              Keynotes, traditional indications, safety.
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {remedies.map((r) => (
                <li key={r.slug}>
                  <a
                    className="text-teal hover:text-gold hover:underline"
                    href={getRemedyHref(lang, r.slug)}
                  >
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <ConsultBaholaCTA />
          <CoursePromo />
          <RemedyForCTA />
          <EmailSignup />
        </div>
      </section>
    </>
  );
}
