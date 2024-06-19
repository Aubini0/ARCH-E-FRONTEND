import Image from "next/image";
import React from "react";

const SourceCardViewMore = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between bg-secondary text-white rounded-xl px-2 py-3">
      <div className="flex items-center justify-center gap-1">
        <Image
          src={"https://i.pravatar.cc/150?u=a042581f4e29026024"}
          alt="avatar"
          width={25}
          height={25}
          className="rounded-full border-2 border-white"
        />
        <Image
          src={"https://i.pravatar.cc/150?u=a042581f4e29026024"}
          alt="avatar"
          width={25}
          height={25}
          className="rounded-full border-2 border-white"
        />
      </div>
      <p className="leading-5 two-line-ellipsis text-xs md:text-sm">
        View 2+ more
      </p>
    </div>
  );
};

export default SourceCardViewMore;
