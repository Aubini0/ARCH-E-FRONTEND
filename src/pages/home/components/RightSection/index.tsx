import React from "react";
import InviteSection from "@/pages/home/components/RightSection/InviteSection";
import { ChatBadge } from "./ChatBadge";

const style = {
  container: {
    position: "absolute",
    top: "20px",
    right: 0,
  },
};

interface Props {}

const RightSection: React.FC<Props> = () => {
  return (
    <div className="flex gap-[8px]" style={style.container as React.CSSProperties}>
      <ChatBadge />
      <div>
        <InviteSection />
      </div>
    </div>
  );
};

export default RightSection;
