import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDeleteAllChatHistory, useDeleteQuery, useQueryHistory } from "@/hooks/api/query";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrHistory, GrSearch } from "react-icons/gr";
import moment from "moment";
import { useDebounce } from "use-debounce";
import { useToast } from "@/components/ui/use-toast";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { addTimezoneUTC } from "@/lib/utils";

const QueryHistory = () => {
  const { toast } = useToast();
  const { mutateAsync: deleteChatHistory, status: deleteStatus } = useDeleteAllChatHistory();

  const { isPhone } = useDeviceIndicator();

  const { mutateAsync: deleteQuery } = useDeleteQuery();

  const { auth, user, loading } = useAppSelector((state) => state.auth);

  const [searchValue, setSearchValue] = useState("");
  const [value] = useDebounce(searchValue, 500);

  const [userId] = useLocalStorage<string | undefined>("user_id", undefined);

  const user_id = auth ? (user?.id as string) : (userId as string);

  const { status, data, refetch } = useQueryHistory({
    queryKey: ["queryHistory", { user_id, search: value }],
    enabled: Boolean(user_id),
  });

  const handleDeleteChatHistory = async () => {
    try {
      await deleteChatHistory({ user_id });
      refetch();
      toast({ title: "All History Deleted successfully", itemID: "delete-history" });
    } catch (error) {
      toast({ title: "Something went wrong", description: "Can't delete chat history. Please try again later", itemID: "delete-history" });
    }
  };

  const handleDeleteQuery = async (query_id: string) => {
    try {
      await deleteQuery({ query_id });
      refetch();
      toast({ title: "Query Deleted successfully", itemID: "delete-query" });
    } catch (error) {
      toast({ title: "Something went wrong", description: "Can't delete query. Please try again later", itemID: "delete-history" });
    }
  };

  return (
    <MainLayout header={!isPhone} className="h-screen overflow-y-auto">
      <div className="mx-auto pb-[50px] flex flex-col md:pt-[50px] lg:max-w-[800px] xl:max-w-[max-w-900px] 2xl:max-w-[1000px] safe-area-min 3xl:max-w-[1200px] font-montserrat py-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center px-5 border-b border-gray-300 dark:border-[#3D3D3D] pb-5">
          <div className="h-full flex items-center gap-3">
            <GrHistory className="text-xl" />
            <h3 className="text-xl font-medium">Chat History</h3>
          </div>
          <div className="flex items-center justify-between gap-3 mt-3 md:mt-0">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Chat History..."
              inputContainerClassName="h-[35px] mt-0 text-lg xl:min-w-[300px]"
              className="placeholder:text-sm pl-2"
              inputPrefixClassName="pr-0 pl-2"
              inputPrefix={<GrSearch className="text-xl text-gray-400 dark:text-[#848585]" />}
            />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="h-[35px]">
                  <FaRegTrashAlt />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-3 dark:text-white text-sm">
                <DropdownMenuGroup>
                  <DropdownMenuItem isLoading={deleteStatus === "loading"} onClick={handleDeleteChatHistory}>
                    <FaRegTrashAlt className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-xs">Clear History</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {status === "success" && data.data.results.length === 0 && (
          <div className="w-full flex-grow flex items-center justify-center py-5">
            <h5 className="text-3xl md:text-[48px] font-comic-sans px-6 font-bold text-black dark:text-[#848585]">No Threads Found.</h5>
          </div>
        )}
        {status === "success" && data.data.results.length > 0 && (
          <div className="py-2 divide-y h-full divide-gray-300 dark:divide-[#3D3D3D]">
            {data.data.results.map((session, i) => (
              <div key={i} className="block py-5 px-5 cursor-pointer">
                <Link href={`/sessions/${session.session_id}`} className="text-[20px] border-b-2 border-transparent duration-200 hover:border-primary inline font-semibold dark:text-white text-black">
                  {session.user}
                </Link>
                <p className="text-sm font-medium line-clamp-4 text-[#848585] leading-[20px]">{session.assistant}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex text-[#848585] items-center gap-3">
                    <GrHistory className="text-xs" />
                    <span className="text-xs">{moment(addTimezoneUTC(session.created_at)).fromNow()}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="mt-3 dark:text-white text-sm">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleDeleteQuery(session.id);
                          }}
                        >
                          <FaRegTrashAlt className="mr-2 h-4 w-4 text-red-500" />
                          <span className="text-xs">Delete Thread</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default QueryHistory;
