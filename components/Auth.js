import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  // To sign in with Google the first time
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

  return (
    <div className="text-white bg-gradient-to-br from-green-700 via-green-600 to-green-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">
      <button className="flex items-center gap-x-2" onClick={signInWithGoogle}>
        {" "}
        <FcGoogle size={24} />
        Sign In with Google
      </button>
    </div>
  );
};
