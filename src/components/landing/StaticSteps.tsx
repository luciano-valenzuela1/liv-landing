"use client";

import { useEffect, useRef } from "react";
import { STORY_STEPS } from "@/content/landing";
import { track } from "@/lib/analytics";
import { Pill } from "@/components/ui/Pill";

/** Static storytelling: 6 cards, no sticky, no roll. */
export function StaticSteps() {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const seen = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const step = Number((e.target as HTMLElement).dataset.step);
          if (seen.has(step)) continue;
          seen.add(step);
          track({ name: "story_step_view", props: { step, mode: "static" } });
        }
      },
      { threshold: 0.6 },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol className="animated:hidden flex flex-col gap-3">
      {STORY_STEPS.map((s, i) => {
        const custody = s.tone === "custody";
        return (
          <li
            key={s.title}
            data-step={i + 1}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`flex items-start gap-4 rounded-xl border p-5 ${
              custody
                ? "border-custody-border bg-custody-bg"
                : "border-text-300 bg-base"
            }`}
          >
            <div
              aria-hidden="true"
              className="inline-flex shrink-0 flex-col items-stretch gap-1"
            >
              <span
                className={`text-[56px] font-light leading-[56px] tabular-nums max-md:text-[48px] max-md:leading-[52px] ${
                  custody ? "text-primary-600" : "text-info"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block h-1 rounded-full bg-primary-200" />
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h3 className="text-h4 font-semibold text-primary-800">
                {s.title}
              </h3>
              <p className="text-body text-text-600">{s.text}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Pill tone={s.tone} className="px-2.5">
                  {s.state}
                </Pill>
                {s.badge && (
                  <Pill
                    tone="custody"
                    className="bg-base px-2.5"
                  >
                    {s.badge}
                  </Pill>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
