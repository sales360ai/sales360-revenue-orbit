import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  size?: number | string;
  segments?: number;
  variant?: "static" | "spin" | "loader";
  tone?: "brand" | "white" | "ink";
  className?: string;
  title?: string;
};

/** The "360 Sunburst Ring" — radiating segments derived from the logo's "0". Crisp at 16–600px. */
export function SunburstRing({ size = 48, segments = 20, variant = "static", tone = "brand", className, title }: Props) {
  const id = useId().replace(/:/g, "");
  const small = typeof size === "number" && size < 28;
  const n = small ? 12 : segments;
  const fill = tone === "brand" ? `url(#g${id})` : tone === "white" ? "currentColor" : "var(--bg)";
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn(variant === "spin" && "animate-spin-slow", variant === "loader" && "animate-spin-fast", className)}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF4D2E" />
          <stop offset=".45" stopColor="#FF6B1F" />
          <stop offset="1" stopColor="#FFA23A" />
        </linearGradient>
      </defs>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={small ? 45 : 46.5}
          y={4}
          width={small ? 10 : 7}
          height={small ? 24 : 26}
          rx={small ? 3 : 2.5}
          fill={fill}
          opacity={variant === "loader" ? 0.25 + (0.75 * i) / n : 1}
          transform={`rotate(${(360 / n) * i} 50 50)`}
        />
      ))}
    </svg>
  );
}
