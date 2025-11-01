"use client";

import { useCallback } from "react";
import { trackGA4Event } from "@/lib/analytics/ga4";
import { AnalyticsEvent } from "@/lib/analytics/events";

// Generate a simple client ID (in production, use a more robust method)
function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";

  let clientId = localStorage.getItem("analytics_client_id");
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("analytics_client_id", clientId);
  }
  return clientId;
}

export function useAnalytics() {
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    // Client-side tracking (immediate)
    trackGA4Event(event);

    // Server-side tracking (for accuracy)
    try {
      const clientId = getOrCreateClientId();
      await fetch("/api/analytics/ga4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event, clientId }),
      });
    } catch (error) {
      console.error("Failed to send event to server:", error);
    }
  }, []);

  return { trackEvent };
}

