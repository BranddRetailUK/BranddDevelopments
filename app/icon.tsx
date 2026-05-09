import { ImageResponse } from "next/og";

const logoUrl =
  "https://res.cloudinary.com/dhlqooyuk/image/upload/v1778265380/NEW_LOGO_WHT_NO_STRAP_heexb3.png";

export const size = {
  width: 128,
  height: 128,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#111111",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "14px",
          width: "100%",
        }}
      >
        <img
          alt="Brandd"
          src={logoUrl}
          style={{
            height: "100%",
            objectFit: "contain",
            width: "100%",
          }}
        />
      </div>
    ),
    size,
  );
}
