import { authOptions } from "@/utils/auth";
import { AuthenticatedSession, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const useAuthenticatedSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/login");
  }

  return session as AuthenticatedSession;
};
