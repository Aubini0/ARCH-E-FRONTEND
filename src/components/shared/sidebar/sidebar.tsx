import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MinusIcon, SearchIcon, Trash2, XIcon } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const queries = ["How does the AI system", "What are the top trending", "What keyword trending nowadays"];
export function Sidebar() {
  const [isHovered, setIsHovered] = React.useState(-1);
  const router = useRouter();

  return (
    <div className="p-6 h-[calc(100vh-70px)] overflow-hidden">
      <h2 onClick={() => router.push("/search")} className="relative p-[8px_8px_8px_16px] rounded-[8px] mb-4 flex justify-between items-center text-lg hover:bg-[#27272A] cursor-pointer font-semibold">
        New Chat
        <SearchIcon className="cursor-pointer" size={20} />
      </h2>
      <ScrollArea className="pl-4 h-[calc(100vh-110px)]">
        <div className="border-l w-full border-[#27272A]">
          {queries?.map((item, idx) => {
            return (
              <div onMouseEnter={() => setIsHovered(idx)} onMouseLeave={() => setIsHovered(-1)} key={idx} className="hover:bg-[#27272A] p-[8px_8px_8px_16px] rounded-[8px] cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="truncate max-w-[224px]">{item}</p>
                  {isHovered == idx && <Trash2 size={20} />}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
