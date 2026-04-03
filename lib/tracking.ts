"use client";

// Analytics tracking function - wired to GA4
// Converts legacy string event names to proper AnalyticsEvent types

import { trackGA4Event } from "@/lib/analytics/ga4";
import { createClickCTAEvent, AnalyticsEvent } from "@/lib/analytics/events";

// Generate or retrieve client ID from localStorage
function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "";

  let clientId = localStorage.getItem("analytics_client_id");
  if (!clientId) {
    clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("analytics_client_id", clientId);
  }
  return clientId;
}

// Get current page path
function getCurrentPagePath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

// Convert legacy string event to AnalyticsEvent
function convertLegacyEvent(
  event: string,
  data?: Record<string, any>
): AnalyticsEvent | null {
  const pagePath = getCurrentPagePath();

  switch (event) {
    case "consult_cta_click":
      return createClickCTAEvent(
        "Consult Bahola",
        "https://bahola.co/consult",
        pagePath
      );

    case "buy_click":
      const productSlug = data?.productSlug || "unknown";
      return createClickCTAEvent(
        "Buy from Bahola",
        `https://bahola.co/products/${productSlug}`,
        pagePath
      );

    case "coursepromo_click":
      return createClickCTAEvent(
        "Course Promo (Skolapro/HomeopathyMasters)",
        "https://skolapro.com",
        pagePath
      );

    case "remedyfor_click":
      return createClickCTAEvent(
        "RemedyFor AI",
        "https://remedyfor.co",
        pagePath
      );

    case "pbr_cta_click":
      return createClickCTAEvent(
        "Bahola PBR Research",
        "https://baholahomeopathy.org/pbr",
        pagePath
      );

    case "email_signup_attempt":
      // Track as CTA click with email in destination for reference
      const email = data?.email || "unknown";
      return createClickCTAEvent(
        "Email Signup",
        `email:${email}`, // Store email in destination field
        pagePath
      );

    case "quiz_answer":
      // Track quiz interactions as CTA clicks
      const answerValue = data?.val || "unknown";
      return createClickCTAEvent(
        "Quiz Answer",
        `quiz:${answerValue}`, // Store answer in destination field
        pagePath
      );

    default:
      // Unknown event - log warning but don't break
      console.warn(`Unknown tracking event: ${event}`);
      return null;
  }
}

// Main tracking function - maintains backward compatibility
export function track(event: string, data?: Record<string, any>) {
  // Only run in browser
  if (typeof window === "undefined") {
    return;
  }

  try {
    // Convert legacy event to AnalyticsEvent
    const analyticsEvent = convertLegacyEvent(event, data);
    
    if (!analyticsEvent) {
      // Unknown event type - already logged warning in convertLegacyEvent
      return;
    }

    // Client-side tracking (immediate)
    trackGA4Event(analyticsEvent);

    // Server-side tracking (for accuracy and reliability)
    const clientId = getOrCreateClientId();
    
    // Fire and forget - don't block UI
    fetch("/api/analytics/ga4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: analyticsEvent, clientId }),
    }).catch((error) => {
      // Silently handle errors - don't break user experience
      console.error("Failed to send event to server:", error);
    });
  } catch (error) {
    // Gracefully handle any errors - don't break the UI
    console.error("Error in track function:", error);
  }
}
