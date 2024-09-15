import React from "react";
import AvatarGroup from "./avatarGroup";
import { BellIcon, VideoIcon } from "lucide-react";

export const ChatBadge = () => {
  return (
    <div className="flex h-[65px] bg-[#18181B] items-center gap-[26px] mt-[20px] rounded-[40px] p-8">
      <AvatarGroup />
      <div className="cursor-pointer">
        <VideoIcon size={30} color="white" />
      </div>
      <div className="cursor-pointer">
        <BellIcon size={30} color="white" />
      </div>
    </div>
  );
};
