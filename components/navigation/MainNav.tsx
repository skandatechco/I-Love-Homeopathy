"use client";

import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/en" },
  { 
    name: "Start Here", 
    href: "/en/start-here",
    submenu: [
      { name: "What is Homeopathy?", href: "/en/start-here/what-is-homeopathy" },
      { name: "How Remedies are Made", href: "/en/start-here/how-remedies-made" },
      { name: "When to See a Doctor", href: "/en/start-here/when-to-see-doctor" },
    ]
  },
  { 
    name: "Learn", 
    href: "/en/learn",
    submenu: [
      { name: "Foundations", href: "/en/learn/foundations" },
      { name: "Remedy Families", href: "/en/learn/remedy-families" },
      { name: "Materia Medica", href: "/en/learn/materia-medica" },
      { name: "Acute vs Chronic", href: "/en/learn/acute-vs-chronic" },
    ]
  },
  { 
    name: "Practice", 
    href: "/en/practice",
    submenu: [
      { name: "Case-taking Basics", href: "/en/practice/case-taking" },
      { name: "Record-keeping & Ethics", href: "/en/practice/record-keeping" },
      { name: "Potencies & Dosing", href: "/en/practice/potencies-dosing" },
      { name: "Home Kit Guide", href: "/en/practice/home-kit" },
    ]
  },
  { 
    name: "Evidence Hub", 
    href: "/en/evidence",
    submenu: [
      { name: "Study Summaries", href: "/en/evidence/study-summaries" },
      { name: "Methods 101", href: "/en/evidence/methods-101" },
      { name: "Lab Studies", href: "/en/evidence/lab-studies" },
      { name: "Reading Papers", href: "/en/evidence/reading-papers" },
      { name: "Claims Checker", href: "/en/evidence/claims-checker" },
    ]
  },
  { 
    name: "Conditions", 
    href: "/en/conditions" 
  },
  { 
    name: "Tools", 
    href: "/en/tools",
    submenu: [
      { name: "Glossary", href: "/en/tools/glossary" },
      { name: "Remedy Finder", href: "/en/tools/remedy-finder" },
      { name: "Downloadables", href: "/en/tools/downloadables" },
    ]
  },
  { name: "About", href: "/en/about" },
  { name: "Blog", href: "/en/blog" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-textMain">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
        
        return (
          <div key={item.href} className="relative group">
            <a
              href={item.href}
              className={`px-2 py-1 rounded hover:text-baholaNavy transition-colors ${
                isActive ? "text-baholaNavy font-semibold" : ""
              }`}
            >
              {item.name}
            </a>
            
            {/* Submenu */}
            {item.submenu && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-borderSoft rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                {item.submenu.map((subItem) => (
                  <a
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-3 py-2 text-xs hover:bg-pageBg rounded hover:text-baholaNavy"
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

