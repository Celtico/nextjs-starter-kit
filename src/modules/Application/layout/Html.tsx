import ThemeProvider from "./components/client/ThemeProvider";
import AuthProvider from "./components/client/AuthProvider";
import Navigation from "./components/client/Navigation";
import Head from "./components/Head";
import Footer from "./components/Footer";
import "./assets/css/globals.css";

/**
 * Html
 * @param props
 * @constructor
 */
const Html = ({children,AuthStatusDataArray}) => (
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
