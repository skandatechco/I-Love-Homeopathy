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
            <MegaMenuWrapper
              key={item.href}
              item={item}
              isActive={isActive}
              hoverColor={hoverColor}
              isOpen={openDropdown === item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
              textColor={textColor}
            />
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

// Wrapper component for dropdown/mega menu with smart positioning
function MegaMenuWrapper({
  item,
  isActive,
  hoverColor,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  textColor,
}: {
  item: NavItemType;
  isActive: boolean;
  hoverColor: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  textColor: string;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [alignRight, setAlignRight] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

  // Measure actual dropdown width after render to calculate accurate positioning
  useEffect(() => {
    if (isOpen && menuRef.current && dropdownRef.current) {
      // Use requestAnimationFrame to ensure dropdown is rendered
      requestAnimationFrame(() => {
        if (!dropdownRef.current || !menuRef.current) return;
        
        const menuRect = menuRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const actualDropdownWidth = dropdownRect.width;
        
        // Safety margin to prevent edge overflow
        const safetyMargin = 16; // 1rem
        const spaceOnRight = window.innerWidth - menuRect.right - safetyMargin;
        const spaceOnLeft = menuRect.left - safetyMargin;

        // Check if dropdown would overflow on the right
        const wouldOverflowRight = menuRect.right + actualDropdownWidth > window.innerWidth - safetyMargin;

        if (item.isMegaMenu) {
          // For mega menus: right-align if would overflow and more space on left
          if (wouldOverflowRight && spaceOnLeft > spaceOnRight) {
            setAlignRight(true);
          } else if (!wouldOverflowRight) {
            setAlignRight(false);
          } else {
            // If would overflow either way, keep left-aligned (constrained by max-w)
            setAlignRight(false);
          }
        } else {
          // Regular dropdowns: right-align if not enough space on the right
          setAlignRight(spaceOnRight < actualDropdownWidth && spaceOnLeft > spaceOnRight);
        }
      });
    }
  }, [isOpen, item.isMegaMenu, item.name]);

  // Track hover state to keep menu open when moving between nav item and dropdown
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContainerLeave = () => {
    // Give a small delay to allow mouse to enter dropdown/bridge area
    leaveTimeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        onMouseLeave();
      }
    }, 150);
  };

  const handleDropdownEnter = () => {
    // Clear any pending close timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsHoveringDropdown(true);
  };

  const handleDropdownLeave = () => {
    setIsHoveringDropdown(false);
    onMouseLeave();
  };

  const handleBridgeEnter = () => {
    // Clear any pending close timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsHoveringDropdown(true);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleContainerLeave}
    >
      <a
        href={item.href}
        className={`transition ${hoverColor} ${
          isActive ? "font-semibold" : ""
        }`}
      >
        {item.name}
      </a>

      {/* Invisible bridge area to prevent gap issues */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 h-2 z-40"
          onMouseEnter={handleBridgeEnter}
          onMouseLeave={() => setIsHoveringDropdown(false)}
        />
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full pt-2 z-50 ${
            alignRight ? "right-0" : "left-0"
          }`}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {item.isMegaMenu && item.megaMenu ? (
            <MegaMenu item={item} textColor={textColor} />
          ) : (
            <DropdownMenu item={item} textColor={textColor} />
          )}
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
        isConditions ? "w-[800px] max-w-[calc(100vw-2rem)]" : "w-[900px] max-w-[calc(100vw-2rem)]"
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
