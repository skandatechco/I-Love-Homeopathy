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
  { label: "Home", href: "/en" },
  { label: "Remedy of the Day", href: "/en#remedy-of-the-day" },
  { label: "Remedy Quiz", href: "/en#remedy-quiz" },
  { label: "Clinical Cases", href: "/en#clinical-cases" },
  { label: "Philosophy", href: "/en#philosophy" },
  { label: "History", href: "/en#history" },
  { label: "Remedy Resonance", href: "/en#remedy-resonance" },
  { label: "Wellness", href: "/en#wellness" },
  { label: "Book Reviews", href: "/en/articles" },
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
      </head>
      <body className="min-h-screen bg-cream font-georgia text-ink">
        <GA4Provider>
          <PostHogProvider>
            <div className="bg-forest py-[7px] font-helvetica text-[11px] tracking-[0.03em] text-white">
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 md:flex-row md:items-center md:justify-between md:px-12">
                <div className="text-white/60">
                  Thursday, April 2, 2026 · The World&apos;s Journal of Classical Medicine
                </div>
                <div className="flex flex-wrap gap-5">
                  <a href="/en/about" className="transition hover:text-goldLight">
                    About
                  </a>
                  <a href="/en/research" className="transition hover:text-goldLight">
                    Research
                  </a>
                  <a href="/en/doctors-corner" className="transition hover:text-goldLight">
                    Doctors&apos; Corner
                  </a>
                  <a
                    href="https://findahomeopath.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-goldLight"
                  >
                    Find a Homeopath
                  </a>
                </div>
              </div>
            </div>

            <header className="border-b border-rule bg-cream">
              <div className="mx-auto max-w-7xl px-6 pt-7 md:px-12">
                <div className="grid gap-6 pb-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                  <div className="font-helvetica text-[11px] leading-[1.7] text-muted md:max-w-[220px]">
                    <strong className="block text-[12px] font-semibold text-ink">
                      Independent Journal
                    </strong>
                    Est. 1999 · Classical Homeopathy
                    <br />
                    Open Access · Free Forever
                  </div>

                  <div className="text-center">
                    <a
                      href="/en"
                      className="font-playfair text-[40px] font-black leading-none tracking-[-0.04em] text-forest md:text-[52px]"
                    >
                      I <span className="italic text-gold">Love</span> Homeopathy
                    </a>
                    <span className="mt-2 block font-helvetica text-[10px] uppercase tracking-[0.4em] text-muted">
                      Similia Similibus Curentur
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <a
                      href="#newsletter"
                      className="bg-forest px-5 py-[9px] font-helvetica text-[11px] font-semibold uppercase tracking-[0.09em] text-white transition hover:bg-midGreen"
                    >
                      Subscribe Free
                    </a>
                    <a
                      href="/en/tools/glossary"
                      className="flex items-center gap-2 border border-parchment px-3 py-[6px] font-helvetica text-[11px] text-muted transition hover:text-forest"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      Search remedies, symptoms…
                    </a>
                  </div>
                </div>
              </div>

              <nav className="sticky top-0 z-40 bg-forest">
                <div className="mx-auto max-w-7xl px-0 md:px-12">
                  <div className="flex h-11 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {navItems.map((item, index) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className={`flex items-center border-r border-white/10 px-[18px] font-helvetica text-[12px] font-semibold uppercase tracking-[0.07em] transition ${
                          index === 0
                            ? "bg-gold font-bold text-forest"
                            : "text-white/80 hover:bg-white/5 hover:text-goldLight"
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </header>

            <main className="flex-1 bg-cream">
              <Container>{children}</Container>
            </main>

            <footer className="bg-ink text-white">
              <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3 md:px-16">
                <div>
                  <h3 className="font-playfair text-2xl">I Love Homeopathy</h3>
                  <p className="mt-2 font-helvetica text-sm leading-relaxed text-white/75">
                    An educational initiative dedicated to promoting understanding
                    and trust in homeopathy.
                  </p>
                </div>

                <div>
                  <h4 className="font-helvetica text-lg font-semibold">Quick Links</h4>
                  <ul className="mt-3 space-y-2 font-helvetica text-sm">
                    <li>
                      <a href="/en/articles/understanding-homeopathy" className="transition hover:text-goldLight">
                        About Homeopathy
                      </a>
                    </li>
                    <li>
                      <a href="/en/remedies" className="transition hover:text-goldLight">
                        Remedies Library
                      </a>
                    </li>
                    <li>
                      <a href="/en/bach-remedies" className="transition hover:text-goldLight">
                        Bach Flower Remedies
                      </a>
                    </li>
                    <li>
                      <a href="/en/research" className="transition hover:text-goldLight">
                        Articles & Research
                      </a>
                    </li>
                    <li>
                      <a href="/en/doctors-corner" className="transition hover:text-goldLight">
                        Doctors&apos; Corner
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-helvetica text-lg font-semibold">Connect</h4>
                  <p className="mt-3 font-helvetica text-sm">
                    Email:{" "}
                    <a href="mailto:hello@ilovehomeopathy.org" className="transition hover:text-goldLight">
                      hello@ilovehomeopathy.org
                    </a>
                  </p>
                  <div className="mt-4 flex space-x-4 text-xl text-white/85">
                    <a href="#" className="transition hover:text-goldLight" aria-label="Facebook">
                      f
                    </a>
                    <a href="#" className="transition hover:text-goldLight" aria-label="Instagram">
                      i
                    </a>
                    <a href="#" className="transition hover:text-goldLight" aria-label="YouTube">
                      y
                    </a>
                    <a href="#" className="transition hover:text-goldLight" aria-label="LinkedIn">
                      in
                    </a>
                  </div>
                </div>
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
