"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text colors change based on scroll state
  const textColor = isScrolled ? "text-cream" : "text-navy";
  const hoverColor = isScrolled ? "hover:text-gold" : "hover:text-teal";

  return (
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

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 font-helvetica text-sm font-medium ${textColor}`}>
          <a
            href="/en/articles/understanding-homeopathy"
            className={`transition ${hoverColor}`}
          >
            About Homeopathy
          </a>
          <a href="/en/remedies" className={`transition ${hoverColor}`}>
            Remedies
          </a>
          <a href="/en/bach-remedies" className={`transition ${hoverColor}`}>
            Bach Flowers
          </a>
          <a
            href="/en/doctors-corner"
            className={`transition ${hoverColor}`}
          >
            Doctors' Corner
          </a>
          <a
            href="/en/remedy-resonance"
            className={`transition ${hoverColor}`}
          >
            Stories
          </a>
          <a href="/en/research" className={`transition ${hoverColor}`}>
            Research
          </a>
          <a
            href="/en/articles/understanding-homeopathy"
            className={`border ${
              isScrolled
                ? "border-teal text-teal hover:bg-teal hover:text-navy"
                : "border-navy text-navy hover:bg-navy hover:text-cream"
            } px-4 py-2 rounded-xl text-sm font-medium transition`}
          >
            Start Learning
          </a>
        </nav>

        {/* Mobile Menu Icon (Hamburger) */}
        <button
          className={`md:hidden flex flex-col gap-1.5 ${textColor}`}
          aria-label="Open menu"
        >
          <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
          <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
          <span className={`block w-6 h-[2px] transition ${isScrolled ? "bg-cream" : "bg-navy"}`} />
        </button>
      </div>
    </header>
  );
}

