"use client";
import { IconInactive } from "@/components/icons/IconInactive/IconInactive";
import { ChevronDown, ChevronUp, CirclePlus, Ellipsis, FolderIcon } from "lucide-react";
import React from "react";
import { NewSpace } from "./components/modal/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ConfirmationModal } from "./components/modal/confirmationModal";

export const FilesUploadArea = () => {
  const spaces = ["Shoot", "Marketing", "Design"];
  const share = ["App", "Website"];
  const [isActiveMenu, setActiveMenu] = React.useState({ space: true, share: true });
  const [isOpenNewSpace, setIsOpenNewSpace] = React.useState({ key: "", data: "" });
  const [isOpenConfirmModal, setIsOpenConfirmModal] = React.useState({ isOpen: false, data: "" });
  const [isHovered, setIsHovered] = React.useState(-1);
  const handleMenu = (key: string) => {
    if (isActiveMenu[key as keyof typeof isActiveMenu]) {
      setActiveMenu({ ...isActiveMenu, [key]: false });
    } else {
      setActiveMenu({ ...isActiveMenu, [key]: true });
    }
  };

  const style = {
    container: {
      display: "flex",
      width: "160px",
      flexDirection: "column",
      alignItems: "flex-start",
      borderRadius: "10px",
      background: "#18181B",
      marginTop: "2px",
    },
  };
  const handleDel = () => setIsOpenConfirmModal({ ...isOpenConfirmModal, isOpen: true });
  const handleClose = () => setIsOpenConfirmModal({ isOpen: false, data: "" });
  const handleClickSpace = (key: string, value: string) => setIsOpenNewSpace({ data: value, key: key });
  const handleCloseSpace = () => setIsOpenNewSpace({ key: "", data: "" });
  return (
    <main className={`p-[38px] overflow-auto scrollbar-hide h-screen`}>
      <section className="mb-[40px]">
        <div className="flex justify-between text-white items-center mb-[24px]">
          <div onClick={() => handleMenu("space")} className="flex select-none cursor-pointer items-center gap-2">
            {isActiveMenu?.space ? <ChevronDown color="#7F7F7F" /> : <ChevronUp color="#7F7F7F" />}
            <p>Spaces</p>
          </div>
          <CirclePlus onClick={() => handleClickSpace("new", "")} className="cursor-pointer" color="#7F7F7F" />
        </div>
        {isActiveMenu?.space && (
          <>
            {spaces?.map((item, idx) => {
              return (
                <div
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(-1)}
                  className="h-[56px] cursor-pointer justify-between hover:bg-[#27272A] text-white rounded-[8px] px-[15px] flex items-center gap-4 py-[20px]"
                  key={idx}
                >
                  <div className="flex gap-2">
                    <FolderIcon color="#7F7F7F" />
                    {item}
                  </div>
                  {isHovered == idx && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Ellipsis />
                      </PopoverTrigger>
                      <PopoverContent side="bottom" className="w-full p-2">
                        <section className="border border-[#a3a4a3]" style={style.container as React.CSSProperties}>
                          <button
                            onClick={() => handleClickSpace("edit", item)}
                            className="w-full rounded-[10px_10px_0px_0px] hover:bg-[#27272A] text-start outline-none bg-transparent select-none font-[500] border-b border-[#a3a4a3] px-5 py-3"
                          >
                            Rename
                          </button>
                          <button onClick={handleDel} className="w-full rounded-[0px_0px_10px_10px] hover:bg-[#27272A] text-start outline-none bg-transparent select-none font-[500] px-5 py-3">
                            Delete{" "}
                          </button>
                        </section>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </>
        )}
      </section>
      <section>
        <div onClick={() => handleMenu("share")} className="flex select-none mb-[24px] text-white cursor-pointer items-center gap-2">
          {isActiveMenu?.share ? <ChevronDown color="#7F7F7F" /> : <ChevronUp color="#7F7F7F" />}
          <p>Share</p>
        </div>
        {isActiveMenu?.share && (
          <>
            {share?.map((item, idx) => {
              return (
                <div key={idx} className="h-[56px] hover:bg-[#27272A] text-white rounded-[8px] cursor-pointer px-[15px] flex items-center justify-between py-[20px]">
                  <div className="flex items-center gap-4" key={idx}>
                    <IconInactive color="#7F7F7F" />
                    {item}
                  </div>
                  <p>{idx == 0 ? "2m" : "2w"}</p>
                </div>
              );
            })}
          </>
        )}
      </section>
      <NewSpace isRename={isOpenNewSpace?.key == "edit"} value={isOpenNewSpace?.data} open={!!isOpenNewSpace?.key} onClose={handleCloseSpace} />
      <ConfirmationModal open={isOpenConfirmModal?.isOpen} onClose={handleClose} />
    </main>
  );
};
