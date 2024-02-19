"use client";

import Image from "next/image";
import googleLogo from "/public/icons/google.svg";
import { OAuthProvider } from "@/utils/types/next-auth";
import { FC } from "react";

type GoogleSignInButtonProps = {
  onClick: (provider: OAuthProvider) => void;
  isLoading: boolean;
};

export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  onClick,
  isLoading,
}) => {
  return (
    <button
      onClick={() => onClick("google")}
      className="flex items-center font-semibold justify-center h-14 px-6 text-lg  transition-colors duration-300 bg-white border-2 border-gray-200 text-black rounded-lg focus:shadow-outline hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      disabled={isLoading}
    >
      <Image src={googleLogo} alt="Google Logo" width={25} height={25} />
      <span className="ml-4">Sign in with Google</span>
    </button>
  );
};

export default GoogleSignInButton;
