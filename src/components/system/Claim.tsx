import { useEffect } from "react";
import { claims, getClaim } from "@/content/claims";
import { CountUp } from "@/components/system/motion";
import { cn } from "@/lib/utils";

export function Claim({
  id,
  template,
  countUp = false,
  className,
  claimClassName,
}: {
  id: string;
  template?: string;
  countUp?: boolean;
  className?: string;
  claimClassName?: string;
}) {
  const claim = getClaim(id);
  const value = countUp ? <CountUp value={claim.text} /> : claim.text;

  if (template !== undefined) {
    const parts = template.split(claim.text);
    if (parts.length === 1) {
      throw new Error(`Claim ${id} is not present in its template.`);
    }
    return (
      <span className={className} data-claim-id={id}>
        {parts.map((part, index) => (
          <span key={`${id}-${index}`}>
            {part}
            {index < parts.length - 1 &&
              (countUp ? (
                <strong className={claimClassName}>{value}</strong>
              ) : (
                <span className={claimClassName}>{value}</span>
              ))}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cn(className, claimClassName)} data-claim-id={id}>
      {value}
    </span>
  );
}

/** Development-only page audit; never logs in production builds. */
export function ClaimsDevLogger({ pathname }: { pathname: string }) {
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const pageClaims = claims.filter(
      (claim) => claim.status !== "verified" && claim.pages.includes(pathname),
    );
    if (pageClaims.length === 0) return;
    console.groupCollapsed(`Sales360.ai claims to verify: ${pathname}`);
    console.table(pageClaims.map(({ id, text, status, note }) => ({ id, text, status, note })));
    console.groupEnd();
  }, [pathname]);

  return null;
}
