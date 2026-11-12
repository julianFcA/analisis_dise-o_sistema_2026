import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// DM Sans · variable font de Google (eje opsz) — única familia del design system.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "PetCare",
  description:
    "Plataforma para encontrar y reservar servicios de cuidado de mascotas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
