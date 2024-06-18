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
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SourceCard from "@/components/pages/Home/SourceCard";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import userImg from "@/assets/images/user.png";
import logoImg from "@/assets/images/logo.png";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import MainLayout from "@/components/layouts/MainLayout";
import PlaceholdersAndVanishInput from "@/components/ui/PlaceHolderAndVanishInput";
import { cn } from "@/lib/utils";
import { Avatar, ScrollShadow } from "@nextui-org/react";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import { IBotSearchResponseStream } from "@/types/common";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hooks";
import MarkDown from "react-markdown";
import Keys from "@/config/keys";

interface IQuery {
  id: string;
  query: string;
  response: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isPhone } = useDeviceIndicator();
  const [searchValue, setSearchValue] = useState("");
  const [queries, setQueries] = useState<IQuery[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { user, auth } = useAppSelector((state) => state.auth);

  const handleSubmit = () => {
    console.log("submitting");
    fetchBot();
  };

  const loadingStates = [
    {
      text: "Buying a condo",
    },
    {
      text: "Travelling in a flight",
    },
    {
      text: "He makes soap",
    },
    {
      text: "Start a fight",
    },
    {
      text: "We like it",
    },
  ];

  const fetchBot = async () => {
    if (!searchValue) return;

    const id = nanoid();

    setQueries((prev) => [...prev, { id, query: searchValue, response: "" }]);

    try {
      const response = await fetch(`${Keys.API_BASE_URL}/bots/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchValue,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedResponse = "";

      while (true) {
        console.log("while true");
        const { done, value } = await reader.read();
        if (done) break;

        const decodedValue = decoder.decode(value, { stream: true });
        buffer += decodedValue;

        let boundary;
        while ((boundary = buffer.indexOf("}{")) !== -1) {
          const chunk = buffer.slice(0, boundary + 1);
          buffer = buffer.slice(boundary + 1);

          try {
            const jsonObject: IBotSearchResponseStream = JSON.parse(chunk);

            if (jsonObject.event_type === "on_llm_stream") {
              const newData = jsonObject.data;

              accumulatedResponse += newData;
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }

        if (accumulatedResponse) {
          setQueries((prevQueries) => {
            const _queries = [...prevQueries];
            const currentQueryIndex = _queries.findIndex((q) => q.id === id);

            if (currentQueryIndex !== -1) {
              _queries[currentQueryIndex].response = accumulatedResponse;
            }

            return _queries;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching stream:", error);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [queries]);

  return (
    <MainLayout className="font-onest h-screen w-screen overflow-hidden">
      <div
        className={cn(
          "container flex-col max-w-full lg:max-w-[800px] flex items-center w-full justify-center"
        )}
        style={{
          height: `calc(100vh - 96px)`,
        }}
      >
        {loading && (
          <MultiStepLoader
            duration={1000}
            loading={loading}
            loadingStates={loadingStates}
          />
        )}
        {queries.length > 0 && (
          <div className="flex w-full h-[85%] duration-300 flex-col items-center">
            <ScrollShadow
              ref={scrollAreaRef}
              hideScrollBar
              className="h-[60%] flex-1 divide-y divide-secondary w-full"
            >
              {queries.map((q) => (
                <div key={q.id} className="w-full">
                  <div className="flex flex-col items-start w-full">
                    <div className="w-full gap-3 flex items-start py-3">
                      {auth && (
                        <Avatar
                          isBordered
                          className="ring-1 w-7 h-7 md:w-8 md:h-8 ring-offset-1 cursor-pointer"
                          radius="sm"
                          name={user?.full_name?.[0]}
                          src={user?.profilePic}
                        />
                      )}
                      {!auth && (
                        <Image
                          src={userImg.src}
                          alt="user"
                          height={32}
                          width={32}
                          className="object-contain"
                        />
                      )}
                      <div className="space-y-1 flex-1">
                        <h5 className="font-bold text-white">You</h5>
                        <p>{q.query}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="w-full gap-3 flex items-start py-3">
                      <Image
                        src={logoImg.src}
                        alt="user"
                        height={32}
                        width={32}
                        quality={100}
                        className="object-contain"
                      />
                      <div className="space-y-1 flex-1">
                        <h5 className="font-bold text-white">ARCH-E</h5>
                        <MarkDown className={"mkdown"}>{q.response}</MarkDown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollShadow>
            {queries.length > 0 && (
              <div
                onClick={() => setSheetOpen(true)}
                className="rounded-full h-[42px] bg-secondary my-3 w-fit flex items-center gap-1 px-12 select-none cursor-pointer hover:bg-white/40 duration-300"
              >
                <div className=" flex items-center gap-3 space-x-[-25px]">
                  <div className="border-2 w-8 h-8 rounded-full border-white relative">
                    <Image
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <div className="border-2 w-8 h-8 rounded-full border-white relative">
                    <Image
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <div className="border-2 w-8 h-8 rounded-full border-white relative">
                    <Image
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <div className="border-2 w-8 h-8 rounded-full border-white relative">
                    <Image
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026024d"}
                      alt="avatar"
                      fill
                      className="rounded-full"
                    />
                  </div>
                </div>
                <p className="text-small text-foreground font-medium ms-2">
                  +10 sources
                </p>
              </div>
            )}
          </div>
        )}
        {queries.length === 0 && <div className="flex-1 w-full h-full"></div>}
        <div className="py-5 flex items-center justify-center w-full">
          <PlaceholdersAndVanishInput
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={handleSubmit}
            placeholders={[]}
            className="duration-300 -z-1"
          />
        </div>
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
                  {loading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/4 select-none"
                      >
                        <div className="flex flex-col space-y-3">
                          <Skeleton className="h-[80px] w-[200px] rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  {!loading &&
                    Array.from({ length: 10 }).map((_, index) => (
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
                  {loading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/4 select-none"
                      >
                        <div className="flex flex-col space-y-3">
                          <Skeleton className="h-[80px] w-[200px] rounded-xl" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  {!loading &&
                    Array.from({ length: 10 }).map((_, index) => (
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
