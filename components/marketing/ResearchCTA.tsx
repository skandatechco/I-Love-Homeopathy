"use client";
import { track } from "@/lib/tracking";

export default function ResearchCTA() {
  const href = "https://baholahomeopathy.org/pbr";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("pbr_cta_click")}
      className="block rounded-card border border-gray-300 bg-white p-4 text-xs leading-relaxed hover:bg-gray-50"
    >
      <div className="font-semibold text-sm text-[#1a1a1a]">
        Join Bahola PBR Research Programme
      </div>
      <div className="text-gray-600 mt-1">
        If you're BHMS / MD(Hom) and want to contribute to evidence-based
        homeopathy, participate in ongoing Practice-Based Research.
      </div>
    </a>
  );
}
