"use client";

import Image from "next/image";
import githubLogo from "/public/icons/github.svg";
import { signIn } from "next-auth/react";

export function GithubSignInButton() {
  const handleClick = () => {
    signIn("github");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center font-semibold justify-center h-14 px-6 text-lg  transition-colors duration-300 bg-gray-800 border-2 border-gray-200 text-white rounded-lg focus:shadow-outline hover:bg-slate-300 hover:text-gray-900"
    >
      <Image src={githubLogo} alt="Github Logo" width={25} height={25} />
      <span className="ml-4">Sign in with Github</span>
    </button>
  );
}

export default GithubSignInButton;
