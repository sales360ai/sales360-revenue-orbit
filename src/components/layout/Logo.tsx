import { Link } from "@tanstack/react-router";
import logo from "@/assets/sales360-logo.webp.asset.json";

export function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Sales360.ai home"
      className="inline-flex min-h-11 shrink-0 items-center"
    >
      {/* TODO: replace with sales360-logo-light asset */}
      <span className="surface-ink inline-flex items-center rounded-[14px] bg-ink px-3.5 py-2">
      <img
        src={logo.url}
        alt="Sales360.ai"
        width={374}
        height={60}
        className={`${className} w-auto`}
      />
      </span>
    </Link>
  );
}
