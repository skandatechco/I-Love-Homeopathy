import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getRemedyBySlug, getRemedyHref } from "@/lib/content";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import SupportiveCareNote from "@/components/compliance/SupportiveCareNote";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";
import BuyFromBaholaButton from "@/components/marketing/BuyFromBaholaButton";
import ResearchCTA from "@/components/marketing/ResearchCTA";
import Quiz from "@/components/interactive/Quiz";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const meta = await getRemedyBySlug(lang, slug);
  if (!meta) notFound();
  const url = getRemedyHref(lang, slug);

  return generateSEO({
    title: meta.title,
    description: meta.excerpt || `Homeopathic remedy ${meta.title} - keynotes, traditional indications, and safety information with BHMS review.`,
    url,
    type: "article",
    publishedTime: meta.date,
    modifiedTime: meta.updated,
    author: meta.reviewer || meta.author,
    tags: meta.tags,
    lang,
  });
}

export default async function RemedyPage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const meta = await getRemedyBySlug(lang, slug);
  if (!meta) notFound();
  const url = getRemedyHref(lang, slug);

  const structuredData = generateStructuredData({
    type: "Article",
    title: meta.title,
    description: meta.excerpt,
    url,
    author: meta.reviewer || meta.author,
    publishedTime: meta.date,
    modifiedTime: meta.updated,
    tags: meta.tags,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="prose max-w-none">
        <h1 className="text-2xl font-playfair font-semibold text-navy">{meta.title}</h1>

        {meta.excerpt && (
          <p className="text-sm text-charcoal/70 mt-1 max-w-prose">{meta.excerpt}</p>
        )}

        <div className="text-[11px] text-sage mt-2">{meta.date ? <>Updated {meta.date}</> : null}</div>

        <UrgentCareWarning
          redFlags={[
            "High fever that does not settle",
            "Blood in stool or vomiting blood",
            "Trouble breathing, blue lips, wheezing at rest",
            "Severe dehydration (very little urine, dizziness when standing)",
            "Child is unusually drowsy, limp, or not responding normally",
          ]}
        />

        <section className="mt-6 prose prose-sm max-w-none">
          <MDXRemote source={meta.body} />
        </section>

        <SupportiveCareNote />
        <ReviewerAttribution reviewer={meta.reviewer} />
        <MedicalDisclaimer />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BuyFromBaholaButton productSlug={meta.slug} />
          <Quiz />
        </div>

        {meta.researchable && (
          <div className="mt-8">
            <ResearchCTA />
          </div>
        )}
      </article>
    </>
  );
}
