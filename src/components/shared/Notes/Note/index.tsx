import React, { FC, useState } from "react";
import Draggable from "react-draggable";
import { TfiTrash } from "react-icons/tfi";

interface INote {
  note: {
    text: string;
    position: { x: number; y: number };
    id: string;
    zIndex: number;
  };
  handlePositionChange: (data: { x: number; y: number; id: string }) => void;
  handleDeleteNote: (id: string) => void;
}

const Note: FC<INote> = ({ handlePositionChange, note, handleDeleteNote }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Draggable
      onDrag={(e, ui) => {
        handlePositionChange({ id: note.id, x: note.position.x + ui.deltaX, y: note.position.y + ui.deltaY });
      }}
      position={{ x: note.position.x, y: note.position.y }}
      handle=".__notes_drag"
    >
      <div
        onFocus={() => setClicked(true)}
        onBlur={() => setClicked(false)}
        tabIndex={0}
        className="__notes_drag relative w-[200px] bg-[#FDF7BB] border border-[#D1D1D0] h-[200px] p-5 cursor-grab"
        style={{ zoom: "100%", zIndex: note.zIndex }}
      >
        <textarea
          className="w-full hide text-xs font-medium placeholder:text-xs hide-scrollbar h-full placeholder:font-medium text-[#848585] border-none outline-none bg-transparent resize-none"
          placeholder="add text..."
          //   value={note.text}
        ></textarea>

        {clicked && (
          <div onClick={() => handleDeleteNote(note.id)} className="absolute cursor-pointer top-1 right-1">
            <TfiTrash className="text-red-500" />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Note;
