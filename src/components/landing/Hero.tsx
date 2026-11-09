"use client";

import {
  AUDIENCE_COPY,
  AUDIENCE_QUESTION,
  HERO_NOTES,
} from "@/content/landing";
import { useAudience } from "@/components/audience/AudienceProvider";
import { Logo } from "@/components/ui/Logo";
import { CtaLink, LoginLink } from "@/components/ui/CtaLink";
import { AudienceToggle } from "./AudienceToggle";

export function Hero() {
  const { audience, audienceTouched } = useAudience();
  const copy = AUDIENCE_COPY[audience];
  const note = audienceTouched ? HERO_NOTES[audience] : HERO_NOTES.untouched;

  return (
    <section
      id="top"
      className="on-dark bg-primary-800 px-4 pb-[112px] text-text-0 md:px-6 md:pb-[140px]"
    >
      <header
        id="hero-header"
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 py-5"
      >
        <a href="#top" aria-label="LIV, inicio">
          <Logo variant="negative" priority className="h-10 w-auto" />
        </a>
        <div className="flex items-center gap-2">
          <LoginLink
            location="header"
            className="px-3.5 text-text-200 max-md:px-2 max-md:text-sm max-[400px]:px-1.5"
          />
          <CtaLink location="header" variant="outlineOnDark" size="sm" />
        </div>
      </header>

      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-5 pt-9 text-center md:gap-6 md:pt-14">
        <div className="flex w-full flex-col items-center gap-2">
          <span
            id="hero-audience-label"
            className="text-body-sm font-medium text-text-200"
          >
            {AUDIENCE_QUESTION}
          </span>
          <AudienceToggle
            variant="dark"
            selector="hero"
            labelledBy="hero-audience-label"
          />
        </div>

        <h1 className="text-display font-bold tracking-[-0.01em]">
          {copy.h1}
        </h1>
        <p className="max-w-[620px] text-body-lg tracking-[0.005em] text-text-200 md:text-[17px] md:leading-[27px]">
          {copy.lead}
        </p>

        <div className="flex w-full flex-col items-center gap-2.5 pt-1">
          <CtaLink location="hero" arrow />
          <span className="text-body-sm text-text-200">{note}</span>
        </div>
      </div>
    </section>
  );
}
