import React, { useState } from "react";
import { ArrowTopIcon } from "@/components/icons/ArrowTopIcon";
import ChooseRoom from "../../ChooseRoom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const style = {
  container: {
    display: "flex",
    padding: "8px 8px 8px 20px",
    alignItems: "center",
    gap: "16px",
    borderRadius: "40px",
    background: "#18181B",
    margin: "20.5px 20px 0 0",
    width: "400px",
  },
  left: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderRight: "1px solid #3D3D3D",
    width: "240px",
    padding: "12px 16px",
  },
  invite: {
    display: "flex",
    padding: "8px 32px",
    alignItems: "center",
    gap: "8px",
    borderRadius: "48px",
    background: "#383838",
    cursor: "pointer",
  },
};

interface Props {}

const InviteSection: React.FC<Props> = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <div className="text-white cursor-pointer" style={style.container as React.CSSProperties}>
        <div onClick={() => setIsShow(!isShow)} style={style.left as React.CSSProperties}>
          <Avatar>
            <img src="User2.png" alt="user icon" />
          </Avatar>
          <div>Aubin’s Room</div>
          <div style={{ transform: isShow ? "" : "rotateX(150deg)" }}>
            <ArrowTopIcon />
          </div>
        </div>
        <div style={style.invite as React.CSSProperties}>Invite</div>
      </div>
      {isShow ? <ChooseRoom /> : <></>}
    </>
  );
};

export default InviteSection;
