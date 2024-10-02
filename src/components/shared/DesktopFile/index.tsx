import { useDesktopFiles } from "@/context/DesktopFilesContext";
import { useDeleteFile, useUpdateFile, useUploadFile } from "@/hooks/api/files";
import { cn } from "@/lib/utils";
import { FileMetadata } from "@/types/common";
import { useClickAway } from "@uidotdev/usehooks";
import Image from "next/image";
import React, { FC, useState } from "react";
import { TfiTrash } from "react-icons/tfi";
import Moveable, { OnDrag, OnRotate } from "react-moveable";

interface IDesktopFile {
  i: number;
  file: FileMetadata;
}
const DesktopFile: FC<IDesktopFile> = ({ file, i }) => {
  const [posAttr, setPosAttr] = useState({ left: file.position_x, top: file.position_y, rotate: file.rotation });
  const [clicked, setClicked] = useState(false);

  const { handleDeleteFile } = useDesktopFiles();

  const { mutateAsync } = useUpdateFile();

  const clickoutref = useClickAway<any>(() => {
    setClicked(false);
  });

  const handleUpdateFile = async (data: { x?: number; y?: number; rotation?: number }) => {
    try {
      await mutateAsync({
        // @ts-ignore
        data: {
          file_name: file.file_name,
          position_x: data.x || file.position_x,
          position_y: data.y || file.position_y,
          rotation: data.rotation || file.rotation,
        },
        id: file._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Moveable
        target={`.file-${i + 1}`}
        rotatable={clicked}
        draggable={true}
        className={`desktop-file ${!clicked ? "inactive" : ""}`}
        clickable={clicked}
        throttleDrag={0}
        onDrag={({ target, beforeDelta, beforeDist, left, top, right, bottom, delta, dist, transform, clientX, clientY }: OnDrag) => {
          target!.style.left = `${left}px`;
          target!.style.top = `${top}px`;
          setPosAttr((pv) => ({ ...pv, left, top }));
        }}
        onDragEnd={({ target, isDrag, clientX, clientY, datas }) => {
          handleUpdateFile({
            x: posAttr.left,
            y: posAttr.top,
          });
        }}
        throttleRotate={0}
        onRotateStart={({ target, clientX, clientY }) => {
          console.log("onRotateStart", target);
        }}
        onRotate={({ target, delta, dist, transform, clientX, clientY }: OnRotate) => {
          target!.style.transform = transform;
          setPosAttr((pv) => ({ ...pv, rotate: pv.rotate + delta }));
        }}
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          console.log("onRotateEnd", target, isDrag);
          handleUpdateFile({
            rotation: posAttr.rotate,
          });
        }}
      />
      <div
        ref={clickoutref}
        onClick={() => setClicked(true)}
        className={cn("absolute w-[235px] h-[260px] hover:bg-primary/20 rounded-xl group overflow-hidden cursor-pointer group", `file-${i + 1}`)}
        style={{ left: `${file.position_x}px`, top: `${file.position_y}px`, transform: `rotate(${file.rotation}deg)` }}
      >
        <Image src={file.file_url} fill alt="file" className="object-cover w-full h-full" quality={100} />
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3"></div>

        {clicked && (
          <div
            onMouseDown={(e) => {
              e.stopPropagation();
              handleDeleteFile(file._id);
            }}
            className="absolute z-5 __note_delete cursor-pointer top-3 right-3"
          >
            <TfiTrash className="text-red-500 text-xl" />
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopFile;
