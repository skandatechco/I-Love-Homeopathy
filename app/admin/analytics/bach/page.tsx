export default function BachAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Bach Flowers Analytics</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Emotion group interest, top pages, and onward clicks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Top Bach Pages</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Most viewed Bach Flower remedy pages.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>GA4 data integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Emotion Groups</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Interest by emotion category (Fear, Uncertainty, Loneliness, etc.).
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Event tracking needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

