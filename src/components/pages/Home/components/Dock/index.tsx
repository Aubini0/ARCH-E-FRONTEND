import { AlarmClock, Folder, HomeIcon, Images, Search } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "./dockContext";
import { useRouter } from "next/router";
import { Modal } from "@/components/pages/Home/modal";
import React from "react";
import { PiNotepad } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";

interface Props {
  setHomePageBg?: (value: string) => void;
  setHideTimer: (value: any) => void;
  addNote: () => void;
  setTasksWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const data = [
  {
    title: "Timer",
    icon: <AlarmClock className="text-white" />,
    href: "/timer",
  },
  // {
  //   title: "TV",
  //   icon: <Tv className="text-white" />,
  //   href: "#",
  // },
  {
    title: "Add New Note",
    icon: <PiNotepad className="text-white text-2xl" />,
    href: "/add-new-note",
  },
  {
    title: "Tasks",
    icon: <FaTasks className="text-white text-2xl" />,
    href: "/tasks",
  },
  {
    title: "Search",
    icon: <Search className="text-white" />,
    href: "/arche-chat",
  },
  // {
  //   title: "File Management",
  //   icon: <Folder className="text-white" />,
  //   href: "/shared-files",
  // },
  // {
  //   title: "File Management",
  //   icon: <Folder className="text-white" />,
  //   href: "/shared-files",
  // },
  {
    title: "Background",
    icon: <Images size={40} className="text-white" />,
    href: "/background",
    isLast: true,
  },
];

export function HomeDock({ setHomePageBg, setHideTimer, addNote, setTasksWindowOpen }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState({ isOpen: false, key: "" });
  const closeModal = () => setIsOpen({ ...isOpen, isOpen: false });
  const handleClick = (route: string) => {
    if (route == "/shared-files" || route == "/background") {
      const key = route == "/shared-files" ? "files" : "background";
      setIsOpen({ isOpen: true, key: key });
    } else if (route == "/timer") {
      setHideTimer((pre: string) => (pre == "true" ? "false" : "true"));
    } else if (route == "/tasks") {
      setTasksWindowOpen((pv) => !pv);
    } else if (route == "/add-new-note") {
      addNote();
    } else {
      router.push(route);
    }
  };
  return (
    <div style={{ zoom: "67%", zIndex: 1 }} className="absolute bottom-[16px] left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end relative gap-[24px] bg-[#191919]">
        {data.map((item, idx) => {
          return (
            <div key={idx} onClick={() => handleClick(item?.href)} className={`relative ${item?.isLast ? "pb-2 flex" : "pb-4"}`}>
              <DockItem key={idx} isLastItem={item?.isLast} className={`aspect-square rounded-full w-[90px] bg-[#272729]`}>
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </div>
          );
        })}
      </Dock>
      <Modal setHomePageBg={setHomePageBg} isBackground={isOpen?.key == "background"} open={isOpen?.isOpen} onClose={closeModal} />
    </div>
  );
}
