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
        "rounded-card border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

// Named export for consistency
export { Card };
