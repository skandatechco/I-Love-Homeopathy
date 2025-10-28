import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-6">
      {children}
    </div>
  );
}
