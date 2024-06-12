import Image from "next/image";
import React from "react";

const SourceCard = () => {
  return (
    <div className="w-full h-full bg-[#3F3F46]  text-white rounded-xl p-2">
      <p className="leading-5 two-line-ellipsis text-xs md:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing
      </p>
      <div className="flex items-center mt-1 md:mt-3 gap-3">
        <Image
          src={"https://i.pravatar.cc/150?u=a042581f4e29026024"}
          alt="avatar"
          width={25}
          height={25}
          className="rounded-full border-2 border-white"
        />
        <span className="font-medium text-sm">source</span>
      </div>
    </div>
  );
};

export default SourceCard;
