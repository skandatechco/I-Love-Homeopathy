// GA4 Analytics Integration
// Server-side event tracking for Google Analytics 4

import { AnalyticsEvent } from "./events";

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
const GA4_API_SECRET = process.env.GA4_API_SECRET;

interface GA4Event {
  name: string;
  params: Record<string, any>;
}

// Convert our analytics event to GA4 format
function convertToGA4Event(event: AnalyticsEvent): GA4Event {
  const baseParams: Record<string, any> = {
    page_path: event.page_path || window.location.pathname,
    page_title: "page_title" in event ? event.page_title : document.title,
    timestamp_micros: Date.now() * 1000,
  };

  switch (event.event_name) {
    case "view_content":
      return {
        name: "view_content",
        params: {
          ...baseParams,
          content_type: event.content_type,
          content_slug: event.content_slug,
          topic_group: event.topic_group,
          author: event.author,
        },
      };

    case "search_site":
      return {
        name: "search",
        params: {
          ...baseParams,
          search_term: event.query,
          search_results_count: event.results_count,
        },
      };

    case "click_internal_nav":
      return {
        name: "click",
        params: {
          ...baseParams,
          link_url: event.to,
          link_text: event.link_text,
          click_type: "internal_navigation",
          from_page: event.from,
        },
      };

    case "click_cta":
      return {
        name: "click",
        params: {
          ...baseParams,
          click_type: "cta",
          cta_label: event.cta_label,
          destination: event.destination,
        },
      };

    case "click_outbound":
      return {
        name: "click",
        params: {
          ...baseParams,
          click_type: "outbound",
          outbound_domain: event.domain,
          outbound_path: event.path,
        },
      };

    case "read_depth":
      return {
        name: "scroll",
        params: {
          ...baseParams,
          scroll_depth: event.depth_percentage,
          content_type: event.content_type,
          content_slug: event.content_slug,
        },
      };

    case "time_on_page_bucket":
      return {
        name: "timing_complete",
        params: {
          ...baseParams,
          timing_category: "page_time",
          timing_value: event.time_bucket,
          content_type: event.content_type,
          content_slug: event.content_slug,
        },
      };

    case "condition_to_remedy":
      return {
        name: "click",
        params: {
          ...baseParams,
          click_type: "condition_to_remedy",
          condition: event.condition,
          remedy: event.remedy,
        },
      };

    case "remedy_to_condition":
      return {
        name: "click",
        params: {
          ...baseParams,
          click_type: "remedy_to_condition",
          remedy: event.remedy,
          condition: event.condition,
        },
      };

    case "share_article":
      return {
        name: "share",
        params: {
          ...baseParams,
          share_method: event.channel,
          content_type: event.content_type,
          content_slug: event.content_slug,
        },
      };

    case "submit_story":
      return {
        name: "form_submit",
        params: {
          ...baseParams,
          form_name: "story_submission",
          story_type: event.story_type,
        },
      };

    default:
      return {
        name: event.event_name,
        params: baseParams,
      };
  }
}

// Client-side tracking (for browser events)
export function trackGA4Event(event: AnalyticsEvent) {
  if (typeof window === "undefined" || !window.gtag) {
    console.warn("GA4 not initialized or gtag not available");
    return;
  }

  const ga4Event = convertToGA4Event(event);
  window.gtag("event", ga4Event.name, ga4Event.params);
}

// Server-side tracking via Measurement Protocol
export async function trackGA4EventServer(event: AnalyticsEvent, clientId: string) {
  if (!GA4_MEASUREMENT_ID || !GA4_API_SECRET) {
    console.warn("GA4 credentials not configured");
    return;
  }

  const ga4Event = convertToGA4Event(event);
  
  const payload = {
    client_id: clientId,
    events: [
      {
        name: ga4Event.name,
        params: ga4Event.params,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      console.error("Failed to send GA4 event:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending GA4 event:", error);
  }
}

// Initialize GA4 script
export function initializeGA4() {
  if (typeof window === "undefined" || !GA4_MEASUREMENT_ID) {
    return;
  }

  // Add gtag script if not already loaded
  if (!document.querySelector(`script[src*="google-analytics.com"]`)) {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA4_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

