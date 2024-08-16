import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useQueryHistory } from "@/hooks/api/query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrHistory, GrSearch } from "react-icons/gr";

const QueryHistory = () => {
  const { auth, user, loading } = useAppSelector((state) => state.auth);

  const [userId] = useLocalStorage<string | undefined>("user_id", undefined);

  const user_id = auth ? (user?.id as string) : (userId as string);

  const { status, data } = useQueryHistory({
    queryKey: ["queryHistory", { user_id, search: "" }],
    enabled: Boolean(user_id),
  });
  return (
    <MainLayout header={false} className="min-h-screen">
      <div className="font-montserrat py-5">
        <div className="px-5 border-b border-gray-300 dark:border-[#3D3D3D] pb-5">
          <div className="h-full flex items-center gap-3">
            <GrHistory className="text-2xl" />
            <h3 className="text-2xl font-medium">Search</h3>
          </div>
          <div className="flex items-center justify-between gap-3 mt-4">
            <Input
              placeholder="Search Your Queries"
              inputContainerClassName="h-[48px] mt-0 text-lg"
              className="placeholder:text-lg"
              inputPrefix={<GrSearch className="text-xl text-gray-400 dark:text-[#848585]" />}
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="h-[48px]">
                  <BsThreeDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-3 dark:text-white text-sm">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <FaRegTrashAlt className="mr-2 h-4 w-4" />
                    <span className="text-xs">Delete All History</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {status === "success" && data.data.results.length === 0 && (
          <div className="w-full py-5">
            <h5 className="text-base px-6 font-medium text-white">No Messages Found</h5>
          </div>
        )}
        {status === "success" && data.data.results.length > 0 && (
          <div className="py-2 divide-y divide-gray-300 dark:divide-[#3D3D3D]">
            {/* <div className="w-full py-1">
                <span className="text-[#7F7F7F] text-xs font-medium px-6">Previous 7 Days</span>
              </div> */}
            {data.data.results.map((session) => (
              <Link href={`/sessions/${session.session_id}`} className="block py-5 dark:hover:bg-white/10 px-5 cursor-pointer hover:bg-gray-100">
                <h4 className="text-[20px] font-semibold dark:text-white text-black">{session.user}</h4>
                <p className="text-sm font-medium line-clamp-4 text-[#848585] leading-[20px]">{session.assistant}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex text-[#848585] items-center gap-3">
                    <GrHistory className="text-xs" />
                    <span className="text-xs">5 days ago</span>
                  </div>
                  <BsThreeDots />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default QueryHistory;
