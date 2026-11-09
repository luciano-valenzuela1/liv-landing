import type { ReactNode } from "react";
import type { PillTone } from "@/content/landing";

const TONES: Record<PillTone, string> = {
  info: "bg-info-bg text-info-text border-primary-200",
  custody: "bg-custody-bg text-custody-text border-custody-border",
  success: "bg-success-bg text-success-text border-success",
  warning: "bg-warning-bg text-warning-text border-warning",
};

export function Pill({
  tone,
  children,
  className = "",
}: {
  tone: PillTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-caption font-semibold ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
