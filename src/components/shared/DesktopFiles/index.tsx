import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { useGetFiles, useUploadFile } from "@/hooks/api/files";
import { getNextGridPosition } from "@/lib/utils";
import { FileMetadata } from "@/types/common";
import Image from "next/image";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import { FaEye } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";

const DesktopFiles = () => {
  const { mutateAsync: uploadFileMutateAsync } = useUploadFile();
  const [files, setFiles] = useState<FileMetadata[]>([]);

  const {} = useGetFiles({
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    onSuccess: (data) => {
      const files = data.data.files;
      setFiles(files);
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const occupiedPositions = files.map((f) => ({ x: f.position_x, y: f.position_y }));

    const position = getNextGridPosition(occupiedPositions, 10);
    console.log(position);
    if (position?.x !== undefined) {
      formData.append("position_x", String(position?.x));
    }
    if (position?.y !== undefined) {
      formData.append("position_y", String(position?.y));
    }

    const res = await uploadFileMutateAsync(formData);

    const url = res.data.file_url;
    const obj: FileMetadata = {
      _id: "",
      file_url: url,
      file_server_path: "",
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      file_name: acceptedFiles[0].name,
      folder_id: null,
      position_x: position?.x || 0,
      position_y: position?.y || 0,
      position_z: 1,
      user_id: "",
    };
    setFiles((pv) => [...pv, obj]);
  };

  const { open } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    noClick: true,
    onDrop,
    multiple: false,
  });
  console.log(files);
  return (
    <div className="fixed left-[45vh] top-[100px]">
      {files.map((file, i) => {
        return (
          <Draggable onDrag={() => {}} defaultPosition={{ x: file.position_x, y: file.position_y }}>
            <div className="p-2 absolute w-[60px] h-[60px] hover:bg-primary/20 rounded-xl group overflow-hidden cursor-pointer">
              <Image src={file.file_url} fill alt="file" className="object-cover w-full h-full" />
              <div className="group-hover:opacity-100 absolute top-0 right-0 bottom-0 left-0 bg-black/30 opacity-0 flex items-center duration-300 justify-center">
                <FaEye />
              </div>
            </div>
          </Draggable>
        );
      })}
      <ContextMenuContent>
        <ContextMenuItem onClick={open}>
          <MdCloudUpload className="text-xl" /> <span className="pl-3">Upload File</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </div>
  );
};

export default DesktopFiles;
