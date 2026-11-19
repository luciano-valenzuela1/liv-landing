"use client";

import {
  CONTACT_ANALYSIS_LABEL,
  FINAL_TEXT,
  FINAL_TITLE,
} from "@/content/landing";
import { track } from "@/lib/analytics";
import { CtaLink, LoginLink } from "@/components/ui/CtaLink";

export function FinalCta() {
  return (
    <section
      id="registro"
      className="on-dark bg-primary-800 px-4 py-14 text-text-0 md:px-6 md:py-20"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-2.5">
          <h2 className="text-h1 font-bold">{FINAL_TITLE}</h2>
          <p className="text-body-lg text-text-200">{FINAL_TEXT}</p>
        </div>
        <div className="flex w-full flex-col items-stretch gap-4 md:w-auto md:flex-row md:flex-wrap md:items-center">
          <CtaLink location="final" />
          <a
            href="#contacto"
            onClick={() => track({ name: "analysis_click", props: { location: "final" } })}
            className="inline-flex min-h-14 items-center justify-center rounded-[10px] border border-text-200 px-6 text-body-lg font-semibold text-text-0 transition-colors duration-150 hover:bg-text-0/10"
          >
            {CONTACT_ANALYSIS_LABEL}
          </a>
          <LoginLink
            location="final"
            className="justify-center px-1 py-3 text-text-0 underline"
          />
        </div>
      </div>
    </section>
  );
}
