"use client";

import { useEffect, useState } from "react";
import MainNav from "./MainNav";
import MobileMenu from "./MobileMenu";
import { ctaLink } from "./navItems";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Text colors change based on scroll state
  const textColor = isScrolled ? "text-cream" : "text-navy";
  const hoverColor = isScrolled ? "hover:text-gold" : "hover:text-teal";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-navy/90 backdrop-blur shadow-lg"
            : "bg-transparent"
        }`}
        data-header
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-16 px-6 md:px-12">
          {/* Logo / Brand */}
          <a href="/en" className="flex items-center gap-2">
            <span className={`font-playfair text-xl font-semibold md:text-2xl transition-colors ${textColor}`}>
              I ❤️ Homeopathy
            </span>
          </a>

          {/* Desktop Nav - using MainNav component */}
          <div className="hidden md:flex items-center gap-6">
            <MainNav textColor={textColor} hoverColor={hoverColor} />
            <a
              href={ctaLink.href}
              className={`border ${
                isScrolled
                  ? "border-teal text-teal hover:bg-teal hover:text-navy"
                  : "border-navy text-navy hover:bg-navy hover:text-cream"
              } px-4 py-2 rounded-xl text-sm font-medium transition`}
            >
              {ctaLink.name}
            </a>
          </div>

          {/* Mobile Menu Icon (Hamburger) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex flex-col gap-1.5 ${textColor}`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              // Close icon (X)
              <>
                <span className={`block w-6 h-[2px] transition transform rotate-45 translate-y-2 ${isScrolled ? "bg-cream" : "bg-navy"}`} />
                <span className={`block w-6 h-[2px] transition opacity-0`} />
                <span className={`block w-6 h-[2px] transition transform -rotate-45 -translate-y-2 ${isScrolled ? "bg-cream" : "bg-navy"}`} />
              </>
            ) : (
              // Hamburger icon
              <>
                <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
                <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
                <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        textColor={textColor}
      />
    </>
  );
}

