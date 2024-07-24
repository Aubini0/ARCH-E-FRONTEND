import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface ISourceCard {
  url: string;
}

const SourceCard: FC<ISourceCard> = ({ url }) => {
  return (
    <Link
      target="_blank"
      href={url}
      className="w-full block h-full bg-gray-100 dark:bg-secondary dark:text-white rounded-xl p-2"
    >
      <p className="leading-5 two-line-ellipsis text-xs md:text-sm">{url}</p>
      <div className="flex items-center mt-1 md:mt-3 gap-3">
        <Image
          src={"/images/icons/web_icon.png"}
          alt="avatar"
          width={25}
          height={25}
          className="rounded-full border-2 border-white"
        />
        <span className="font-medium whitespace-nowrap text-ellipsis overflow-hidden inline flex-1 text-sm">
          {new URL(url).host}
        </span>
      </div>
    </Link>
  );
};

export default SourceCard;
