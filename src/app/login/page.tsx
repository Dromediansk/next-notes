import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useAuthSession } from "../../utils/auth";
import { redirect } from "next/navigation";
import GithubSignInButton from "@/components/auth/GithubSignInButton";
import { NOTE_BY_CURRENT_DATE_ROUTE } from "@/utils/constants";

const LoginPage = async () => {
  const session = await useAuthSession();

  if (session) {
    return redirect(NOTE_BY_CURRENT_DATE_ROUTE);
  }

  return (
    <div className="m-auto w-full max-w-sm text-center shadow-md bg-slate-50 p-8 rounded-md">
      <h3 className="text-xl py-6">Welcome in Solid Notes!</h3>
      <div className="flex gap-4 flex-col">
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </div>
  );
};

export default LoginPage;
