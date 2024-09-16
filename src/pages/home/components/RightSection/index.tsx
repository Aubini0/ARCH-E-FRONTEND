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
    <>
      <div className="absolute top-[20px] left-[50%] transform translate-x-[-50%]">
        <ChatBadge />
      </div>
      <div style={style.container as React.CSSProperties}>
        <InviteSection />
      </div>
    </>
  );
};

export default RightSection;
