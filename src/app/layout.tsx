import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  // 300 is only used for the step numbers
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIV · Creá tu cuenta",
  description:
    "Empresas y prestadores independientes, con respaldo legal y fondos en garantía. Registrate gratis en LIV.",
};

export const viewport: Viewport = {
  themeColor: "#1b303c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
