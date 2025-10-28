import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocBySlug } from "@/lib/mdx";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import SupportiveCareNote from "@/components/compliance/SupportiveCareNote";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";
import BuyFromBaholaButton from "@/components/marketing/BuyFromBaholaButton";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";
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
      <h1 className="text-2xl font-semibold text-[#1a1a1a]">
        {meta.title}
      </h1>

      {meta.summary && (
        <p className="text-sm text-gray-600 mt-1 max-w-prose">{meta.summary}</p>
      )}

      <div className="text-[11px] text-gray-400 mt-2">
        {meta.date ? <>Updated {meta.date}</> : null}
      </div>

      {/* RED FLAG BLOCK EXAMPLE */}
      <UrgentCareWarning
        redFlags={[
          "High fever not settling",
          "Blood in stool or vomiting blood",
          "Trouble breathing / blue lips",
          "Severe dehydration (no urination, dizziness on standing)"
        ]}
      />

      <section className="mt-6 prose prose-sm max-w-none">
        <MDXRemote source={content} />
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
  );
}
