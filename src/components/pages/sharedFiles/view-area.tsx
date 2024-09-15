import SearchToolbar from "@/components/ui/searchbar";
import AvatarGroup from "@/pages/home/components/RightSection/ChatBadge/avatarGroup";
import { FilePlusIcon, FileX, FolderPlusIcon, SearchIcon } from "lucide-react";
import React from "react";

export const FilesAreaView = () => {
  return (
    <main className="p-[38px] overflow-hidden h-screen">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <SearchToolbar />
          </div>
          <div className="flex gap-4 items-center">
            <AvatarGroup />
            <button className="dark:bg-[#3D3D3D] p-[12px_24px_12px_24px] bg-[#efefef] rounded-[48px]">Share</button>
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer dark:bg-[#272729] bg-[#efefef]">
              <FolderPlusIcon size={20} />
            </div>
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer dark:bg-[#272729] bg-[#efefef]">
              <FilePlusIcon size={18} />
            </div>
          </div>
        </div>
      </section>
      <section className="h-full overflow-auto">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-5">
            <FileX color="#7F7F7F" size={59} />
            <p className="text-[#848585]">No file shared</p>
          </div>
        </div>
      </section>
    </main>
  );
};
