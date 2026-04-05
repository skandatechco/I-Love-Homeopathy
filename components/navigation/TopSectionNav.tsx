"use client";

import { usePathname } from "next/navigation";
import { getSectionColour } from "@/lib/section-colours";

type NavItem = {
  label: string;
  href: string;
  className: string;
  section?: string;
};

export default function TopSectionNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname() || "";
  const sectionMatch = pathname.match(/^\/[^/]+\/articles\/([^/]+)/);
  const activeSection = sectionMatch?.[1];
  const isHome = /^\/[^/]+\/?$/.test(pathname);

  return (
    <div className="nav-inner">
      {items.map((item, index) => {
        const active =
          item.section ? activeSection === item.section : index === 0 && isHome;
        const colour = item.section ? getSectionColour(item.section) : null;

        return (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            className={item.className}
            style={
              active && colour
                ? {
                    borderBottom: `3px solid ${colour.border}`,
                    color: colour.bg === "#FFFDE7" ? "#ffffff" : undefined,
                  }
                : undefined
            }
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
