export default function ConditionsAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Conditions Hub Analytics</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Entry paths, top systems, bounce rates, and onward navigation flows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Top Systems</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Most viewed condition categories by topic_group.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Analytics data integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Entry Paths</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            How users arrive at condition pages.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>GA4 traffic source data needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Bounce vs Onward Readers</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Comparison of users who leave vs continue to Remedies or Articles.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Navigation flow analysis needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Onward Path Flow</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Where users go from conditions: Remedies, Articles, or other sections.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Path visualization needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

