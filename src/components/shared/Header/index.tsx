import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setSignInModal } from "@/redux/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar } from "@nextui-org/react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/redux/auth/authSlice";
import { FaRegEdit } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const dispatch = useAppDispatch();
  const { auth, user, loading } = useAppSelector((state) => state.auth);
  return (
    <nav id="header" className="z-10 py-6 w-full px-6 md:px-12">
      <div className="flex items-center gap-3 justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="!border-none h-full">
              <div
                onClick={() => window.location.reload()}
                className="cursor-pointer rounded-xl h-[40px] w-[40px] flex items-center justify-center duration-100 hover:bg-secondary aspect-square"
              >
                {/* <h3 className="font-bold text-white text-xs md:text-2xl">ARCH-E</h3> */}
                <FaRegEdit className="text-2xl ml-[4px] mb-[3px]" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>New Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {auth && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                isBordered
                className="ring-1 w-7 h-7 md:w-8 md:h-8 ring-offset-1 cursor-pointer"
                radius="sm"
                name={user?.full_name[0]}
                src={user?.profilePic}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-3 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => dispatch(logout())}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Upgrade</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!auth && !loading && (
          <Button
            onClick={() => dispatch(setSignInModal({ open: true }))}
            variant={"secondary"}
          >
            Login
          </Button>
        )}
        {!auth && loading && (
          <Skeleton className="w-[80px] h-[30px] bg-secondary" />
        )}
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
