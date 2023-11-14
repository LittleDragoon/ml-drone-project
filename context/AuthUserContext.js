import { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

export const AuthUserContext = createContext({
  authUser: null,
  isUserSignedIn: false,
});

export const AuthUserProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};
