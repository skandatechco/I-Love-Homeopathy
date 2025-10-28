"use client";
import { track } from "@/lib/tracking";

export default function ConsultBaholaCTA() {
  const href = "https://bahola.co/consult"; // placeholder
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("consult_cta_click")}
      className="block rounded-card border border-gray-300 bg-white p-4 text-sm leading-relaxed hover:shadow-md"
    >
      <div className="font-semibold text-[#1a1a1a]">
        Consult Bahola Clinic
      </div>
      <div className="text-gray-600 text-xs mt-1">
        Talk to an experienced homeopathic doctor for personalised guidance.
      </div>
    </a>
  );
}
