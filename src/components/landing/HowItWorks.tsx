"use client";

import {
  AUDIENCE_COPY,
  HOW_SUB,
  HOW_TITLE,
  STORY_NOTE,
} from "@/content/landing";
import { useAudience } from "@/components/audience/AudienceProvider";
import { CtaLink } from "@/components/ui/CtaLink";
import { StepRoll } from "./StepRoll";
import { StaticSteps } from "./StaticSteps";

/**
 * Both story variants are in the DOM; CSS (`animated` / `static-story`
 * variants) picks one, so the mode is correct on first paint.
 */
export function HowItWorks() {
  const { audience } = useAudience();

  return (
    <section id="como-funciona" className="bg-base px-4 py-14 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7 md:gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="max-w-[680px] text-h1 font-bold text-primary-800">
            {HOW_TITLE}
          </h2>
          <p className="max-w-[600px] text-body-lg text-text-600">{HOW_SUB}</p>
        </div>

        <StepRoll />
        <StaticSteps />

        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <h3 className="text-h2 font-semibold text-primary-800">
            {AUDIENCE_COPY[audience].storyClose}
          </h3>
          <CtaLink location="story" />
          <span className="text-body-sm text-text-600">{STORY_NOTE}</span>
        </div>
      </div>
    </section>
  );
}
