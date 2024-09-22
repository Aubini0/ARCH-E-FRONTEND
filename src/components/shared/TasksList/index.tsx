import React, { useState } from "react";
import Draggable from "react-draggable";
import { FaPlus } from "react-icons/fa6";
import Task from "./Task";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatedInput } from "@/components/ui/animated-input";
import { cn } from "@/lib/utils";
import { TimePicker12 } from "@/components/ui/time-picker/time-picker-12-hour";

const TasksList = () => {
  const [date, setDate] = useState<Date>();
  const [value, setValue] = useLocalStorage("task_window", { x: 350, y: 50 });
  const [position, setPosition] = useState(value);
  const [editingTask, setEditingTask] = useState<{
    id: string;
    time_from: string;
    time_to: string;
    date: string;
  } | null>(null);
  return (
    <div className="fixed top-0 left-0 w-0 h-0">
      <Draggable
        onDrag={(e, ui) => {
          setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
        }}
        cancel=".tasks_cancel_drag"
        onStop={(e, ui) => {
          setValue({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
        }}
        defaultPosition={value}
      >
        <div className="bg-dark-background rounded-xl w-[300px] h-[345px] overflow-hidden cursor-grab">
          {!editingTask?.id && (
            <>
              <div className="py-5 flex items-center justify-between px-5">
                <h4 className="text-white text-base">Daily Tasks</h4>
                {/* <div className="w-[42px] h-[42px] rounded-full border border-white p-1">
              <div className="w-full h-full flex items-center justify-center bg-white rounded-full text-2xl text-black">
                <FaPlus />
              </div>
            </div> */}
                <Button size={"sm"} className="active:translate-y-[1px]">
                  Create Task
                </Button>
              </div>
              <div className="w-full flex flex-col p-5 pt-0">
                <div className="flex gap-3 items-center">
                  <h6 className="text-white">0/5</h6>
                  <Button className="text-xs px-3 py-0 leading-[10px] h-[30px] !bg-green-800">Completed</Button>
                </div>
                <div className="mt-8 flex-grow overflow-y-auto max-h-[180px] hide-scrollbar space-y-3">
                  {new Array(5).fill(0).map((_, index) => (
                    <Task setEditingTask={setEditingTask} index={index} text="Gather Data" key={index} />
                  ))}
                </div>
              </div>
            </>
          )}
          {editingTask?.id && (
            <div className="w-full cursor-auto h-full p-5 relative">
              <div onClick={() => setEditingTask(null)} className="w-[32px] h-[32px] hover:bg-white/40 cursor-pointer duration-100 flex items-center justify-center rounded-full">
                <IoMdArrowRoundBack className="text-xl text-white" />
              </div>
              <h5 className="text-white mt-2 mb-3 text-lg">Edit task</h5>

              <div>
                <AnimatedInput autoComplete="off" label="Task Name" type="text" placeholder="Task Description" />
              </div>
              <div className="mt-3">
                <p className={cn("dark:text-[#848585] text-black font-inter text-xs font-medium leading-[16px]")}>Time</p>
                <TimePicker12 date={date} setDate={setDate} />
              </div>
              <div className="mt-3">
                <TimePicker12 date={date} setDate={setDate} />
              </div>
            </div>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default TasksList;
