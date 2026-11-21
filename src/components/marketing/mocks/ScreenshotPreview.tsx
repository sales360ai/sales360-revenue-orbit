import { cn } from "@/lib/utils";

export function ScreenshotPreview({
  src,
  alt,
  className,
  imageClassName,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width: number;
  height: number;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-foreground p-2 shadow-2xl",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="sync"
        className={cn("h-auto w-full rounded-xl object-contain", imageClassName)}
      />
    </div>
  );
}
