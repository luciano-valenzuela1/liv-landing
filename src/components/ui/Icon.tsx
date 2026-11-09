import {
  Building2,
  FileCheck,
  Layers,
  Lock,
  MapPin,
  Receipt,
  Shield,
  SlidersHorizontal,
  Star,
  Tag,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/landing";

const ICONS: Record<IconName, LucideIcon> = {
  Shield,
  Lock,
  FileCheck,
  Building2,
  Tag,
  MapPin,
  Layers,
  Receipt,
  TrendingUp,
  SlidersHorizontal,
  Star,
};
/** 44x44 container, 10px radius, 24px icon with 2px stroke. */
export function IconBox({ name }: { name: IconName }) {
  const Cmp = ICONS[name];
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-icon-box-border bg-primary-50 text-primary-600"
    >
      <Cmp size={24} strokeWidth={2} />
    </span>
  );
}
