import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        {
          "border-transparent bg-blue-500/10 text-blue-400 hover:bg-blue-500/20": variant === "default",
          "border-transparent bg-bg-hover text-text-secondary hover:bg-border-subtle": variant === "secondary",
          "text-text-primary border-border-subtle": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
