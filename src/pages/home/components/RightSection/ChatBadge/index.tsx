import React from "react";
import { BellIcon, NotebookPen, VideoIcon } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "../../Dock/dockContext";

export const ChatBadge = () => {
  const floatingIcons = [
    { title: "Notes", icon: <NotebookPen size={25} color="white" /> },
    { title: "Video Call", icon: <VideoIcon size={30} color="white" /> },
    { title: "Notification", icon: <BellIcon size={30} color="white" /> },
  ];
  return (
    <div className="flex h-[65px] items-center gap-[26px] mt-[20px] p-8">
      <Dock className="items-end relative gap-[24px] bg-[#191919]">
        {floatingIcons.map((item, idx) => {
          return (
            <div key={idx} className={`relative pb-4`}>
              <DockItem key={idx} className={`aspect-square rounded-full w-[90px] bg-[#272729]`}>
                <DockIcon>{item.icon}</DockIcon>
                <DockLabel isTop>{item.title}</DockLabel>
              </DockItem>
            </div>
          );
        })}
      </Dock>
    </div>
  );
};
