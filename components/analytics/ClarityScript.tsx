"use client";

import { useEffect } from "react";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function ClarityScript() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID || typeof window === "undefined") return;

    // Check if Clarity is already initialized
    if ((window as any).clarity) {
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
    `;
    document.head.appendChild(script);

    return () => {
      // Clarity doesn't support cleanup, but we can check if it exists
      if ((window as any).clarity) {
        // Remove script if needed
        const existingScript = document.querySelector('script[src*="clarity.ms"]');
        if (existingScript) {
          existingScript.remove();
        }
      }
    };
  }, []);

  return null;
}

