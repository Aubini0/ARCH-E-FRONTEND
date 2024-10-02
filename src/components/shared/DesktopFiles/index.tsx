import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { useGetFiles, useUploadFile } from "@/hooks/api/files";
import { cn, getNextGridPosition } from "@/lib/utils";
import { FileMetadata } from "@/types/common";
import React, { FC, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useDesktopFiles } from "@/context/DesktopFilesContext";
import Moveable from "react-moveable";
import DesktopFile from "../DesktopFile";

const AntImage = dynamic(async () => await import("antd/lib/image"), {
  ssr: false,
});

interface IDesktopFiles {
  setUploadFn: any;
}

const DesktopFiles: FC<IDesktopFiles> = ({ setUploadFn }) => {
  const { files } = useDesktopFiles();
  return (
    <div className="fixed left-[45vh] top-[100px]">
      {files.map((file, i) => {
        return <DesktopFile file={file} i={i} />;
      })}
    </div>
  );
};

export default DesktopFiles;
