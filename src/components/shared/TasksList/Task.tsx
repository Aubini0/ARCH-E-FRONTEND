import { HTMLAttributes } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteTask, useUpdateTask } from "@/hooks/api/tasks";
import { cn, createDateObjectFromTimeString, formatTimeRange } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ITask extends HTMLAttributes<HTMLDivElement> {
  text: string;
  time?: { start: string; end: string };
  is_done: boolean;
  _id: string;
  index: number;
  setEditingTask: React.Dispatch<React.SetStateAction<string | null>>;
  setMode: (mode: "add" | "edit" | "view") => void;
  setText: (d: string) => void;
  setFrom: (d: Date) => void;
  setTo: (d: Date) => void;
  refetch: any;
  order: number;
}

const Task: React.FC<ITask> = ({ text, index, setEditingTask, _id, is_done, time, setMode, setFrom, setText, setTo, order, refetch, ...props }) => {
  const { mutateAsync: editTask } = useUpdateTask();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id });

  const handleDone = async (checked: boolean) => {
    try {
      await editTask({
        id: _id,
        data: {
          is_done: checked,
          deadline_time: time,
          order: order,
          text,
        },
      });
      refetch();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(_id);
      refetch();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div {...props} ref={setNodeRef} {...attributes} {...listeners} className="w-full tasks_cancel_drag bg-secondary px-3 py-1 rounded-xl cursor-auto" style={style}>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={is_done}
          onCheckedChange={(v) => {
            handleDone(v as boolean);
          }}
          className="border-zinc-500 border-2 data-[state=checked]:bg-green-800 w-[15px] h-[15px]"
        />
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
                  setEditingTask(_id);
                  setText(text);
                  time?.start && setFrom(createDateObjectFromTimeString(time.start));
                  time?.end && setTo(createDateObjectFromTimeString(time.end));
                  setMode("edit");
                }}
              >
                <MdEdit /> <span className="ml-2">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <TfiTrash /> <span className="ml-2">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {time ? <span className="text-[8px] ml-[28px] text-white -mt-1 block">{formatTimeRange(time)}</span> : <div className="w-full h-[8px]"></div>}
    </div>
  );
};

export default Task;
