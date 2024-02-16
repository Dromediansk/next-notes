"use client";

import { signOut } from "next-auth/react";
import LogoutIcon from "../icons/LogoutIcon";

const LogOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="py-1 px-2 rounded text-gray-100 hover:text-gray-400"
      data-tooltip-target="logout-tooltip"
      title="Log out"
    >
      <LogoutIcon />
    </button>
  );
};

export default LogOutButton;
