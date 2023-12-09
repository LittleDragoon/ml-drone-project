import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { AuthUserProvider } from "@/context/AuthUserContext";
import ProtectedLayout from "@/components/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AuthUserProvider>
        <ProtectedLayout>
          <Component {...pageProps} />;
          <ToastContainer
            autoClose={2000}
            theme="colored"
            pauseOnHover={false}
          />
        </ProtectedLayout>
      </AuthUserProvider>
    </NextUIProvider>
  );
}
export default MyApp;
