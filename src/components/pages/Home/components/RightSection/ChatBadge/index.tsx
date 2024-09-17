import React from "react";
import { BellIcon, NotebookPen, VideoIcon } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "../../Dock/dockContext";

const ChatBadge = () => {
  const floatingIcons = [
    { title: "Notes", icon: <NotebookPen size={20} color="white" /> },
    { title: "Video Call", icon: <VideoIcon size={20} color="white" /> },
    { title: "Notification", icon: <BellIcon size={20} color="white" /> },
  ];
  return (
    <div className="flex h-[30px] items-center gap-[26px] mt-[25px] p-8">
      <Dock className="items-end max-h-[100px] rounded-[40px] relative gap-[24px] bg-[#191919]">
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

export default ChatBadge;