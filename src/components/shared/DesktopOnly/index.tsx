import Image from "next/image";
import React from "react";

const DesktopOnly = () => {
  return (
    <div className="w-screen flex md:hidden h-screen overflow-hidden items-center justify-center">
      <div className="w-[90%] h-[70vh] rounded-3xl overflow-hidden relative">
        <div className="absolute z-50 top-0 left-0 right-0 w-full pt-10 pb-3 px-5 bg-black/30">
          <Image src={"/images/logo.png"} alt="logo" width={60} height={60} className={"object-contain block mx-auto"} />
          <h5 className="text-white font-normal text-2xl text-center mt-5">Sorry, Desktop Only.</h5>
        </div>
        <Image src={"/images/auth-banner.png"} className="object-cover" alt="desktop only" fill />
      </div>
    </div>
  );
};

export default DesktopOnly;
