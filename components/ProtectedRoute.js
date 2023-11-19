import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthUserContext } from "@/context/AuthUserContext";
import ColoredLayout from "./ColoredLayout";

const ProtectedRoute = ({ children }) => {
  const useAuth = () => useContext(AuthUserContext);
  const { isUserSignedIn, loading } = useAuth();

  const router = useRouter();

  const currentRoute = router.pathname;

  if (currentRoute !== "/") {
    if (!loading && !isUserSignedIn) {
      router.replace("/");
    }
    if (loading || !isUserSignedIn) return <ColoredLayout />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
