import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Placeholder app icon — replace with real brand art before shipping. */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        color: "#fafafa",
        fontSize: 220,
        fontWeight: 700,
        letterSpacing: "-0.06em",
      }}
    >
      S
    </div>,
    { ...size },
  );
}
