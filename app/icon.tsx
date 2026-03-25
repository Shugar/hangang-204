import { ImageResponse } from "next/og";
import { BRAND_COLOR, WaveSvg } from "@/lib/og-helpers";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: BRAND_COLOR,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WaveSvg width={22} height={16} />
      </div>
    ),
    { ...size }
  );
}
