"use client";
import { track } from "@/lib/tracking";

export default function BuyFromBaholaButton({ productSlug }: { productSlug: string }) {
  const href = `https://bahola.co/products/${productSlug}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("buy_click", { productSlug })}
      className="inline-block rounded-2xl border border-navy text-navy text-sm font-medium px-3 py-2 hover:bg-navy hover:text-white transition"
    >
      Buy from Bahola.co →
    </a>
  );
}
