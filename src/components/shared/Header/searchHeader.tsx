import React, { FC, useRef } from "react";
import { cn } from "@/lib/utils";
import { MinusIcon, XIcon } from "lucide-react";
import { useRouter } from "next/router";

interface IHeader extends React.HTMLAttributes<HTMLDivElement> {}

const SeachHeader: FC<IHeader> = (props) => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <nav {...props} id="header" className={cn("z-20 relative py-2 w-full px-6 md:px-5 md:border-b border-gray-300 dark:border-[#3D3D3D]", props.className)}>
      <div className="flex items-center gap-3 justify-between">
        <div ref={buttonsRef} className="flex items-center gap-3">
          <div className="flex gap-2 items-center text-white">
            <div onClick={()=> router.push("/home")} className="bg-[#27272A] h-[50px] w-[50px] rounded-full cursor-pointer flex justify-center items-center">
              <XIcon />
            </div>
            {/* <div className="bg-[#27272A] h-[50px] w-[50px] rounded-full cursor-pointer flex justify-center items-center">
              <MinusIcon />
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export const getHeaderHeight = () => {
  if (typeof window !== "undefined") {
    document.getElementById("header")?.clientHeight || 0;
  } else return 0;
};

export default SeachHeader;
