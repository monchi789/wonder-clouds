import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

import "../assets/styles/globals.css";
import WhatsAppButton from "@/components/ui/WhatsappButton";

export const metadata: Metadata = {
  title: "Wonder Clouds",
  description: "Descubre el poder de la innovación digital con Wonder Clouds. Impulsamos tu presencia en línea con soluciones creativas y estratégicas que elevan tu marca por encima de las nubes",
  keywords: "marketing digital, cusco, soluciones digitales, SEO, software",
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
          <Header />
          {children}
          <WhatsAppButton />
          <Footer />
      </body>
    </html>
  );
}