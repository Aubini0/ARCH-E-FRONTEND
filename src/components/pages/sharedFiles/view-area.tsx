import SearchToolbar from "@/components/ui/searchbar";
import AvatarGroup from "@/pages/home/components/RightSection/ChatBadge/avatarGroup";
import { FileIcon, FilePlusIcon, FolderPlusIcon, XIcon } from "lucide-react";
import React from "react";
import ImageUpload from "./fileUploader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const FilesAreaView = () => {
  const [files, setFiles] = React.useState<string[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.length && e?.target?.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e?.target?.result;
        setFiles([...files, `${fileContent}`]);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="p-[38px] overflow-hidden h-screen">
      <section>
        <div className="flex items-center justify-between">
          <div>
            <SearchToolbar />
          </div>
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="/user1.png" />
            </Avatar>
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
      <section>
        <div className="mt-10">
          <ImageUpload />
        </div>
      </section>
    </main>
  );
};
