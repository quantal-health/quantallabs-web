import { cn } from "@/lib/utils";
import { Container } from "@/components/marketing/section";

/**
 * Dark ink band in light theme; inverts to a surface tint in dark theme so it
 * still reads as a distinct band (spec §5).
 */
export function DarkBand({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "bg-[#1B1A18] py-20 text-[#F4EFE2] sm:py-24 dark:bg-[#252320]",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
