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
          <span className="font-playfair text-xl font-semibold text-cream md:text-2xl">
            I ❤️ Homeopathy
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-helvetica text-sm font-medium">
          <a
            href="/en/articles/understanding-homeopathy"
            className="text-cream hover:text-gold transition"
          >
            About Homeopathy
          </a>
          <a href="/en/remedies" className="text-cream hover:text-gold transition">
            Remedies
          </a>
          <a href="/en/bach-remedies" className="text-cream hover:text-gold transition">
            Bach Flowers
          </a>
          <a
            href="/en/doctors-corner"
            className="text-cream hover:text-gold transition"
          >
            Doctors' Corner
          </a>
          <a
            href="/en/remedy-resonance"
            className="text-cream hover:text-gold transition"
          >
            Stories
          </a>
          <a href="/en/research" className="text-cream hover:text-gold transition">
            Research
          </a>
          <a
            href="/en/articles/understanding-homeopathy"
            className="border border-teal text-teal px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal hover:text-navy transition"
          >
            Start Learning
          </a>
        </nav>

        {/* Mobile Menu Icon (Hamburger) */}
        <button
          className="md:hidden text-cream flex flex-col gap-1.5"
          aria-label="Open menu"
        >
          <span className="block w-6 h-[2px] bg-cream transition" />
          <span className="block w-6 h-[2px] bg-cream transition" />
          <span className="block w-6 h-[2px] bg-cream transition" />
        </button>
      </div>
    </header>
  );
}

