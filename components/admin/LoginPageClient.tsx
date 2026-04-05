"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function LoginPageClient() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream">
      <div className="text-center">
        <h1 className="font-playfair text-4xl font-bold text-forest">
          I <span className="italic text-gold">Love</span> Homeopathy
        </h1>
        <p className="mt-2 font-helvetica text-sm uppercase tracking-widest text-muted">
          Editorial Admin
        </p>
      </div>
      {reason === "timeout" ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-600">
          You were signed out after 60 minutes of inactivity.
        </p>
      ) : null}
      <SignIn
        fallbackRedirectUrl="/admin/editor"
        forceRedirectUrl="/admin/editor"
      />
    </div>
  );
}
