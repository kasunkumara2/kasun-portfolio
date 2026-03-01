import * as React from "react";
import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass rounded-3xl neon-border", className)}
      {...props}
    />
  );
}
