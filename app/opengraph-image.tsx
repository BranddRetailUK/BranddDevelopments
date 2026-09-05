import { ImageResponse } from "next/og";

export const alt = "Brandd websites and business software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#1c1c1c",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <span>Brandd</span>
          <span style={{ color: "#0bb6d0" }}>Leighton Buzzard, UK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              width: 240,
              height: 10,
              background: "linear-gradient(90deg, #0bb6d0, #7f18ff, #d300c5, #ff0b69)",
            }}
          />
          <h1
            style={{
              margin: 0,
              maxWidth: 930,
              fontSize: 76,
              lineHeight: 0.98,
              fontWeight: 950,
              letterSpacing: 0,
            }}
          >
            Websites and software built around your business.
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 30,
            fontWeight: 800,
            color: "#f7f7f4",
          }}
        >
          <span>Websites</span>
          <span style={{ color: "#ff0b69" }}>/</span>
          <span>Online stores</span>
          <span style={{ color: "#ff0b69" }}>/</span>
          <span>Software</span>
          <span style={{ color: "#ff0b69" }}>/</span>
          <span>Automation</span>
        </div>
      </div>
    ),
    size,
  );
}
