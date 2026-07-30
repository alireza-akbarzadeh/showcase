import { ImageResponse } from "next/og";
import { SITE } from "@/constants";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background:
            "linear-gradient(145deg, #050607 0%, #0d1a14 55%, #04110a 100%)",
          color: "#f2f4f3",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#3dff9a",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.04em" }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#9aa39e",
            maxWidth: 720,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Scroll-driven. GPU-accelerated. Continuously alive.
        </div>
      </div>
    ),
    { ...size },
  );
}
