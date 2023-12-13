import { createContext } from "react";
import { useAuth } from "@/hooks/useAuth";

export const AuthUserContext = createContext({
  user: null,
  isUserSignedIn: false,
  loading: true,
  signInWithGoogle: () => {},
  logOut: () => {},
});

export const AuthUserProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};
