import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug } from "@/lib/mdx";
import { getGuideHref } from "@/lib/content";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";
import ConsultBaholaCTA from "@/components/marketing/ConsultBaholaCTA";
import RemedyForCTA from "@/components/marketing/RemedyForCTA";
import Quiz from "@/components/interactive/Quiz";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const { meta } = getDocBySlug(lang, "guides", slug);
  const url = getGuideHref(lang, slug);

  return generateSEO({
    title: meta.title,
    description: meta.summary || `Learn about ${meta.title} - educational homeopathic guide with BHMS review.`,
    url,
    type: "article",
    publishedTime: meta.date,
    author: meta.reviewer || meta.author,
    tags: meta.tags,
    lang,
  });
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const { meta, content } = getDocBySlug(lang, "guides", slug);
  const url = getGuideHref(lang, slug);

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
      <h1 className="text-2xl font-semibold text-[#1a1a1a]">{meta.title}</h1>

      {meta.summary && (
        <p className="text-sm text-gray-600 mt-1 max-w-prose">{meta.summary}</p>
      )}

      <div className="text-[11px] text-gray-400 mt-2">
        {meta.date ? <>Updated {meta.date}</> : null}
      </div>

      <UrgentCareWarning
        redFlags={[
          "Symptoms are rapidly getting worse",
          "Severe pain, trauma, or neurological symptoms",
          "Child is listless or unresponsive",
          "Breathing difficulty at rest"
        ]}
      />

      <section className="mt-6 prose prose-sm max-w-none">
        <MDXRemote source={content} />
      </section>

      <ReviewerAttribution reviewer={meta.reviewer} />
      <MedicalDisclaimer />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ConsultBaholaCTA />
        <RemedyForCTA />
        <Quiz />
      </div>
    </article>
    </>
  );
}
