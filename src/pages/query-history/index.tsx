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

const QueryHistory = () => {
  const { toast } = useToast();
  const { mutateAsync: deleteChatHistory, status: deleteStatus } = useDeleteAllChatHistory();

  const { mutateAsync: deleteQuery, status: deleteQueryStatus } = useDeleteQuery();

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
    <MainLayout header={false} className="min-h-screen">
      <div className="font-montserrat py-5">
        <div className="px-5 border-b border-gray-300 dark:border-[#3D3D3D] pb-5">
          <div className="h-full flex items-center gap-3">
            <GrHistory className="text-2xl" />
            <h3 className="text-2xl font-medium">Search</h3>
          </div>
          <div className="flex items-center justify-between gap-3 mt-4">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
                  <DropdownMenuItem isLoading={deleteStatus === "loading"} onClick={handleDeleteChatHistory}>
                    <FaRegTrashAlt className="mr-2 h-4 w-4" />
                    <span className="text-xs">Delete All Threads</span>
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
            {data.data.results.map((session, i) => (
              <Link key={i} href={`/sessions/${session.session_id}`} className="block py-5 dark:hover:bg-white/10 px-5 cursor-pointer hover:bg-gray-100">
                <h4 className="text-[20px] font-semibold dark:text-white text-black">{session.user}</h4>
                <p className="text-sm font-medium line-clamp-4 text-[#848585] leading-[20px]">{session.assistant}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex text-[#848585] items-center gap-3">
                    <GrHistory className="text-xs" />
                    <span className="text-xs">{moment(session.created_at).fromNow()}</span>
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
                          <FaRegTrashAlt className="mr-2 h-4 w-4" />
                          <span className="text-xs">Delete Thread</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
