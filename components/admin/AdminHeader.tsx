"use client";

import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-mist z-50">
      <div className="h-full flex items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="font-playfair text-xl font-semibold text-navy">
            Admin Dashboard
          </Link>
          <span className="text-sm text-charcoal/60 font-helvetica">I ❤️ Homeopathy</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/en"
            className="text-sm text-charcoal hover:text-navy font-helvetica transition"
          >
            View Site
          </Link>
        </div>
      </div>
    </header>
  );
}

