"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS } from "@/content/landing";
import { subscribeToScroll } from "@/lib/scroll-bus";
import { Logo } from "@/components/ui/Logo";
import { CtaLink, LoginLink } from "@/components/ui/CtaLink";

const ACTIVE_LINE_PX = 120;

function inViewport(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

/** Last section whose top crossed the line; none before the first / after the last. */
function computeActive(): string | null {
  let active: string | null = null;
  for (const { id } of NAV_SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= ACTIVE_LINE_PX) active = id;
  }
  if (active === NAV_SECTIONS[NAV_SECTIONS.length - 1].id) {
    const last = document.getElementById(active);
    if (last && last.getBoundingClientRect().bottom <= ACTIVE_LINE_PX) {
      return null;
    }
  }
  return active;
}

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [yellowElsewhere, setYellowElsewhere] = useState(true);

  useEffect(() => {
    const header = document.getElementById("hero-header");
    return subscribeToScroll(() => {
      if (header) setVisible(header.getBoundingClientRect().bottom <= 0);
      setActiveId(computeActive());
      setYellowElsewhere(
        Array.from(document.querySelectorAll("[data-yellow-cta]")).some(
          inViewport,
        ),
      );
    });
  }, []);

  return (
    <nav
      aria-label="Secciones de la página"
      inert={!visible}
      className={`fixed inset-x-0 top-0 z-50 border-b border-text-300 bg-base shadow-card transition-[transform,opacity,visibility] duration-[220ms] ease-out motion-reduce:transition-none ${
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2.5 md:gap-6 md:px-6 md:py-3">
        <a href="#top" aria-label="LIV, volver al inicio" className="shrink-0">
          <Logo variant="color" className="h-8 w-auto" />
        </a>

        <ul className="hidden min-w-0 items-center gap-1 lg:flex">
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active ? "true" : undefined}
                  className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-lg px-3.5 text-[15px] font-medium hover:bg-primary-50 hover:text-primary-800 ${
                    active
                      ? "text-primary-600 underline decoration-primary-600 decoration-2 underline-offset-8"
                      : "text-nav-inactive"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <LoginLink
            location="navbar"
            className="px-3 text-primary-600 max-[400px]:hidden"
          />
          <CtaLink
            location="navbar"
            size="sm"
            variant={yellowElsewhere ? "outline" : "yellow"}
            className="!font-bold"
          />
        </div>
      </div>
    </nav>
  );
}
