import { useAuthSession } from "@/utils/auth";
import Avatar from "./Avatar";
import LogOutButton from "./auth/LogOutButton";
import CustomDatePicker from "./form/CustomDatePicker";

const Navbar = async () => {
  const session = await useAuthSession();

  return (
    <div className="w-full h-16 bg-main-dark sticky top-0 shadow-2xl z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {session && (
            <>
              <Avatar session={session} />
              <CustomDatePicker />
              <LogOutButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
