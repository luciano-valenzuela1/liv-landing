import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "LIV · Servicios con respaldo legal y pago en garantía";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-negative.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1b303c",
          color: "#ffffff",
        }}
      >
        <img src={logoSrc} alt="" width={168} height={120} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: -1,
              maxWidth: 980,
            }}
          >
            Servicios con respaldo legal y el pago en garantía.
          </div>
          <div style={{ fontSize: 30, color: "#e2e7e8" }}>
            Fondos custodiados por Balanz · Registrarte es gratis
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 200,
            height: 10,
            borderRadius: 9999,
            background: "#e9cb2e",
          }}
        />
      </div>
    ),
    size,
  );
}
