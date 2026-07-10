import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export const metadata = {
  title: "UiX Portfolio",
  description: "Portafolio de proyectos UX/UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
