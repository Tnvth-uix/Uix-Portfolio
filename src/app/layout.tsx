import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "UiX Portfolio — Presentaciones Cinematográficas",
  description: "Portafolio de proyectos UX/UI presentados de forma artística y cinematográfica",
  openGraph: {
    title: "UiX Portfolio",
    description: "Portafolio de proyectos UX/UI",
    url: "https://uix-portfolio.vercel.app",
    siteName: "UiX Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-uix-blue-900 text-uix-purple-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
