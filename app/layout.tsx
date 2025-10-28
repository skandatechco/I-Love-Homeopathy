import "./../styles/globals.css";
import Container from "@/components/ui/Container";
import LangSwitcher from "@/components/ui/LangSwitcher";

export const metadata = {
  title: "I ❤️ Homeopathy",
  description:
    "Learn Responsibly. Consult Confidently. Contribute to Research."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-[#1a1a1a]">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200">
          <Container>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-baholaNavy">
                  I ❤️ HOMEOPATHY
                </div>
                <div className="text-[11px] text-gray-600">
                  Learn Responsibly. Consult Confidently. Contribute to
                  Research.
                </div>
              </div>

              <nav className="flex flex-wrap items-center gap-4 text-xs text-gray-700">
                <a href="/en/guides/headache" className="hover:text-baholaNavy">
                  Guides
                </a>
                <a
                  href="/en/remedies/arsenicum-album"
                  className="hover:text-baholaNavy"
                >
                  Remedies
                </a>
                <a href="/en/about" className="hover:text-baholaNavy">
                  About
                </a>
                <LangSwitcher />
              </nav>
            </div>
          </Container>
        </header>

        <main className="flex-1">
          <Container>{children}</Container>
        </main>

        <footer className="border-t border-gray-200 text-xs text-gray-500 leading-relaxed">
          <Container>
            <div>
              I ❤️ HOMEOPATHY · Educational use only · Not a substitute for
              medical advice.
            </div>
            <div className="mt-2">
              © {new Date().getFullYear()} Bahola. All rights reserved.
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
