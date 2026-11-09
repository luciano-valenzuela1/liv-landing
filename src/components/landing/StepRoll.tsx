"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STORY_STEPS } from "@/content/landing";
import { subscribeToScroll } from "@/lib/scroll-bus";
import { track } from "@/lib/analytics";
import { Pill } from "@/components/ui/Pill";
import { StatusCard } from "./StatusCard";

const CONTAINER_HEIGHT = 2600;
const MAX_VIEW_HEIGHT = 1100;
const STEPS = STORY_STEPS.length;
// Must mirror the `animated` custom variant in globals.css
const ANIMATED_QUERY =
  "(min-width: 64rem) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Sticky `top` that puts the StatusCard's vertical center at the viewport
 * center (viewport height capped at 1100px).
 */
function measureStageTop(stage: HTMLElement, panel: HTMLElement): number {
  const viewH = Math.min(window.innerHeight, MAX_VIEW_HEIGHT);
  return Math.round(viewH / 2 - (panel.offsetTop + panel.offsetHeight / 2));
}

/**
 * Animated storytelling: a sticky stage drives a 3D roll of the 6 steps.
 * Transforms are written straight to the DOM (refs); React state only changes
 * when the current step changes.
 */
export function StepRoll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const faceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lastTracked = useRef(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(ANIMATED_QUERY);

    const update = () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      const panel = panelRef.current;
      if (!mq.matches || !container || !stage || !panel) return;

      const stageTop = measureStageTop(stage, panel);
      stage.style.top = `${stageTop}px`;

      const rect = container.getBoundingClientRect();
      const span = Math.max(1, rect.height - stage.offsetHeight);
      const pos = clamp((stageTop - rect.top) / span, 0, 1) * (STEPS - 1);

      faceRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = i - pos;
        const abs = Math.abs(offset);
        const scale = Math.max(0.78, 1 - abs * 0.14);
        el.style.transform = `translateY(calc(-50% + ${(offset * 270).toFixed(1)}px)) rotateX(${(-offset * 32).toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = Math.max(0, 1 - abs * 0.55).toFixed(2);
        el.style.zIndex = String(10 - Math.round(abs * 3));
        el.style.visibility = abs > 1.6 ? "hidden" : "visible";
      });

      const next = Math.round(pos) + 1;
      setStep(next);

      const vh = window.innerHeight;
      if (rect.top < vh && rect.bottom > 0 && next !== lastTracked.current) {
        lastTracked.current = next;
        track({
          name: "story_step_view",
          props: { step: next, mode: "animated" },
        });
      }
    };

    // Re-evaluate when the viewport changes mode (e.g. tablet rotation)
    mq.addEventListener("change", update);
    const unsubscribe = subscribeToScroll(update);
    return () => {
      mq.removeEventListener("change", update);
      unsubscribe();
    };
  }, []);

  const goToStep = useCallback((index: number) => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!container || !stage || !panel) return;
    const stageTop = measureStageTop(stage, panel);
    const rect = container.getBoundingClientRect();
    const span = Math.max(1, rect.height - stage.offsetHeight);
    window.scrollTo({
      top: window.scrollY + rect.top - stageTop + span * (index / (STEPS - 1)) + 2,
      behavior: "smooth",
    });
    track({ name: "story_skip", props: { target_step: index + 1 } });
  }, []);

  const current = STORY_STEPS[step - 1];

  return (
    <div className="static-story:hidden">
      {/* Screen-reader version: full list. Visual roll below is aria-hidden. */}
      <ol className="sr-only">
        {STORY_STEPS.map((s, i) => (
          <li key={s.title}>
            Paso {i + 1}: {s.title}. {s.text}
          </li>
        ))}
      </ol>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: CONTAINER_HEIGHT }}
      >
        <div ref={stageRef} className="sticky" style={{ top: 100 }}>
          <div className="flex items-center gap-[72px]">
            <div
              ref={panelRef}
              className="min-w-0 flex-[1_1_440px]"
            >
              <StatusCard step={step} />
              <p className="sr-only" aria-live="polite">
                Paso {step} de {STEPS}: {current.title}. {current.text}
              </p>
            </div>

            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
              <div
                aria-hidden="true"
                className="roll-mask relative h-[560px] overflow-hidden"
                style={{ perspective: 1200 }}
              >
                {STORY_STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    ref={(el) => {
                      faceRefs.current[i] = el;
                    }}
                    data-active={step === i + 1}
                    className="roll-face absolute inset-x-0 top-1/2 flex origin-center flex-col gap-3 px-1 py-2 [translate:0_-50%]"
                    style={{
                      // Pre-hydration pose; scroll handler takes over
                      opacity: i === 0 ? 1 : 0,
                      visibility: i === 0 ? "visible" : "hidden",
                    }}
                  >
                    <div className="inline-flex flex-col items-stretch gap-1.5 self-start">
                      <span
                        className={`text-step font-light tracking-[-0.02em] tabular-nums ${
                          s.tone === "custody" ? "text-primary-600" : "text-info"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="step-underline block h-1.5 w-full rounded-full bg-secondary-400" />
                    </div>
                    <p className="mt-2 text-h2 font-semibold text-primary-800">
                      {s.title}
                    </p>
                    <p className="max-w-[460px] text-body-lg text-text-600">
                      {s.text}
                    </p>
                    {s.badge && (
                      <Pill tone="custody" className="self-start">
                        {s.badge}
                      </Pill>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div role="group" aria-label="Ir a un paso" className="flex items-center">
                  {STORY_STEPS.map((s, i) => {
                    const on = step === i + 1;
                    return (
                      <button
                        key={s.title}
                        type="button"
                        aria-label={`Ir al paso ${i + 1}: ${s.title}`}
                        aria-current={on ? "step" : undefined}
                        onClick={() => goToStep(i)}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center"
                      >
                        <span
                          className={`block h-2 rounded-full transition-[width,background-color] duration-250 motion-reduce:transition-none ${
                            on ? "w-7 bg-primary-600" : "w-2 bg-text-500"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <a
                  href="#rubros"
                  onClick={() =>
                    track({ name: "story_skip", props: { target_step: "rubros" } })
                  }
                  className="inline-flex min-h-11 items-center text-body font-semibold text-primary-500"
                >
                  Saltar a Rubros
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
