"use client";

import { AUDIENCE_OPTIONS } from "@/content/landing";
import { useAudience } from "@/components/audience/AudienceProvider";

const STYLES = {
  dark: {
    track:
      "border-text-500 rounded-[26px] max-md:flex max-md:w-full max-md:flex-nowrap md:inline-flex md:flex-wrap md:justify-center",
    btn: "rounded-full px-5 max-md:min-w-0 max-md:flex-1 max-md:whitespace-normal max-md:px-2.5 max-md:py-1.5 max-md:text-[13px] max-md:leading-[17px] md:whitespace-nowrap",
    active: "bg-text-0 text-primary-800",
    inactive: "bg-transparent text-text-0 hover:bg-text-0/10",
  },
  light: {
    track: "inline-flex border-text-300 bg-base rounded-[10px]",
    btn: "rounded-lg px-4 whitespace-nowrap max-md:px-2.5 max-md:text-[13px]",
    active: "bg-primary-600 text-text-0 hover:bg-primary-800",
    inactive: "bg-transparent text-primary-600 hover:bg-primary-50",
  },
} as const;

/**
 * Segmented selector. Both instances (hero + benefits) share the same global
 * audience state via AudienceProvider.
 */
export function AudienceToggle({
  variant,
  selector,
  labelledBy,
  className = "",
}: {
  variant: keyof typeof STYLES;
  selector: "hero" | "beneficios";
  labelledBy: string;
  className?: string;
}) {
  const { audience, selectAudience } = useAudience();
  const s = STYLES[variant];

  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className={`gap-1 border p-1 ${s.track} ${className}`}
    >
      {AUDIENCE_OPTIONS.map((opt) => {
        const pressed = audience === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={pressed}
            onClick={() => selectAudience(opt.value, selector)}
            className={`min-h-11 cursor-pointer text-[15px] font-semibold transition-colors duration-150 ${s.btn} ${
              pressed ? s.active : s.inactive
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
