"use client";

import { useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { STATUS_CARD_TITLE, STORY_STEPS } from "@/content/landing";
import { track } from "@/lib/analytics";
import { Pill } from "@/components/ui/Pill";

const STEPS = STORY_STEPS.length;

/**
 * Mobile/tablet storytelling: a sticky status header (what the desktop
 * StatusCard shows, condensed) stays pinned under the nav while the 6 steps
 * scroll underneath. The step crossing the viewport's middle line is active.
 * Visibility is CSS-only (`mobile-story` variant), so first paint is correct.
 */
export function StepScroll() {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tracked = useRef(new Set<number>());
  const [step, setStep] = useState(1);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const n = Number((e.target as HTMLElement).dataset.step);
          setStep(n);
          if (!tracked.current.has(n)) {
            tracked.current.add(n);
            track({ name: "story_step_view", props: { step: n, mode: "mobile" } });
          }
        }
      },
      // 1px band at the viewport's vertical center
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = STORY_STEPS[step - 1];
  const custody = current.tone === "custody";

  return (
    <div className="hidden mobile-story:block">
      <div className="sticky top-[60px] z-30 -mx-4 border-y border-text-300 bg-base/95 px-4 py-3 shadow-card backdrop-blur md:-mx-6 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="text-caption font-medium text-text-600">
              Paso {step} de {STEPS}
            </span>
            <span className="truncate text-body font-semibold">
              {STATUS_CARD_TITLE}
            </span>
          </div>
          <Pill
            tone={current.tone}
            className="shrink-0 transition-colors duration-[250ms] motion-reduce:transition-none"
          >
            {current.state}
          </Pill>
        </div>

        <div aria-hidden="true" className="mt-2.5 flex gap-1">
          {STORY_STEPS.map((s, i) => (
            <span
              key={s.title}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-[250ms] motion-reduce:transition-none ${
                i < step ? "bg-primary-600" : "bg-bone"
              }`}
            />
          ))}
        </div>

        <div
          className={`mt-2.5 flex items-start gap-2.5 rounded-lg border px-3 py-2 text-body-sm font-medium ${
            custody
              ? "border-custody-border bg-custody-bg text-custody-text"
              : "border-primary-800 bg-primary-800 text-text-0"
          }`}
        >
          <Lock
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-secondary-400"
            aria-hidden="true"
          />
          <span>{current.keyFact}</span>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Paso {step} de {STEPS}: {current.title}. {current.text}
      </p>

      <ol className="flex flex-col">
        {STORY_STEPS.map((s, i) => {
          const on = step === i + 1;
          const isCustody = s.tone === "custody";
          return (
            <li
              key={s.title}
              data-step={i + 1}
              data-active={on}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`flex min-h-[62svh] flex-col justify-center gap-3 py-8 transition-opacity duration-300 motion-reduce:transition-none ${
                on ? "opacity-100" : "opacity-35"
              }`}
            >
              <div className="inline-flex flex-col items-stretch gap-1.5 self-start">
                <span
                  className={`text-[64px] font-light leading-[64px] tracking-[-0.02em] tabular-nums ${
                    isCustody ? "text-primary-600" : "text-info"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="step-underline block h-1.5 w-full rounded-full bg-secondary-400" />
              </div>
              <h3 className="text-h2 font-semibold text-primary-800">
                {s.title}
              </h3>
              <p className="text-body-lg text-text-600">{s.text}</p>
              {s.badge && (
                <Pill tone="custody" className="self-start">
                  {s.badge}
                </Pill>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
