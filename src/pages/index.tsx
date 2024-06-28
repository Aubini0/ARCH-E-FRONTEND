// import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SourceCard from "@/components/pages/Home/SourceCard";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import logoImg from "@/assets/images/logo.png";
import logoAnimated from "@/assets/images/logo-animated.gif";
import { motion } from "framer-motion";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import MainLayout from "@/components/layouts/MainLayout";
import PlaceholdersAndVanishInput from "@/components/ui/PlaceHolderAndVanishInput";
import { cn, getWebSocketURL } from "@/lib/utils";
import { ScrollShadow } from "@nextui-org/react";
import { IBotSearchResponseStream } from "@/types/common";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hooks";
import MarkDown from "react-markdown";
import Keys from "@/config/keys";
import { FaMicrophone, FaRegEdit, FaRegQuestionCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MusicCard from "@/components/shared/MusicCard";
import Lottie from "lottie-react";
import voiceAnimation from "@/assets/lotties/voice-animation.json";
import useLongPress from "@/hooks/useLongPress";
import { useRouter } from "next/router";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface IQuery {
  id: string;
  query: string;
  response: string;
  completed: boolean;
  recommendations: [];
}

export default function Home() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
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
  const isCaption = router.query.caption === "1";
  const [voicePlaying, setVoicePlaying] = useState(false);

  const chatSocketRef = useRef<WebSocket>(null);

  const { auth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setQueries([]);
  }, [auth]);

  // const fetchBot = async (query: string) => {
  //   if (!query) return;

  //   const id = mode === "add" ? nanoid() : editingQuery!.id;

  //   if (mode === "add") {
  //     setQueries((prev) => [
  //       ...prev,
  //       { id, query: query, response: "", completed: false },
  //     ]);
  //   } else {
  //     setQueries((prevQueries) => {
  //       const _queries = [...prevQueries];
  //       const currentQueryIndex = _queries.findIndex((q) => q.id === id);

  //       if (currentQueryIndex !== -1) {
  //         _queries[currentQueryIndex].completed = false;
  //         _queries[currentQueryIndex].query = query;
  //         _queries[currentQueryIndex].response = "";
  //       }

  //       return _queries;
  //     });

  //     const queryElement = document.getElementById(id);
  //     if (queryElement) {
  //       queryElement.scrollIntoView({ behavior: "smooth" });
  //     }

  //     setEditingQuery(null);
  //     setMode("add");
  //   }

  //   try {
  //     const response = await fetch(`${Keys.API_BASE_URL}/bots/search`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: query,
  //       }),
  //     });

  //     const reader = response.body!.getReader();
  //     const decoder = new TextDecoder();
  //     let buffer = "";
  //     let accumulatedResponse = "";

  //     while (true) {
  //       console.log("while true");
  //       const { done, value } = await reader.read();
  //       if (done) {
  //         setQueries((prevQueries) => {
  //           const _queries = [...prevQueries];
  //           const currentQueryIndex = _queries.findIndex((q) => q.id === id);

  //           if (currentQueryIndex !== -1) {
  //             _queries[currentQueryIndex].completed = true;
  //           }

  //           return _queries;
  //         });
  //         break;
  //       }

  //       const decodedValue = decoder.decode(value, { stream: true });
  //       buffer += decodedValue;

  //       let boundary;
  //       while ((boundary = buffer.indexOf("}{")) !== -1) {
  //         const chunk = buffer.slice(0, boundary + 1);
  //         buffer = buffer.slice(boundary + 1);

  //         try {
  //           const jsonObject: IBotSearchResponseStream = JSON.parse(chunk);

  //           if (jsonObject.event_type === "on_llm_stream") {
  //             const newData = jsonObject.data;

  //             accumulatedResponse += newData;
  //           }
  //         } catch (error) {
  //           console.error("Error parsing JSON:", error);
  //         }
  //       }

  //       if (accumulatedResponse) {
  //         setQueries((prevQueries) => {
  //           const _queries = [...prevQueries];
  //           const currentQueryIndex = _queries.findIndex((q) => q.id === id);

  //           if (currentQueryIndex !== -1) {
  //             _queries[currentQueryIndex].response = accumulatedResponse;
  //           }

  //           return _queries;
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching stream:", error);
  //   }
  // };

  const fetchBot = async (query: string) => {
    if (!chatSocketRef?.current) {
      return;
    }

    if (chatSocketRef.current.readyState === WebSocket.CONNECTING) {
      return;
    }

    if (chatSocketRef.current.readyState !== WebSocket.OPEN) {
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

  const onChatMessage = (event: MessageEvent<any>) => {
    const data = JSON.parse(event.data);

    if (!editingQueryRef?.current) {
      setQueries((prevQueries) => {
        const _queries = [...prevQueries];
        const latestId = _queries[_queries.length - 1]?.id;
        const currentQueryIndex = _queries.findIndex((q) => q.id === latestId);
        console.log(_queries, latestId);
        if (currentQueryIndex !== -1) {
          _queries[currentQueryIndex].completed = true;
          _queries[currentQueryIndex].response = data.response;
          _queries[currentQueryIndex].recommendations = data.recommendations;
        }

        return _queries;
      });
    } else {
      setQueries((prevQueries) => {
        const _queries = [...prevQueries];
        const currentQueryIndex = _queries.findIndex(
          (q) => q.id === editingQueryRef?.current?.id
        );

        if (currentQueryIndex !== -1) {
          _queries[currentQueryIndex].completed = true;
          _queries[currentQueryIndex].response = data.response;
          _queries[currentQueryIndex].recommendations = data.recommendations;
        }

        return _queries;
      });

      setMode("add");
      setEditingQuery(null);
    }
  };

  useEffect(() => {
    // @ts-ignore
    editingQueryRef.current = editingQuery;
  }, [editingQuery]);

  useEffect(() => {
    const chat_websocketUrl = getWebSocketURL("/invoke_llm");

    const chat_socket = new WebSocket(chat_websocketUrl);

    // @ts-ignore
    chatSocketRef.current = chat_socket;

    chat_socket.onopen = () => {
      console.log("Chat WebSocket connection opened");
    };

    chat_socket.onmessage = onChatMessage;

    chat_socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    return () => {
      chat_socket.close();
    };
  }, []);

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
        {queries.length > 0 && !isPlay && !isCaption && (
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
              className="flex-1 divide-y-2 divide-secondary w-full"
            >
              {queries.map((q, i) => (
                <motion.div
                  key={q.id}
                  id={q.id}
                  className={cn(
                    "max-w-full lg:max-w-[650px] 2xl:max-w-[800px] relative duration-300 mx-auto w-full",
                    i === 0 ? "pt-0 pb-5" : "pt-5 pb-5",
                    queries.length === i + 1 ? "pb-[100px] md:pb-[120px]" : ""
                  )}
                  initial={{
                    minHeight: "calc(100vh - 96px)",
                  }}
                  animate={{
                    minHeight: q.completed ? "unset" : "calc(100vh - 96px)",
                  }}
                >
                  {!isPhone && mode === "edit" && editingQuery?.id === q.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        fetchBot(editingQuery.updatedQuery);
                      }}
                      className="flex flex-col bg-secondary p-5 rounded-xl items-start w-full"
                    >
                      <div className="w-full h-full">
                        <Input
                          onChange={(e) =>
                            setEditingQuery((pv) => ({
                              ...pv!,
                              updatedQuery: e.target.value,
                            }))
                          }
                          value={editingQuery?.updatedQuery}
                          className="text-[30px] font-medium"
                        />
                        <div className="flex items-center justify-end gap-3">
                          <Button
                            type="button"
                            onClick={() => {
                              setMode("add");
                              setEditingQuery(null);
                            }}
                            variant={"secondary"}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            onClick={() => fetchBot(editingQuery.updatedQuery)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col bg-secondary p-5 rounded-xl items-start w-full">
                      <h5 className="text-[30px] font-medium">{q.query}</h5>
                    </div>
                  )}
                  {/* <div className="absolute hidden lg:block top-0 2xl:-right-[330px] lg:-right-[300px] lg:w-[270px] pb-5 2xl:w-[310px] h-full">
                    <div
                      // style={{ position: "-webkit-sticky" }}
                      className="sticky top-[10px] grid grid-cols-2 gap-5"
                    >
                      <div className="col-span-2 rounded-lg overflow-hidden duration-300 h-[230px]">
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-1 rounded-lg aspect-[16/10] overflow-hidden duration-300">
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-1 rounded-lg aspect-[16/10] overflow-hidden duration-300">
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="col-span-1 rounded-lg aspect-[16/10] overflow-hidden duration-300">
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                          alt="image"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        onClick={() => setImageViewerOpen(true)}
                        className="rounded-lg col-span-1 aspect-[16/10] overflow-hidden duration-300 bg-secondary flex flex-col items-center justify-center cursor-pointer"
                      >
                        <img
                          src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                          alt="image"
                          className="w-full h-[60px] rounded-xl object-cover"
                        />
                        <div className="flex items-center justify-center h-[30px]">
                          <p className="text-sm font-medium text-white">
                            + View more
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full hidden md:block h-full py-5"
                  >
                    <CarouselContent className="text-black">
                      {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/4 select-none"
                        >
                          <SourceCard />
                        </CarouselItem>
                      ))}
                      <CarouselItem
                        onClick={() => setSheetOpen(true)}
                        className="md:basis-1/2 lg:basis-1/4 select-none"
                      >
                        <SourceCardViewMore />
                      </CarouselItem>
                    </CarouselContent>
                  </Carousel> */}
                  {/* <div
                    onClick={() => setSheetOpen(true)}
                    className="rounded-full md:hidden h-[42px] bg-secondary my-5 flex items-center justify-between gap-8 w-full px-3 select-none cursor-pointer hover:bg-white/40 duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <MdOutlineLibraryBooks className="text-2xl" />
                      <span className="text-sm md:text-base font-medium text-white">
                        Sources
                      </span>
                    </div>
                    <div className=" flex items-center gap-[3px]">
                      <div className="border-2 w-6 h-6 rounded-full border-white relative">
                        <Image
                          src={
                            "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          }
                          alt="avatar"
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="border-2 w-6 h-6 rounded-full border-white relative">
                        <Image
                          src={
                            "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          }
                          alt="avatar"
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="border-2 w-6 h-6 rounded-full border-white relative">
                        <Image
                          src={
                            "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          }
                          alt="avatar"
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="border-2 w-6 h-6 rounded-full border-white relative">
                        <Image
                          src={
                            "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                          }
                          alt="avatar"
                          fill
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-col items-start w-full">
                    {/* <Carousel
                      opts={{
                        align: "start",
                      }}
                      className="w-full md:hidden block mt-5"
                    >
                      <CarouselContent className="text-black">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <CarouselItem
                            key={index}
                            className="basis-[50%] select-none h-[120px]"
                          >
                            <div className="rounded-lg h-full w-full overflow-hidden duration-300">
                              <img
                                src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                                alt="image"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                        <CarouselItem className="basis-[50%] select-none h-[120px]">
                          <div className="rounded-lg h-full w-full overflow-hidden duration-300 bg-secondary flex flex-col items-center justify-center">
                            <img
                              src={`https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Medabots.jpg/220px-Medabots.jpg`}
                              alt="image"
                              className="w-full h-[90px] rounded-xl object-cover"
                            />
                            <div className="flex items-center justify-center h-[30px]">
                              <p className="text-sm font-medium text-white">
                                + View more
                              </p>
                            </div>
                          </div>
                        </CarouselItem>
                      </CarouselContent>
                    </Carousel> */}
                    <div className="w-full gap-3 flex items-center pb-3 pt-8">
                      <Image
                        src={logoImg.src}
                        alt="user"
                        height={32}
                        width={32}
                        quality={100}
                        className="object-contain"
                      />
                      <h5 className="font-medium text-lg text-white">ARCH-E</h5>
                    </div>
                    {q.response && (
                      <MarkDown className={"mkdown"}>{q.response}</MarkDown>
                    )}

                    {!q.response && (
                      <div className="space-y-2 w-full">
                        <Skeleton className="w-full h-[30px]" />
                        <Skeleton className="w-full h-[30px]" />
                        <Skeleton className="w-3/4 h-[30px]" />
                      </div>
                    )}
                    {q.completed && (
                      <div className="flex items-center mt-5 gap-3 justify-center">
                        {/* <div className="flex flex-col cursor-pointer items-center justify-center">
                          <VscShare className="text-xl" />
                          <span className="text-[10px]">Share</span>
                        </div> */}
                        <div
                          onClick={() => {
                            setEditingQuery({ ...q, updatedQuery: q.query });
                            setMode("edit");
                          }}
                          className="flex flex-col cursor-pointer items-center justify-center"
                        >
                          <FaRegEdit className="text-xl" />
                          <span className="text-[10px]">Edit</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {queries.length === i + 1 &&
                    q.completed &&
                    q.recommendations.length > 0 && (
                      <div className="w-full h-auto border-t-2 border-secondary mt-3 pt-5">
                        <h5 className="text-xl font-medium font-white">
                          Related Questions
                        </h5>
                        <div className="divide-y-2 pt-3 divide-secondary">
                          {q.recommendations.map((rec, i) => (
                            <div
                              key={i}
                              onClick={() => fetchBot(rec)}
                              className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                            >
                              <span className="text-sm md:text-base text-white w-[90%]">
                                {rec}
                              </span>
                              <FaRegQuestionCircle className="text-white text-xl" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </motion.div>
              ))}
            </ScrollShadow>
          </div>
        )}
        {isCaption && (
          <div
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            className="fixed caption-container w-screen h-screen flex bg-black/20 items-center justify-center max-w-full flex-col inset-0 overflow-hidden hide-scrollbar"
          >
            <div className="w-[150px] relative h-[150px] mx-auto">
              <Image
                fill
                src={logoAnimated}
                alt="Animated logo"
                className="object-contain"
              />
            </div>
            <div className="text-lg md:mt-8 mt-14 font-medium text-center">
              Captions will be here. Subtitles
            </div>
            <div className="flex items-center justify-center mt-5 fixed bottom-[60px] w-full max-w-[250px]">
              <div className="flex items-center justify-center pointer-events-none">
                <Lottie
                  animationData={voiceAnimation}
                  className="w-[300px] h-[150px] object-cover"
                />
              </div>
            </div>

            <button
              onClick={() => {
                router.replace("/");
              }}
              className="fixed top-6 right-5 md:top-8 md:right-10 text-white z-[120] rounded-lg flex items-center justify-center text-[40px]"
            >
              <CgCloseR />
            </button>
          </div>
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
        {!isCaption && !imageViewerOpen && (
          <div
            className={cn(
              "flex items-center w-full justify-center flex-col md:py-10 py-5 mx-auto",
              queries.length > 0 || isPlay || isCaption
                ? "fixed bottom-0 left-0"
                : "fixed bottom-0 md:bottom-auto"
            )}
          >
            {queries.length === 0 && !isPlay && !isCaption && (
              <div className="container w-full">
                <div className="w-[100px] relative h-[100px] mx-auto mb-5">
                  <Image
                    fill
                    src={logoAnimated}
                    alt="Animated logo"
                    className="object-contain"
                  />
                </div>
                <h2 className="text-[28px] md:text-[32px] font-medium text-center mb-[25vh] md:mb-12">
                  Bad questions don&apos;t exist.
                </h2>
              </div>
            )}
            <div className="lg:max-w-[800px] px-8 lg:px-0 max-w-full w-full">
              <PlaceholdersAndVanishInput
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  if (mode === "edit" && isPhone) {
                    setEditingQuery((pv) => ({
                      ...pv!,
                      updatedQuery: e.target.value,
                    }));
                  }
                }}
                onSubmit={fetchBot}
                focused={mode === "edit" && isPhone}
                value={
                  mode === "edit" && isPhone ? editingQuery?.updatedQuery : ""
                }
                placeholder={
                  queries.length === 0
                    ? isPlay
                      ? "What do you like to play?"
                      : "What do you want to know?"
                    : undefined
                }
                onBlur={() => {
                  if (mode === "edit" && isPhone) {
                    setMode("add");
                    setEditingQuery(null);
                  }
                }}
                onButtonClick={() => router.push("/?caption=1")}
                icon={<FaMicrophone />}
                className="duration-300 -z-1"
              />
              {/* <div className="mx-auto w-[60px] mt-12 h-[60px] rounded-full flex items-center justify-center shadow-sm bg-secondary">
              <FaHeadphonesAlt className="text-[30px]" />
            </div> */}
            </div>
          </div>
        )}
      </div>
      {!isPhone && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side={"right"}>
            <SheetHeader>
              <SheetTitle className="text-2xl">1+ sources</SheetTitle>
            </SheetHeader>
            <div className="w-full">
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="w-full py-5 md:py-10 h-full"
              >
                <CarouselContent className="text-black">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4 select-none"
                    >
                      <SourceCard />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </SheetContent>
        </Sheet>
      )}
      {isPhone && (
        <Drawer open={sheetOpen} onOpenChange={setSheetOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-2xl">1+ sources</DrawerTitle>
            </DrawerHeader>
            <div className="w-full">
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="w-full px-5 py-5 md:py-10 h-full"
              >
                <CarouselContent className="text-black">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4 select-none"
                    >
                      <SourceCard />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </MainLayout>
  );
}
