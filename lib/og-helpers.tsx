export const BRAND_COLOR = "#C4856A";

export function WaveSvg({ width, height }: { width: number; height: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 22 16" fill="none">
      <path
        d="M1 6 Q6 0 11 6 T21 6"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M1 12 Q6 6 11 12 T21 12"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
