import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../assets/styles/globals.css";

export const metadata: Metadata = {
  title: "Wonder Clouds - Inicio",
  description: "Descubre el poder de la innovación digital con Wonder Clouds. Impulsamos tu presencia en línea con soluciones creativas y estratégicas que elevan tu marca por encima de las nubes",
  keywords: "marketing digital, tienda, online",
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ]
  },
};

const quicksand = Quicksand({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={quicksand.className}
      >
        {children}
      </body>
    </html>
  );
}