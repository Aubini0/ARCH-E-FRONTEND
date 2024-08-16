import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQueryHistory } from "@/hooks/api/query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { groupByDateRange } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";

const QueryHistory = () => {
  const { auth, user, loading } = useAppSelector((state) => state.auth);

  const [userId] = useLocalStorage<string | undefined>("user_id", undefined);

  const user_id = auth ? (user?.id as string) : (userId as string);

  const { status, data } = useQueryHistory({
    queryKey: ["queryHistory", { user_id, search: "" }],
    enabled: Boolean(user_id),
  });

  const ranges = useMemo(() => groupByDateRange(data?.data.results || []), [data]);

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden md:flex">
        <Button className="w-[42px] h-[40px] p-0">
          <GrHistory className="text-lg" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[350px] h-[350px] max-h-[350px] overflow-y-auto hide-scrollbar mt-3 !p-0">
        <div className="w-full h-full dark:text-[#f5f5f5] text-black">
          <div className="flex px-6 pt-4 items-center justify-between">
            <h1 className="text-lg font-semibold">History</h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
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
          {status === "success" && data.data.results.length === 0 && (
            <div className="w-full py-5">
              <h5 className="text-base px-6 font-medium text-white">No Messages Found</h5>
            </div>
          )}
          {status === "success" && data.data.results.length > 0 && (
            <div className="py-2">
              {ranges.map((range, i) =>
                range.items.length ? (
                  <>
                    <div className="w-full py-1">
                      <span className="text-[#7F7F7F] text-xs font-medium px-6">{range.title}</span>
                      {range.items.map((session, i) => (
                        <Link key={i} href={`/sessions/${session.session_id}`} className="block py-1 px-6 dark:hover:bg-white/10 cursor-pointer hover:bg-gray-100">
                          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium">{session.user}</p>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QueryHistory;
