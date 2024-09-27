import React from "react";
import ChatBadge from "./ChatBadge";
import InviteSection from "./InviteSection";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const style = {
  container: {
    position: "absolute",
    top: "20px",
    right: 0,
  },
};

interface Props {}

const RightSection: React.FC<Props> = ({}) => {
  const { auth } = useAppSelector((state) => state.auth);
  const router = useRouter();
  return (
    <div style={{ ...(style.container as React.CSSProperties), zoom: "67%", zIndex: 1}}>
      {/* <div className="absolute top-[20px] left-[50%] transform translate-x-[-50%]">
        <ChatBadge />
      </div> */}
      <div style={{backdropFilter: "blur(5px)"}} className="rounded-full">
        {auth && <InviteSection />}
        {!auth && (
          <Button onClick={() => router.push("/auth/login")} className="text-base mt-5 border border-[#2D2D2D] mr-5 w-[130px]">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default RightSection;
