import React, { useEffect, useState } from "react";
import { ArrowTopIcon } from "@/components/icons/ArrowTopIcon";
import ChooseRoom from "../../ChooseRoom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import EditProfileModal from "@/components/shared/EditProfileModal";
import { useAppSelector } from "@/store/hooks";

const style = {
  container: {
    display: "flex",
    padding: "8px 8px 8px 20px",
    alignItems: "center",
    gap: "16px",
    borderRadius: "40px",
    background: "#18181B",
    margin: "20.5px 20px 0 0",
    minWidth: "392px",
  },
  left: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    borderRight: "1px solid #3D3D3D",
    borderLeft: "1px solid #3D3D3D",
    minWidth: "175px",
    padding: "12px 16px 12px 16px",
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
  const { user } = useAppSelector((state) => state.auth);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const [image, setImage] = useState(user?.profilePic || "/images/user.png");

  useEffect(() => {
    setImage(user?.profilePic || "/images/user.png");
  }, [user]);

  return (
    <>
      <div className="text-white" style={style.container as React.CSSProperties}>
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={image} alt={user?.full_name} width={6} height={6} />
            </Avatar>
          </DialogTrigger>
          {/*  */}
          <DialogContent className="!p-0 !outline-none w-auto bg-transparent !border-none">
            <EditProfileModal handleClose={() => setEditProfileOpen(false)} />
          </DialogContent>
        </Dialog>
        <div className="cursor-pointer" onClick={() => setIsShow(!isShow)} style={style.left as React.CSSProperties}>
          <div className="whitespace-nowrap">{user?.full_name.split(" ")[0]}’s Room</div>
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
