import { useUser } from "@/stores/user";
import Image from "next/image";
import { FC } from "react";

type AvatarImageProps = {
  image?: string | null;
  userName: string;
};

const AVATAR_SIZE = 30;

const AvatarImage: FC<AvatarImageProps> = ({ image, userName }) => {
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
  return (
    <div
      className={`w-[${AVATAR_SIZE}px] h-[${AVATAR_SIZE}px] flex justify-center items-center rounded-full bg-orange-500 text-white uppercase`}
    >
      {userName.charAt(0).toUpperCase()}
    </div>
  );
};

const Avatar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <AvatarImage image={user?.image} userName={user?.name || ""} />
      <span className="text-lg text-gray-100 hidden sm:block">
        {user?.name || ""}
      </span>
    </div>
  );
};

export default Avatar;
