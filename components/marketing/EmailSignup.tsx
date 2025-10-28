"use client";
import { useState } from "react";
import { track } from "@/lib/tracking";

export default function EmailSignup() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Future: send to Klaviyo / Brevo API route
    track("email_signup_attempt", { email });
    alert("Thanks! We'll keep you posted.");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-gray-200 bg-white p-4 text-xs leading-relaxed"
    >
      <div className="font-semibold text-sm text-[#1a1a1a]">
        Get updates (articles, webinars, research calls)
      </div>
      <div className="text-gray-600 mt-1">
        No spam. You can unsubscribe any time.
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          required
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-card bg-baholaNavy text-white px-3 py-1.5 text-xs font-medium hover:bg-baholaNavy/90"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
