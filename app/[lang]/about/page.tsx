import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getSiteCopyBySlug, getSiteCopyHref } from "@/lib/content";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import MedicalDisclaimer from "@/components/compliance/MedicalDisclaimer";
import ReviewerAttribution from "@/components/compliance/ReviewerAttribution";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getSiteCopyBySlug(lang, "about");
  if (!page) notFound();

  return generateSEO({
    title: page.title,
    description: page.excerpt,
    url: getSiteCopyHref(lang, "about"),
    type: "article",
    publishedTime: page.date,
    modifiedTime: page.updated,
    author: page.reviewer || page.author,
    tags: page.tags,
    lang,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getSiteCopyBySlug(lang, "about");
  if (!page) notFound();

  const structuredData = generateStructuredData({
    type: "Article",
    title: page.title,
    description: page.excerpt,
    url: getSiteCopyHref(lang, "about"),
    author: page.reviewer || page.author,
    publishedTime: page.date,
    modifiedTime: page.updated,
    tags: page.tags,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="max-w-4xl mx-auto pt-24 pb-8 space-y-6">
        <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
          {page.title}
        </h1>

        {page.excerpt && (
          <p className="font-georgia text-charcoal text-lg leading-relaxed">{page.excerpt}</p>
        )}

        <div className="text-[11px] text-sage">
          {page.date ? <>Updated {page.updated || page.date}</> : null}
        </div>

        <section className="prose prose-lg max-w-none">
          <MDXRemote source={page.body} />
        </section>

        <ReviewerAttribution reviewer={page.reviewer} />
        <MedicalDisclaimer />
      </article>
    </>
  );
}
