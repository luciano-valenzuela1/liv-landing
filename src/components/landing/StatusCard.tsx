import { Check, Lock } from "lucide-react";
import { STATUS_CARD_TITLE, STORY_STEPS } from "@/content/landing";
import { Pill } from "@/components/ui/Pill";
import { KeyFactText } from "./KeyFactText";

/** Service status panel for the storytelling (presentational, step is 1-based). */
export function StatusCard({ step }: { step: number }) {
  const current = STORY_STEPS[step - 1];
  const isCustody = current.tone === "custody";
  const finished = step === STORY_STEPS.length;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-text-300 bg-base p-7 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-caption font-medium text-text-600">
            Paso {step} de {STORY_STEPS.length}
          </span>
          <span className="text-h4 font-semibold">{STATUS_CARD_TITLE}</span>
        </div>
        <Pill
          tone={current.tone}
          className="shrink-0 transition-colors duration-[250ms] motion-reduce:transition-none"
        >
          {current.state}
        </Pill>
      </div>

      <div
        aria-hidden="true"
        className="h-1.5 overflow-hidden rounded-full bg-bone"
      >
        <div
          className="h-1.5 rounded-full bg-primary-600 transition-[width] duration-[400ms] ease-in-out motion-reduce:transition-none"
          style={{ width: `${Math.round((step / STORY_STEPS.length) * 100)}%` }}
        />
      </div>

      <ol className="flex flex-col gap-2.5">
        {STORY_STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < step || finished;
          const now = n === step && !finished;
          return (
            <li
              key={s.row}
              className={`flex items-center gap-3 text-body ${
                n <= step ? "text-text-900" : "text-nav-inactive"
              } ${n === step ? "font-semibold" : "font-normal"}`}
            >
              {done ? (
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success">
                  <Check size={14} strokeWidth={3} className="text-text-0" aria-hidden="true" />
                </span>
              ) : now ? (
                <span className="inline-flex h-6 w-6 shrink-0 rounded-full border-[3px] border-secondary-400 bg-secondary-100" />
              ) : (
                <span className="inline-flex h-6 w-6 shrink-0 rounded-full border-2 border-text-300" />
              )}
              <span>{s.row}</span>
            </li>
          );
        })}
      </ol>

      <div
        className={`flex items-center gap-3.5 rounded-xl border-2 px-[18px] py-4 ${
          isCustody
            ? "border-custody-border bg-custody-bg text-custody-text"
            : "border-primary-800 bg-primary-800 text-text-0"
        }`}
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-primary-600">
          <Lock size={22} strokeWidth={2} className="text-secondary-400" aria-hidden="true" />
        </span>
        <span className="text-body font-medium">
          <KeyFactText step={step} />
        </span>
      </div>
    </div>
  );
}
