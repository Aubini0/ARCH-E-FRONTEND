import React, { useMemo, useState } from "react";
import Draggable from "react-draggable";
import { FaPlus } from "react-icons/fa6";
import Task from "./Task";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { MdClose } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AnimatedInput } from "@/components/ui/animated-input";
import { cn, createDateObjectFromTimeString, formatTimeRange } from "@/lib/utils";
import { TimePicker12 } from "@/components/ui/time-picker/time-picker-12-hour";
import { useCreateTask, useGetTasks, useUpdateTask } from "@/hooks/api/tasks";
import moment from "moment";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { IFullTask } from "@/types/common";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

const TasksList = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [value, setValue] = useLocalStorage("task_window", { x: 350, y: 50 });
  const [editingDone, setEditingDone] = useState(false);
  const [position, setPosition] = useState(value);
  const [mode, setMode] = useState<"add" | "edit" | "view">("view");
  const [createEditLoading, setCreateEditLoading] = useState(false);

  const [deadline, setDeadline] = useState(false);

  const { mutateAsync: createTaskMutateAsync } = useCreateTask();
  const { mutateAsync: updateTaskMutateAsync } = useUpdateTask();

  const [tasks, setTasks] = useState<IFullTask[]>([]);
  const [taskText, setTaskText] = useState("");

  const { refetch, status } = useGetTasks({
    queryKey: "tasks",
    onSuccess: (d) => {
      setTasks(d.data.tasks);
    },
    onError: () => {
      setTasks([]);
    },
    retry: false,
  });

  const doneCount = tasks.reduce((acc, task) => {
    return acc + (task.is_done ? 1 : 0);
  }, 0);

  const [editingTask, setEditingTask] = useState<string | null>(null);

  const validateDate = () => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("Start time cannot be greater than end time");
      return false;
    } else return true;
  };

  const handleAddOrEdit = async () => {
    try {
      if (mode === "add") {
        if (!taskText) {
          setMode("view");
          setTaskText("");
          setFromDate(undefined);
          setToDate(undefined);
          setDeadline(false);
          return;
        }
        const validated = validateDate();
        if (!validated) return;
        setCreateEditLoading(true);
        await createTaskMutateAsync({
          text: taskText,
          deadline_time: deadline
            ? {
                start: deadline ? moment(fromDate).format("HH:MM") + ":00" : undefined,
                end: deadline ? moment(toDate).format("HH:MM") + ":00" : undefined,
              }
            : undefined,
          is_done: false,
          order: tasks.length + 1,
        });
        setCreateEditLoading(false);
        setMode("view");
        setTaskText("");
        setFromDate(undefined);
        setToDate(undefined);
        setDeadline(false);
        refetch();
      } else {
        if (!taskText || !editingTask) {
          setMode("view");
          setTaskText("");
          setFromDate(undefined);
          setToDate(undefined);
          setDeadline(false);
          return;
        }
        setCreateEditLoading(true);
        const validated = validateDate();
        if (!validated) return;
        await updateTaskMutateAsync({
          id: editingTask,
          data: {
            text: taskText,
            deadline_time: {
              start: deadline ? moment(fromDate).format("HH:MM") + ":00" : undefined,
              end: deadline ? moment(toDate).format("HH:MM") + ":00" : undefined,
            },
            is_done: editingDone,
            order: tasks.length + 1,
          },
        });
        setCreateEditLoading(false);
        setMode("view");
        setEditingTask(null);
        setTaskText("");
        setFromDate(undefined);
        setToDate(undefined);
        setDeadline(false);
        setEditingDone(false);
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong");
      setCreateEditLoading(false);
    }
  };

  return (
    <div className="fixed top-0 z-[40] left-0 w-0 h-0">
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
        <div className="bg-dark-background border border-[#2D2D2D] rounded-xl w-[300px] h-[345px] overflow-hidden cursor-grab">
          {mode === "view" && (
            <>
              <div className="py-5 flex items-center justify-between px-5">
                <h4 className="text-white text-base">Daily Tasks</h4>
                {/* <div className="w-[42px] h-[42px] rounded-full border border-white p-1">
              <div className="w-full h-full flex items-center justify-center bg-white rounded-full text-2xl text-black">
                <FaPlus />
              </div>
            </div> */}
                <Button onClick={() => setMode("add")} size={"sm"} className="active:translate-y-[1px]">
                  Create Task
                </Button>
              </div>
              <div className="w-full flex flex-col p-5 pt-0">
                <div className="flex gap-3 items-center">
                  <h6 className="text-white w-[30px]">
                    {doneCount}/{tasks.length}
                  </h6>
                  <Button className="text-xs px-3 py-0 leading-[10px] h-[30px] !bg-green-800">Completed</Button>
                </div>
                <div className="mt-8 flex-grow overflow-y-auto max-h-[180px] hide-scrollbar space-y-3">
                  {status === "success" &&
                    tasks.map((task, index) => (
                      <Task
                        refetch={refetch}
                        setDeadline={setDeadline}
                        setFrom={setFromDate}
                        setTo={setToDate}
                        setText={setTaskText}
                        setMode={setMode}
                        is_done={task.is_done}
                        time={task.deadline_time}
                        _id={task._id}
                        setEditingTask={setEditingTask}
                        index={index}
                        order={task.order}
                        setEditingDone={setEditingDone}
                        text={task.text}
                        key={index}
                      />
                    ))}
                  {status === "loading" && <Skeleton className="w-full h-[45px] rounded-xl" />}
                </div>
              </div>
            </>
          )}
          {(mode === "add" || mode === "edit") && (
            <div className="w-full cursor-auto h-full p-5 relative">
              <button
                onClick={() => {
                  handleAddOrEdit();
                }}
                disabled={createEditLoading}
                className="w-[32px] h-[32px] hover:bg-white/40 cursor-pointer duration-100 flex items-center justify-center rounded-full"
              >
                {!createEditLoading ? <IoMdArrowRoundBack className="text-xl text-white" /> : <Loader2 className="h-4 w-4 animate-spin" />}
              </button>
              <h5 className="text-white mt-2 mb-3 text-lg">{mode === "add" ? "Add" : "Edit"} task</h5>

              <div>
                <AnimatedInput value={taskText} onChange={(e) => setTaskText(e.target.value)} autoComplete="off" label="Task Name" type="text" placeholder="Task Description" />
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <p className={cn("dark:text-[#848585] text-black font-inter text-xs font-medium leading-[16px]")}>Deadline</p>
                  <Checkbox
                    className="data-[state=checked]:!bg-green-800 !border-green-800"
                    checked={deadline}
                    onCheckedChange={(v) => {
                      if (v) {
                        setDeadline(v as boolean);
                        setFromDate(createDateObjectFromTimeString("13:00:00"));
                        setToDate(createDateObjectFromTimeString("15:00:00"));
                      } else {
                        setDeadline(v as boolean);
                        setFromDate(undefined);
                        setToDate(undefined);
                      }
                    }}
                  />
                </div>
                <TimePicker12 disabled={!fromDate} date={fromDate} setDate={setFromDate} />
              </div>
              <div className="mt-3">
                <TimePicker12 disabled={!toDate} date={toDate} setDate={setToDate} />
              </div>
            </div>
          )}
        </div>
      </Draggable>
    </div>
  );
};

export default TasksList;
