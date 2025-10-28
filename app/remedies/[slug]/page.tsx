import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug } from "@/lib/mdx";

import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import SupportiveCareNote from "@/components/compliance/SupportiveCareNote";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";

import BuyFromBaholaButton from "@/components/marketing/BuyFromBaholaButton";
import ResearchCTA from "@/components/marketing/ResearchCTA";
import Quiz from "@/components/interactive/Quiz";

export default function RemedyPage({
  params
}: {
  params: { lang: string; slug: string };
}) {
  const { meta, content } = getDocBySlug(params.lang, "remedies", params.slug);

  return (
    <article className="prose max-w-none">
      {/* Title + summary + last updated */}
      <h1 className="text-2xl font-semibold text-[#1a1a1a]">
        {meta.title}
      </h1>

      {meta.summary && (
        <p className="text-sm text-gray-600 mt-1 max-w-prose">
          {meta.summary}
        </p>
      )}

      <div className="text-[11px] text-gray-400 mt-2">
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
  );
}
