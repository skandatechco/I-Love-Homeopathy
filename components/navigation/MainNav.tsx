"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { navItems, NavItemType } from "./navItems";

interface MainNavProps {
  textColor?: string;
  hoverColor?: string;
}

export default function MainNav({ textColor = "text-cream", hoverColor = "hover:text-teal" }: MainNavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const handleMouseEnter = (itemName: string) => {
    if (navItems.find((item) => item.name === itemName)?.hasDropdown) {
      setOpenDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <div ref={navRef} className="relative">
      <nav className={`hidden md:flex items-center gap-8 font-helvetica text-sm font-medium ${textColor}`}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          if (!item.hasDropdown) {
            // Simple link, no dropdown
            return (
              <a
                key={item.href}
                href={item.href}
                className={`transition ${hoverColor} ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.name}
              </a>
            );
          }

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href}
                className={`transition ${hoverColor} ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.name}
              </a>

              {/* Dropdown Menu */}
              {openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  {item.isMegaMenu && item.megaMenu ? (
                    <MegaMenu item={item} textColor={textColor} />
                  ) : (
                    <DropdownMenu item={item} textColor={textColor} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

// Simple Dropdown Menu Component
function DropdownMenu({ item, textColor }: { item: NavItemType; textColor: string }) {
  if (!item.submenu) return null;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-mist min-w-[240px] py-4 overflow-hidden">
      <ul className="space-y-1">
        {item.submenu.map((subItem, index) => (
          <li key={index}>
            <a
              href={subItem.href}
              className="block px-5 py-2.5 font-helvetica text-sm text-charcoal hover:bg-ivory hover:text-navy transition"
            >
              {subItem.name}
            </a>
          </li>
        ))}
      </ul>
      {item.submenu.find((item) => item.footerLink) && (
        <div className="mt-3 pt-3 border-t border-mist px-5">
          <a
            href={item.href}
            className="text-teal font-helvetica text-xs font-medium hover:text-sage transition"
          >
            {item.submenu.find((item) => item.footerLink)?.footerLink || "Browse All →"}
          </a>
        </div>
      )}
    </div>
  );
}

// Mega Menu Component (for Remedies and Conditions)
function MegaMenu({ item, textColor }: { item: NavItemType; textColor: string }) {
  if (!item.megaMenu) return null;

  const isConditions = item.name === "Conditions";

  return (
    <div
      className={`bg-white rounded-xl shadow-2xl border border-mist overflow-hidden ${
        isConditions ? "w-[800px]" : "w-[900px]"
      }`}
    >
      <div className={`grid ${isConditions ? "grid-cols-[1fr_1fr_1fr_280px]" : "grid-cols-4"} gap-0`}>
        {/* Regular Columns */}
        {item.megaMenu.columns.map((column, colIndex) => (
          <div key={colIndex} className="p-6 border-r border-mist last:border-r-0">
            <h3 className="font-helvetica font-semibold text-navy text-sm mb-4 uppercase tracking-wide">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.items.map((subItem, index) => (
                <li key={index}>
                  <a
                    href={subItem.href}
                    className={`font-helvetica text-sm transition ${
                      subItem.name.includes("→") || subItem.name.includes("View all")
                        ? "text-teal font-medium hover:text-sage"
                        : "text-charcoal hover:text-navy"
                    }`}
                  >
                    {subItem.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Feature Panel (for Conditions only) */}
        {item.megaMenu.featurePanel && (
          <div className="p-6 bg-teal/5 border-l border-mist">
            <h3 className="font-helvetica font-semibold text-navy text-sm mb-4 uppercase tracking-wide">
              {item.megaMenu.featurePanel.title}
            </h3>
            <ul className="space-y-3 mb-4">
              {item.megaMenu.featurePanel.items.map((subItem, index) => (
                <li key={index}>
                  <a
                    href={subItem.href}
                    className="block font-helvetica text-sm text-charcoal hover:text-navy transition"
                  >
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-mist/50 mb-2">
                      <div className="w-full h-20 bg-ivory rounded mb-2 flex items-center justify-center">
                        <span className="text-charcoal/40 text-xs">Image</span>
                      </div>
                      <p className="text-xs font-medium text-navy line-clamp-2">
                        {subItem.name}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            {item.megaMenu.featurePanel.footerLink && (
              <a
                href="/en/conditions/stories"
                className="text-teal font-helvetica text-xs font-medium hover:text-sage transition"
              >
                {item.megaMenu.featurePanel.footerLink}
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* Footer Link for Mega Menu (e.g., Remedies) */}
      {item.megaMenu.footerLink && (
        <div className="px-6 py-4 border-t border-mist bg-ivory/30">
          <a
            href={item.href}
            className="text-teal font-helvetica text-xs font-medium hover:text-sage transition"
          >
            {item.megaMenu.footerLink}
          </a>
        </div>
      )}
    </div>
  );
}
