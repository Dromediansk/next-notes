"use client";

import { Menu } from "@headlessui/react";
import Avatar from "./Avatar";
import SignOutIcon from "../../lib/icons/SignOutIcon";
import { signOut } from "next-auth/react";
import { setUser } from "@/stores/user";

const AvatarMenu = () => {
  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <Avatar />
        </Menu.Button>
        <Menu.Items className="absolute flex flex-col bg-gray-200 rounded shadow-md">
          <Menu.Item>
            {() => (
              <button
                onClick={handleSignOut}
                className="p-2 cursor-pointer flex gap-2 items-center transition-colors duration-300 w-28"
                data-tooltip-target="logout-tooltip"
                title="Log out"
              >
                <SignOutIcon />
                <span>Sign out</span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
