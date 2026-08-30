import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/site";
import { Wordmark } from "@/components/chrome/logo";

export function Footer() {
  return (
    <footer className="bg-[#1B1A18] text-[#F4EFE2] dark:bg-[#252320]">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#B8B3A8]">
              Care platform for weight-loss clinics, white-labeled for your
              practice.
            </p>
            <a
              href="https://quantallabs.ai"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[rgba(244,239,226,0.18)] px-3 py-1.5 text-xs font-medium text-[#B8B3A8] transition-colors hover:border-[rgba(244,239,226,0.4)] hover:text-[#F4EFE2]"
            >
              by Quantal Labs <span aria-hidden>↗</span>
            </a>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7A7570]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#B8B3A8] transition-colors hover:text-[#F4EFE2]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-[rgba(244,239,226,0.1)] pt-6 text-xs text-[#7A7570] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Quantal Labs. All rights reserved.</p>
          <p className="font-medium text-[#B8B3A8]">
            Now accepting design partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
