import { generateSEO } from "@/lib/seo";
import RemedyFinderClient from "./RemedyFinderClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return generateSEO({
    title: "Remedy Finder",
    description: "Search and discover homeopathic remedies by name or symptoms. High-level tool to help identify potential remedies for your needs.",
    url: `/${lang}/tools/remedy-finder`,
    lang,
  });
}

export default async function RemedyFinderPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <RemedyFinderClient lang={lang} />;
}
