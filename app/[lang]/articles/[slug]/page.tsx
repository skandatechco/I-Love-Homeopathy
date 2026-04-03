import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleHref } from "@/lib/content";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";
import UrgentCareWarning from "@/components/compliance/UrgentCareWarning";
import ConsultBaholaCTA from "@/components/marketing/ConsultBaholaCTA";
import RemedyForCTA from "@/components/marketing/RemedyForCTA";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = await getArticleBySlug(lang, slug);
  if (!article) notFound();
  const url = getArticleHref(lang, slug);

  return generateSEO({
    title: article.title,
    description: article.excerpt,
    url,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated,
    author: article.reviewer || article.author,
    tags: article.tags,
    lang,
  });
}

export default async function ArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = await getArticleBySlug(lang, slug);
  if (!article) notFound();
  const url = getArticleHref(lang, slug);

  const structuredData = generateStructuredData({
    type: "Article",
    title: article.title,
    description: article.excerpt,
    url,
    author: article.reviewer || article.author,
    publishedTime: article.date,
    modifiedTime: article.updated,
    tags: article.tags,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-6">
        <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="font-georgia text-charcoal text-lg leading-relaxed">{article.excerpt}</p>
        )}

        <div className="text-[11px] text-sage">
          {article.date ? <>Updated {article.updated || article.date}</> : null}
        </div>

        <UrgentCareWarning
          redFlags={[
            "Severe symptoms should be assessed by a qualified clinician",
            "Breathing difficulty, chest pain, or neurological symptoms need urgent care",
            "Do not delay emergency treatment while reading educational content",
          ]}
        />

        <section className="prose prose-lg max-w-none">
          <MDXRemote source={article.body} />
        </section>

        <ReviewerAttribution reviewer={article.reviewer} />
        <MedicalDisclaimer />

        <div className="grid gap-4 md:grid-cols-2">
          <ConsultBaholaCTA />
          <RemedyForCTA />
        </div>
      </article>
    </>
  );
}
