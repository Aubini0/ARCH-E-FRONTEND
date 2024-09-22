import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React, { FC } from "react";
import { MdEdit } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";

interface ITask {
  text: string;
}

const Task: FC<ITask> = ({ text }) => {
  return (
    <div className="w-full tasks_cancel_drag bg-secondary px-3 py-1 rounded-xl flex items-center gap-3 cursor-auto">
      <Checkbox className="border-zinc-500 border-2 data-[state=checked]:bg-green-800 w-[15px] h-[15px]" />
      <div className="flex-1 flex items-center justify-between">
        <h5 className="text-xs">{text}</h5>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="text-xl p-1 rounded-full hover:bg-dark-background cursor-pointer text-zinc-500 duration-100">
              <TbAdjustmentsHorizontal />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <MdEdit /> <span className="ml-2">Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TfiTrash /> <span className="ml-2">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Task;
