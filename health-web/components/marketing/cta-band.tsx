import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/marketing/section";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  lead,
  actions,
  className,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions: React.ReactNode;
  className?: string;
}) {
  return (
    <Section className={cn("text-center", className)}>
      <Reveal>
        <h2 className="mx-auto max-w-2xl text-h2 font-bold sm:text-[2.125rem]">
          {title}
        </h2>
        {lead && (
          <p className="mx-auto mt-4 max-w-xl text-lead text-ink-muted">
            {lead}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {actions}
        </div>
      </Reveal>
    </Section>
  );
}
