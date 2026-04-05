"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="font-playfair text-4xl text-forest font-bold">
          I <span className="italic text-gold">Love</span> Homeopathy
        </h1>
        <p className="text-muted font-helvetica text-sm mt-2 tracking-widest uppercase">
          Editorial Admin
        </p>
      </div>
      <SignIn />
    </div>
  );
}
