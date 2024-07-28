import React, { FC, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IQuery } from "@/types/common";
import { cn, getYouTubeId } from "@/lib/utils";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Markdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegEdit } from "react-icons/fa";
import Youtube from "react-youtube";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SourceCard from "@/components/pages/Home/SourceCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CgCloseR } from "react-icons/cg";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PlusIcon } from "@/components/icons/PlusIcon";
import CustomCodeBlock from "./codeBlock";

interface IQueryComponent {
  query: IQuery;
  index: number;
  totalQueries: number;
  mode: "add" | "edit";
  setMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  fetchBot: (query: string) => void;
  editingQuery: IEditingQuery | null;
  setEditingQuery: React.Dispatch<React.SetStateAction<IEditingQuery | null>>;
}

interface IEditingQuery extends IQuery {
  updatedQuery: string;
}

const Query: FC<IQueryComponent> = ({
  query,
  fetchBot,
  index,
  mode,
  totalQueries,
  editingQuery,
  setEditingQuery,
  setMode,
}) => {
  const { isPhone } = useDeviceIndicator();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoId = useMemo(() => {
    if (!query.videos) return null;
    if (query.videos.length === 0) return null;
    return getYouTubeId(query.videos[currentVideoIndex].video_link)!;
  }, [query.videos, currentVideoIndex]);

  const handleClickEdit = (id: string, index: number) => {
    setMode("edit");
    setEditingQuery({ ...query, updatedQuery: query.query });

    setTimeout(() => {
      const editForm = document.getElementById(`editFrom_${id}`);
      const editInput = document.getElementById(`editFromInput_${id}`);
      if (editForm && editInput) {
        editInput.scrollTo({ top: 0 });
        editInput.focus();
      }
    }, 100);
  };

  return (
    <motion.div
      key={query.id}
      id={query.id}
      className={cn(
        "max-w-full lg:max-w-[650px] 2xl:max-w-[800px] relative duration-300 mx-auto w-full",
        index === 0 ? "pt-0 pb-5" : "pt-5 pb-5",
        totalQueries === index + 1 ? "pb-[20px] md:pb-[120px]" : ""
      )}
      initial={{
        minHeight: isPhone ? "100%" : "calc(100vh - 88px)",
      }}
      animate={{
        minHeight: query.completed ? "unset" : "calc(100vh - 88px)",
      }}
    >
      {mode === "edit" && editingQuery?.id === query.id ? (
        <form
          id={`editFrom_${query?.id}`}
          onSubmit={(e) => {
            e.preventDefault();
            fetchBot(editingQuery.updatedQuery);
          }}
          className="flex flex-col bg-gray-100 dark:bg-secondary p-5 rounded-xl items-start w-full"
        >
          <div className="w-full h-full">
            <Input
              id={`editFromInput_${query?.id}`}
              onChange={(e) =>
                setEditingQuery((pv) => ({
                  ...pv!,
                  updatedQuery: e.target.value,
                }))
              }
              value={editingQuery?.updatedQuery}
              className="text-[16px] font-medium"
              inputContainerClassName="!border-none !outline-none"
            />
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick={() => {
                  setMode("add");
                  setEditingQuery(null);
                }}
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
        <div className="flex flex-col rounded-xl items-start w-full">
          <h5 className="text-[30px] font-medium">{query.query}</h5>
        </div>
      )}
      {/* {query.videos.length > 0 && (
        <div className="absolute hidden lg:block top-0 2xl:-right-[330px] lg:-right-[150px] xl:-right-[280px] md:w-[150px] lg:w-[120px] xl:w-[230px] pb-5 2xl:w-[310px] h-full">
          <div
            // style={{ position: "-webkit-sticky" }}
            className="sticky top-[10px] grid 2xl:grid-cols-2 gap-5"
          >
            <div
              onClick={() => {
                setCurrentVideoIndex(0);
                setVideosOpen(true);
              }}
              className="xl:col-span-2 cursor-pointer rounded-lg overflow-hidden duration-300 aspect-video"
            >
              <img
                src={query.videos[0].thumbnails.high}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            {query.videos.slice(1, query.videos.length - 1).map((v, i) => (
              <div
                onClick={() => {
                  setCurrentVideoIndex(i + 1);
                  setVideosOpen(true);
                }}
                key={i}
                className="col-span-1 rounded-lg aspect-video overflow-hidden duration-300 cursor-pointer"
              >
                <img
                  src={v.thumbnails.high}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div
              onClick={() => {
                setCurrentVideoIndex(0);
                setVideosOpen(true);
              }}
              className="rounded-lg col-span-1 aspect-video overflow-hidden duration-300 bg-secondary flex flex-col items-center justify-center cursor-pointer"
            >
              <img
                src={query.videos[query.videos.length - 1].thumbnails.high}
                alt="image"
                className="w-full h-[60px] object-cover"
              />
              <div className="flex items-center justify-center h-[30px]">
                <p className="text-sm font-medium text-white">+ View more</p>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {query.web_links.length > 0 && (
        <div
          onClick={() => setSheetOpen(true)}
          className="rounded-full md:hidden h-[42px] bg-gray-200 dark:bg-secondary mt-5 flex items-center justify-between gap-8 w-full px-3 select-none cursor-pointer duration-300"
        >
          <div className="flex items-center gap-3">
            <MdOutlineLibraryBooks className="text-2xl" />
            <span className="text-sm md:text-base font-medium text-black dark:text-white">
              Sources
            </span>
          </div>
          <div className=" flex items-center gap-[3px]">
            {query.web_links.slice(0, 3).map((web_link, index) => (
              <div key={index} className="w-6 h-6 rounded-full relative">
                <Image
                  src={`https://www.google.com/s2/favicons?domain_url=${
                    new URL(web_link).host
                  }&sz=32`}
                  alt="avatar"
                  fill
                  unoptimized
                  quality={100}
                  className="rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-start w-full">
        <div className="w-full gap-3 flex items-center pb-3 pt-5 md:pt-5">
          {/* <Image
            src={logoImg.src}
            alt="user"
            height={32}
            width={32}
            quality={100}
            className="object-contain"
          /> */}
          <h5 className="font-medium text-lg dark:text-white text-black">
            ARCH-E
          </h5>
        </div>
        {query.response && (
          <Markdown
            className={"mkdown"}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <CustomCodeBlock language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </CustomCodeBlock>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {query?.response}
          </Markdown>
        )}

        {!query.response && (
          <div className="space-y-2 w-full">
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-3/4 h-[30px]" />
          </div>
        )}
        {query.completed && (
          <div className="flex items-center mt-3 gap-3 justify-end w-full">
            {/* <div className="flex flex-col cursor-pointer items-center justify-center">
                          <VscShare className="text-xl" />
                          <span className="text-[10px]">Share</span>
                        </div> */}
            <div
              onClick={() => handleClickEdit(query?.id, index)}
              className="flex-col cursor-pointer w-10 h-10 flex items-center justify-center bg-transparent rounded-[12px]"
            >
              <FaRegEdit className="text-xl -mr-0.5 -mt-0.5" />
            </div>
            {/* <div
              onClick={() => {
                setEditingQuery({ ...query, updatedQuery: query.query });
                setMode("edit");
              }}
              className="flex-col cursor-pointer w-10 h-10 flex items-center justify-center bg-transparent rounded-[12px]"
            >
              <HiOutlineAdjustmentsHorizontal className="text-xl" />
            </div> */}
          </div>
        )}
      </div>

      {query.web_links.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full hidden md:block h-full py-5"
        >
          <p className="text-xl font-medium font-white mb-2">Sources</p>
          <CarouselContent className="text-black overflow-x-auto pb-2">
            {query.web_links.map((query, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/4 select-none"
              >
                <SourceCard count={index + 1} url={query} />
              </CarouselItem>
            ))}
            {/* <CarouselItem
            onClick={() => setSheetOpen(true)}
            className="md:basis-1/2 lg:basis-1/4 select-none"
          >
            <SourceCardViewMore />
          </CarouselItem> */}
          </CarouselContent>
        </Carousel>
      )}
      {!isPhone && query.videos.length > 0 && (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full hidden md:block h-full py-5"
        >
          <CarouselContent className="text-black">
            {query.videos.map((video, index) => (
              <CarouselItem
                onClick={() => {
                  setCurrentVideoIndex(index);
                  setVideosOpen(true);
                }}
                key={index}
                className="basis-[30%] cursor-pointer select-none"
              >
                <div className="w-full rounded-xl overflow-hidden aspect-square relative">
                  <Image
                    src={video.thumbnails.high}
                    className="object-cover z-0"
                    alt={video.title}
                    fill
                  />
                  <div
                    className="absolute z-[9] inset-0 flex items-end justify-start p-3"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 100%)",
                    }}
                  >
                    <p className="text-sm text-white">{video.title}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
            {/* <CarouselItem
            onClick={() => setSheetOpen(true)}
            className="md:basis-1/2 lg:basis-1/4 select-none"
          >
            <SourceCardViewMore />
          </CarouselItem> */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full md:hidden block mt-5"
      >
        <CarouselContent className="text-black">
          {query.videos
            .slice(0, query.videos.length - 1)
            .map((video, index) => (
              <CarouselItem
                key={index}
                className="basis-[50%] select-none h-[120px] aspect-video"
              >
                <div
                  onClick={() => {
                    setCurrentVideoIndex(index);
                    setVideosOpen(true);
                  }}
                  className="rounded-lg h-full w-full overflow-hidden duration-300"
                >
                  <img
                    src={video.thumbnails.high}
                    alt="image"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          {query.videos[query.videos.length - 1] && (
            <CarouselItem className="basis-[50%] select-none h-[120px] aspect-video">
              <div
                onClick={() => {
                  setCurrentVideoIndex(0);
                  setVideosOpen(true);
                }}
                className="rounded-lg h-full w-full overflow-hidden duration-300 bg-secondary flex flex-col items-center justify-center"
              >
                <img
                  src={query.videos[query.videos.length - 1].thumbnails.high}
                  alt="image"
                  className="w-full h-[90px] rounded-xl object-cover"
                />
                <div className="flex items-center justify-center h-[30px]">
                  <p className="text-sm font-medium text-white">+ View more</p>
                </div>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      {query.completed &&
        query.recommendations.length > 0 &&
        totalQueries - 1 === index && (
          <div className="w-full h-auto border-t-[1.3px] border-[#2f2f30] dark:border-secondary mt-3 pt-5">
            <h5 className="text-xl font-medium font-white">
              Related Questions
            </h5>
            <div className="divide-y-[1.3px] pt-3 divide-[#2f2f30] dark:divide-secondary">
              {query.recommendations.map((rec, i) => (
                <div
                  key={i}
                  onClick={() => fetchBot(rec)}
                  className="flex items-center justify-between gap-3 w-full py-3 cursor-pointer"
                >
                  <span className="text-sm md:font-[300] md:text-base text-black dark:text-white w-[90%]">
                    {rec}
                  </span>
                  <PlusIcon />
                </div>
              ))}
            </div>
          </div>
        )}

      {/* {!isPhone && (
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
                      <SourceCard url={"https://www.google.com"} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </SheetContent>
        </Sheet>
      )} */}
      {isPhone && (
        <Drawer open={sheetOpen} onOpenChange={setSheetOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-2xl">
                {query.web_links.length} sources
              </DrawerTitle>
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
                  {query.web_links.map((web_link, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4 select-none"
                    >
                      <SourceCard count={index + 1} url={web_link} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {videosOpen && query.videos.length > 0 && (
        <Sheet open={videosOpen} onOpenChange={setVideosOpen}>
          <SheetContent
            side={"right"}
            className="!w-screen max-w-none sm:max-w-none border-none outline-none shadow-none !p-0 bg-transparent backdrop-blur-sm"
          >
            <div className="w-full h-full flex flex-col items-center justify-center max-w-full overflow-hidden hide-scrollbar">
              <div className="w-full border-b-2 h-[96px] flex items-center justify-between px-10">
                <div className="flex items-center justify-start gap-3">
                  <div className="flex items-center justify-center gap-3 rounded-full">
                    <img
                      src="/images/icons/yt.webp"
                      alt="source icon"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-[30px]">youtube.com</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setVideosOpen(false);
                  }}
                  className="text-white z-[120] rounded-lg flex items-center justify-center text-[40px]"
                >
                  <CgCloseR />
                </button>
              </div>
              <div className="px-3 md:px-12 w-full flex-col md:flex-row flex items-center safe-area">
                <div className="flex-1 h-full w-full md:w-auto flex items-center justify-center">
                  <Youtube
                    id={videoId!}
                    videoId={videoId!}
                    className="w-fit h-fit"
                    iframeClassName="max-w-full h-fit md:max-w-[400px] lg:max-w-[600px] aspect-video"
                  />
                </div>
                <div className="md:h-auto md:max-h-full md:w-[280px] h-[150px] max-w-full overflow-x-auto hide-scrollbar py-5 gap-5 flex md:grid grid-cols-1 flex-row md:flex-col items-stretch">
                  {query.videos.map((v, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentVideoIndex(i)}
                      className="rounded-lg h-fit min-w-[190px] md:min-w-full md:w-auto overflow-hidden duration-300 aspect-video relative cursor-pointer"
                    >
                      <Image
                        src={v.thumbnails.high}
                        alt="image"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
                        <Image
                          src={"/images/icons/yt.webp"}
                          alt="youtube"
                          width={60}
                          height={60}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </motion.div>
  );
};

export default Query;
