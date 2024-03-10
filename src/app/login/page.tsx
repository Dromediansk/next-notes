import { useAuthSession } from "../../utils/auth";
import { redirect } from "next/navigation";
import { NOTE_BY_CURRENT_DATE_ROUTE } from "@/utils/constants";
import LoginBanner from "@/components/auth/LoginBanner";
import Image from "next/image";

const LoginPage = async () => {
  const session = await useAuthSession();

  if (session) {
    return redirect(NOTE_BY_CURRENT_DATE_ROUTE);
  }

  return (
    <>
      <div className="flex justify-center items-center gap-32 flex-wrap lg:flex-nowrap">
        <Image
          width={500}
          height={500}
          src="/assets/login_landing_image.svg"
          alt="landing image"
          className="p-4 mb-40 hidden lg:block"
          priority
        />
        <div className="flex flex-col text-center max-w-md w-full m-2">
          <div className="text-xl py-6">
            <h3 className="py-1">Welcome in</h3>
            <h3 className="py-1 text-2xl">Next Notes</h3>
          </div>
          <div className="w-full h-72 text-center rounded shadow-md bg-main-lighter p-8">
            <LoginBanner />
          </div>
        </div>
      </div>
      <div className="text-center w-full p-4 text-lg">
        <p className="mx-auto text-center w-full max-w-screen-lg">
          Embrace the power of daily affirmations and self-reflection with the
          intuitive note taking app.
        </p>
        <p className="mx-auto py-2 text-center w-full max-w-screen-lg">
          Capture moments of inspiration, motivation, and personal development
          to help you become the best version of yourself.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
