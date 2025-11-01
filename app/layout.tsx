import "@/styles/globals.css";
import Container from "@/components/ui/Container";
import Header from "@/components/navigation/Header";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";
import GA4Provider from "@/components/analytics/GA4Provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PlausibleScript from "@/components/analytics/PlausibleScript";
import ClarityScript from "@/components/analytics/ClarityScript";
import PostHogProvider from "@/components/analytics/PostHogProvider";

export const metadata = generateSEO({
  title: "I ❤️ Homeopathy - Learn Homeopathy Responsibly",
  description:
    "Educational homeopathic resource with BHMS-reviewed content. Learn homeopathy fundamentals, remedy information, and evidence-based practices. Always consult healthcare professionals for medical concerns.",
  url: "/",
});

// AI Crawler directives in metadata
export const robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  // AI bots
  'gptbot': {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I ❤️ Homeopathy",
    description: "Educational homeopathic resource with BHMS-reviewed content",
  });

  return (
    <html lang="en" className="bg-ivory text-charcoal">
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body className="min-h-screen flex flex-col">
        <GA4Provider>
        <PostHogProvider>
          {/* Global Header - appears on all pages */}
          <Header />

        {/* Main content */}
        <main className="flex-1">
          <Container>{children}</Container>
        </main>

        {/* Global Footer */}
        <footer className="bg-navy text-cream">
          <div className="max-w-7xl mx-auto py-10 px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="font-playfair text-2xl mb-2">I ❤️ Homeopathy</h3>
              <p className="text-cream/80 text-sm leading-relaxed font-helvetica">
                An educational initiative dedicated to promoting
                understanding and trust in homeopathy.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-helvetica font-semibold text-lg mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm font-helvetica">
                <li>
                  <a href="/en/articles/understanding-homeopathy" className="hover:text-gold transition">
                    About Homeopathy
                  </a>
                </li>
                <li>
                  <a href="/en/remedies" className="hover:text-gold transition">
                    Remedies Library
                  </a>
                </li>
                <li>
                  <a href="/en/bach-remedies" className="hover:text-gold transition">
                    Bach Flower Remedies
                  </a>
                </li>
                <li>
                  <a href="/en/research" className="hover:text-gold transition">
                    Articles & Research
                  </a>
                </li>
                <li>
                  <a href="/en/doctors-corner" className="hover:text-gold transition">
                    Doctors' Corner
                  </a>
                </li>
                <li>
                  <a href="/en/remedy-resonance" className="hover:text-gold transition">
                    Stories of Healing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-helvetica font-semibold text-lg mb-3">Connect</h4>
              <p className="text-sm mb-3 font-helvetica">
                Email:{" "}
                <a href="mailto:hello@ilovehomeopathy.org" className="hover:text-gold">
                  hello@ilovehomeopathy.org
                </a>
              </p>
              <div className="flex space-x-4 text-xl text-cream/90">
                <a href="#" className="hover:text-gold transition" aria-label="Facebook">
                  f
                </a>
                <a href="#" className="hover:text-gold transition" aria-label="Instagram">
                  i
                </a>
                <a href="#" className="hover:text-gold transition" aria-label="YouTube">
                  y
                </a>
                <a href="#" className="hover:text-gold transition" aria-label="LinkedIn">
                  in
                </a>
              </div>
            </div>
          </div>

          <div className="bg-navyDeep text-center py-4 text-xs text-cream/70 border-t border-cream/20 font-helvetica">
            © {new Date().getFullYear()} I ❤️ Homeopathy. An initiative by Bahola Labs — nurturing homeopathy since 1939.{" "}
            <a href="https://bahola.co" className="text-teal hover:text-gold ml-1">
              Visit Bahola.co
            </a>
          </div>
        </footer>
        </PostHogProvider>
        </GA4Provider>
        <Analytics />
        <SpeedInsights />
        <PlausibleScript />
        <ClarityScript />
      </body>
    </html>
  );
}
