import { useAuthSession } from "../../utils/auth";
import { redirect } from "next/navigation";
import { NOTE_BY_CURRENT_DATE_ROUTE } from "@/utils/constants";
import LoginBanner from "@/components/auth/LoginBanner";

const LoginPage = async () => {
  const session = await useAuthSession();

  if (session) {
    return redirect(NOTE_BY_CURRENT_DATE_ROUTE);
  }

  return (
    <div className="w-full h-96 max-w-sm text-center shadow-md bg-slate-50 p-8 rounded-md">
      <LoginBanner />
    </div>
  );
};

export default LoginPage;
