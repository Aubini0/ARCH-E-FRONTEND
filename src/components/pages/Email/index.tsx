import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";

const EmailTrigger = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="fixed cursor-pointer bottom-5 right-5 flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
            <MdOutlineEmail className="text-2xl" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[800px] mr-5 h-[500px] bg-[#18181B] outline-none rounded-[20px] p-6">
          <h6 className="text-lg font-semibold">New Email</h6>
          <div className="mt-8">
            <h6 className="text-lg font-semibold text-[#848585]">From</h6>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default EmailTrigger;
