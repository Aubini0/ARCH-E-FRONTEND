import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import pulseAnimation from "@/assets/lotties/loading-1.json";
import { FaMicrophone } from "react-icons/fa";
import { FaClosedCaptioning } from "react-icons/fa6";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [micToggled, setMicToggled] = useState(false);
  const [ccToggled, setCCToggled] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="bg-black h-screen">
      <div className="container flex-col max-w-[1000px] flex items-end h-full w-full py-10 justify-center">
        <div className="w-full gap-3 relative h-full flex flex-col items-center justify-center">
          <Lottie
            animationData={pulseAnimation}
            className="w-[150px] h-[150px] mt-12"
          />
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={micToggled ? "default" : "outline"}
              className={cn("duration-100")}
              onClick={() => setMicToggled(!micToggled)}
            >
              <FaMicrophone
                className={cn(
                  "text-lg mr-2",
                  micToggled ? "text-black" : "text-white"
                )}
              />{" "}
              Microphone
            </Button>
            <Button
              variant={ccToggled ? "default" : "outline"}
              className={cn("duration-100")}
              onClick={() => setCCToggled(!ccToggled)}
            >
              <FaClosedCaptioning
                className={cn(
                  "text-lg mr-2",
                  ccToggled ? "text-black" : "text-white"
                )}
              />{" "}
              Closed Caption (CC)
            </Button>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
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
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/4 select-none"
                >
                  <div className="w-full h-full bg-transparent border-2 border-white text-white rounded-xl p-2">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Recusandae corporis esse, iste eius quis facilis soluta
                      dolores est omnis eveniet.
                    </p>
                  </div>
                </CarouselItem>
              ))}

            {!loading && (
              <CarouselItem
                onClick={() => setSheetOpen(true)}
                key={-1}
                className="md:basis-1/2 lg:basis-1/4 select-none"
              >
                <div className="w-full h-full bg-transparent border-2 border-white text-white rounded-xl p-2 flex items-center justify-center">
                  <h5 className="text-lg font-medium">View +2 more</h5>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl">1+ sources</SheetTitle>
          </SheetHeader>
          <div className="w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full py-10 h-full"
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
                      <div className="w-full h-full bg-transparent border-2 border-white text-white rounded-xl p-2">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Recusandae corporis esse, iste eius quis facilis
                          soluta dolores est omnis eveniet.
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
}
