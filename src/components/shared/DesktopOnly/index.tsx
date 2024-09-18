import Image from "next/image";
import React from "react";

const DesktopOnly = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
      <div className="w-[90%] h-[90vh] rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 w-full py-10 px-5">
          <Image src={"/images/logo.png"} alt="logo" width={60} height={60} className={"object-contain"} />
        </div>
        <Image src={"/images/auth-banner.png"} className="object-cover" alt="desktop only" fill />
      </div>
    </div>
  );
};

export default DesktopOnly;
