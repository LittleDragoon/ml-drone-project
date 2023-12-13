import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthUserContext } from "@/context/AuthUserContext";
import { useContext } from "react";

export const Auth = () => {
  const { signInWithGoogle } = useContext(AuthUserContext);

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
