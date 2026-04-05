import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-0">
      {children}
    </div>
  );
}
