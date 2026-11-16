import { ImageResponse } from "next/og";
import { brandMarkPath } from "@/lib/brand-mark";

interface ImageSize {
  width: number;
  height: number;
}

// Wordmark and mark only: the card carries no copy, so it serves every locale
// and needs no CJK font in the image renderer.
export function renderShareImage(size: ImageSize): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        background: "#16202E",
        color: "#FFFFFF",
      }}
    >
      <svg width="220" height="220" viewBox="0 0 100 100">
        <path fill="#FFFFFF" fillRule="evenodd" d={brandMarkPath} />
      </svg>
      <div
        style={{
          display: "flex",
          fontSize: 157,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        GARAM
      </div>
    </div>,
    size,
  );
}
