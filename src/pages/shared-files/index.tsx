import { SharedFilesComponent } from "@/components/pages/sharedFiles";
import React from "react";
import styles from "../home/home-styles.module.css";

const SharedFiles = () => {
  return (
    <div className={`${styles.poppins} max-w-[1348px] mx-auto`}>
      <SharedFilesComponent />
    </div>
  );
};

export default SharedFiles;
