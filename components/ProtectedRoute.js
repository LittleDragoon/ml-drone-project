"use client";
import React from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthUserContext } from "@/context/authUserContext";

const ProtectedRoute = ({ children }) => {
  const useAuth = () => useContext(AuthUserContext);
  const { user, isUserSignedIn } = useAuth();

  const router = useRouter();

  React.useEffect(() => {
    if (!isUserSignedIn) {
      router.replace("/");
    }
    return () => {};
  }, [isUserSignedIn, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
