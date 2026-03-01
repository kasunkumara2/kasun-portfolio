import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/70",
        variant === "primary" &&
          "bg-white text-bg-900 hover:bg-white/90 shadow-neon",
        variant === "secondary" &&
          "bg-neon-purple text-white hover:bg-neon-purple/90 shadow-neon",
        variant === "ghost" &&
          "bg-white/5 text-white hover:bg-white/10 border border-white/10",
        className
      )}
      {...props}
    />
  );
}
