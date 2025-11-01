export default function BaholaOutboundPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Bahola Outbound Tracking</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Count and rate of click_outbound events to bahola.co by source page.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Outbound Clicks</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Total clicks to bahola.co tracked via click_outbound events.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Event tracking integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Click Rate by Source</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Which pages generate the most Bahola clicks.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>click_outbound event data needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] md:col-span-2">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Funnel Analysis</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            User journey from content pages → Bahola outbound clicks.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>PostHog/Mixpanel funnel analysis needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

