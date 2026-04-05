export default function PerformanceAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Performance & UX</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Core Web Vitals per page type, Clarity rage-clicks, and dead-clicks for quick fixes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Core Web Vitals</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            LCP, CLS, INP metrics by page type (Remedy, Condition, Article).
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Vercel Speed Insights integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Page Performance</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Performance alerts and deploy impact analysis.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Vercel Analytics integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Rage Clicks</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Microsoft Clarity rage-click data for UX issues.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Clarity integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Dead Clicks</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Non-interactive elements users try to click (UX improvements).
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Clarity dead-click data needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

