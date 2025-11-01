export default function CMSPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Content Management</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Edit content with TinaCMS. Run <code className="bg-ivory px-2 py-1 rounded">npm run dev:tina</code> to enable.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <p className="font-helvetica text-charcoal mb-4">
          TinaCMS admin panel will be embedded here. To access:
        </p>
        <ol className="list-decimal list-inside space-y-2 font-helvetica text-charcoal/80">
          <li>Run: <code className="bg-ivory px-2 py-1 rounded text-sm">npm run dev:tina</code></li>
          <li>Visit this page or go directly to the TinaCMS admin interface</li>
          <li>Edit content directly in the visual editor</li>
        </ol>
        <div className="mt-6 p-4 bg-ivory rounded-lg border border-mist">
          <p className="font-helvetica text-sm text-charcoal/70">
            <strong>Note:</strong> TinaCMS is configured to work with your existing MDX files in <code className="bg-white px-1 py-0.5 rounded text-xs">content/en/</code>
          </p>
        </div>
      </div>
    </div>
  );
}

