import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";

interface ITask {
  text: string;
  index: number;
  setEditingTask: React.Dispatch<
    React.SetStateAction<{
      id: string;
      time_from: string;
      time_to: string;
      date: string;
    } | null>
  >;
}

const Task: FC<ITask> = ({ text, index, setEditingTask }) => {
  return (
    <div className="w-full tasks_cancel_drag bg-secondary px-3 py-1 rounded-xl cursor-auto">
      <div className=" flex items-center gap-3">
        <Checkbox className="border-zinc-500 border-2 data-[state=checked]:bg-green-800 w-[15px] h-[15px]" />
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h5 className="text-xs">{text}</h5>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="text-xl p-1 rounded-full hover:bg-dark-background cursor-pointer text-zinc-500 duration-100">
                <TbAdjustmentsHorizontal />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setEditingTask({ date: "", id: "123", time_from: "12:40", time_to: "02:40" });
                }}
              >
                <MdEdit /> <span className="ml-2">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TfiTrash /> <span className="ml-2">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {index !== 1 ? <span className="text-[8px] ml-[28px] text-white -mt-1 block">2:40 PM - 10:40 PM</span> : <div className="w-full h-[8px]"></div>}
    </div>
  );
};

export default Task;
