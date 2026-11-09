"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SECTION_IDS = [
  "top",
  "respaldo",
  "beneficios",
  "como-funciona",
  "rubros",
  "preguntas",
  "registro",
];

/** Fires `section_view` once per section the first time it enters the viewport. */
export function SectionViewTracker() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          track({ name: "section_view", props: { section_id: e.target.id } });
          io.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
