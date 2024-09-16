import React from "react";
import styles from "../home/home-styles.module.css";
import { BackgroundComponent } from "@/components/pages/background/backgroundComponent";

const Background = () => {
  return (
    <div className="max-w-[1000px] h-screen min-h-screen scrollbar-hide overflow-auto mx-auto">
      <div className={`${styles.poppins}`}>
        <BackgroundComponent />
      </div>
    </div>
  );
};

export default Background;
