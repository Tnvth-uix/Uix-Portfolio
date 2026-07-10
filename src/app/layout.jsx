import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "UiX Portfolio — Presentaciones",
  description:
    "Portafolio de casos de estudio UX/UI. Sube un reporte en Markdown y conviértelo en una presentación.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
