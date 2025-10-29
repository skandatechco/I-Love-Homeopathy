import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug } from "@/lib/mdx";
import { getRemedyHref } from "@/lib/content";
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
  const { meta } = getDocBySlug(lang, "remedies", slug);
  const url = getRemedyHref(lang, slug);

  return generateSEO({
    title: meta.title,
    description: meta.summary || `Homeopathic remedy ${meta.title} - keynotes, traditional indications, and safety information with BHMS review.`,
    url,
    type: "article",
    publishedTime: meta.date,
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
  const { meta, content } = getDocBySlug(lang, "remedies", slug);
  const url = getRemedyHref(lang, slug);

  const structuredData = generateStructuredData({
    type: "Article",
    title: meta.title,
    description: meta.summary,
    url,
    author: meta.reviewer || meta.author,
    publishedTime: meta.date,
    tags: meta.tags,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="prose max-w-none">
      {/* Title + summary + last updated */}
      <h1 className="text-2xl font-playfair font-semibold text-navy">
        {meta.title}
      </h1>

      {meta.summary && (
        <p className="text-sm text-charcoal/70 mt-1 max-w-prose">
          {meta.summary}
        </p>
      )}

      <div className="text-[11px] text-sage mt-2">
        {meta.date ? <>Updated {meta.date}</> : null}
      </div>

      {/* Red flag / escalation block */}
      <UrgentCareWarning
        redFlags={[
          "High fever that does not settle",
          "Blood in stool or vomiting blood",
          "Trouble breathing, blue lips, wheezing at rest",
          "Severe dehydration (very little urine, dizziness when standing)",
          "Child is unusually drowsy, limp, or not responding normally"
        ]}
      />

      {/* Main MDX content */}
      <section className="mt-6 prose prose-sm max-w-none">
        <MDXRemote source={content} />
      </section>

      {/* Compliance + reviewer */}
      <SupportiveCareNote />
      <ReviewerAttribution reviewer={meta.reviewer} />
      <MedicalDisclaimer />

      {/* Commerce / funnel / quiz */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* We assume productSlug is same as remedy slug for now */}
        <BuyFromBaholaButton productSlug={meta.slug} />
        <Quiz />
      </div>

      {/* Research recruitment block only if researchable: true in frontmatter */}
      {meta.researchable && (
        <div className="mt-8">
          <ResearchCTA />
        </div>
      )}
    </article>
    </>
  );
}

