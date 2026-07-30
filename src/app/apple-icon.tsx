import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #050607 0%, #0d1a14 100%)",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            background: "#3dff9a",
            boxShadow: "0 0 0 12px #0a3d28",
          }}
        />
      </div>
    ),
    size,
  );
}
