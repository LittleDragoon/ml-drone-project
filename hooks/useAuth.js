import React from "react";
import { auth } from "../firebase/index";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

/**
 *
 * @returns isUserSignedIn: If the user is signed in or not
 * @returns user
 */
export const useAuth = () => {
  const [user, setUser] = React.useState(null);
  const [isUserSignedIn, setIsUserSignedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        toast.success(`Welcome ${name} `, {
          containerId: "Log In & Log Out",
        });
      })
      .catch(() => {
        toast.error("👏 Error in Log in");
        throw new Error("Error in Log in", {
          containerId: "Log In & Log Out",
        });
      });
  };

  const logOut = () => {
    auth.signOut();
    toast.info(`👋 Bye Bye ${user.displayName} `, {
      containerId: "Log In & Log Out",
    });
  };
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

  return { user, isUserSignedIn, loading, signInWithGoogle, logOut };
};
