import { useState, type ReactNode } from "react";
import { Check, Clapperboard, FileText, Layers3, Linkedin, ShieldCheck } from "lucide-react";
import { automation } from "@/content/automation";
import { AutomationWindow } from "./AutomationWindow";
import { RevealGroup, RevealItem } from "@/components/system/motion";
import { cn } from "@/lib/utils";

const content = automation.contentEngine;

function AssetTile({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof FileText;
  children: ReactNode;
}) {
  return (
    <article className="w-full rounded-2xl border border-line bg-surface/70 p-4 shadow-inset-top">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-orange" aria-hidden />
        <h3 className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </h3>
      </div>
      {children}
    </article>
  );
}

export function ContentEngine() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(content.guardrails.toggles.map((label) => [label, true])),
  );

  return (
    <AutomationWindow title={content.windowTitle} status={content.status}>
      <RevealGroup className="columns-1 gap-3 sm:columns-2" stagger={0.08}>
        <RevealItem className="mb-3 break-inside-avoid">
          <AssetTile label={content.blog.label} icon={FileText}>
            <p className="mt-4 text-xs font-semibold leading-relaxed">{content.blog.title}</p>
            <ol className="mt-4 space-y-2.5">
              {content.blog.headings.map((heading, index) => (
                <li
                  key={heading}
                  className="flex gap-2.5 border-t border-line pt-2.5 text-[9px] text-muted-foreground"
                >
                  <span className="font-mono text-[8px] text-orange">0{index + 1}</span>
                  {heading}
                </li>
              ))}
            </ol>
          </AssetTile>
        </RevealItem>

        <RevealItem className="mb-3 break-inside-avoid">
          <AssetTile label={content.social.label} icon={Linkedin}>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-grad text-[9px] font-bold text-ink">
                VK
              </span>
              <div>
                <p className="text-[10px] font-semibold">{content.social.author}</p>
                <p className="font-mono text-[7px] text-muted-foreground">{content.social.tag}</p>
              </div>
            </div>
            <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
              {content.social.body}
            </p>
          </AssetTile>
        </RevealItem>

        <RevealItem className="mb-3 break-inside-avoid">
          <AssetTile label={content.ads.label} icon={Layers3}>
            <div className="mt-4 space-y-2">
              {content.ads.items.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-2.5 rounded-xl border border-line bg-background/60 p-3 text-[9px] leading-relaxed text-foreground/85"
                >
                  <span className="font-mono text-[8px] text-orange">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </AssetTile>
        </RevealItem>

        <RevealItem className="mb-3 break-inside-avoid">
          <AssetTile label={content.video.label} icon={Clapperboard}>
            <p className="mt-4 text-xs font-semibold">{content.video.title}</p>
            <div className="mt-4 space-y-3">
              {content.video.scenes.map((scene) => (
                <div key={scene.time} className="flex items-center gap-3 text-[9px]">
                  <span className="rounded-md border border-orange/25 bg-orange/[.07] px-2 py-1 font-mono text-[8px] text-amber">
                    {scene.time}
                  </span>
                  <span className="text-muted-foreground">{scene.text}</span>
                </div>
              ))}
            </div>
          </AssetTile>
        </RevealItem>

        <RevealItem className="mb-3 break-inside-avoid sm:columns-span-all">
          <AssetTile label={content.guardrails.label} icon={ShieldCheck}>
            <div className="mt-3 divide-y divide-line">
              {content.guardrails.toggles.map((label) => {
                const checked = toggles[label] ?? false;
                return (
                  <button
                    key={label}
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    onClick={() =>
                      setToggles((current) => ({ ...current, [label]: !current[label] }))
                    }
                    className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-[10px] font-medium"
                  >
                    {label}
                    <span
                      className={cn(
                        "relative h-6 w-11 rounded-full border transition-colors",
                        checked ? "border-orange bg-orange" : "border-line-strong bg-surface-3",
                      )}
                      aria-hidden
                    >
                      <span
                        className={cn(
                          "absolute left-0.5 top-0.5 size-[18px] rounded-full bg-foreground transition-transform",
                          checked && "translate-x-5",
                        )}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1.5 text-[8px] font-semibold text-ink">
              <Check className="size-3" aria-hidden />
              {content.guardrails.ready}
            </span>
          </AssetTile>
        </RevealItem>
      </RevealGroup>
    </AutomationWindow>
  );
}
