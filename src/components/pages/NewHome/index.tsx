import Dock, { DockCard, DockDivider } from "@/components/ui/Dock";
import { BlocksIcon, CircleIcon, HexagonIcon, OctagonIcon, PentagonIcon, SquareIcon, TriangleIcon } from "lucide-react";
import React from "react";
import { FaFolder } from "react-icons/fa";

const NewHome = () => {
  const openIcons = [
    <CircleIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <TriangleIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <SquareIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <PentagonIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <HexagonIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <OctagonIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
    <OctagonIcon className="h-8 w-8 fill-black stroke-black rounded-full" />, // skip
    null,
    <BlocksIcon className="h-8 w-8 fill-black stroke-black rounded-full" />,
  ];
  return (
    <div className="home-gradient pb-[90px] h-screen w-full">
      {/* <div className="bg-[#3D3D3D80]/50 w-[350px] h-[350px] rounded-[56px]"></div> */}
      {/* time widget */}
      {/* <div className="grid grid-cols-6 h-full gap-5 grid-rows-2">
        <div className="col-span-4 border h-fit">
          <div className="w-[300px] h-[250px] border border-black"></div>
        </div>
        <div className="col-span-1 h-fit">
          <div className="ml-auto w-[300px] h-[250px] border border-black"></div>
        </div>
        <div className="col-span-4 h-fit border">
          <div className="w-[300px] h-[250px] border border-black"></div>
        </div>
        <div className="col-span-1 h-fit">
          <div className="ml-auto w-[300px] h-[250px] border border-black"></div>
        </div>
      </div> */}
      <div className="hidden h-full xl:px-6 lg:grid grid-cols-1 grid-rows-12 lg:grid-cols-4 lg:grid-rows-6 bg-dark gap-8 pt-5">
        <div className="relative col-span-1 row-span-3 rounded-xl bg-blue-100"></div>
        <div className="grid  grid-rows-1 grid-cols-4 col-span-2 row-span-1 border border-white/50 rounded-xl"></div>
        <div className="relative bg-blue-500 col-span-1 row-span-3 rounded-xl">
          <div className="absolute pt-12  bottom-4 left-4 flex flex-row items-center"></div>
        </div>
        <div className="relative bg-gradient-to-t from-green-100 via-yellow-100 to-pink-100 col-span-2 row-span-3  rounded-xl"></div>
        <div className="relative col-span-1 row-span-3 rounded-xl h-fit gap-3 grid grid-cols-2">
          <div className="bg-[#424242] h-fit rounded-[18px] col-span-1 py-3 px-4">
            <FaFolder className="text-3xl mb-3" />
            <h5 className="text-base font-medium text-white mb-2">Project Name</h5>
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-normal text-[9px]">Updated Today</span>
            </div>
          </div>
          <div className="bg-[#424242] h-fit rounded-[18px] col-span-1 py-3 px-4">
            <FaFolder className="text-3xl mb-3" />
            <h5 className="text-base font-medium text-white mb-2">Project Name</h5>
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-normal text-[9px]">Updated Today</span>
            </div>
          </div>
          <div className="bg-[#424242] h-fit rounded-[18px] col-span-1 py-3 px-4">
            <FaFolder className="text-3xl mb-3" />
            <h5 className="text-base font-medium text-white mb-2">Project Name</h5>
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-normal text-[9px]">Updated Today</span>
            </div>
          </div>
          <div className="bg-[#424242] h-fit rounded-[18px] col-span-1 py-3 px-4">
            <FaFolder className="text-3xl mb-3" />
            <h5 className="text-base font-medium text-white mb-2">Project Name</h5>
            <div className="flex items-center justify-between">
              <span className="text-white/40 font-normal text-[9px]">Updated Today</span>
            </div>
          </div>
        </div>
        <div className="relative col-span-1 row-span-3 bg-blue-500 rounded-xl"></div>
        <div className="relative items-center justify-center col-span-2 row-span-2 bg-transparent rounded-xl"></div>
      </div>
      <Dock>
        {openIcons.map((item, index) =>
          item ? (
            <DockCard key={index} id={`${index}`}>
              <div className="flex items-center justify-center" id={`${index}`}>
                {openIcons[index]}
              </div>
            </DockCard>
          ) : (
            <DockDivider key={index} />
          )
        )}
      </Dock>
    </div>
  );
};

export default NewHome;
