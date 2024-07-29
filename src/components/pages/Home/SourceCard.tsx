import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { GoDotFill } from "react-icons/go";

interface ISourceCard {
  url: string;
  count: number;
}

const SourceCard: FC<ISourceCard> = ({ url, count }) => {
  return (
    <Link target="_blank" href={url} className="w-full block h-full border-[1px] dark:text-white rounded-lg px-2 py-[5px] ">
      {/* <p className="leading-5 two-line-ellipsis text-xs md:text-sm min-h-[40px]">
        {url}
      </p> */}
      <div className="flex items-center gap-2">
        <span className="dark:text-[#848585] text-xs">{count}</span>
        {/* <span>
          <GoDotFill />
        </span> */}
        <div className="flex-1 w-full flex items-center text-black dark:text-[#848585] text-xs gap-1">
          <Image src={`https://www.google.com/s2/favicons?domain_url=${new URL(url).host}`} alt="avatar" width={20} height={20} className="object-contain h-[15px] w-[15px]" />
          <span className="font-medium whitespace-nowrap text-ellipsis overflow-hidden inline max-w-[80%]">{new URL(url).host}</span>
        </div>
      </div>
    </Link>
  );
};

export default SourceCard;
