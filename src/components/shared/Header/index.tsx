import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Delete, LogOut, Settings, Trash, User } from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/redux/auth/authSlice";
import { FaHistory, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";
import { FiMoon, FiSearch } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import QueryHistory from "./QueryHistory";
import { useRouter } from "next/router";
import useDeviceIndicator from "@/hooks/useDeviceIndicator";
import logoImg from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "@/components/ui/dialog";
import ProfileModal from "../ProfileModal";

interface IHeader extends React.HTMLAttributes<HTMLDivElement> {}

const Header: FC<IHeader> = (props) => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { auth, user, loading } = useAppSelector((state) => state.auth);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isPhone } = useDeviceIndicator();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav {...props} id="header" className={cn("z-20 relative py-2 w-full px-6 md:px-12 md:border-b border-gray-300 dark:border-[#3D3D3D]", props.className)}>
      <div className="flex items-center gap-3 justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className={"block !border-none h-full duration-300"}>
              <div onClick={() => router.push("/")} className="cursor-pointer rounded-lg h-[40px] w-[40px] flex items-center justify-center duration-100 dark:bg-secondary aspect-square">
                <FiSearch className="text-xl" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <Link href={"/"} className="flex items-center gap-3">
          <Image src={logoImg} width={32} height={32} quality={100} className="object-contain w-[28px] h-[28px] md:w-[32px] md:h-[32px]" alt="logo" />
          <h4 className="text-white hidden md:block font-montserrat font-bold text-2xl">Arche</h4>
        </Link> */}
        <div ref={buttonsRef} className="flex items-center gap-3">
          {/* {!auth && !loading && (
            <Link
              href={"/chat"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-[40px] h-[40px] p-0 !bg-transparent !border-none"
              )}
            >
              <IoChatbubbleEllipses className="text-xl" />
            </Link>
          )} */}
          {!isPhone && auth && <QueryHistory />}
          {mounted && (
            <Button
              onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
              className="w-[42px] bg-transparent dark:bg-transparent dark:hover:bg-secondary border-transparent hover:border-gray-300 h-[40px] p-0"
            >
              {theme === "light" && <FiMoon className="text-xl" />}
              {theme === "dark" && <AiOutlineSun className="text-xl" />}
            </Button>
          )}
          {!auth && !loading && (
            <Button className="h-[40px] md:w-[106px] w-[70px] text-md" onClick={() => router.push("/auth/login")}>
              Login
            </Button>
          )}

          {auth && (
            <Dialog>
              <DialogTrigger asChild>
                <Avatar
                  isBordered
                  className="ring-0 w-[42px] h-[42px] text-lg ring-offset-0 cursor-pointer bg-off-white dark:bg-secondary border border-gray-300 dark:border-none"
                  radius="sm"
                  name={user?.full_name[0]}
                  src={user?.profilePic}
                />
              </DialogTrigger>
              {/*  */}
              <DialogOverlay className="bg-white/30">
                <DialogContent className="!p-0 !outline-none w-auto bg-transparent !border-none">
                  <ProfileModal />
                </DialogContent>
              </DialogOverlay>
            </Dialog>
          )}
          {!auth && loading && <Skeleton className="w-[80px] h-[30px] bg-slate-200 dark:bg-secondary" />}
        </div>
      </div>
    </nav>
  );
};

export const getHeaderHeight = () => {
  if (typeof window !== "undefined") {
    document.getElementById("header")?.clientHeight || 0;
  } else return 0;
};

export default Header;
