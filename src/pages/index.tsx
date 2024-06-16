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
import { ScrollShadow } from "@nextui-org/react";
import { motion } from "framer-motion";

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
          "container flex-col max-w-full lg:max-w-[800px] flex items-center justify-end w-full py-5 md:py-10"
        )}
        style={{
          height: `calc(100vh - 96px)`,
        }}
      >
        <div
          className="flex flex-col items-center relative justify-center w-full gap-8"
          style={{ marginTop: `-96px` }}
        >
          {submitted && (
            <div className="flex flex-col items-center duration-300">
              <ScrollShadow hideScrollBar className="h-[200px]">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis, debitis iure, excepturi quae, culpa quisquam unde
                  quo ducimus dolor consequuntur reprehenderit deleniti sequi
                  perspiciatis adipisci. Error magni laboriosam eveniet amet
                  eligendi neque iure tempore veritatis quidem, est unde ea quam
                  ratione nostrum quas at libero, fuga adipisci, provident
                  laudantium repudiandae. Incidunt laboriosam temporibus quos
                  aliquid blanditiis ad laborum eligendi, aut, quisquam
                  reprehenderit sapiente unde deserunt molestias dignissimos,
                  ipsum tempora quo aliquam nulla odio soluta sunt ratione?
                  Voluptas a molestias accusamus temporibus officiis, ex eos
                  sunt reiciendis illo aperiam rerum exercitationem culpa
                  cupiditate voluptate, placeat reprehenderit consectetur,
                  quisquam corporis nulla dolore iusto. Eaque, enim ipsa.
                  Doloribus iure, sed repellendus, qui ipsum nemo sapiente error
                  itaque quia eum iste, recusandae nam aperiam? Tenetur beatae
                  quam est ex nemo maxime voluptate accusamus, commodi incidunt
                  sit molestiae ipsum perferendis ut suscipit quae officiis
                  deleniti rerum. Error quod tenetur ipsam aliquam unde eius!
                  Debitis error laudantium vitae? Esse ipsa labore hic adipisci
                  iure nam cum cumque non nemo quidem laudantium reprehenderit,
                  maxime cupiditate eos excepturi officiis placeat quos commodi
                  natus consequuntur mollitia a nihil illo. Dicta itaque,
                  perferendis totam exercitationem molestiae voluptatum ex
                  distinctio sapiente voluptas placeat dolorem velit tenetur
                  reprehenderit. Quibusdam praesentium veniam illo!
                </p>
              </ScrollShadow>
              <div
                onClick={() => setSheetOpen(true)}
                className="rounded-full bg-secondary my-5 w-fit flex items-center gap-1 h-[56px] px-12 select-none cursor-pointer hover:bg-white/40 duration-300"
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
            </div>
          )}
          <PlaceholdersAndVanishInput
            onChange={(e) => setSearchValue(e.target.value)}
            onSubmit={() => setSubmitted(true)}
            placeholders={[]}
            className="duration-300"
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
