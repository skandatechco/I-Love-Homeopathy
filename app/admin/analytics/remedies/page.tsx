export default function RemedyEngagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Remedy Engagement</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Top remedies, average read depth, and Condition→Remedy clickthrough rates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Top Remedies</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Most viewed remedies based on view_content events.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>GA4 data integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Average Read Depth</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Average scroll depth (25%, 50%, 75%, 100%) for remedy pages.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>read_depth events tracking needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] md:col-span-2">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Condition → Remedy Flow</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Clickthrough rates from condition pages to remedy pages (condition_to_remedy events).
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Event tracking integration needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

