import { isSupportedLang } from "@/lib/i18n";

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // We just validate the lang here. Later we can redirect or fallback.
  if (!isSupportedLang(lang)) {
    // In future we might redirect to default language.
    // For now we just render anyway.
  }

  return <>{children}</>;
}
