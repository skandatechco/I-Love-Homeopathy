"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, ctaLink, NavItemType } from "./navItems";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  textColor: string;
}

export default function MobileMenu({ isOpen, onClose, textColor }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

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
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname?.startsWith(item.href + "/");
                const isExpanded = expandedItems.has(item.name);
                const hasSubmenu = item.hasDropdown && (item.submenu || item.megaMenu);

                return (
                  <li key={item.href}>
                    {hasSubmenu ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-helvetica text-sm font-medium transition ${
                            isActive
                              ? "bg-navy text-cream"
                              : "text-charcoal hover:bg-ivory hover:text-navy"
                          }`}
                        >
                          <span>{item.name}</span>
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isExpanded && (
                          <ul className="mt-1 ml-4 space-y-1 border-l-2 border-mist pl-4">
                            {item.submenu?.map((subItem, index) => (
                              <li key={index}>
                                <a
                                  href={subItem.href}
                                  onClick={onClose}
                                  className="block px-4 py-2 rounded-lg font-helvetica text-sm text-charcoal/80 hover:bg-ivory hover:text-navy transition"
                                >
                                  {subItem.name}
                                </a>
                              </li>
                            ))}
                            {item.megaMenu?.columns.map((column, colIndex) => (
                              <li key={colIndex} className="mt-3">
                                <div className="px-4 py-1 mb-2">
                                  <h4 className="font-helvetica font-semibold text-navy text-xs uppercase tracking-wide">
                                    {column.title}
                                  </h4>
                                </div>
                                <ul className="space-y-1">
                                  {column.items.map((subItem, itemIndex) => (
                                    <li key={itemIndex}>
                                      <a
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block px-4 py-2 rounded-lg font-helvetica text-sm text-charcoal/80 hover:bg-ivory hover:text-navy transition"
                                      >
                                        {subItem.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                            {item.megaMenu?.featurePanel && (
                              <li className="mt-3">
                                <div className="px-4 py-1 mb-2">
                                  <h4 className="font-helvetica font-semibold text-navy text-xs uppercase tracking-wide">
                                    {item.megaMenu.featurePanel.title}
                                  </h4>
                                </div>
                                <ul className="space-y-1">
                                  {item.megaMenu.featurePanel.items.map((subItem, index) => (
                                    <li key={index}>
                                      <a
                                        href={subItem.href}
                                        onClick={onClose}
                                        className="block px-4 py-2 rounded-lg font-helvetica text-sm text-charcoal/80 hover:bg-ivory hover:text-navy transition"
                                      >
                                        {subItem.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            )}
                            {/* Footer link */}
                            {(item.submenu?.find((item) => item.footerLink) || 
                              item.megaMenu?.featurePanel?.footerLink ||
                              item.megaMenu?.footerLink) && (
                              <li className="mt-3 pt-3 border-t border-mist">
                                <a
                                  href={item.href}
                                  onClick={onClose}
                                  className="block px-4 py-2 text-teal font-helvetica text-xs font-medium hover:text-sage transition"
                                >
                                  {item.submenu?.find((item) => item.footerLink)?.footerLink ||
                                    item.megaMenu?.featurePanel?.footerLink ||
                                    item.megaMenu?.footerLink ||
                                    "Browse All →"}
                                </a>
                              </li>
                            )}
                          </ul>
                        )}
                      </>
                    ) : (
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
                    )}
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
