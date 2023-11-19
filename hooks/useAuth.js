import React from "react";
import { auth } from "../firebase/index";

/**
 *
 * @returns isUserSignedIn: If the user is signed in or not
 * @returns user
 */
export const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ?? "");
      setIsUserSignedIn(user ? true : false);
      setLoading(false);
    });

    // Cleanup function for useEffect
    // Prevent potential memory leaks
    return () => unsubscribe();
  }, []);

  return { user, isUserSignedIn, loading };
};
