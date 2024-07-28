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
    <Link
      target="_blank"
      href={url}
      className="w-full block h-full border-[1px] dark:text-white rounded-xl p-2"
    >
      {/* <p className="leading-5 two-line-ellipsis text-xs md:text-sm min-h-[40px]">
        {url}
      </p> */}
      <div className="flex items-center gap-1">
        <Image
          src={`https://www.google.com/s2/favicons?domain_url=${
            new URL(url).host
          }`}
          alt="avatar"
          width={20}
          height={20}
        />
        <div className="flex-1 flex items-center text-black dark:text-[#848585] text-xs gap-1">
          <span className="font-medium whitespace-nowrap text-ellipsis overflow-hidden inline max-w-[100%]">
            {new URL(url).host}
          </span>
          {/* <span>
            <GoDotFill />
          </span> */}
          {/* <span>{count}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default SourceCard;
