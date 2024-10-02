import { FileMetadata } from "@/types/common";
import { createContext, useContext } from "react";
import { useGetFiles, useUploadFile } from "@/hooks/api/files";
import { getNextGridPosition } from "@/lib/utils";
import React, { FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";

interface IDesktopFilesContext {
  open: () => void;
  files: FileMetadata[];
}

const DesktopFilesContext = createContext<IDesktopFilesContext>({
  open: () => {},
  files: [],
});

interface IDesktopFilesContextProvider {
  children: React.ReactNode;
}

const DesktopFilesContextProvider: FC<IDesktopFilesContextProvider> = ({ children }) => {
  const { mutateAsync: uploadFileMutateAsync } = useUploadFile();
  const [files, setFiles] = useState<FileMetadata[]>([]);

  const {} = useGetFiles({
    queryKey: "desktop-files",
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
      rotation: 0,
    };
    setFiles((pv) => [...pv, obj]);
  };

  const { open } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop,
    multiple: false,
  });
  return <DesktopFilesContext.Provider value={{ files, open }}>{children}</DesktopFilesContext.Provider>;
};

export default DesktopFilesContextProvider;
export const useDesktopFiles = () => useContext(DesktopFilesContext);
