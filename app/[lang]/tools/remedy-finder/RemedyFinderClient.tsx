"use client";

import { useState } from "react";

export default function RemedyFinderClient({ lang }: { lang: string }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="font-playfair text-navy text-4xl md:text-5xl font-semibold leading-tight">
          Remedy Finder
        </h1>
        <p className="font-georgia text-charcoal text-lg leading-relaxed max-w-3xl">
          Search and discover homeopathic remedies by name or symptoms.
          This is a high-level tool to help identify potential remedies.
          For deeper analysis and professional guidance, consult with a qualified homeopath
          or explore our partners at Maya and RemedyFor.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by remedy name or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-mist rounded-xl font-helvetica text-charcoal focus:outline-none focus:border-teal transition"
          />
        </div>

        <div className="bg-teal/10 border border-teal/30 rounded-2xl p-6 mb-6">
          <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
            <strong className="text-navy">Advanced Tools:</strong> For comprehensive remedy analysis
            and professional-grade repertorization, we recommend:
          </p>
          <div className="space-y-2">
            <a
              href="https://maya.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4"
            >
              Maya — Professional homeopathic software →
            </a>
            <a
              href="https://remedyfor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4"
            >
              RemedyFor — AI-powered remedy discovery →
            </a>
          </div>
        </div>

        <div className="bg-ivory rounded-xl p-6">
          <p className="font-helvetica text-charcoal text-sm leading-relaxed text-center">
            {searchTerm
              ? `Search results for "${searchTerm}" will appear here (feature coming soon)`
              : "Enter a remedy name or symptom to begin searching"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <h2 className="font-playfair text-navy text-2xl font-semibold mb-4">
          Browse All Remedies
        </h2>
        <p className="font-helvetica text-charcoal text-sm leading-relaxed mb-4">
          Or explore our complete remedy library:
        </p>
        <a
          href={`/${lang}/remedies`}
          className="inline-block text-teal font-helvetica text-sm font-medium hover:text-sage transition underline underline-offset-4"
        >
          View Remedy Library →
        </a>
      </div>
    </article>
  );
}

