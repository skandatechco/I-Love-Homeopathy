"use client";

import { usePathname } from "next/navigation";
import { isSupportedLang, SUPPORTED_LANGS } from "@/lib/i18n";

export default function LangSwitcher() {
  const pathname = usePathname() || "/";
  // naive extraction: first segment after "/" is lang
  const parts = pathname.split("/").filter(Boolean);
  const currentLang = parts[0] && isSupportedLang(parts[0]) ? parts[0] : "en";

  function buildHref(newLang: string) {
    if (!parts.length) return `/${newLang}`;
    const [, ...rest] = isSupportedLang(parts[0]) ? parts : ["en", ...parts];
    return `/${newLang}/${rest.join("/")}`;
  }

  return (
    <select
      className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
      defaultValue={currentLang}
      onChange={(e) => {
        window.location.href = buildHref(e.target.value);
      }}
    >
      {SUPPORTED_LANGS.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
