import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Libre_Franklin, Playfair_Display, Source_Serif_4 } from "next/font/google";
import Container from "@/components/ui/Container";
import ClarityScript from "@/components/analytics/ClarityScript";
import GA4Provider from "@/components/analytics/GA4Provider";
import PlausibleScript from "@/components/analytics/PlausibleScript";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import StructuredData from "@/components/seo/StructuredData";
import { generateSEO, generateStructuredData } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const franklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-franklin",
  display: "swap",
});

export const metadata = generateSEO({
  title: "I Love Homeopathy - Learn Homeopathy Responsibly",
  description:
    "Educational homeopathic resource with BHMS-reviewed content. Learn homeopathy fundamentals, remedy information, and evidence-based practices. Always consult healthcare professionals for medical concerns.",
  url: "/",
});

export const robots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large" as const,
    "max-video-preview": -1,
  },
  gptbot: {
    index: true,
    follow: true,
  },
};

const navItems = [
  { label: "Home", href: "/en", className: "nav-item nav-home active" },
  { label: "Remedy of the Day", href: "/en#remedy-of-the-day", className: "nav-item" },
  { label: "Remedy Quiz", href: "/en#quiz-module", className: "nav-item" },
  { label: "Clinical Cases", href: "/en#clinical-cases", className: "nav-item" },
  { label: "Philosophy", href: "/en#philosophy", className: "nav-item" },
  { label: "History", href: "/en#history", className: "nav-item" },
  { label: "Remedy Resonance", href: "/en#remedy-resonance", className: "nav-item" },
  { label: "Wellness", href: "/en#wellness", className: "nav-item" },
  { label: "Book Reviews", href: "/en/articles/book-reviews/dynamic-medicine-the-world-according-to-homeopathy", className: "nav-item" },
  { label: "Find a Homeopath", href: "https://findahomeopath.com", className: "nav-item" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = generateStructuredData({
    type: "WebSite",
    title: "I Love Homeopathy",
    description: "Educational homeopathic resource with BHMS-reviewed content",
  });

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sourceSerif.variable} ${franklin.variable} bg-cream text-ink`}
    >
      <head>
        <StructuredData data={structuredData} />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="bg-cream text-ink">
        <GA4Provider>
          <PostHogProvider>
            <div className="utility-bar">
              <Container>
                <div className="utility-bar-inner">
                  <div className="utility-edition">
                    Thursday, April 2, 2026 Â· The World&apos;s Journal of Classical Medicine
                  </div>
                  <div className="utility-links">
                    <a href="#">Sign In</a>
                    <a href="#newsletter">Subscribe</a>
                    <a href="https://findahomeopath.com" target="_blank" rel="noreferrer">
                      Find a Homeopath
                    </a>
                    <a href="/en/doctors-corner">For Practitioners</a>
                  </div>
                </div>
              </Container>
            </div>

            <header className="masthead">
              <Container>
                <div className="masthead-inner">
                  <div className="masthead-left">
                    <strong>Independent Journal</strong>
                    Est. 1999 Â· Classical Homeopathy
                    <br />
                    Open Access Â· Free Forever
                  </div>
                  <div className="masthead-center">
                    <a href="/en" className="masthead-logo">
                      I <em>Love</em> Homeopathy
                    </a>
                    <span className="masthead-tagline">Similia Similibus Curentur</span>
                  </div>
                  <div className="masthead-right">
                    <a href="#newsletter" className="subscribe-btn">
                      Subscribe Free
                    </a>
                    <a href="/en/tools/glossary" className="search-box">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Search remedies, symptomsâ€¦
                    </a>
                  </div>
                </div>
              </Container>

              <nav className="primary-nav">
                <Container>
                  <div className="nav-inner">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className={item.className}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </Container>
              </nav>
            </header>

            <main className="main-content">
              <Container>{children}</Container>
            </main>

            <footer className="site-footer">
              <Container>
                <div className="footer-top">
                  <div className="footer-brand">
                    <span className="footer-logo">
                      I <em>Love</em> Homeopathy
                    </span>
                    <span className="footer-tagline">Similia Similibus Curentur</span>
                    <p className="footer-about">
                      A publication dedicated to the advancement of classical
                      homeopathy through education, clinical excellence, and the
                      preservation of our great materia medica. Independent. Open
                      access. Free forever.
                    </p>
                  </div>

                  <div className="footer-links">
                    <div className="footer-col">
                      <h5>Learn</h5>
                      <ul>
                        <li><a href="/en#remedy-of-the-day">Remedy of the Day</a></li>
                        <li><a href="/en/remedies">Materia Medica</a></li>
                        <li><a href="/en#quiz-module">Remedy Quiz</a></li>
                        <li><a href="/en#clinical-cases">Clinical Cases</a></li>
                      </ul>
                    </div>
                    <div className="footer-col">
                      <h5>Explore</h5>
                      <ul>
                        <li><a href="/en#philosophy">Philosophy</a></li>
                        <li><a href="/en/research">Research</a></li>
                        <li><a href="/en#remedy-resonance">Remedy Resonance</a></li>
                        <li><a href="/en#wellness">Wellness</a></li>
                      </ul>
                    </div>
                    <div className="footer-col">
                      <h5>History</h5>
                      <ul>
                        <li><a href="/en#history">Great Homeopaths</a></li>
                        <li><a href="/en#history">Homeopathic Hospitals</a></li>
                        <li><a href="/en/articles/book-reviews/dynamic-medicine-the-world-according-to-homeopathy">Book Reviews</a></li>
                      </ul>
                    </div>
                    <div className="footer-col">
                      <h5>Connect</h5>
                      <ul>
                        <li>
                          <a href="https://findahomeopath.com" target="_blank" rel="noreferrer">
                            Find a Homeopath
                          </a>
                        </li>
                        <li><a href="#newsletter">Subscribe</a></li>
                        <li><a href="/en/tools">Tools</a></li>
                        <li><a href="/en/about">Contact Us</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="footer-bottom">
                  <span>Â© 2026 I Love Homeopathy. All rights reserved.</span>
                  <span>
                    <a href="#">Privacy</a> Â· <a href="#">Terms</a> Â· <a href="#">Cookie Policy</a>
                  </span>
                </div>
              </Container>
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

