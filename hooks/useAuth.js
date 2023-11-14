import React from "react";
import { auth } from "../firebase/index";

/**
 *
 * @returns isUserSignedIn: If the user is signed in or not
 * @returns user
 */
export const useAuth = () => {
  const [user, setUser] = React.useState("");
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ?? "");
      setIsUserSignedIn(user ? true : false);
    });

    // Cleanup function for useEffect
    // Prevent potential memory leaks
    return () => unsubscribe();
  }, []);

  return { user, isUserSignedIn };
};
