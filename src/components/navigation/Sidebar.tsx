import { Suspense } from "react";
import CustomDatePicker from "../filter/CustomDatePicker";
import AvatarMenu from "./AvatarMenu";

const Sidebar = () => {
  return (
    <Suspense fallback={null}>
      <div className="flex flex-col gap-4 p-5">
        <AvatarMenu />
        <CustomDatePicker />
        <div />
      </div>
    </Suspense>
  );
};

export default Sidebar;
