"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "./useAnalytics";
import { ContentType } from "@/lib/analytics/events";

interface UseScrollDepthOptions {
  contentType: ContentType;
  contentSlug?: string;
  pagePath: string;
  thresholds?: number[];
}

export function useScrollDepth({
  contentType,
  contentSlug,
  pagePath,
  thresholds = [25, 50, 75, 100],
}: UseScrollDepthOptions) {
  const { trackEvent } = useAnalytics();
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Check each threshold
      thresholds.forEach((threshold) => {
        if (
          scrollPercentage >= threshold &&
          !trackedDepths.current.has(threshold)
        ) {
          trackedDepths.current.add(threshold);
          trackEvent({
            event_name: "read_depth",
            depth_percentage: threshold as 25 | 50 | 75 | 100,
            content_type: contentType,
            content_slug: contentSlug,
            page_path: pagePath,
          });
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [contentType, contentSlug, pagePath, thresholds, trackEvent]);
}

