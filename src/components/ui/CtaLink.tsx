"use client";

import { ArrowRight } from "lucide-react";
import { CTA_LABEL, LOGIN_LABEL, ROUTES } from "@/content/landing";
import { track, type CtaLocation, type LoginLocation } from "@/lib/analytics";
import { useAudience } from "@/components/audience/AudienceProvider";

const BASE =
  "inline-flex items-center justify-center border text-center transition-colors duration-150";

const VARIANTS = {
  // The only yellow button style. Never two visible at once (see StickyNav).
  yellow:
    "border-secondary-400 bg-secondary-400 text-text-900 hover:border-secondary-300 hover:bg-secondary-300 active:bg-secondary-500",
  outline:
    "border-primary-600 bg-base text-primary-600 hover:bg-primary-50",
  outlineOnDark:
    "border-text-200 bg-transparent text-text-0 hover:bg-text-0/10",
} as const;

const SIZES = {
  // header / navbar
  sm: "min-h-11 rounded-lg px-[18px] text-[15px] font-semibold max-md:px-3.5 max-md:text-sm max-[400px]:px-2.5",
  // content CTAs
  lg: "min-h-14 w-full gap-3 rounded-[10px] px-9 text-body-lg font-bold md:w-auto",
} as const;

export function CtaLink({
  location,
  variant = "yellow",
  size = "lg",
  arrow = false,
  className = "",
}: {
  location: CtaLocation;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  arrow?: boolean;
  className?: string;
}) {
  const { registerHref, audience, audienceTouched } = useAudience();
  return (
    <a
      href={registerHref}
      // Marks yellow content CTAs so the sticky nav can yield to them.
      data-yellow-cta={
        variant === "yellow" && location !== "navbar" ? "" : undefined
      }
      onClick={() =>
        track({
          name: "cta_click",
          props: { location, audience, audience_touched: audienceTouched },
        })
      }
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {CTA_LABEL}
      {arrow && <ArrowRight size={20} strokeWidth={2.2} aria-hidden="true" />}
    </a>
  );
}

export function LoginLink({
  location,
  className = "",
}: {
  location: LoginLocation;
  className?: string;
}) {
  return (
    <a
      href={ROUTES.login}
      onClick={() => track({ name: "login_click", props: { location } })}
      className={`inline-flex min-h-11 items-center text-[15px] font-semibold ${className}`}
    >
      {LOGIN_LABEL}
    </a>
  );
}
