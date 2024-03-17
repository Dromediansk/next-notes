import { getServerSession } from "next-auth";
import { authOptions, loginIsRequiredServer } from "../utils/auth";
import { redirect } from "next/navigation";
import { LOGIN_ROUTE, NOTE_BY_CURRENT_DATE_ROUTE } from "@/utils/constants";

export default async function Home() {
  await loginIsRequiredServer();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect(LOGIN_ROUTE);
  }

  return redirect(NOTE_BY_CURRENT_DATE_ROUTE);
}
