import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-12 py-6">
      {children}
    </div>
  );
}
