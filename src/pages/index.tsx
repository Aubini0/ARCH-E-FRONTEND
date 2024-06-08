// import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar } from "@nextui-org/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "@/components/pages/Home/ProfileForm";
import SourceCard from "@/components/pages/Home/SourceCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [micToggled, setMicToggled] = useState(false);
  const [ccToggled, setCCToggled] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <main className="bg-black h-screen">
      <nav className="fixed top-3 md:top-8 py-3 w-full px-8 md:px-12">
        <div className="flex items-center gap-3 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                isBordered
                className="ring-1 w-7 h-7 md:w-10 md:h-10 ring-offset-1 cursor-pointer"
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-black mt-3 text-white"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setEditProfileOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
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
      <div className="container flex-col max-w-full lg:max-w-[800px] flex items-center h-full w-full py-10 justify-center">
        <div className="w-full gap-3 relative h-full flex flex-col items-center justify-center">
          <Lottie
            animationData={pulseAnimation}
            className="w-[150px] h-[150px] md:mt-24 mt-26"
          />
          <div className="flex items-center md:mt-12 mt-2 justify-center gap-3">
            <Button
              variant={"outline"}
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
              variant={"outline"}
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
        <Carousel
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
                className="md:basis-1/2 lg:basis-1/4 select-none"
              >
                <div className="w-full h-full bg-transparent border-2 border-white text-white rounded-xl p-2 flex items-center justify-center">
                  <h5 className="text-lg font-medium">View +2 more</h5>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
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
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px] border-2 border-white text-white">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
