import { Suspense } from "react";
import type { Metadata } from "next";
import { Montserrat, Quicksand, Roboto } from "next/font/google";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import WhatsAppButton from "@/components/ui/WhatsappButton";
import "../assets/styles/globals.css";

// Optimiza la carga de la fuente
const quicksand = Quicksand({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
  fallback: ["system-ui", "arial"],
});

const monserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monserrat",
  fallback: ["system-ui", "arial"],
})

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["system-ui", "arial"],
})

// Metadata mejorada
export const metadata: Metadata = {
  title: {
    default: "Wonder Clouds | Agencia Digital en Cusco",
    template: "%s | Wonder Clouds"
  },
  description: "Descubre el poder de la innovación digital con Wonder Clouds. Impulsamos tu presencia en línea con soluciones creativas y estratégicas que elevan tu marca por encima de las nubes",
  keywords: [
    "marketing digital",
    "cusco",
    "soluciones digitales",
    "SEO",
    "software",
    "desarrollo web",
    "diseño web",
    "agencia digital cusco",
    "marketing digital cusco"
  ],
  authors: [{ name: "Wonder Clouds" }],
  creator: "Wonder Clouds",
  publisher: "Wonder Clouds",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://wonderclouds.dev/",
    title: "Wonder Clouds | Agencia Digital en Cusco",
    description: "Impulsa tu presencia digital con soluciones creativas y estratégicas",
    siteName: "Wonder Clouds",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Wonder Clouds Banner"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonder Clouds | Agencia Digital en Cusco",
    description: "Impulsa tu presencia digital con soluciones creativas y estratégicas",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
    >
      <body
        className={`${quicksand.variable} ${monserrat.variable} ${roboto.variable} min-h-screen flex flex-col bg-white antialiased`}
      >
        <Suspense fallback={<div className="h-16" />}>
          <Header />
        </Suspense>

        <main
          className="flex-grow pt-24"
        >
          {children}
        </main>

        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

      </body>
    </html>
  );
}