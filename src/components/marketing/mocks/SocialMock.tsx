import { marketing } from "@/content/marketing";
import socialLibrary from "@/assets/social-content-library.png.asset.json";
import { MockWindow } from "./MockWindow";
import { ScreenshotPreview } from "./ScreenshotPreview";

const m = marketing.mocks.social;

export default function SocialMock() {
  return (
    <MockWindow title={m.title} status={m.scheduled}>
      <ScreenshotPreview
        src={socialLibrary.url}
        alt={m.captureAlt}
        width={1448}
        height={1086}
        className="bg-background p-1 sm:p-2"
        imageClassName="rounded-lg"
      />
    </MockWindow>
  );
}
