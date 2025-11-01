"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

declare global {
  interface Window {
    posthog?: any;
  }
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === "undefined") return;

    // Initialize PostHog
    if (!window.posthog) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            posthog.debug();
          }
        },
      });
    }

    return () => {
      // PostHog cleanup if needed
    };
  }, []);

  return <>{children}</>;
}

