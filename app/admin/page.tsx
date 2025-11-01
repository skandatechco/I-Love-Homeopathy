import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Overview of analytics, content management, and site performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Analytics Overview Card */}
        <Link
          href="/admin/analytics"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-charcoal/40 group-hover:text-navy transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-teal transition">
            Analytics
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            View site analytics, traffic sources, engagement metrics, and performance data.
          </p>
        </Link>

        {/* CMS Card */}
        <Link
          href="/admin/cms"
          className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.06)] transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-sage/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <svg className="w-5 h-5 text-charcoal/40 group-hover:text-navy transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2 group-hover:text-sage transition">
            Content Management
          </h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed">
            Edit content, manage remedies, guides, and articles with TinaCMS.
          </p>
        </Link>

        {/* Quick Stats Card */}
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <h3 className="font-helvetica text-navy font-semibold text-lg mb-2">Quick Stats</h3>
          <p className="font-helvetica text-charcoal/70 text-sm leading-relaxed mb-4">
            Key metrics at a glance.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal/70">Analytics</span>
              <span className="text-navy font-medium">Configured</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/70">CMS</span>
              <span className="text-navy font-medium">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
