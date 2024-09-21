import React, { useState } from "react";
import Draggable from "react-draggable";
import { FaPlus } from "react-icons/fa6";
import Task from "./Task";
import useLocalStorage from "@/hooks/useLocalStorage";

const TasksList = () => {
  const [value, setValue] = useLocalStorage("task_window", { x: 350, y: 50 });
  const [position, setPosition] = useState(value);
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <Draggable
        onDrag={(e, ui) => {
          setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
        }}
        handle=".tasks_draggable"
        onStop={(e, ui) => {
          setValue({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
        }}
        defaultPosition={value}
      >
        <div className="bg-dark-background rounded-xl max-w-[400px]">
          <div className="py-5 tasks_draggable cursor-grab flex items-center justify-between px-5">
            <h4 className="text-white text-xl">🚀 Daily Tasks</h4>
            <div className="w-[42px] h-[42px] rounded-full border border-white p-1">
              <div className="w-full h-full flex items-center justify-center bg-white rounded-full text-2xl text-black">
                <FaPlus />
              </div>
            </div>
          </div>
          <div className="w-full p-5 pt-0">
            <h6 className="text-white">
              1<span className="text-zinc-500">/5</span>
            </h6>
            <div className="mt-3 space-y-3">
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
