import { marketing } from "@/content/marketing";
import searchVisibility from "@/assets/search-visibility-example.jpg.asset.json";
import { MockWindow } from "./MockWindow";
import { ScreenshotPreview } from "./ScreenshotPreview";

const m = marketing.mocks.seo;

export default function SeoMock() {
  return (
    <MockWindow title={m.resultUrl} status="SEO + AEO">
      <ScreenshotPreview
        src={searchVisibility.url}
        alt={m.captureAlt}
        width={723}
        height={918}
        className="mx-auto w-full max-w-[470px]"
        imageClassName="max-h-[590px]"
      />
    </MockWindow>
  );
}
