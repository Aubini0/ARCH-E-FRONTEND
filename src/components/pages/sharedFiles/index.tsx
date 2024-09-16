import React from "react";
import { FilesUploadArea } from "./upload-area";
import { FilesAreaView } from "./view-area";

export const SharedFilesComponent = () => {
  return (
    <div className="min-h-full gap-2 flex w-full">
      <div className="max-w-[348px] w-full border-r border-[#7F7F7F]">
        <FilesUploadArea />
      </div>
      <div className="w-full">
        <FilesAreaView/>
      </div>
    </div>
  );
};
