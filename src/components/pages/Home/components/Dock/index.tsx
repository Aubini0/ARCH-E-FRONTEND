import { AlarmClock, Folder, HomeIcon, Images, Search } from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "./dockContext";
import { useRouter } from "next/router";
import { Modal } from "@/components/pages/Home/modal";
import React from "react";

interface Props {
  setHomePageBg?: (value: string) => void;
}
const data = [
  {
    title: "Home",
    icon: <HomeIcon className="text-white" />,
    href: "#",
  },
  {
    title: "Alaram",
    icon: <AlarmClock className="text-white" />,
    href: "#",
  },
  // {
  //   title: "TV",
  //   icon: <Tv className="text-white" />,
  //   href: "#",
  // },
  {
    title: "Search",
    icon: <Search className="text-white" />,
    href: "/search",
  },
  {
    title: "File Management",
    icon: <Folder className="text-white" />,
    href: "/shared-files",
  },
  {
    title: "Background",
    icon: <Images size={40} className="text-white" />,
    href: "/background",
    isLast: true,
  },
];

export function HomeDock({ setHomePageBg }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState({ isOpen: false, key: "" });
  const closeModal = () => setIsOpen({ ...isOpen, isOpen: false });
  const handleClick = (route: string) => {
    if (route == "/shared-files" || route == "/background") {
      const key = route == "/shared-files" ? "files" : "background";
      setIsOpen({ isOpen: true, key: key });
    } else {
      router.push(route);
    }
  };
  return (
    <div className="absolute bottom-[16px] left-1/2 max-w-full -translate-x-1/2">
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
