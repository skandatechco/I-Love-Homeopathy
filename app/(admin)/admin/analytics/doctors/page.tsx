export default function DoctorsAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Doctors' Corner Analytics</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Interview engagement, time on page metrics, and qualitative brand signals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Interview Engagement</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Most engaged interviews based on time_on_page_bucket events.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>Event tracking integration needed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
          <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Time on Page</h2>
          <p className="font-helvetica text-charcoal/70 text-sm mb-4">
            Average time spent reading Doctors' Corner content.
          </p>
          <div className="text-center py-12 text-charcoal/40">
            <p>time_on_page_bucket events needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

