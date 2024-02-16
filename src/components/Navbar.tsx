import { useAuthSession } from "@/utils/auth";
import Avatar from "./Avatar";
import LogOutButton from "./auth/LogOutButton";

const Navbar = async () => {
  const session = await useAuthSession();

  return (
    <div className="w-full h-20 bg-main-dark sticky top-0 shadow-2xl z-50 mb-5">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {session && (
            <>
              <Avatar session={session} />
              <LogOutButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
