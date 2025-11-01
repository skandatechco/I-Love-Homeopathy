"use client";

import { useEffect } from "react";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function PlausibleScript() {
  useEffect(() => {
    if (!PLAUSIBLE_DOMAIN || typeof window === "undefined") return;

    // Check if script already exists
    if (document.querySelector(`script[data-domain="${PLAUSIBLE_DOMAIN}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", PLAUSIBLE_DOMAIN);
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[data-domain="${PLAUSIBLE_DOMAIN}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}

