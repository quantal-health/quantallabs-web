import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        success: "bg-success/12 text-[#0f9d6b]",
        warning: "bg-warning/15 text-[#c07d0a]",
        danger: "bg-danger/12 text-[#d33]",
        info: "bg-info/12 text-info",
        neutral: "bg-paper-dark text-ink-muted",
        quantum: "bg-quantum-soft text-quantum-dark dark:text-quantum",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function StatusPill({
  className,
  tone,
  children,
}: React.ComponentProps<"span"> & VariantProps<typeof pillVariants>) {
  return (
    <span className={cn(pillVariants({ tone }), className)}>{children}</span>
  );
}
