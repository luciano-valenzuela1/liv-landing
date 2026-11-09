import type { Audience } from "@/content/landing";

export type CtaLocation = "header" | "hero" | "navbar" | "story" | "final";
export type LoginLocation = "header" | "navbar" | "final";

export type AnalyticsEvent =
  | {
      name: "cta_click";
      props: {
        location: CtaLocation;
        audience: Audience;
        audience_touched: boolean;
      };
    }
  | { name: "login_click"; props: { location: LoginLocation } }
  | {
      name: "audience_select";
      props: { audience: Audience; selector: "hero" | "beneficios" };
    }
  | {
      name: "story_step_view";
      props: { step: number; mode: "animated" | "static" };
    }
  | { name: "story_skip"; props: { target_step: number | "rubros" } }
  | { name: "faq_open"; props: { question_id: string } }
  | { name: "section_view"; props: { section_id: string } };

type Sink = (event: AnalyticsEvent) => void;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

let sink: Sink | null = null;

/** Plug the real provider (GA4, PostHog, Segment...) once it is decided. */
export function setAnalyticsSink(next: Sink | null): void {
  sink = next;
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  if (sink) {
    sink(event);
    return;
  }
  // Default: GTM-style dataLayer; harmless if no tag manager is present.
  window.dataLayer?.push({ event: event.name, ...event.props });
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.props);
  }
}
