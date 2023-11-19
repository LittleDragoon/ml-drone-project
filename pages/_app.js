import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { AuthUserProvider } from "@/context/AuthUserContext";
import ProtectedLayout from "@/components/ProtectedLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ProtectedLayout>
        <Component {...pageProps} />;
        <ToastContainer autoClose={2000} theme="colored" pauseOnHover={false} />
      </ProtectedLayout>
    </AuthUserProvider>
  );
}
export default MyApp;
