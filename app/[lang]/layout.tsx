import { isSupportedLang } from "@/lib/i18n";

export default function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // we could add localized <html lang={...}/> later if we split layouts
  if (!isSupportedLang(params.lang)) {
    // in future: redirect to defaultLang
  }
  return <>{children}</>;
}
