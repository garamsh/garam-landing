import { ImageResponse } from "next/og";

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
        justifyContent: "space-between",
        padding: "0 96px",
        background: "#10282d",
        color: "#f5f1e8",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: -6,
        }}
      >
        Garam
      </div>
      <svg width="380" height="380" viewBox="0 0 64 64" fill="none">
        <path
          d="M6 20C24 20 28 44 58 44"
          stroke="#f5f1e8"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M6 44C24 44 28 20 58 20"
          stroke="#ff8a6b"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size,
  );
}
