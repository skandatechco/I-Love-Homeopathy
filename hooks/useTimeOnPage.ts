"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "./useAnalytics";
import { ContentType } from "@/lib/analytics/events";

interface UseTimeOnPageOptions {
  contentType: ContentType;
  contentSlug?: string;
  pagePath: string;
}

const TIME_BUCKETS = [
  { threshold: 10000, bucket: "0-10s" as const },
  { threshold: 30000, bucket: "10-30s" as const },
  { threshold: 90000, bucket: "30-90s" as const },
  { threshold: Infinity, bucket: "90s+" as const },
];

export function useTimeOnPage({
  contentType,
  contentSlug,
  pagePath,
}: UseTimeOnPageOptions) {
  const { trackEvent } = useAnalytics();
  const startTime = useRef<number>(Date.now());
  const trackedBuckets = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    startTime.current = Date.now();

    // Check time buckets at intervals
    const intervals = TIME_BUCKETS.map(({ threshold, bucket }) => {
      if (threshold === Infinity) return null;

      return setTimeout(() => {
        if (!trackedBuckets.current.has(bucket)) {
          trackedBuckets.current.add(bucket);
          trackEvent({
            event_name: "time_on_page_bucket",
            time_bucket: bucket,
            content_type: contentType,
            content_slug: contentSlug,
            page_path: pagePath,
          });
        }
      }, threshold);
    });

    // Track final bucket when user leaves (90s+)
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime.current;
      if (timeSpent >= 90000 && !trackedBuckets.current.has("90s+")) {
        // Use sendBeacon for reliable tracking on page unload
        const event = {
          event_name: "time_on_page_bucket",
          time_bucket: "90s+" as const,
          content_type: contentType,
          content_slug: contentSlug,
          page_path: pagePath,
        };
        navigator.sendBeacon(
          "/api/analytics/ga4",
          JSON.stringify({
            event,
            clientId: localStorage.getItem("analytics_client_id") || "",
          })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearTimeout(interval);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [contentType, contentSlug, pagePath, trackEvent]);
}

