import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { IQuery } from "@/types/common";
import { cn } from "@/lib/utils";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MarkDown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegEdit, FaRegQuestionCircle } from "react-icons/fa";
import logoImg from "@/assets/images/logo.png";
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
} from "@/components/ui/carousel";
import SourceCard from "@/components/pages/Home/SourceCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
        minHeight: isPhone ? "100%" : "calc(100vh - 96px)",
      }}
      animate={{
        minHeight: query.completed ? "unset" : "calc(100vh - 96px)",
      }}
    >
      {!isPhone && mode === "edit" && editingQuery?.id === query.id ? (
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
          <h5 className="font-medium text-lg dark:text-white text-black">
            ARCH-E
          </h5>
        </div>
        {query.response && (
          <MarkDown className={"mkdown"}>{query.response}</MarkDown>
        )}

        {!query.response && (
          <div className="space-y-2 w-full">
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-3/4 h-[30px]" />
          </div>
        )}
        {query.completed && (
          <div className="flex items-center mt-5 gap-3 justify-center">
            {/* <div className="flex flex-col cursor-pointer items-center justify-center">
                          <VscShare className="text-xl" />
                          <span className="text-[10px]">Share</span>
                        </div> */}
            <div
              onClick={() => {
                setEditingQuery({ ...query, updatedQuery: query.query });
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
      {totalQueries + 1 &&
        query.completed &&
        query.recommendations.length > 0 && (
          <div className="w-full h-auto border-t-2 border-gray-400 dark:border-secondary mt-3 pt-5">
            <h5 className="text-xl font-medium font-white">
              Related Questions
            </h5>
            <div className="divide-y-2 pt-3 divide-gray-400 dark:divide-secondary">
              {query.recommendations.map((rec, i) => (
                <div
                  key={i}
                  onClick={() => fetchBot(rec)}
                  className="flex items-center justify-between gap-3 w-full py-2 cursor-pointer"
                >
                  <span className="text-sm md:text-base text-black dark:text-white w-[90%]">
                    {rec}
                  </span>
                  <FaRegQuestionCircle className=" text-black dark:text-white text-xl" />
                </div>
              ))}
            </div>
          </div>
        )}

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
    </motion.div>
  );
};

export default Query;
