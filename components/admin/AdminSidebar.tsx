"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    children: [
      { name: "Overview", href: "/admin/analytics" },
      { name: "SEO & Discovery", href: "/admin/analytics/seo" },
      { name: "Remedy Engagement", href: "/admin/analytics/remedies" },
      { name: "Conditions Hub", href: "/admin/analytics/conditions" },
      { name: "Bach Flowers", href: "/admin/analytics/bach" },
      { name: "Doctors' Corner", href: "/admin/analytics/doctors" },
      { name: "Bahola Outbound", href: "/admin/analytics/bahola" },
      { name: "Performance", href: "/admin/analytics/performance" },
    ],
  },
  {
    name: "CMS",
    href: "/admin/cms",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
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

  // Auto-expand Analytics if on analytics page
  useEffect(() => {
    if (pathname?.startsWith("/admin/analytics")) {
      setExpandedItems(new Set(["Analytics"]));
    }
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-mist z-40 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            const isExpanded = expandedItems.has(item.name);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.href}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-helvetica text-sm font-medium transition ${
                        isActive
                          ? "bg-navy text-cream"
                          : "text-charcoal hover:bg-ivory hover:text-navy"
                      }`}
                    >
                      {item.icon}
                      <span className="flex-1 text-left">{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-mist pl-4">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`block px-4 py-2 rounded-lg font-helvetica text-sm transition ${
                                  isChildActive
                                    ? "bg-navy/10 text-navy font-semibold"
                                    : "text-charcoal/80 hover:bg-ivory hover:text-navy"
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-helvetica text-sm font-medium transition ${
                      isActive
                        ? "bg-navy text-cream"
                        : "text-charcoal hover:bg-ivory hover:text-navy"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

