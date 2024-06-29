"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Avatar from "./Avatar";
import SignOutIcon from "../../lib/icons/SignOutIcon";
import { signOut } from "next-auth/react";

const AvatarMenu = () => {
  const handleSignOut = () => signOut();

  return (
    <div className="relative">
      <Menu>
        <MenuButton>
          <Avatar />
        </MenuButton>
        <MenuItems className="absolute flex flex-col bg-gray-200 rounded shadow-md">
          <MenuItem>
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
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
