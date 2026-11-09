import { cacheLife } from "next/cache";
import {
  FOOTER_LEGAL,
  FOOTER_NOTE,
  NAV_SECTIONS,
} from "@/content/landing";
import { Logo } from "@/components/ui/Logo";

/** Cached so the static shell stays prerenderable; refreshes daily. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="on-dark border-t border-primary-600 bg-primary-800 text-text-200">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-6 pt-9 md:gap-8 md:px-6 md:pb-8 md:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#top" aria-label="LIV, volver al inicio">
            <Logo variant="negative" className="h-9 w-auto" />
          </a>
          <nav aria-label="Secciones" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex min-h-11 items-center text-body font-medium text-text-200 hover:text-text-0 hover:underline"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-600 pt-6 text-body-sm">
          <span>
            © <CurrentYear /> {FOOTER_NOTE}
          </span>
          <nav aria-label="Legales" className="flex flex-wrap gap-x-5">
            {FOOTER_LEGAL.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center text-text-200 underline hover:text-text-0"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
