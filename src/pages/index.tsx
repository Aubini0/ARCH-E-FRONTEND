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
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import SourceCard from "@/components/pages/Home/SourceCard";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import MainLayout from "@/components/layouts/MainLayout";
import PlaceholdersAndVanishInput from "@/components/ui/PlaceHolderAndVanishInput";
import { cn } from "@/lib/utils";
import { getHeaderHeight } from "@/components/shared/Header";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { isPhone } = useDeviceIndicator();
  const [submitted, setSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <MainLayout className="font-onest h-screen w-screen overflow-hidden">
      <div
        className={cn(
          "container flex-col max-w-full lg:max-w-[800px] flex items-center justify-center w-full py-5 md:py-10"
        )}
        style={{
          height: `calc(100vh - 96px)`,
        }}
      >
        <div
          className="flex items-center relative justify-center w-full gap-8"
          style={{ marginTop: `-96px` }}
        >
          <PlaceholdersAndVanishInput
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={() => setSubmitted(true)}
            placeholders={[]}
          />
          {submitted ? (
            <div
              onClick={() => setSheetOpen(true)}
              className="rounded-full absolute top-[30px] bg-secondary mt-16 mb-5 w-fit flex items-center gap-1 h-[56px] px-12 select-none cursor-pointer hover:bg-white/40 duration-300"
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
          ) : (
            <div className="w-full absolute top-[30px] h-[56px]"></div>
          )}
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
