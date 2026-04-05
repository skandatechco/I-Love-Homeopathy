"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function AdminSessionGuard() {
  const { signOut } = useClerk();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const TIMEOUT = 60 * 60 * 1000;

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void signOut({ redirectUrl: "/admin/login?reason=timeout" });
    }, TIMEOUT);
  };

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ] as const;

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return null;
}
