import { ImageResponse } from "next/og";
import { BRAND_COLOR, WaveSvg } from "@/lib/og-helpers";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: BRAND_COLOR,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WaveSvg width={120} height={80} />
      </div>
    ),
    { ...size }
  );
}
