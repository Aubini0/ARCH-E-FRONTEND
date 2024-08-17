import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteAllChatHistory, useQueryHistory, useSessionHistory } from "@/hooks/api/query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn, groupByDateRangeUnspecifiedTz } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { ScrollShadow } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";

const QueryHistory = () => {
  const { toast } = useToast();
  const { auth, user } = useAppSelector((state) => state.auth);

  const { mutateAsync: deleteChatHistory, status: deleteStatus } = useDeleteAllChatHistory();

  const [userId] = useLocalStorage<string | undefined>("user_id", undefined);

  const user_id = auth ? (user?.id as string) : (userId as string);

  const { status, data, refetch } = useSessionHistory({
    queryKey: ["sessionHistory", { user_id }],
    enabled: Boolean(user_id),
  });

  const ranges = useMemo(() => groupByDateRangeUnspecifiedTz(data?.data.results || []), [data]);

  const handleDeleteChatHistory = async () => {
    try {
      await deleteChatHistory({ user_id });
      refetch();
      toast({ title: "All History Deleted successfully", itemID: "delete-history" });
    } catch (error) {
      toast({ title: "Something went wrong", description: "Can't delete chat history. Please try again later", itemID: "delete-history" });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden md:flex">
        <Button className="w-[42px] h-[40px] p-0 bg-transparent dark:bg-transparent dark:hover:bg-secondary border-transparent hover:border-gray-300">
          <GrHistory className="text-lg" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[220px] rounded-2xl h-[220px] xl:w-[250px] xl:h-[250px] 2xl:w-[250px] 2xl:h-[250px] 3xl:w-[350px] 3xl:h-[350px] border dark:border-transparent bg-off-white dark:bg-secondary overflow-y-auto hide-scrollbar mt-3 !p-0 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col dark:text-[#f5f5f5] text-black">
          <div className="flex px-4 pt-2 pb-2 items-center justify-between">
            <Link
              href={"/query-history"}
              className={cn("lg:text-xs xl:text-sm 2xl:text-base font-semibold flex gap-2 items-center cursor-pointer dark:text-white/60 dark:hover:text-white text-black")}
            >
              <GrHistory className="text-black dark:text-white" /> Chat History
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-3 dark:text-white text-sm">
                <DropdownMenuGroup>
                  <DropdownMenuItem isLoading={deleteStatus === "loading"} onClick={handleDeleteChatHistory}>
                    <FaRegTrashAlt className="mr-2 h-4 w-4" />
                    <span className="text-xs">Delete All History</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="px-4">
            <div className="w-full h-[1px] bg-gray-300 dark:bg-[#3D3D3D]"></div>
          </div>
          {status === "success" && data.data.results.length === 0 && (
            <div className="w-full py-5">
              <h5 className="lg:text-xs xl:text-sm 3xl:text-base px-4 font-medium text-black dark:text-white">No Threads Found.</h5>
            </div>
          )}
          {status === "success" && data.data.results.length > 0 && (
            <ScrollShadow hideScrollBar className="pb-2 flex-grow overflow-y-auto hide-scrollbar">
              {ranges.map((range, i) =>
                range.items.length ? (
                  <Fragment key={i}>
                    <div className="w-full py-1">
                      <span className="text-[#7F7F7F] text-xs font-medium px-4">{range.title}</span>
                      {range.items.map((session, i) => (
                        <Link key={i} href={`/sessions/${session.session_id}`} className="block py-1 px-4 dark:hover:bg-white/10 cursor-pointer hover:bg-gray-100">
                          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs lg:text-xs xl:text-sm 3xl:text-base font-medium">{session.session_name}</p>
                        </Link>
                      ))}
                    </div>
                  </Fragment>
                ) : null
              )}
            </ScrollShadow>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default QueryHistory;
