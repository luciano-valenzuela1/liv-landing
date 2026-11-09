import { STORY_STEPS } from "@/content/landing";

/**
 * Renders the current step's key fact while reserving the height of the
 * longest one: every fact is stacked in the same grid cell and only the
 * current one is visible, so the box never changes height between steps.
 */
export function KeyFactText({ step }: { step: number }) {
  return (
    <span className="grid min-w-0 items-center">
      {STORY_STEPS.map((s, i) => (
        <span
          key={s.title}
          className={`col-start-1 row-start-1 ${
            i === step - 1 ? "" : "invisible"
          }`}
        >
          {s.keyFact}
        </span>
      ))}
    </span>
  );
}
