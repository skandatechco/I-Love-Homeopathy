"use client";

import { useEffect, useRef } from "react";

interface GoogleAdUnitProps {
  slot: string;
  format: "rectangle" | "leaderboard" | "responsive";
  className?: string;
}

export default function GoogleAdUnit({
  slot,
  format,
  className,
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);

  const dimensions = {
    rectangle: { width: 300, height: 250 },
    leaderboard: { width: 728, height: 90 },
    responsive: { width: undefined, height: undefined },
  } as const;

  useEffect(() => {
    try {
      const adsbygoogle = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle;
      if (adsbygoogle && adRef.current?.childElementCount === 0) {
        adsbygoogle.push({});
      }
    } catch {
      // ads blocked or script unavailable
    }
  }, []);

  const { width, height } = dimensions[format];
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-rule bg-creamWarm ${className ?? ""}`}
      style={{ minHeight: height || 90 }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: width || "100%",
          height: height || 90,
        }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format === "responsive" ? "auto" : undefined}
        data-full-width-responsive={format === "responsive" ? "true" : undefined}
      />
      {!clientId && (
        <div className="p-4 text-center font-helvetica text-xs text-muted">
          Advertisement
        </div>
      )}
    </div>
  );
}
