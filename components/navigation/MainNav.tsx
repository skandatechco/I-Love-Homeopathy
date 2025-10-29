"use client";

import { usePathname } from "next/navigation";
import { navItems, ctaLink } from "./navItems";

interface MainNavProps {
  textColor?: string;
  hoverColor?: string;
}

export default function MainNav({ textColor = "text-cream", hoverColor = "hover:text-gold" }: MainNavProps) {
  const pathname = usePathname();

  return (
    <>
      <nav className={`hidden md:flex items-center gap-8 font-helvetica text-sm font-medium ${textColor}`}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

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
        })}
      </nav>
    </>
  );
}

