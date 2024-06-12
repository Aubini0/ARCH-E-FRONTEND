// import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import pulseAnimation from "@/assets/lotties/loading-1.json";
import { Button } from "@/components/ui/button";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { MdClosedCaption, MdClosedCaptionDisabled } from "react-icons/md";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthForm from "@/components/pages/Auth";
import SourceCard from "@/components/pages/Home/SourceCard";
import { useRouter } from "next/router";

export default function Home() {
  const ref = useRef<any>(null);
  const router = useRouter();
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

  useEffect(() => {
    if (!micToggled) {
      ref?.current?.goToAndStop(0);
    } else {
      ref?.current?.goToAndPlay(0);
    }
  }, [micToggled]);

  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <main className="bg-black font-onest h-screen w-screen overflow-hidden">
      <nav className="z-10 py-3 mt-6 w-full px-8 md:px-12">
        <div className="flex items-center gap-3 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                isBordered
                className="ring-1 w-7 h-7 md:w-8 md:h-8 ring-offset-1 cursor-pointer"
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#3F3F46] mt-3 text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setAuthDialogOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="container flex-col max-w-full lg:max-w-[800px] flex items-center h-full w-full py-10">
        <div className="w-full gap-3 relative flex flex-col items-center -z-1">
          <Lottie
            lottieRef={ref}
            animationData={pulseAnimation}
            className="w-[150px] h-[150px] mt-8 md:mt-24"
          />
          <div className="flex items-center md:mt-12 mt-8 justify-center gap-8">
            <Button
              variant={"secondary"}
              className={cn(
                "duration-100 px-2 py-2 md:px-4 md:py-2",
                !micToggled && "opacity-30"
              )}
              onClick={() => setMicToggled(!micToggled)}
            >
              {micToggled ? (
                <IoMdMic className={"text-lg mr-2 text-white"} />
              ) : (
                <IoMdMicOff className={"text-lg mr-2 text-white"} />
              )}{" "}
              Microphone
            </Button>
            <Button
              variant={"secondary"}
              className={cn(
                "duration-100 px-2 py-2 md:px-4 md:py-2",
                !ccToggled && "opacity-30"
              )}
              onClick={() => setCCToggled(!ccToggled)}
            >
              {ccToggled ? (
                <MdClosedCaption className={"text-lg mr-2 text-white"} />
              ) : (
                <MdClosedCaptionDisabled
                  className={"text-lg mr-2 text-white"}
                />
              )}{" "}
              Closed Caption
            </Button>
          </div>
        </div>
        {/* <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-5 md:mt-0"
        >
          <CarouselContent>
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[40%] md:basis-1/2 lg:basis-1/4 select-none"
                >
                  <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[80px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[80%]" />
                      <Skeleton className="h-4 w-[60%]" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            {!loading &&
              list.map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[40%] md:basis-1/2 lg:basis-1/4 select-none"
                >
                  <SourceCard />
                </CarouselItem>
              ))}

            {!loading && (
              <CarouselItem
                onClick={() => setSheetOpen(true)}
                key={-1}
                className="basis-[40%] md:basis-1/2 lg:basis-1/4 select-none"
              >
                <div className="w-full h-full bg-[#3F3F46] text-white rounded-xl p-2 flex items-center justify-center">
                  <h5 className="text-xs font-medium">View +2 more</h5>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel> */}
        <div
          onClick={() => setSheetOpen(true)}
          className="rounded-full bg-secondary mt-16 mb-5 w-fit flex items-center gap-1 py-2 lg:py-3 px-12 select-none cursor-pointer hover:bg-white/40 duration-300"
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
        {/* <div className="flex bg-transparent mt-3 w-full flex-col">
          <Tabs
            classNames={{ tabList: "bg-secondary" }}
            color="primary"
            aria-label="Options"
          >
            <Tab key="photos1" title="Photos">
              <Card className="bg-secondary text-white">
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="photos2" title="Gallery">
              <Card className="bg-secondary text-white">
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="photos3" title="Images">
              <Card className="bg-secondary text-white">
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div> */}
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
                      <SourceCard />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          </div>
        </SheetContent>
      </Sheet>
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="!p-0 !border-none">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
