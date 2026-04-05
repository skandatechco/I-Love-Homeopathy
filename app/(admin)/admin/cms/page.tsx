export default function CMSPage() {
  const isDev = process.env.NODE_ENV === 'development';
  const hasTinaClientId = !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-navy text-4xl font-semibold mb-4">Content Management (TinaCMS)</h1>
        <p className="font-helvetica text-charcoal text-lg">
          Edit content with TinaCMS. All changes are saved to Git.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-mist p-6 shadow-[0_12px_24px_rgba(0,0,0,0.03)]">
        <h2 className="font-helvetica text-navy font-semibold text-xl mb-4">Access TinaCMS</h2>
        
        {isDev ? (
          <>
            <p className="font-helvetica text-charcoal mb-4">
              In development, start the server with TinaCMS enabled:
            </p>
            <ol className="list-decimal list-inside space-y-2 font-helvetica text-charcoal/80 mb-6">
              <li>Run: <code className="bg-ivory px-2 py-1 rounded text-sm">npm run dev:tina</code></li>
              <li>Visit: <code className="bg-ivory px-2 py-1 rounded text-sm">http://localhost:3000/admin</code></li>
              <li>Edit content directly in the visual editor</li>
            </ol>
          </>
        ) : (
          <>
            <p className="font-helvetica text-charcoal mb-4">
              On Vercel (production), TinaCMS is accessible at:
            </p>
            <div className="mb-6">
              <a 
                href="/admin" 
                className="inline-block bg-navy text-cream px-6 py-3 rounded-lg font-helvetica font-medium hover:bg-navyDeep transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open TinaCMS Admin →
              </a>
            </div>
            {!hasTinaClientId && (
              <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <p className="font-helvetica text-sm text-charcoal">
                  <strong>Note:</strong> TinaCMS credentials must be configured in Vercel environment variables:
                </p>
                <ul className="mt-2 space-y-1 text-sm font-mono text-charcoal/80">
                  <li>• NEXT_PUBLIC_TINA_CLIENT_ID</li>
                  <li>• TINA_TOKEN (server-side only)</li>
                </ul>
              </div>
            )}
          </>
        )}

        <div className="mt-6 p-4 bg-ivory rounded-lg border border-mist">
          <p className="font-helvetica text-sm text-charcoal/70">
            <strong>About:</strong> TinaCMS is configured to work with your existing MDX files in <code className="bg-white px-1 py-0.5 rounded text-xs">content/en/</code>. All edits are version-controlled in Git.
          </p>
        </div>
      </div>
    </div>
  );
}

