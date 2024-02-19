"use client";

import Image from "next/image";
import githubLogo from "/public/icons/github.svg";
import { OAuthProvider } from "@/utils/types/next-auth";
import { FC } from "react";

type GoogleSignInButtonProps = {
  onClick: (provider: OAuthProvider) => void;
  isLoading: boolean;
};

export const GithubSignInButton: FC<GoogleSignInButtonProps> = ({
  onClick,
  isLoading,
}) => {
  return (
    <button
      onClick={() => onClick("github")}
      className="flex items-center font-semibold justify-center h-14 px-6 text-lg  transition-colors duration-300 bg-gray-800 border-2 border-gray-200 text-white rounded-lg focus:shadow-outline hover:bg-slate-300 hover:text-gray-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
      disabled={isLoading}
    >
      <Image src={githubLogo} alt="Github Logo" width={25} height={25} />
      <span className="ml-4">Sign in with Github</span>
    </button>
  );
};

export default GithubSignInButton;
