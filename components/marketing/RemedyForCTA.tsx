"use client";
import { track } from "@/lib/tracking";

export default function RemedyForCTA() {
  const href = "https://remedyfor.co"; // placeholder
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("remedyfor_click")}
      className="block rounded-card border border-baholaGold bg-white p-4 text-xs leading-relaxed hover:bg-baholaGold/10"
    >
      <div className="font-semibold text-sm text-[#1a1a1a]">
        Try RemedyFor AI
      </div>
      <div className="text-gray-700 mt-1">
        Guidance on matching patterns and red flags, not a diagnosis.
      </div>
    </a>
  );
}
