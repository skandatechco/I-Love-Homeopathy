import Link from "next/link";

export default function AnalyticsOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Analytics Overview</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Comprehensive analytics dashboard for site performance and user engagement.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica text-charcoal/70 text-sm font-medium">Total Visitors</h3>
            <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <p className="font-helvetica text-navy text-2xl font-semibold">--</p>
          <p className="font-helvetica text-charcoal/60 text-xs mt-1">Configure GA4 to see data</p>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica text-charcoal/70 text-sm font-medium">Page Views</h3>
            <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="font-helvetica text-navy text-2xl font-semibold">--</p>
          <p className="font-helvetica text-charcoal/60 text-xs mt-1">Configure GA4 to see data</p>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica text-charcoal/70 text-sm font-medium">Avg. Session Duration</h3>
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="font-helvetica text-navy text-2xl font-semibold">--</p>
          <p className="font-helvetica text-charcoal/60 text-xs mt-1">Configure GA4 to see data</p>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica text-charcoal/70 text-sm font-medium">Bounce Rate</h3>
            <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="font-helvetica text-navy text-2xl font-semibold">--</p>
          <p className="font-helvetica text-charcoal/60 text-xs mt-1">Configure GA4 to see data</p>
        </div>
      </div>

      {/* Dashboard Links */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/analytics/seo"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
            SEO & Discovery
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            GSC queries, CTR, impressions, top landing pages
          </p>
        </Link>

        <Link
          href="/admin/analytics/remedies"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
            Remedy Engagement
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            Top remedies, read depth, Condition→Remedy CTR
          </p>
        </Link>

        <Link
          href="/admin/analytics/conditions"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
            Conditions Hub
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            Entry paths, top systems, bounce vs onward readers
          </p>
        </Link>

        <Link
          href="/admin/analytics/performance"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
            Performance & UX
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            Core Web Vitals, Clarity data, rage-clicks
          </p>
        </Link>
      </div>
    </div>
  );
}

