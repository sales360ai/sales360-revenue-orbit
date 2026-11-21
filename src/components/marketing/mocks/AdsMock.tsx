import { TrendingDown } from "lucide-react";
import { marketing } from "@/content/marketing";
import { MockWindow } from "./MockWindow";

const m = marketing.mocks.ads;

export default function AdsMock() {
  return (
    <MockWindow title={m.title} status={m.period}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-2xl font-extrabold text-foreground">{m.roas}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange px-3 py-1.5 font-mono text-[9px] text-ink">
          <TrendingDown className="size-3.5" aria-hidden />
          {m.cpaChip}
        </span>
      </div>
      <div className="relative mt-5 h-36 rounded-2xl border border-line bg-background/50 p-3">
        <div className="absolute inset-x-3 top-1/3 border-t border-dashed border-line" />
        <div className="absolute inset-x-3 top-2/3 border-t border-dashed border-line" />
        <svg
          viewBox="0 0 440 120"
          className="relative h-full w-full"
          preserveAspectRatio="none"
          aria-label="ROAS and CPA performance chart"
        >
          <defs>
            <linearGradient id="ads-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--orange)" stopOpacity=".28" />
              <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 96 C48 88 62 73 102 78 S165 88 202 57 S270 68 306 40 S382 38 440 12 L440 120 L0 120 Z"
            fill="url(#ads-area)"
          />
          <path
            d="M0 96 C48 88 62 73 102 78 S165 88 202 57 S270 68 306 40 S382 38 440 12"
            fill="none"
            stroke="var(--orange)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M0 24 C60 32 86 23 125 42 S202 35 248 60 S324 58 366 83 S412 86 440 99"
            fill="none"
            stroke="var(--orange-amber)"
            strokeOpacity=".65"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
        </svg>
        <div className="mt-1 flex gap-4 font-mono text-[8px] text-muted-foreground">
          {m.chartLabels.map((label, index) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span
                className={
                  index === 0 ? "size-1.5 rounded-full bg-orange" : "size-1.5 rounded-full bg-amber"
                }
              />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line [scrollbar-width:none]">
        <table className="w-full min-w-[470px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-surface/60 font-mono text-[7px] uppercase tracking-wider text-dim">
              {m.headers.map((header) => (
                <th key={header} className="px-3 py-2.5 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.campaigns.map((campaign) => (
              <tr key={campaign.name} className="border-b border-line/60 text-[9px] last:border-0">
                <td className="px-3 py-3 font-medium text-foreground/90">{campaign.name}</td>
                <td className="px-3 py-3 font-mono text-muted-foreground">{campaign.spend}</td>
                <td className="px-3 py-3 font-mono text-muted-foreground">{campaign.leads}</td>
                <td className="px-3 py-3 font-mono text-muted-foreground">{campaign.cpa}</td>
                <td className="px-3 py-3 font-mono text-amber">{campaign.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockWindow>
  );
}
