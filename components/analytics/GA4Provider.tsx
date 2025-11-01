"use client";

import { useEffect } from "react";
import { initializeGA4 } from "@/lib/analytics/ga4";

export default function GA4Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeGA4();
  }, []);

  return <>{children}</>;
}

