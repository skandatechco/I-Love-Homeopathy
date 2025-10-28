"use client";
import { track } from "@/lib/tracking";

export default function CoursePromo() {
  const href = "https://skolapro.com"; // placeholder
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("coursepromo_click")}
      className="block rounded-card border border-gray-200 bg-white p-4 text-xs leading-relaxed hover:bg-gray-50"
    >
      <div className="font-semibold text-sm text-[#1a1a1a]">
        Learn with HomeopathyMasters / Skolapro
      </div>
      <div className="text-gray-600 mt-1">
        Webinars, clinical reasoning, and practitioner development.
      </div>
    </a>
  );
}
