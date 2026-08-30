import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-6", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow font-bold uppercase",
        onDark ? "text-quantum" : "text-quantum-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  centered = false,
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  centered?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <Eyebrow onDark={onDark} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "text-h2 font-bold sm:text-[2.125rem]",
          centered && "mx-auto max-w-2xl",
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lead",
            onDark ? "text-[#B8B3A8]" : "text-ink-muted",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
