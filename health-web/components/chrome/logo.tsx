import { cn } from "@/lib/utils";

/**
 * Brand mark: open ring (currentColor stroke) + red dot at lower-right.
 * Per spec sign-off, the red dot does NOT invert across themes.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-7", className)}
    >
      <circle
        cx="16"
        cy="16"
        r="11.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="58 14.3"
        transform="rotate(58 16 16)"
      />
      <circle cx="25.4" cy="25.4" r="3.4" fill="#EF4444" />
    </svg>
  );
}

export function Wordmark({
  className,
  subLabel = false,
}: {
  className?: string;
  subLabel?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="leading-none">
        <span className="text-[17px] tracking-tight">
          <strong className="font-extrabold">Quantal</strong>{" "}
          <span className="font-normal">Health</span>
        </span>
        {subLabel && (
          <span className="mt-0.5 block text-[10px] italic opacity-70">
            by Quantal AI
          </span>
        )}
      </span>
    </span>
  );
}
