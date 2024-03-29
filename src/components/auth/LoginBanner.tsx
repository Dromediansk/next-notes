"use client";

import { OAuthProvider } from "@/utils/types/next-auth";
import GithubSignInButton from "./GithubSignInButton";
import GoogleSignInButton from "./GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "@/lib/Spinner";

const LoginBanner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (provider: OAuthProvider) => {
    setIsLoading(true);
    await signIn(provider);
  };

  return (
    <>
      <div className="h-8 m-2">{isLoading && <Spinner />}</div>
      <div className="flex gap-4 flex-col">
        <GoogleSignInButton isLoading={isLoading} onClick={handleLogin} />
        <GithubSignInButton isLoading={isLoading} onClick={handleLogin} />
      </div>
    </>
  );
};

export default LoginBanner;
