export default function SEOAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">SEO & Discovery</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Google Search Console data, top landing pages, and traffic sources.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Top Landing Pages</h2>
        <p className="font-helvetica text-charcoal/70 text-sm mb-4">
          Configure Google Search Console API to see data.
        </p>
        <div className="text-center py-12 text-charcoal/40">
          <p>GSC integration coming soon</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Search Queries</h2>
        <p className="font-helvetica text-charcoal/70 text-sm mb-4">
          Queries you rank for, CTR, and impressions from Google Search Console.
        </p>
        <div className="text-center py-12 text-charcoal/40">
          <p>GSC integration coming soon</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Traffic Sources</h2>
        <p className="font-helvetica text-charcoal/70 text-sm mb-4">
          New users by channel (organic, direct, social, referral).
        </p>
        <div className="text-center py-12 text-charcoal/40">
          <p>GA4 integration needed</p>
        </div>
      </div>
    </div>
  );
}

