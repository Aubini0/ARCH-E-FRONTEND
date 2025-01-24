import MainLayout from "@/components/layouts/MainLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Lottie from "lottie-react";
import { CgCloseR } from "react-icons/cg";
import logoAnimated from "@/assets/images/logo-animated.gif";
import voiceAnimation from "@/assets/lotties/voice-animation.json";

const ConversationPage = () => {
  const router = useRouter();
  return (
    <MainLayout className="font-onest hide-scrollbar max-h-screen min-h-screen h-full w-full overflow-hidden">
      <div
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        className="fixed caption-container w-screen h-screen flex bg-black/20 items-center justify-center max-w-full flex-col inset-0 overflow-hidden hide-scrollbar"
      >
        <div className="w-[150px] relative h-[150px] mx-auto">
          <Image
            fill
            src={logoAnimated}
            alt="Animated logo"
            className="object-contain"
          />
        </div>
        <div className="text-lg md:mt-8 mt-14 font-medium text-center">
          Captions will be here. Subtitles
        </div>
        <div className="flex items-center justify-center mt-5 fixed bottom-[60px] w-full max-w-[250px]">
          <div className="flex items-center justify-center pointer-events-none">
            {/* <Lottie
              animationData={voiceAnimation}
              className="w-[300px] h-[150px] object-cover"
            /> */}
          </div>
        </div>

        <button
          onClick={() => {
            router.push("/");
          }}
          className="fixed top-6 right-5 md:top-8 md:right-10 text-white z-[120] rounded-lg flex items-center justify-center text-[40px]"
        >
          <CgCloseR />
        </button>
      </div>
    </MainLayout>
  );
};

export default ConversationPage;
