// import { Button } from "@/components/ui/button";
import { FC, useEffect, useRef, useState } from "react";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import PlaceholdersAndVanishInput from "@/components/ui/PlaceHolderAndVanishInput";
import { cn, formatSources, getWebSocketURL } from "@/lib/utils";
import { ScrollShadow } from "@nextui-org/react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hooks";
import MusicCard from "@/components/shared/MusicCard";
import { IQuery } from "@/types/common";
import Query from "@/components/shared/Query";
import { IoClose } from "react-icons/io5";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useGetUserId } from "@/hooks/api/auth";
import { useQueriesInSession } from "@/hooks/api/query";
import Image from "next/image";
import { TbPlaneTilt } from "react-icons/tb";
import { MdOutlineSchool } from "react-icons/md";
import { SendIcon } from "@/components/icons/sendIcon";
import { useRouter } from "next/router";
import { FaCircleArrowRight } from "react-icons/fa6";
import SearchLayout from "@/components/layouts/searchLayout";

const forYouMobile = [
  {
    image: "/images/for-you-1.jpeg",
    title: "Recommended Places to Visit in Canada",
    category: "Travel",
    icon: <TbPlaneTilt />,
  },
  {
    image: "/images/for-you-2.jpeg",
    title: "Upcoming tech conferences",
    category: "Education",
    icon: <MdOutlineSchool />,
  },
  {
    image: "/images/for-you-2.jpeg",
    title: "Upcoming tech conferences",
    category: "Education",
    icon: <MdOutlineSchool />,
  },
];

interface IQueries {
  session_id: string | undefined;
}

const Queries: FC<IQueries> = ({ session_id }) => {
  const router = useRouter();
  const { isPhone } = useDeviceIndicator();
  const [_, setSearchValue] = useState("");
  const [queries, setQueries] = useState<IQuery[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, auth, loading: authLoading } = useAppSelector((state) => state.auth);
  const [editingQuery, setEditingQuery] = useState<(IQuery & { updatedQuery: string }) | null>(null);
  const editingQueryRef = useRef<IQuery & { updatedQuery: string }>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [isPlay, setIsPlay] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [queriesLoading, setQueriesLoading] = useState(true);

  const isQueryRunning = queries[queries.length - 1]?.completed === false;

  const { refetch: refetchSession } = useQueriesInSession({
    queryKey: ["chat_history", { session_id: session_id! }],
    enabled: Boolean(auth && session_id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      setQueriesLoading(false);
      const arr = data.data.results.map((qData) => {
        const obj: IQuery = {
          id: nanoid(),
          completed: true,
          query: qData.user,
          response: formatSources(qData.assistant),
          videos: Array.isArray(qData.metadata.youtube_results) ? qData.metadata.youtube_results : [],
          videosFetched: true,
          web_links: Array.isArray(qData.metadata.web_links) ? qData.metadata.web_links : [],
          recommendations: Array.isArray(qData.metadata.recomendations) ? qData.metadata.recomendations : [],
          rating: 0,
          ratingGiven: false,
        };
        return obj;
      });

      setQueries(arr);
    },
    onError: () => {
      setQueriesLoading(false);
    },
  });

  useEffect(() => {
    refetchSession();
  }, [session_id]);

  console.log(queries);

  const [userId, setUserId] = useLocalStorage<string | undefined>("user_id", undefined);

  const { mutateAsync: getUserIdMutate } = useGetUserId();

  const chatSocketRef = useRef<WebSocket>(null);

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

  useEffect(() => {
    if (!authLoading && !auth) {
      const queries = localStorage.getItem("queries");

      if (queries && JSON.parse(queries!)?.length > 0) {
        setQueries(JSON.parse(queries!));
      }
      setQueriesLoading(false);
    }
  }, [authLoading, auth]);

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
          rating: 0,
          ratingGiven: false,
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
          _queries[currentQueryIndex].videos = [];
          _queries[currentQueryIndex].videosFetched = false;
          _queries[currentQueryIndex].web_links = [];
        }

        return _queries;
      });

      setMode("add");

      const queryElement = document.getElementById(id);
      if (queryElement) {
        queryElement.scrollIntoView({ behavior: "smooth" });
      }
    }

    chatSocketRef.current?.send(JSON.stringify({ user_msg: query, action: false }));
  };

  const updateQueries = (data: any, editingQuery: IQuery | null) => {
    setQueries((prevQueries) => {
      const updatedQueries = [...prevQueries];

      let currentQueryIndex;
      if (editingQuery) {
        currentQueryIndex = updatedQueries.findIndex((q) => q.id === editingQuery.id);
      } else {
        const latestId = updatedQueries[updatedQueries.length - 1]?.id;
        currentQueryIndex = updatedQueries.findIndex((q) => q.id === latestId);
      }

      if (currentQueryIndex !== -1) {
        if (data.clear) {
          updatedQueries[currentQueryIndex].completed = true;
          if (!auth) {
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
          }
        }
        if (data.web_links) {
          updatedQueries[currentQueryIndex].web_links = data.web_links;
          if (!auth) {
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
          }
        }
        if (data.youtube_results) {
          updatedQueries[currentQueryIndex].videos = data.youtube_results;
          if (!auth) {
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
          }
        }
        if (data.recommendations) {
          updatedQueries[currentQueryIndex].recommendations = data.recommendations || [];
          if (!auth) {
            localStorage.setItem("queries", JSON.stringify(updatedQueries));
          }
        }
        if (!data.clear) {
          updatedQueries[currentQueryIndex].response = formatSources(updatedQueries[currentQueryIndex].response + data.response);
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
    let id = undefined;
    if (!authLoading) {
      if (auth) {
        id = user?.id;
      } else {
        id = userId;
      }
    }
    if (id && session_id) {
      const chat_websocketUrl = getWebSocketURL(`/invoke_llm/${id}/${session_id}`);

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
  }, [userId, auth, authLoading, user, session_id]);

  const handleStopQuery = () => {
    console.log("handleStopQuery");
    chatSocketRef.current?.send(JSON.stringify({ user_msg: "", action: true }));
    setQueries((prev) => prev.map((q) => ({ ...q, completed: false })));
  };

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

  const handleSetRating = (id: string, v: number) => {
    setQueries((pv) => {
      const _queries = [...pv];
      const currentQueryIndex = _queries.findIndex((q) => q.id === id);
      if (currentQueryIndex !== -1) {
        _queries[currentQueryIndex].rating = v;
        _queries[currentQueryIndex].ratingGiven = true;
      }
      return _queries;
    });
  };

  return (
    <SearchLayout emailTrigger={false} bottomTab={auth} className="font-onest hide-scrollbar max-h-screen min-h-screen h-full w-full overflow-hidden">
      <div className={cn("flex-col flex items-center w-[calc(100%-350px)] justify-center safe-area safe-area-max")}>
        {isPlay && (
          <div className={cn("w-full max-h-full h-full duration-300 flex items-center justify-center safe-area")}>
            <MusicCard className="mx-auto mb-[108px]" />
          </div>
        )}
        <div
          className={cn(
            "flex items-center duration-300 w-[calc(100%-350px)] gap-3 md:gap-8 flex-col md:py-5 py-5 mx-auto px-5 relative z-10",
            queries.length > 0 || isPlay ? "fixed bottom-0 left-0" : "fixed bottom-[52px] md:bottom-auto",
            queries.length === 0 && !isPlay ? "pb-5" : "pb-0",
            queries.length > 0 ? "justify-end" : "justify-center",
            isPhone ? "safe-area" : queries.length === 0 ? "safe-area" : ""
          )}
        >
          {queries.length === 0 && !isPlay && !queriesLoading && (
            <>
              <div className="block md:hidden"></div>
              <div className="container w-full flex flex-col items-center justify-between">
                <h2 className="lg:max-w-[800px] text-[28px] md:text-[32px] font-semibold text-center w-full">
                  Smart Search personalized to <span className="text-primary">you.</span>
                </h2>
              </div>
              {/* hidden this for you for now  */}
              <div className="w-full hidden">
                <p className="text-[#848585] text-sm font-medium">For You</p>
                <div className="flex flex-col gap-3 mt-2">
                  {forYouMobile.map((fy, i) => (
                    <div
                      onClick={() => fetchBot(fy.title)}
                      key={i}
                      className="w-full flex items-center gap-3 border border-[#3D3D3D] p-3 rounded-2xl duration-100 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer"
                    >
                      <Image src={fy.image} width={64} height={64} className="rounded-lg object-cover min-w-[64px] min-h-[64px]" alt="for you" />
                      <div>
                        <p className="text-sm font-semibold text-black dark:text-white">{fy.title}</p>
                        <div className="flex items-center text-[#848585] gap-1 mt-1">
                          {fy.icon}
                          <p className="text-xs font-medium">{fy.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* this is for desktop */}
          {!queriesLoading && (
            <div className="lg:max-w-[800px] px-0 max-w-full w-full">
              <PlaceholdersAndVanishInput
                isQueryExcuted={queries.length > 0 || isPlay}
                disabled={disabled || mode === "edit"}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onSubmit={(v) => {
                  console.log("is query running", isQueryRunning);
                  if (!isQueryRunning) {
                    if (v) {
                      fetchBot(v);
                      setSearchValue("");
                    }
                  } else {
                    handleStopQuery();
                  }
                }}
                focused={mode === "edit" && isPhone}
                placeholder={isPlay ? "What do you like to play?" : "What do you want to know?"}
                icon={<FaCircleArrowRight />}
                className={`duration-300 -z-1 ${queries.length && "left-[349px]"}`}
              />
              {/* <div className="mx-auto w-[60px] mt-12 h-[60px] rounded-full flex items-center justify-center shadow-sm bg-secondary">
              <FaHeadphonesAlt className="text-[30px]" />
            </div> */}
            </div>
          )}
        </div>
        {!isPhone && (
          <>
            {queries.length > 0 && !isPlay && !queriesLoading && (
              <div className={cn("container lg:px-0 lg:mx-0 lg:max-w-none w-full max-h-full h-full duration-300 flex flex-col items-center safe-area")}>
                <ScrollShadow ref={scrollAreaRef} hideScrollBar className="flex-1 safe-area divide-y-2 dark:divide-secondary w-full">
                  {queries.map((q, i) => (
                    <Query
                      setRating={handleSetRating}
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
      </div>

      {isPhone && !queriesLoading && (
        <Drawer
          open={queries.length > 0}
          onOpenChange={(open) => {
            if (!open) {
              setQueries([]);
              router.push("/");
            }
          }}
        >
          <DrawerContent swapper={false} className="min-h-[95%] h-[95%] max-h-[95%] border-none outline-none ring-0 pt-0">
            <div className="border-b-2 border-gray-400 dark:border-secondary flex items-center justify-center relative h-[60px] px-3">
              <div onClick={() => setQueries([])} className="absolute right-5 top-4.5">
                <IoClose className="text-3xl" />
              </div>
            </div>
            <ScrollShadow ref={scrollAreaRef} hideScrollBar className="flex-1 divide-y-2 p-5 dark:divide-secondary w-full">
              {queries.map((q, i) => (
                <Query
                  setRating={handleSetRating}
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
                isQueryExcuted={queries.length > 0 || isPlay}
                disabled={disabled || mode === "edit"}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onSubmit={(v) => {
                  console.log("is query running", isQueryRunning);
                  if (!isQueryRunning) {
                    if (v) {
                      fetchBot(v);
                      setSearchValue("");
                    }
                  } else {
                    handleStopQuery();
                  }
                }}
                focused={mode === "edit" && isPhone}
                placeholder={isPlay ? "What do you like to play?" : "What do you want to know?"}
                icon={<FaCircleArrowRight />}
                className="duration-300 -z-1"
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </SearchLayout>
  );
};

export default Queries;
