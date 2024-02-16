"use client";

import Image from "next/image";
import googleLogo from "/public/icons/google.svg";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center font-semibold justify-center h-14 px-6 text-lg  transition-colors duration-300 bg-white border-2 border-gray-200 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={25} height={25} />
      <span className="ml-4">Sign in with Google</span>
    </button>
  );
}

export default GoogleSignInButton;
