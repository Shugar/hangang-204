import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "HANGANG 204 | Your Home in Seoul";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const c = {
  primary: "#C4856A",
  accent: "#6B9080",
  cream: "#FAF7F4",
  fg: "#2D2926",
  muted: "#6B6560",
};

const pill = {
  padding: "12px 24px",
  borderRadius: 999,
  border: "1.5px solid rgba(107,144,128,0.25)",
  fontSize: 20,
  fontWeight: 500,
  color: c.fg,
  background: "rgba(107,144,128,0.05)",
} as const;

export default async function Image() {
  const [fontBold, fontMedium] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Quicksand-Bold.ttf")),
    readFile(join(process.cwd(), "public/fonts/Quicksand-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "Quicksand", background: c.cream, padding: "72px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: c.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="14" viewBox="0 0 22 16" fill="none">
                <path d="M1 6 Q6 0 11 6 T21 6" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M1 12 Q6 6 11 12 T21 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.fg, letterSpacing: 2 }}>HANGANG 204</div>
          </div>

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 28 }}>
            <div style={{ fontSize: 96, fontWeight: 900, color: c.fg, lineHeight: 1.05, letterSpacing: -3 }}>Your Home</div>
            <div style={{ display: "flex", fontSize: 96, fontWeight: 900, lineHeight: 1.05, letterSpacing: -3 }}>
              <span style={{ color: c.fg }}>in Seoul</span>
              <span style={{ color: c.primary }}>.</span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 48 }}>
            <div style={{ fontSize: 26, fontWeight: 500, color: c.muted, lineHeight: 1.6 }}>Cozy 2-bedroom apartment near the Han River</div>
            <div style={{ fontSize: 26, fontWeight: 500, color: c.muted, lineHeight: 1.6 }}>in Yongsan — self check-in, fully equipped.</div>
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ ...pill, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>2 Bedrooms</span>
            </div>
            <div style={{ ...pill, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              <span>4 Guests</span>
            </div>
            <div style={{ ...pill, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              <span>Yongsan</span>
            </div>
            <div style={{ ...pill, display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>
              <span>300+ Mbps</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Quicksand", data: fontBold, style: "normal" as const, weight: 700 as const },
        { name: "Quicksand", data: fontMedium, style: "normal" as const, weight: 500 as const },
      ],
    }
  );
}
