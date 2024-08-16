import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
const MobileBottomTabs = () => {
  const router = useRouter();
  return (
    <div className="h-[76px] bg-white fixed bottom-0 w-full dark:bg-secondary flex items-center justify-around">
      <Link
        href={"/"}
        className={cn(
          "flex flex-col px-4 items-center justify-center border-b-2 py-2",
          router.asPath === "/" || router.asPath.includes("/sessions/") ? "border-primary dark:text-white text-black" : "border-transparent dark:text-[#7F7F7F] text-gray-600"
        )}
      >
        <IoSearch className="text-3xl" />
      </Link>
      <Link
        href={"/query-history"}
        className={cn(
          "flex flex-col px-4 items-center justify-center border-b-2 py-2",
          router.asPath === "/query-history" ? "border-primary dark:text-white text-black" : "border-transparent dark:text-[#7F7F7F] text-gray-600"
        )}
      >
        <GrHistory className="text-2xl" />
      </Link>
    </div>
  );
};

export default MobileBottomTabs;
