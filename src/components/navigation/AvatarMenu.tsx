"use client";

import { Menu } from "@headlessui/react";
import { DefaultUser } from "next-auth";
import { FC } from "react";
import Avatar from "./Avatar";
import SignOutIcon from "../icons/SignOutIcon";
import { signOut } from "next-auth/react";

type AvatarMenuProps = {
  user: DefaultUser;
};

const AvatarMenu: FC<AvatarMenuProps> = ({ user }) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button>
          <Avatar user={user} />
        </Menu.Button>
        <Menu.Items className="absolute flex flex-col bg-gray-200 rounded shadow-md">
          <Menu.Item>
            {() => (
              <button
                onClick={() => signOut()}
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
