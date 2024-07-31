import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/redux/auth/authSlice";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineSun } from "react-icons/ai";
import { FiMoon } from "react-icons/fi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface IHeader extends React.HTMLAttributes<HTMLDivElement> {}

const Header: FC<IHeader> = (props) => {
  const dispatch = useAppDispatch();
  const { auth, user, loading } = useAppSelector((state) => state.auth);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav {...props} id="header" className={cn("z-20 relative py-6 w-full px-6 md:px-12", props.className)}>
      <div className="flex items-center gap-3 justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="!border-none h-full">
              <div onClick={() => window.location.reload()} className="cursor-pointer rounded-xl h-[40px] w-[40px] flex items-center justify-center duration-100 dark:hover:bg-secondary aspect-square">
                {/* <h3 className="font-bold text-white text-xs md:text-2xl">ARCH-E</h3> */}
                <FaRegEdit className="text-2xl ml-[4px] mb-[3px]" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-3">
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
          {mounted && (
            <Button onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))} className="w-[42px] h-[40px] p-0">
              {theme === "light" && <FiMoon className="text-xl" />}
              {theme === "dark" && <AiOutlineSun className="text-xl" />}
            </Button>
          )}
          {!auth && !loading && (
            <Button className="h-[40px] md:w-[106px] w-[95px] text-md" onClick={() => dispatch(setSignInModal({ open: true }))}>
              Login
            </Button>
          )}

          {auth && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  isBordered
                  className="ring-0 w-[42px] h-[42px] text-lg ring-offset-0 cursor-pointer bg-off-white dark:bg-secondary border border-gray-300 dark:border-none"
                  radius="sm"
                  name={user?.full_name[0]}
                  src={user?.profilePic}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-3 dark:text-white">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => dispatch(logout())}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
