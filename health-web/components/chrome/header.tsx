"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/chrome/logo";
import { ThemeToggle } from "@/components/chrome/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        "border-b [background:var(--bar)]",
        scrolled ? "border-line shadow-soft" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-6">
        <Link
          href="/"
          className="rounded-md text-ink"
          aria-label="Quantal Health home"
        >
          <Wordmark subLabel />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 min-[960px]:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-quantum-dark"
                  : "text-ink-muted hover:bg-paper-dark/60 hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Talk to founders</Link>
          </Button>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="min-[960px]:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-paper">
        <SheetHeader className="border-b border-line">
          <SheetTitle className="text-left">
            <span className="text-ink">
              <Wordmark />
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {[...NAV_LINKS, { href: "/contact", label: "Contact" }].map(
            (link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    pathname.startsWith(link.href)
                      ? "bg-paper-dark text-ink"
                      : "text-ink-muted hover:bg-paper-dark/60 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </SheetClose>
            ),
          )}
        </nav>
        <div className="mt-auto border-t border-line p-4">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link href="/contact">Talk to founders</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
