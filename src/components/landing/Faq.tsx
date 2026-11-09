"use client";

import { Plus } from "lucide-react";
import { FAQ, FAQ_PENDING_LABEL, FAQ_TITLE } from "@/content/landing";
import { track } from "@/lib/analytics";

/** Native <details>: keyboard and screen-reader support for free. First one open. */
export function Faq() {
  return (
    <section id="preguntas" className="bg-base px-4 py-14 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-7 md:gap-12">
        <div className="min-w-0 flex-[1_1_320px]">
          <h2 className="text-h1 font-bold text-primary-800">{FAQ_TITLE}</h2>
        </div>
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-3">
          {FAQ.map((item, i) => (
            <details
              key={item.id}
              open={i === 0}
              onToggle={(e) => {
                if (e.currentTarget.open) {
                  track({ name: "faq_open", props: { question_id: item.id } });
                }
              }}
              className="group rounded-xl border border-text-300 bg-base px-4 md:px-6"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3.5 md:py-[18px] [&::-webkit-details-marker]:hidden">
                <h3 className="text-[16px] font-semibold leading-6 md:text-body-lg">
                  {item.question}
                </h3>
                <Plus
                  aria-hidden="true"
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 text-primary-600 transition-transform duration-150 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-[68ch] pb-5 text-body text-text-600">
                {item.answer}
                {item.pending && (
                  <span className="ml-1.5 inline-block rounded-full border border-warning bg-warning-bg px-2 py-px align-[1px] text-caption font-semibold leading-[18px] text-warning-text">
                    {FAQ_PENDING_LABEL}
                  </span>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
