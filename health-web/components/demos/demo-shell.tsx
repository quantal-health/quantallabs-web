import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";

type DemoLink = { href: string; label: string };

/**
 * Marketing chrome around every interactive demo: intro ("All data is
 * fictional"), back-link, and an outro cross-linking the other demos.
 */
export function DemoShell({
  eyebrow,
  title,
  lede,
  children,
  others,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
  others: DemoLink[];
}) {
  return (
    <div className="py-10 sm:py-14">
      <Container>
        <Link
          href="/demo"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4" /> Back to demos
        </Link>
        <div className="mt-6 max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-3 text-h1 font-extrabold">{title}</h1>
          <p className="mt-3 text-lead text-ink-muted">
            {lede}{" "}
            <span className="font-semibold text-ink">
              All data is fictional.
            </span>
          </p>
        </div>
      </Container>

      <div className="mt-10">{children}</div>

      <Container>
        <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center shadow-soft">
          <h2 className="text-h3 font-semibold">Liked what you saw?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-ink-muted">
            Explore the other sides of the platform, or talk to the founders
            about bringing it to your clinic.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {others.map((o) => (
              <Button key={o.href} asChild variant="outline">
                <Link href={o.href}>{o.label}</Link>
              </Button>
            ))}
            <Button asChild variant="accent">
              <Link href="/contact">Talk to founders</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
