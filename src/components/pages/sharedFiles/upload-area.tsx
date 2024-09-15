import { IconInactive } from "@/components/icons/IconInactive/IconInactive";
import { ChevronDown, CirclePlus, FolderIcon } from "lucide-react";
import React from "react";

export const FilesUploadArea = () => {
  const spaces = ["Shoot", "Marketing", "Design"];
  const share = ["App", "Website"];
  const [isActiveMenu, setActiveMenu] = React.useState({ space: true, share: true });
  const handleMenu = (key: string) => {
    if (isActiveMenu[key as keyof typeof isActiveMenu]) {
      setActiveMenu({ ...isActiveMenu, [key]: false });
    } else {
      setActiveMenu({ ...isActiveMenu, [key]: true });
    }
  };
  return (
    <main className="p-[38px] overflow-auto h-screen">
      <section className="mb-[40px]">
        <div className="flex justify-between items-center mb-[24px]">
          <div onClick={() => handleMenu("space")} className="flex cursor-pointer items-center gap-2">
            <ChevronDown color="#7F7F7F" />
            <p>Spaces</p>
          </div>
          <CirclePlus color="#7F7F7F" />
        </div>
        {isActiveMenu?.space && (
          <>
            {spaces?.map((item, idx) => {
              return (
                <div className="h-[56px] cursor-pointer dark:hover:bg-[#27272A] hover:bg-[#efefef] rounded-[8px] px-[15px] flex items-center gap-4 py-[20px]" key={idx}>
                  <FolderIcon color="#7F7F7F" />
                  {item}
                </div>
              );
            })}
          </>
        )}
      </section>
      <section>
        <div onClick={() => handleMenu("share")} className="flex mb-[24px] cursor-pointer items-center gap-2">
          <ChevronDown color="#7F7F7F" />
          <p>Share</p>
        </div>
        {isActiveMenu?.share && (
          <>
            {share?.map((item, idx) => {
              return (
                <div className="h-[56px] dark:hover:bg-[#27272A] hover:bg-[#efefef] rounded-[8px] cursor-pointer px-[15px] flex items-center gap-4 py-[20px]" key={idx}>
                  <IconInactive color="#7F7F7F" />
                  {item}
                </div>
              );
            })}
          </>
        )}
      </section>
    </main>
  );
};
