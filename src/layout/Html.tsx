import ThemeProvider from "@/layout/components/client/ThemeProvider";
import AuthProvider from "@/layout/components/client/AuthProvider";
import Navigation from "@/layout/components/client/Navigation";
import Head from "@/layout/components/Head";
import Footer from "@/layout/components/Footer";
import "@/layout/assets/css/globals.css";

/**
 * Html
 * @param props
 * @constructor
 */
const Html = ({ children, AuthStatusDataArray }) => (
  <html lang="es" suppressHydrationWarning>
    <body>
      <Head />
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation AuthStatusDataArray={AuthStatusDataArray} />
          {children}
        </ThemeProvider>
      </AuthProvider>
      <Footer />
    </body>
  </html>
);

export default Html;
