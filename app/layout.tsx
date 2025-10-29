import "@/styles/globals.css";
import Container from "@/components/ui/Container";
import LangSwitcher from "@/components/ui/LangSwitcher";
import MainNav from "@/components/navigation/MainNav";

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
    <html lang="en" className="bg-pageBg text-textMain">
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
            <div className="legal-text">
              I ❤️ HOMEOPATHY · Educational use only · Not a substitute for
              medical advice.
            </div>
            <div className="mt-2 legal-text">
              © {new Date().getFullYear()} Bahola. All rights reserved.
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
