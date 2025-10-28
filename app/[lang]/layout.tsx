import { isSupportedLang } from "@/lib/i18n";

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // We just validate the lang here. Later we can redirect or fallback.
  if (!isSupportedLang(params.lang)) {
    // In future we might redirect to default language.
    // For now we just render anyway.
  }

  return <>{children}</>;
}
