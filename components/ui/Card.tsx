import { ReactNode } from "react";
import cn from "classnames";

export default function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-mist bg-white p-6 shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

// Named export for consistency
export { Card };
