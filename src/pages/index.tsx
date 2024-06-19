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
import { MdOutlineLibraryBooks } from "react-icons/md";
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
import { ScrollShadow } from "@nextui-org/react";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import { IBotSearchResponseStream } from "@/types/common";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hooks";
import MarkDown from "react-markdown";
import Keys from "@/config/keys";
import { FaRegQuestionCircle } from "react-icons/fa";
import SourceCardViewMore from "@/components/pages/Home/SourceCardViewMore";

interface IQuery {
  id: string;
  query: string;
  response: string;
  completed: boolean;
}

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isPhone } = useDeviceIndicator();
  const [_, setSearchValue] = useState("");
  const [queries, setQueries] = useState<IQuery[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { auth } = useAppSelector((state) => state.auth);

  const handleSubmit = (query: string) => {
    fetchBot(query);
  };

  useEffect(() => {
    setQueries([]);
  }, [auth]);

  const fetchBot = async (query: string) => {
    if (!query) return;

    const id = nanoid();

    setQueries((prev) => [
      ...prev,
      { id, query: query, response: "", completed: false },
    ]);

    try {
      const response = await fetch(`${Keys.API_BASE_URL}/bots/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulatedResponse = "";

      while (true) {
        console.log("while true");
        const { done, value } = await reader.read();
        if (done) {
          setQueries((prevQueries) => {
            const _queries = [...prevQueries];
            const currentQueryIndex = _queries.findIndex((q) => q.id === id);

            if (currentQueryIndex !== -1) {
              _queries[currentQueryIndex].completed = true;
            }

            return _queries;
          });
          break;
        }

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
          "container flex-col flex items-center w-full justify-center"
        )}
        style={{
          height: `calc(100vh - 96px)`,
          maxHeight: `calc(100vh - 96px)`,
        }}
      >
        {queries.length > 0 && (
          <div
            className={cn(
              "w-full max-h-full h-full duration-300 flex flex-col items-center"
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
                <div
                  className={cn(
                    "max-w-full lg:max-w-[800px] mx-auto w-full",
                    i === 0 ? "pt-0 pb-5" : "pt-5 pb-5",
                    queries.length === i + 1 ? "pb-[100px] md:pb-[120px]" : ""
                  )}
                >
                  <div className="flex flex-col items-start w-full">
                    <h5 className="text-[30px] font-medium">{q.query}</h5>
                  </div>
                  <Carousel
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
                  </Carousel>
                  <div
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
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="w-full gap-3 flex items-center py-3">
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
                    <MarkDown className={"mkdown"}>{q.response}</MarkDown>
                  </div>
                  {queries.length === i + 1 && q.completed && (
                    <div className="w-full h-auto border-t-2 border-secondary mt-3 pt-5">
                      <h5 className="text-xl font-medium font-white">
                        Related Questions
                      </h5>
                      <div className="divide-y-2 pt-3 divide-secondary">
                        <div
                          onClick={() =>
                            handleSubmit(`Which language is better for machine learning,
                            Python or JavaScript`)
                          }
                          className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-white w-[90%]">
                            Which language is better for machine learning,
                            Python or JavaScript
                          </span>
                          <FaRegQuestionCircle className="text-white text-xl" />
                        </div>
                        <div
                          onClick={() =>
                            handleSubmit(`Which language is better for machine learning,
                            Python or JavaScript`)
                          }
                          className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-white w-[90%]">
                            how does the performance of Python compare to
                            JavaScript in web development
                          </span>
                          <FaRegQuestionCircle className="text-white text-xl" />
                        </div>
                        <div
                          onClick={() =>
                            handleSubmit(`Which language is better for machine learning,
                            Python or JavaScript`)
                          }
                          className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-white w-[90%]">
                            why is JavaScript considered the most popular
                            language for web development
                          </span>
                          <FaRegQuestionCircle className="text-white text-xl" />
                        </div>
                        <div
                          onClick={() =>
                            handleSubmit(`Which language is better for machine learning,
                            Python or JavaScript`)
                          }
                          className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-white w-[90%]">
                            why is JavaScript considered the most popular
                            language for web development
                          </span>
                          <FaRegQuestionCircle className="text-white text-xl" />
                        </div>
                        <div
                          onClick={() =>
                            handleSubmit(`Which language is better for machine learning,
                            Python or JavaScript`)
                          }
                          className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-white w-[90%]">
                            how does C++ remain relevant in 2024 despite the
                            rise of newer languages
                          </span>
                          <FaRegQuestionCircle className="text-white text-xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </ScrollShadow>
          </div>
        )}
        <div
          className={cn(
            "flex items-center w-full justify-center flex-col py-10 mx-auto",
            queries.length > 0
              ? "fixed bottom-0 left-0"
              : "fixed bottom-0 md:bottom-auto"
          )}
        >
          {queries.length === 0 && (
            <h2 className="text-[28px] md:text-[44px] font-medium text-center mb-[38vh] md:mb-12">
              Bad questions don't exist.
            </h2>
          )}
          <div className="container lg:px-0 lg:max-w-[800px] max-w-full w-full">
            <PlaceholdersAndVanishInput
              onChange={(e) => setSearchValue(e.target.value)}
              onSubmit={handleSubmit}
              placeholder={
                queries.length === 0 ? "What do you want to know?" : undefined
              }
              className="duration-300 -z-1"
            />
          </div>
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
