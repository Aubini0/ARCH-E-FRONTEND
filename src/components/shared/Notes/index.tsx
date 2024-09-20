import React, { FC } from "react";
import Draggable from "react-draggable";
import { TfiTrash } from "react-icons/tfi";
import Note from "./Note";
import { ICreateNote } from "@/types/common";

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
}

const Notes: FC<INotes> = ({ notes, handlePositionChange, handleDeleteNote, handleUpdateNoteOnServer }) => {
  return (
    <div className="fixed right-12 top-44">
      {notes.map((note) => (
        <Note handleDeleteNote={handleDeleteNote} note={note} handlePositionChange={handlePositionChange} handleUpdateNoteOnServer={handleUpdateNoteOnServer} key={note.id} />
      ))}
    </div>
  );
};

export default Notes;
