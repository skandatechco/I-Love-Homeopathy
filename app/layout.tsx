import "@/styles/globals.css";
import Container from "@/components/ui/Container";
import LangSwitcher from "@/components/ui/LangSwitcher";
import MainNav from "@/components/navigation/MainNav";
import { generateSEO, generateStructuredData } from "@/lib/seo";
import StructuredData from "@/components/seo/StructuredData";

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
    <html lang="en" className="bg-pageBg text-textMain">
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Global Header */}
        <header className="border-b border-borderSoft bg-white/80 backdrop-blur">
          <Container>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-display font-semibold text-baholaNavy">
                  I ❤️ HOMEOPATHY
                </div>
                <div className="legal-text text-[11px]">
                  Learn Responsibly. Consult Confidently. Contribute to Research.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <MainNav />
                <LangSwitcher />
              </div>
            </div>
          </Container>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Container>{children}</Container>
        </main>

        {/* Global Footer */}
        <footer className="border-t border-borderSoft bg-baholaNavy text-white/90 text-xs leading-relaxed">
          <Container>
            <div className="grid gap-6 md:grid-cols-4 py-8">
              {/* Brand */}
              <div className="space-y-3">
                <div className="text-lg font-display font-semibold text-white">
                  I ❤️ HOMEOPATHY
                </div>
                <p className="text-xs text-white/80">
                  Learn Responsibly. Consult Confidently. Contribute to Research.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Quick Links</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/en/start-here" className="text-white/80 hover:text-white">Start Here</a></li>
                  <li><a href="/en/learn" className="text-white/80 hover:text-white">Learn</a></li>
                  <li><a href="/en/practice" className="text-white/80 hover:text-white">Practice</a></li>
                  <li><a href="/en/evidence" className="text-white/80 hover:text-white">Evidence Hub</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Resources</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/en/conditions" className="text-white/80 hover:text-white">Conditions</a></li>
                  <li><a href="/en/tools" className="text-white/80 hover:text-white">Tools</a></li>
                  <li><a href="/en/blog" className="text-white/80 hover:text-white">Blog</a></li>
                  <li><a href="/en/about" className="text-white/80 hover:text-white">About</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Legal</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="/en/about" className="text-white/80 hover:text-white">Editorial Policy</a></li>
                  <li><a href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-white/80 hover:text-white">Terms of Use</a></li>
                  <li><a href="/contact" className="text-white/80 hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/20 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="legal-text text-center sm:text-left">
                  I ❤️ HOMEOPATHY · Educational use only · Not a substitute for medical advice.
                </div>
                <div className="legal-text">
                  © {new Date().getFullYear()} Bahola. All rights reserved.
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
