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

export default function Home() {
  const { toast } = useToast();
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

  const [userId, setUserId] = useLocalStorage<string | undefined>(
    "user_id",
    undefined
  );

  const { mutateAsync: getUserIdMutate } = useGetUserId();

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
        },
      ]);
    } else {
      setQueries((prevQueries) => {
        const _queries = [...prevQueries];
        const currentQueryIndex = _queries.findIndex((q) => q.id === id);

        if (currentQueryIndex !== -1) {
          _queries[currentQueryIndex].completed = false;
          _queries[currentQueryIndex].query = query;
          _queries[currentQueryIndex].response = "";
          _queries[currentQueryIndex].recommendations = [];
        }

        return _queries;
      });

      setMode("add");

      const queryElement = document.getElementById(id);
      if (queryElement) {
        queryElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    chatSocketRef.current?.send(JSON.stringify({ user_msg: query }));
  };

  const updateQueries = (data: any, editingQuery: IQuery | null) => {
    console.log("before", data.response);
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
                  icon={<IoSend />}
                  className="duration-300 -z-1"
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        {imageViewerOpen && (
          <div
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            className="fixed w-screen h-screen flex bg-black/20 items-center justify-center max-w-full flex-col inset-0 overflow-hidden hide-scrollbar"
          >
            <div className="w-full border-b-2 h-[96px] flex items-center justify-between px-10">
              <div className="flex items-center justify-start gap-3">
                <div className="flex items-center justify-center gap-3 rounded-full">
                  <img
                    src="https://www.google.com/s2/favicons?sz=128&domain=tsn.ca"
                    alt="source icon"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-[30px]">tsn.ca</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setImageViewerOpen(false);
                }}
                className="text-white z-[120] rounded-lg flex items-center justify-center text-[40px]"
              >
                <CgCloseR />
              </button>
            </div>
            <div className="px-12 w-full h-full flex items-center">
              <div className="flex-1 h-full flex items-center justify-center">
                <div className="w-[300px] relative h-auto overflow-hidden aspect-[9/16] rounded-lg">
                  <img
                    src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                    alt="image"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30">
                    <FaRegCirclePlay className="text-white text-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <div className="w-[280px] h-full py-8">
                <div
                  className="grid grid-cols-1 gap-3 overflow-y-auto hide-scrollbar w-full"
                  style={{ maxHeight: "calc(100vh - 130px)" }}
                >
                  <div className="col-span-1 rounded-lg overflow-hidden duration-300 h-[200px]">
                    <img
                      src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 rounded-lg aspect-[16/9] overflow-hidden duration-300">
                    <img
                      src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 rounded-lg aspect-[16/9] overflow-hidden duration-300">
                    <img
                      src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-1 rounded-lg aspect-[16/9] overflow-hidden duration-300">
                    <img
                      src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                {/* <div className="w-[100px] relative h-[100px] mx-auto mb-5">
                  <Image
                    fill
                    src={logoAnimated}
                    alt="Animated logo"
                    className="object-contain"
                  />
                </div> */}
                <h2 className="text-[28px] md:text-[32px] font-medium text-center mb-[25vh] md:mb-12">
                  A place for the curious.
                </h2>
              </div>
            )}
            {/* this is for desktop */}
            <div className="lg:max-w-[800px] px-8 lg:px-0 max-w-full w-full">
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
                icon={<IoSend />}
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
