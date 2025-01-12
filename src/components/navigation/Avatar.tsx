import { useUser } from "@/stores/user";
import { DefaultUser } from "next-auth";
import Image from "next/image";
import { FC } from "react";

type AvatarImageProps = {
  user: DefaultUser | null;
};

const AVATAR_SIZE = 45;

const AvatarImage: FC<AvatarImageProps> = ({ user }) => {
  if (!user) {
    return (
      <div
        className={`rounded-full bg-gray-300 flex items-center justify-center animate-pulse`}
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      />
    );
  }

  const { image, name } = user;

  if (image) {
    return (
      <Image
        src={image}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        alt="avatar"
        className="rounded-full"
      />
    );
  }

  const firstLetterChar = name?.charAt(0).toUpperCase() || "U";

  return (
    <div
      className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px] flex justify-center items-center rounded-full bg-orange-500 text-white uppercase`}
    >
      {firstLetterChar}
    </div>
  );
};

const Avatar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <AvatarImage user={user} />
    </div>
  );
};

export default Avatar;
