"use client";

import { AUDIENCE_COPY, BENEFITS } from "@/content/landing";
import { useAudience } from "@/components/audience/AudienceProvider";
import { IconBox } from "@/components/ui/Icon";
import { AudienceToggle } from "./AudienceToggle";

export function Benefits() {
  const { audience } = useAudience();

  return (
    <section id="beneficios" className="px-4 py-14 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-7 md:gap-14">
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5">
          <h2
            id="benefits-title"
            className="text-h1 font-bold text-primary-800"
          >
            {AUDIENCE_COPY[audience].benefitsTitle}
          </h2>
          <AudienceToggle
            variant="light"
            selector="beneficios"
            labelledBy="benefits-title"
            className="mt-2 self-start"
          />
        </div>
        {/* Columns are at least 340px wide so a title (~280–310px of text) fits on one line */}
        <ul className="grid min-w-0 flex-[3_1_560px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-8 gap-y-8">
          {BENEFITS[audience].map((b) => (
            <li key={b.title} className="flex items-start gap-4">
              <IconBox name={b.icon} />
              {/* Size container: the title scales down (never wraps) if the
                  column is narrower than the longest title at its token size */}
              <div className="flex min-w-0 flex-1 flex-col gap-1 [container-type:inline-size]">
                <h3 className="whitespace-nowrap font-semibold [font-size:clamp(0.75rem,5.6cqw,var(--type-h4-size))] [line-height:var(--type-h4-leading)]">
                  {b.title}
                </h3>
                <p className="text-body text-text-600">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
