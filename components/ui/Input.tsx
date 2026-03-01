import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props;
  return (
    <input
      className={cn(
        "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white",
        "placeholder:text-white/40 focus:border-neon-blue/40 focus:ring-2 focus:ring-neon-blue/20 outline-none",
        className
      )}
      {...rest}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={cn(
        "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white min-h-[140px]",
        "placeholder:text-white/40 focus:border-neon-blue/40 focus:ring-2 focus:ring-neon-blue/20 outline-none",
        className
      )}
      {...rest}
    />
  );
}
