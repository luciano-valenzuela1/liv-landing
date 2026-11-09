import Image from "next/image";

const SOURCES = {
  // Full-color primary logo (light backgrounds)
  color: "/logo-color.png",
  // Negative: yellow on dark backgrounds
  negative: "/logo-negative.png",
} as const;

/** Fixed 812x580 attributes reserve the box and avoid layout shift. */
export function Logo({
  variant,
  className,
  priority = false,
}: {
  variant: keyof typeof SOURCES;
  className: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={SOURCES[variant]}
      width={812}
      height={580}
      alt="LIV"
      priority={priority}
      className={className}
    />
  );
}
