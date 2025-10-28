"use client";

import { useState } from "react";
import { track } from "@/lib/tracking";

// NOTE: This is a stub. Phase 3 will evolve this into adaptive branching.
export default function Quiz() {
  const [answer, setAnswer] = useState<string | null>(null);

  function handleChoice(val: string) {
    setAnswer(val);
    track("quiz_answer", { val });
  }

  return (
    <div className="rounded-card border border-gray-200 bg-white p-4 text-xs leading-relaxed space-y-3">
      <div className="font-semibold text-sm text-[#1a1a1a]">
        Quick check: How severe is it?
      </div>

      <button
        onClick={() => handleChoice("red_flag")}
        className="block w-full text-left rounded border border-red-300 bg-red-50 px-3 py-2 text-red-800 hover:bg-red-100"
      >
        Severe / alarming / getting worse fast
      </button>

      <button
        onClick={() => handleChoice("mild")}
        className="block w-full text-left rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 hover:bg-white"
      >
        Mild / can monitor / no danger signs
      </button>

      {answer === "red_flag" && (
        <div className="text-[12px] text-red-700">
          Please seek medical attention or book a consult with Bahola Clinic.
        </div>
      )}

      {answer === "mild" && (
        <div className="text-[12px] text-gray-700">
          You can review supportive care and traditional remedies here, and
          explore RemedyFor AI for guidance.
        </div>
      )}
    </div>
  );
}
