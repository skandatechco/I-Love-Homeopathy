"use client";

import { usePathname } from "next/navigation";
import { navItems, ctaLink } from "./navItems";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  textColor: string;
}

export default function MobileMenu({ isOpen, onClose, textColor }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-mist">
            <span className="font-playfair text-xl font-semibold text-navy">
              I ❤️ Homeopathy
            </span>
            <button
              onClick={onClose}
              className="text-charcoal hover:text-navy transition p-2"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname?.startsWith(item.href + "/");

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={`block px-4 py-3 rounded-xl font-helvetica text-sm font-medium transition ${
                        isActive
                          ? "bg-navy text-cream"
                          : "text-charcoal hover:bg-ivory hover:text-navy"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t border-mist">
              <a
                href={ctaLink.href}
                onClick={onClose}
                className="block w-full text-center border-2 border-teal text-teal font-helvetica text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal hover:text-navy transition"
              >
                {ctaLink.name}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

