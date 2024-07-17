// import { Button } from "@/components/ui/button";
import { use, useEffect, useRef, useState } from "react";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import MainLayout from "@/components/layouts/MainLayout";
import PlaceholdersAndVanishInput from "@/components/ui/PlaceHolderAndVanishInput";
import { cn, getWebSocketURL } from "@/lib/utils";
import { ScrollShadow } from "@nextui-org/react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hooks";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";
import MusicCard from "@/components/shared/MusicCard";
import { IQuery } from "@/types/common";
import Query from "@/components/shared/Query";
import { IoClose, IoSend } from "react-icons/io5";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useGetUserId } from "@/hooks/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { useSearchYoutube } from "@/hooks/api/query";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const { theme } = useTheme();
  const { isPhone } = useDeviceIndicator();
  const [_, setSearchValue] = useState("");
  const [queries, setQueries] = useState<IQuery[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [editingQuery, setEditingQuery] = useState<
    (IQuery & { updatedQuery: string }) | null
  >(null);
  const editingQueryRef = useRef<IQuery & { updatedQuery: string }>(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [isPlay, setIsPlay] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [userId, setUserId] = useLocalStorage<string | undefined>(
    "user_id",
    undefined
  );

  const { mutateAsync: getUserIdMutate } = useGetUserId();
  const { mutateAsync: searchYoutubeMutateAsync } = useSearchYoutube();

  const chatSocketRef = useRef<WebSocket>(null);

  const { auth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setQueries([]);
  }, [auth]);

  const handleUserId = async () => {
    try {
      if (userId) return;
      const res = await getUserIdMutate();
      setUserId(res?.data?.user_id);
    } catch (error) {
      // toast({
      //   title: "Something went wrong",
      //   description: "Something went wrong, please try again later",
      // });
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId && socketConnected) {
      setDisabled(false);
    }
    if (!userId) {
      handleUserId();
    }
  }, [userId, socketConnected]);

  const handleFetchYoutubeVideos = async (id: string, query: string) => {
    try {
      const res = await searchYoutubeMutateAsync(query);
      setQueries((prev) => {
        const _queries = [...prev];
        const currentQueryIndex = _queries.findIndex((q) => q.id === id);
        if (currentQueryIndex !== -1) {
          _queries[currentQueryIndex].videos = res.data.results;
          _queries[currentQueryIndex].videosFetched = true;
        }
        return _queries;
      });
    } catch (error) {}
  };

  const fetchBot = async (query: string) => {
    if (disabled) {
      return;
    }
    if (!query) return;
    const id = mode === "add" ? nanoid() : editingQuery!.id;

    if (mode === "add") {
      setQueries((prev) => [
        ...prev,
        {
          id,
          query: query,
          response: "",
          completed: false,
          recommendations: [],
          videos: [],
          videosFetched: false,
          web_links: [],
        },
      ]);
      handleFetchYoutubeVideos(id, query);
    } else {
      setQueries((prevQueries) => {
        const _queries = [...prevQueries];
        const currentQueryIndex = _queries.findIndex((q) => q.id === id);

        if (currentQueryIndex !== -1) {
          _queries[currentQueryIndex].completed = false;
          _queries[currentQueryIndex].query = query;
          _queries[currentQueryIndex].response = "";
          _queries[currentQueryIndex].recommendations = [];
          _queries[currentQueryIndex].videos = [];
          _queries[currentQueryIndex].videosFetched = false;
          _queries[currentQueryIndex].web_links = [];
        }

        return _queries;
      });
      handleFetchYoutubeVideos(id, query);

      setMode("add");

      const queryElement = document.getElementById(id);
      if (queryElement) {
        queryElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    chatSocketRef.current?.send(JSON.stringify({ user_msg: query }));
  };

  const updateQueries = (data: any, editingQuery: IQuery | null) => {
    setQueries((prevQueries) => {
      const updatedQueries = [...prevQueries];

      let currentQueryIndex;
      if (editingQuery) {
        currentQueryIndex = updatedQueries.findIndex(
          (q) => q.id === editingQuery.id
        );
      } else {
        const latestId = updatedQueries[updatedQueries.length - 1]?.id;
        currentQueryIndex = updatedQueries.findIndex((q) => q.id === latestId);
      }

      if (currentQueryIndex !== -1) {
        if (data.clear) {
          updatedQueries[currentQueryIndex].completed = true;
        }
        if (data.web_links) {
          updatedQueries[currentQueryIndex].web_links = data.web_links;
        }
        if (!data.clear) {
          updatedQueries[currentQueryIndex].response += data.response;
          updatedQueries[currentQueryIndex].recommendations =
            data.recommendations || [];
        }
      }

      return updatedQueries;
    });

    if (editingQuery) {
      setMode("add");
      setEditingQuery(null);
    }
  };

  const onChatMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    updateQueries(data, editingQueryRef.current);
  };

  useEffect(() => {
    // @ts-ignore
    editingQueryRef.current = editingQuery;
  }, [editingQuery]);

  useEffect(() => {
    let chat_socket: WebSocket | undefined;
    if (userId) {
      const chat_websocketUrl = getWebSocketURL(`/invoke_llm/${userId}`);

      chat_socket = new WebSocket(chat_websocketUrl);

      // @ts-ignore
      chatSocketRef.current = chat_socket;

      chat_socket.onopen = () => {
        setSocketConnected(true);
      };

      chat_socket.onmessage = onChatMessage;

      chat_socket.onclose = () => {
        setSocketConnected(false);
      };
    }
    return () => {
      console.log("Cleaning up WebSocket");
      if (chat_socket) {
        chat_socket.onmessage = null;
        chat_socket.onclose = null;
        chat_socket.close();
      }
    };
  }, [userId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const latestQuery = queries[queries.length - 1];
      if (latestQuery) {
        const queryElement = document.getElementById(latestQuery.id);
        if (queryElement) {
          queryElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [queries.length]);

  return (
    <MainLayout className="font-onest hide-scrollbar max-h-screen min-h-screen h-full w-full overflow-hidden">
      <div
        className={cn("flex-col flex items-center w-full justify-center")}
        style={{
          height: `calc(100vh - 96px)`,
          maxHeight: `calc(100vh - 96px)`,
        }}
      >
        {!isPhone && (
          <>
            {queries.length > 0 && !isPlay && (
              <div
                className={cn(
                  "container lg:px-0 lg:mx-0 lg:max-w-none w-full max-h-full h-full duration-300 flex flex-col items-center"
                )}
                style={{
                  height: `calc(100vh - 96px)`,
                }}
              >
                <ScrollShadow
                  ref={scrollAreaRef}
                  hideScrollBar
                  style={{
                    height: `calc(100vh - 96px)`,
                  }}
                  className="flex-1 divide-y-2 divide-gray-400 dark:divide-secondary w-full"
                >
                  {queries.map((q, i) => (
                    <Query
                      query={q}
                      editingQuery={editingQuery}
                      fetchBot={fetchBot}
                      index={i}
                      mode={mode}
                      setEditingQuery={setEditingQuery}
                      setMode={setMode}
                      totalQueries={queries.length}
                      key={i}
                    />
                  ))}
                </ScrollShadow>
              </div>
            )}
          </>
        )}
        {isPhone && (
          <Drawer
            open={queries.length > 0}
            onOpenChange={(open) => {
              if (!open) {
                setQueries([]);
              }
            }}
          >
            <DrawerContent
              swapper={false}
              className="min-h-[95%] h-[95%] max-h-[95%] border-none outline-none ring-0 pt-0"
            >
              <div className="border-b-2 border-gray-400 dark:border-secondary flex items-center justify-center relative h-[60px] px-3">
                <div
                  onClick={() => setQueries([])}
                  className="absolute right-5 top-4.5"
                >
                  <IoClose className="text-3xl" />
                </div>
              </div>
              <ScrollShadow
                ref={scrollAreaRef}
                hideScrollBar
                className="flex-1 divide-y-2 p-5 divide-gray-400 dark:divide-secondary w-full"
              >
                {queries.map((q, i) => (
                  <Query
                    query={q}
                    editingQuery={editingQuery}
                    fetchBot={fetchBot}
                    index={i}
                    mode={mode}
                    setEditingQuery={setEditingQuery}
                    setMode={setMode}
                    totalQueries={queries.length}
                    key={i}
                  />
                ))}
              </ScrollShadow>
              <div className="px-5 pb-3">
                <PlaceholdersAndVanishInput
                  disabled={disabled || mode === "edit"}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    // if (mode === "edit" && isPhone) {
                    //   setEditingQuery((pv) => ({
                    //     ...pv!,
                    //     updatedQuery: e.target.value,
                    //   }));
                    // }
                  }}
                  onSubmit={(v) => {
                    fetchBot(v);
                    setSearchValue("");
                  }}
                  focused={mode === "edit" && isPhone}
                  // value={
                  //   mode === "edit" && isPhone ? editingQuery?.updatedQuery : ""
                  // }
                  placeholder={
                    isPlay
                      ? "What do you like to play?"
                      : "What do you want to know?"
                  }
                  // onBlur={() => {
                  //   if (mode === "edit" && isPhone) {
                  //     setMode("add");
                  //     setEditingQuery(null);
                  //   }
                  // }}
                  // on button click wont work now because caption is commented out
                  // onButtonClick={() => router.push("/conversation")}
                  icon={<IoSend className="text-zinc-500" />}
                  className="duration-300 -z-1"
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        {isPlay && (
          <div
            className={cn(
              "w-full max-h-full h-full duration-300 flex items-center justify-center"
            )}
            style={{
              height: `calc(100vh - 96px)`,
            }}
          >
            <MusicCard className="mx-auto mb-[108px]" />
          </div>
        )}
        {!imageViewerOpen && (
          <div
            className={cn(
              "flex items-center duration-300 w-full justify-center flex-col md:py-10 py-5 mx-auto",
              queries.length > 0 || isPlay
                ? "fixed bottom-0 left-0"
                : "fixed bottom-0 md:bottom-auto",
              queries.length === 0 && !isPlay ? "mb-[48px]" : "mb-0"
            )}
          >
            {queries.length === 0 && !isPlay && (
              <div className="container w-full">
                {mounted && (
                  <div className="w-[80%] aspect-square h-fit md:w-[250px] relative md:h-[250px] mx-auto">
                    <Image
                      fill
                      src={
                        theme === "light"
                          ? "/images/illustrations/hero-art-dark.svg"
                          : "/images/illustrations/hero-art-light.svg"
                      }
                      alt="Animated logo"
                      className="object-contain"
                    />
                  </div>
                )}
                <h2 className="text-[28px] md:text-[32px] font-medium text-center mb-[10vh]  md:mb-5">
                  A place for the curious.
                </h2>
              </div>
            )}
            {/* this is for desktop */}
            <div className="lg:max-w-[800px] px-4 lg:px-0 max-w-full w-full">
              <PlaceholdersAndVanishInput
                disabled={disabled || mode === "edit"}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  // if (mode === "edit" && isPhone) {
                  //   setEditingQuery((pv) => ({
                  //     ...pv!,
                  //     updatedQuery: e.target.value,
                  //   }));
                  // }
                }}
                onSubmit={(v) => {
                  fetchBot(v);
                  setSearchValue("");
                }}
                focused={mode === "edit" && isPhone}
                // value={
                //   mode === "edit" && isPhone ? editingQuery?.updatedQuery : ""
                // }
                placeholder={
                  isPlay
                    ? "What do you like to play?"
                    : "What do you want to know?"
                }
                // onBlur={() => {
                //   if (mode === "edit" && isPhone) {
                //     setMode("add");
                //     setEditingQuery(null);
                //   }
                // }}
                // on button click wont work now because caption is commented out
                // onButtonClick={() => router.push("/conversation")}
                icon={<IoSend className="text-zinc-500" />}
                className="duration-300 -z-1"
              />
              {/* <div className="mx-auto w-[60px] mt-12 h-[60px] rounded-full flex items-center justify-center shadow-sm bg-secondary">
              <FaHeadphonesAlt className="text-[30px]" />
            </div> */}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
