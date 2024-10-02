import React, { FC } from "react";
import Draggable from "react-draggable";
import { TfiTrash } from "react-icons/tfi";
import Note from "./Note";
import { ICreateNote } from "@/types/common";
import { QueryStatus } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface INotes {
  notes: {
    text: string;
    position: { x: number; y: number };
    id: string;
    zIndex: number;
  }[];
  handlePositionChange: (data: { x: number; y: number; id: string }) => void;
  handleDeleteNote: (id: string) => void;
  handleUpdateNoteOnServer: (data: ICreateNote, id: string) => void;
  status: QueryStatus;
}

const Notes: FC<INotes> = ({ notes, handlePositionChange, handleDeleteNote, handleUpdateNoteOnServer, status }) => {
  return (
    <div style={{ fontFamily: "var(--font-kalam)" }} className={`fixed text-[18px] right-[25vw] top-[40vh] z-[10]`}>
      {notes.length > 0 &&
        notes.map((note) => <Note handleDeleteNote={handleDeleteNote} note={note} handlePositionChange={handlePositionChange} handleUpdateNoteOnServer={handleUpdateNoteOnServer} key={note.id} />)}
      {/* {status === "loading" && <Skeleton className="bg-[#FDF7BB] dark:bg-[#FDF7BB] w-[200px] h-[200px]" />} */}
    </div>
  );
};

export default Notes;
