import CustomDatePicker from "../filter/CustomDatePicker";
import AvatarMenu from "./AvatarMenu";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-gray-100 sticky top-0 z-5">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <AvatarMenu />
          <CustomDatePicker />
          <div />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
