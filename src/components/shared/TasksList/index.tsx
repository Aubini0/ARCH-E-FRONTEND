import React, { useState } from "react";
import Draggable from "react-draggable";
import { FaPlus } from "react-icons/fa6";
import Task from "./Task";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";

const TasksList = () => {
  const [value, setValue] = useLocalStorage("task_window", { x: 350, y: 50 });
  const [position, setPosition] = useState(value);
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
                <Task text="Gather Data" key={index} />
              ))}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default TasksList;
