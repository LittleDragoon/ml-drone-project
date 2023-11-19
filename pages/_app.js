import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { AuthUserProvider } from "@/context/AuthUserContext";
import ProtectedLayout from "@/components/ProtectedLayout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ProtectedLayout>
        <Component {...pageProps} />;
      </ProtectedLayout>
    </AuthUserProvider>
  );
}
export default MyApp;
