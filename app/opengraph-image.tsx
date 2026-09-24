import { ImageResponse } from "next/og";

export const alt = "SaaS Template";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Placeholder OG image — replace with real brand art before shipping. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
        color: "#fafafa",
        padding: 80,
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em" }}>
        SaaS Template
      </div>
      <div style={{ marginTop: 24, fontSize: 36, color: "#a1a1aa" }}>
        Ship your SaaS in days, not months.
      </div>
    </div>,
    { ...size },
  );
}
