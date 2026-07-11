import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import BackToTop from "../components/common/BackToTop";
import PageTransition from "../components/common/PageTransition";
import PasswordGate from "../components/PasswordGate";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata = {
  title: "Business Cases — By UPAX",
  description:
    "Casos de negocio UX/UI. Sube un reporte en Markdown y conviértelo en un Business Case.",
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
        <AuthProvider>
          <PasswordGate>
            <Header />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <BackToTop />
          </PasswordGate>
        </AuthProvider>
      </body>
    </html>
  );
}
